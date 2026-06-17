'use client';

import dynamic from 'next/dynamic';
import { forwardRef, useEffect, useRef, useState, useMemo } from 'react';

// Dynamically import react-globe.gl wrapped to support refs through next/dynamic
const Globe = dynamic(
  () =>
    import('react-globe.gl').then((mod) => {
      const RealGlobe = mod.default;
      const Wrapped = forwardRef((props, ref) => <RealGlobe ref={ref} {...props} />);
      Wrapped.displayName = 'GlobeWrapped';
      return Wrapped;
    }),
  { ssr: false, loading: () => null }
);

// Dubai HQ
const DUBAI = { lat: 25.2048, lng: 55.2708, name: 'Dubai · HQ' };

// Target markets (active trade corridors)
const MARKETS = [
  // GCC
  { lat: 24.7136, lng: 46.6753, name: 'Riyadh', region: 'GCC' },
  { lat: 25.2854, lng: 51.531, name: 'Doha', region: 'GCC' },
  { lat: 29.3759, lng: 47.9774, name: 'Kuwait City', region: 'GCC' },
  { lat: 23.5859, lng: 58.4059, name: 'Muscat', region: 'GCC' },
  { lat: 26.2235, lng: 50.5876, name: 'Manama', region: 'GCC' },
  // Europe
  { lat: 51.5074, lng: -0.1278, name: 'London', region: 'Europe' },
  { lat: 48.8566, lng: 2.3522, name: 'Paris', region: 'Europe' },
  { lat: 52.52, lng: 13.405, name: 'Berlin', region: 'Europe' },
  { lat: 52.3676, lng: 4.9041, name: 'Amsterdam', region: 'Europe' },
  { lat: 50.1109, lng: 8.6821, name: 'Frankfurt', region: 'Europe' },
  { lat: 40.4168, lng: -3.7038, name: 'Madrid', region: 'Europe' },
  { lat: 41.9028, lng: 12.4964, name: 'Rome', region: 'Europe' },
  // United States
  { lat: 40.7128, lng: -74.006, name: 'New York', region: 'US' },
  { lat: 34.0522, lng: -118.2437, name: 'Los Angeles', region: 'US' },
  { lat: 29.7604, lng: -95.3698, name: 'Houston', region: 'US' },
  { lat: 25.7617, lng: -80.1918, name: 'Miami', region: 'US' },
  { lat: 41.8781, lng: -87.6298, name: 'Chicago', region: 'US' },
];

const REGION_COLOR = {
  GCC: '#F59E0B',
  Europe: '#3B82F6',
  US: '#10B981',
};

const GlobeHero = () => {
  const globeRef = useRef();
  const wrapperRef = useRef();
  const [size, setSize] = useState({ w: 520, h: 520 });
  const [ready, setReady] = useState(false);

  // Responsive sizing
  useEffect(() => {
    const update = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const s = Math.min(rect.width, 640);
      setSize({ w: s, h: s });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Configure controls once globe is ready
  useEffect(() => {
    if (!ready || !globeRef.current) return;
    const controls = globeRef.current.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.6;
      controls.enableZoom = false;
      controls.enablePan = false;
    }
    // Initial point of view focused on Dubai
    globeRef.current.pointOfView({ lat: 20, lng: 50, altitude: 2.2 }, 0);
  }, [ready]);

  // Arcs: Dubai -> each market
  const arcs = useMemo(
    () =>
      MARKETS.map((m) => ({
        startLat: DUBAI.lat,
        startLng: DUBAI.lng,
        endLat: m.lat,
        endLng: m.lng,
        color: [REGION_COLOR[m.region], '#FBBF24'],
        region: m.region,
      })),
    []
  );

  // Points for cities + Dubai HQ
  const points = useMemo(
    () => [
      { lat: DUBAI.lat, lng: DUBAI.lng, size: 1.4, color: '#FBBF24', label: DUBAI.name, hq: true },
      ...MARKETS.map((m) => ({
        lat: m.lat,
        lng: m.lng,
        size: 0.6,
        color: REGION_COLOR[m.region],
        label: `${m.name} · ${m.region}`,
      })),
    ],
    []
  );

  // Glowing rings on Dubai + markets
  const rings = useMemo(
    () => [
      { lat: DUBAI.lat, lng: DUBAI.lng, maxR: 6, propagationSpeed: 3, repeatPeriod: 1200, color: '#FBBF24' },
      ...MARKETS.slice(0, 8).map((m, i) => ({
        lat: m.lat,
        lng: m.lng,
        maxR: 3,
        propagationSpeed: 2,
        repeatPeriod: 1800 + i * 120,
        color: REGION_COLOR[m.region],
      })),
    ],
    []
  );

  return (
    <div ref={wrapperRef} className="relative mx-auto aspect-square w-full max-w-[640px]">
      {/* Glow halo */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.18),transparent_60%)] blur-2xl" />
      {/* Outer ring decoration */}
      <div className="pointer-events-none absolute inset-2 rounded-full border border-navy-200/60" />
      <div className="pointer-events-none absolute inset-6 rounded-full border border-navy-200/40" />

      <div className="absolute inset-0 flex items-center justify-center">
        <Globe
          ref={globeRef}
          width={size.w}
          height={size.h}
          backgroundColor="rgba(0,0,0,0)"
          showAtmosphere
          atmosphereColor="#F59E0B"
          atmosphereAltitude={0.18}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          // Arcs
          arcsData={arcs}
          arcColor="color"
          arcStroke={0.35}
          arcAltitude={0.22}
          arcAltitudeAutoScale={0.45}
          arcDashLength={0.45}
          arcDashGap={2}
          arcDashAnimateTime={2400}
          arcsTransitionDuration={1500}
          // Points
          pointsData={points}
          pointAltitude={0.012}
          pointColor="color"
          pointRadius="size"
          pointLabel="label"
          // Rings
          ringsData={rings}
          ringColor={(d) => () => d.color}
          ringMaxRadius="maxR"
          ringPropagationSpeed="propagationSpeed"
          ringRepeatPeriod="repeatPeriod"
          onGlobeReady={() => setReady(true)}
        />
      </div>

      {/* Floating legend */}
      <div className="pointer-events-none absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4 rounded-full bg-white/95 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-mid text-navy-700 shadow-xl ring-1 ring-navy-100 backdrop-blur sm:bottom-6">
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent" /> GCC</span>
        <span className="h-3 w-px bg-navy-200" />
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> Europe</span>
        <span className="h-3 w-px bg-navy-200" />
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> US</span>
      </div>
    </div>
  );
};

export default GlobeHero;
