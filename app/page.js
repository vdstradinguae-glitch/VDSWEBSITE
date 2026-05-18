'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const AI_EXTERNAL_URL = 'https://www.talkbotagent.com';

/* ============================================================
   SHARED EDITORIAL ELEMENTS
   ============================================================ */
const Eyebrow = ({ children, tone = 'gold' }) => (
  <div
    className={`flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] ${
      tone === 'gold' ? 'text-gold-dark' : 'text-paper/70'
    }`}
  >
    <span
      className={`h-px w-10 ${tone === 'gold' ? 'bg-gold' : 'bg-paper/40'}`}
    />
    {children}
  </div>
);

const SectionNumber = ({ n }) => (
  <span className="font-display text-sm italic tracking-wide text-gold-dark">
    {n}
  </span>
);

/* ============================================================
   HERO ORNAMENT — rotating gold wireframe globe / compass
   ============================================================ */
const HeroOrnament = () => {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* Outer ring with serial marks */}
      <div className="absolute inset-0 animate-slow-spin">
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <defs>
            <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="#B58B3F" stopOpacity="0" />
              <stop offset="100%" stopColor="#B58B3F" stopOpacity="0.5" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="198" fill="none" stroke="#B58B3F" strokeOpacity="0.4" strokeWidth="0.6" />
          <circle cx="200" cy="200" r="190" fill="none" stroke="#B58B3F" strokeOpacity="0.25" strokeWidth="0.4" />
          {/* tick marks */}
          {Array.from({ length: 60 }).map((_, i) => {
            const a = (i * 6 * Math.PI) / 180;
            const r1 = 198;
            const r2 = i % 5 === 0 ? 182 : 190;
            const x1 = 200 + Math.cos(a) * r1;
            const y1 = 200 + Math.sin(a) * r1;
            const x2 = 200 + Math.cos(a) * r2;
            const y2 = 200 + Math.sin(a) * r2;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#B58B3F"
                strokeOpacity={i % 5 === 0 ? 0.85 : 0.4}
                strokeWidth={i % 5 === 0 ? 1 : 0.5}
              />
            );
          })}
          {/* cardinal labels */}
          {[
            ['N', 200, 18],
            ['E', 384, 204],
            ['S', 200, 392],
            ['W', 16, 204],
          ].map(([t, x, y]) => (
            <text
              key={t}
              x={x}
              y={y}
              fill="#B58B3F"
              fontSize="11"
              fontFamily="serif"
              fontStyle="italic"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {t}
            </text>
          ))}
        </svg>
      </div>

      {/* Wireframe globe */}
      <div className="absolute inset-12 animate-slow-spin-rev">
        <svg viewBox="0 0 320 320" className="h-full w-full">
          <defs>
            <radialGradient id="globeGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#163525" />
              <stop offset="55%" stopColor="#0A1F17" />
              <stop offset="100%" stopColor="#06140E" />
            </radialGradient>
            <linearGradient id="goldStroke" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#D9B36A" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#8A6624" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <circle cx="160" cy="160" r="155" fill="url(#globeGrad)" />
          {/* longitudes */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <ellipse
              key={`v${i}`}
              cx="160"
              cy="160"
              rx={Math.max(8, 155 - i * 24)}
              ry="155"
              fill="none"
              stroke="url(#goldStroke)"
              strokeWidth="0.5"
            />
          ))}
          {/* latitudes */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <ellipse
              key={`h${i}`}
              cx="160"
              cy="160"
              rx="155"
              ry={(i + 1) * 18}
              fill="none"
              stroke="url(#goldStroke)"
              strokeWidth="0.4"
            />
          ))}
          {/* continent dots */}
          {[
            [180, 110],
            [200, 140],
            [165, 145],
            [220, 165],
            [120, 175],
            [195, 200],
            [170, 220],
            [140, 200],
            [240, 195],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="2.4" fill="#D9B36A" opacity="0.9" />
          ))}
          {/* Dubai marker (pulsing) */}
          <g>
            <circle cx="195" cy="155" r="14" fill="#B58B3F" opacity="0.15">
              <animate attributeName="r" values="8;22;8" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.35;0;0.35" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="195" cy="155" r="3.6" fill="#D9B36A" />
          </g>
        </svg>
      </div>

      {/* Subtle outer halo */}
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(181,139,63,0.25),transparent_60%)] blur-2xl" />
    </div>
  );
};

/* ============================================================
   NAVBAR — slim, editorial
   ============================================================ */
const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#about', label: 'About' },
    { href: '#agro', label: 'Agro' },
    { href: '#healthcare', label: 'Healthcare' },
    { href: AI_EXTERNAL_URL, label: 'AI Agents', external: true },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-ink/10 bg-paper/85 backdrop-blur-xl text-ink'
          : 'bg-transparent text-paper'
      }`}
      aria-label="Site header"
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-10">
        <a href="#top" className="group flex items-baseline gap-2.5">
          <span className="font-display text-2xl font-semibold tracking-tight">
            VDS
          </span>
          <span
            className={`hidden text-[10px] uppercase tracking-[0.32em] sm:inline ${
              scrolled ? 'text-stone' : 'text-paper/70'
            }`}
          >
            · General Trading LLC
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noopener noreferrer' : undefined}
                className="group relative inline-flex items-center gap-1 text-[13px] font-medium tracking-wide transition hover:text-gold-dark"
              >
                {l.label}
                {l.external && <ArrowUpRight className="h-3 w-3 opacity-70" />}
                <span className="absolute -bottom-1 left-0 right-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full border border-current px-5 py-2 text-[12px] font-medium uppercase tracking-[0.18em] transition hover:bg-current hover:text-paper"
          >
            <span className="transition group-hover:text-paper">Enquire</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:text-paper" />
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="rounded-md p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-ink/10 bg-paper text-ink md:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {links.map((l) => (
                <li key={l.label} className="border-b border-ink/10 last:border-0">
                  <a
                    href={l.href}
                    target={l.external ? '_blank' : undefined}
                    rel={l.external ? 'noopener noreferrer' : undefined}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-4 text-base"
                  >
                    <span>{l.label}</span>
                    {l.external ? (
                      <ArrowUpRight className="h-4 w-4 text-gold-dark" />
                    ) : (
                      <Plus className="h-4 w-4 opacity-40" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

/* ============================================================
   HERO — dark forest, serif display, gold ornament on right
   ============================================================ */
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate min-h-[100vh] overflow-hidden bg-forest-deep text-paper grain"
    >
      {/* background photograph layer */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-[0.18]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1661756977826-c66970f2a2cb?w=1800&q=80')",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-deep/85 via-forest-deep/95 to-forest-deep" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_20%_30%,rgba(181,139,63,0.18),transparent_70%)]" />

      <Nav />

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 px-6 pb-24 pt-36 lg:grid-cols-[1.1fr,1fr] lg:gap-20 lg:px-10 lg:pt-44">
        <motion.div style={{ y }} className="relative">
          <Eyebrow tone="paper">UAE-Registered · Est. Dubai</Eyebrow>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[clamp(2.6rem,7vw,5.6rem)] font-light leading-[1.02] tracking-[-0.02em] text-paper"
          >
            Trading{' '}
            <span className="italic text-gradient-gold">excellence</span>
            <br />
            across continents.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mt-8 max-w-xl text-base leading-[1.7] text-paper/75 sm:text-lg"
          >
            A Dubai trading house operating across three carefully chosen verticals —
            agricultural commodities, regulated medical equipment, and AI automation. One
            entity. One standard. Three continents.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#agro"
              className="group inline-flex items-center gap-3 bg-gold px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] text-forest-deep transition hover:bg-gold-light"
            >
              Explore Agro
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#healthcare"
              className="group inline-flex items-center gap-3 border border-paper/30 px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] text-paper transition hover:border-paper hover:bg-paper hover:text-forest-deep"
            >
              Explore Healthcare
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={AI_EXTERNAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.22em] text-paper/80 underline decoration-gold underline-offset-[6px] transition hover:text-gold-light"
            >
              Explore AI Agents
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Stat strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-14 grid max-w-lg grid-cols-3 divide-x divide-paper/15 border-y border-paper/15 py-6 text-paper"
          >
            {[
              ['III', 'Verticals'],
              ['20+', 'Countries'],
              ['24·7', 'Operations'],
            ].map(([n, l]) => (
              <div key={l} className="px-4 text-center first:pl-0 last:pr-0">
                <div className="font-display text-3xl font-light tracking-tight">{n}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.28em] text-paper/55">
                  {l}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center"
        >
          <HeroOrnament />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.32em] text-paper/40">
        <div className="flex flex-col items-center gap-2">
          <span>Scroll</span>
          <span className="h-10 w-px bg-paper/30" />
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   ABOUT — editorial 2-column, numbered, cream
   ============================================================ */
const About = () => {
  return (
    <section id="about" className="relative scroll-mt-20 bg-paper py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex items-center justify-between">
          <Eyebrow>I — About</Eyebrow>
          <div className="hidden text-[11px] uppercase tracking-[0.28em] text-stone sm:block">
            Est. Dubai · UAE
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr,1fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9 }}
          >
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.8rem)] font-light leading-[1.05] tracking-[-0.015em] text-ink">
              A trading house, in the{' '}
              <span className="italic text-gold-dark">classical sense</span>{' '}
              — re-engineered for global commerce.
            </h2>
            <p className="mt-8 max-w-xl text-[17px] leading-[1.75] text-ink/75">
              VDS General Trading LLC is a UAE-registered limited liability company,
              headquartered in Dubai. We operate at the intersection of physical commodities,
              regulated medical supply chains, and emerging AI technology — giving our
              partners a single, accountable, multi-vertical operator.
            </p>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.75] text-stone">
              Our mandate is to build dependable trade corridors between producers, hospitals,
              distributors and enterprises across the GCC, Africa, and the CIS — through
              transparent contracting, regulated execution, and quiet professionalism.
            </p>

            <div className="mt-10 inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.24em] text-ink">
              <span className="h-px w-8 bg-gold" />
              Headquartered in Dubai, UAE
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="relative"
          >
            <div className="ornament-frame relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1100&q=85"
                alt="Aerial view of Dubai, headquarters of VDS General Trading LLC"
                loading="lazy"
                className="h-[520px] w-full object-cover grayscale-[15%]"
              />
            </div>
            <div className="mt-6 flex items-start justify-between border-t border-ink/15 pt-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-stone">
                  Plate I
                </div>
                <div className="mt-1 font-display text-lg italic text-ink">Dubai · The crossroads.</div>
              </div>
              <div className="font-display text-sm text-gold-dark">— 25° N</div>
            </div>
          </motion.div>
        </div>

        {/* Differentiators row */}
        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['UAE LLC', 'Compliant, accountable Dubai entity.'],
            ['Tri-Continental', 'GCC · Africa · CIS corridors.'],
            ['MOHAP-Aligned', 'Healthcare regulation & traceability.'],
            ['Jebel Ali', 'Consolidation & re-export ready.'],
          ].map(([t, d], i) => (
            <div key={t} className="bg-paper p-6 sm:p-8">
              <div className="mb-3 font-display text-xs italic text-gold-dark">
                {`0${i + 1}`}
              </div>
              <div className="font-display text-xl text-ink">{t}</div>
              <div className="mt-2 text-sm leading-relaxed text-stone">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   VERTICALS — editorial 3-card with numerals
   ============================================================ */
const Verticals = () => {
  const items = [
    {
      key: 'agro',
      numeral: 'I',
      title: 'Agro Trading',
      kicker: 'Commodities',
      desc:
        'Wholesale and re-export of agricultural commodities — onion, potato, garlic and broader produce — to the GCC, Africa and CIS.',
      href: '#agro',
      external: false,
      image:
        'https://images.unsplash.com/photo-1678954157605-38cc2f12c780?w=900&q=85',
    },
    {
      key: 'healthcare',
      numeral: 'II',
      title: 'Healthcare',
      kicker: 'Regulated Supply',
      desc:
        'MOHAP-compliant medical equipment trading, supply and distribution to hospitals, clinics and medical distributors across the UAE.',
      href: '#healthcare',
      external: false,
      image:
        'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=900&q=85',
    },
    {
      key: 'ai',
      numeral: 'III',
      title: 'AI Agents & Automation',
      kicker: 'Technology',
      desc:
        'AI-powered voice and email automation that runs your inbound calls, leads and customer operations — twenty-four hours, every day.',
      href: AI_EXTERNAL_URL,
      external: true,
      image:
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&q=85',
    },
  ];

  return (
    <section className="relative bg-bone py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex items-center justify-between">
          <Eyebrow>II — Verticals</Eyebrow>
          <span className="hidden text-[11px] uppercase tracking-[0.28em] text-stone sm:inline">
            Three pillars · One operator
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-10 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.6rem)] font-light leading-[1.05] tracking-[-0.015em] text-ink"
        >
          Three carefully chosen verticals. <span className="italic text-gold-dark">One signature</span> of execution.
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-ink/15 bg-ink/15 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.a
              key={it.key}
              href={it.href}
              target={it.external ? '_blank' : undefined}
              rel={it.external ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group relative flex flex-col bg-paper p-8 transition-colors duration-500 hover:bg-cream sm:p-10"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-4xl italic text-gold-dark">
                  {it.numeral}
                </span>
                <span className="text-[10px] uppercase tracking-[0.28em] text-stone">
                  {it.kicker}
                </span>
              </div>

              <div className="relative mt-8 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={it.image}
                  alt={`${it.title} — VDS General Trading`}
                  loading="lazy"
                  className="h-52 w-full object-cover grayscale-[20%] transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-paper/40 via-transparent to-transparent" />
              </div>

              <h3 className="mt-8 font-display text-3xl font-light text-ink">
                {it.title}
              </h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-stone">
                {it.desc}
              </p>

              <div className="mt-8 flex items-center justify-between border-t border-ink/15 pt-5">
                <span className="text-[12px] font-medium uppercase tracking-[0.22em] text-ink transition group-hover:text-gold-dark">
                  {it.external ? 'Visit Talkbot' : 'Learn more'}
                </span>
                <ArrowUpRight
                  className={`h-5 w-5 ${
                    it.external ? 'text-gold-dark' : 'text-ink'
                  } transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5`}
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   AGRO DETAIL — editorial with big moody photo
   ============================================================ */
const Agro = () => {
  const products = [
    'Onion',
    'Potato',
    'Garlic',
    'Ginger',
    'Pulses',
    'Spices',
    'Fresh Produce',
    'Dry Grocery',
  ];
  const markets = ['GCC', 'East Africa', 'West Africa', 'CIS Region', 'South Asia'];

  return (
    <section
      id="agro"
      className="relative scroll-mt-20 bg-paper py-28 sm:py-36"
      aria-labelledby="agro-heading"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex items-center justify-between">
          <Eyebrow>III — Agro Trading</Eyebrow>
          <span className="hidden text-[11px] uppercase tracking-[0.28em] text-stone sm:inline">
            Commodities · Re-Export
          </span>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9 }}
            className="relative order-2 lg:order-1"
          >
            <div className="ornament-frame relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1678954157605-38cc2f12c780?w=1200&q=85"
                alt="Editorial photograph of fresh onions — agricultural commodity for export"
                loading="lazy"
                className="h-[600px] w-full object-cover"
              />
            </div>
            <div className="mt-6 flex items-start justify-between border-t border-ink/15 pt-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-stone">
                  Plate II
                </div>
                <div className="mt-1 font-display text-lg italic text-ink">
                  Allium · The staple of trade.
                </div>
              </div>
              <div className="font-display text-sm text-gold-dark">— FOB</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="order-1 lg:order-2 lg:pt-8"
          >
            <h2
              id="agro-heading"
              className="font-display text-[clamp(1.9rem,4.2vw,3.4rem)] font-light leading-[1.05] tracking-[-0.015em] text-ink"
            >
              Wholesale & re-export of{' '}
              <span className="italic text-gold-dark">premium agro</span>{' '}
              commodities.
            </h2>
            <p className="mt-6 max-w-xl text-[16px] leading-[1.75] text-ink/75">
              We supply distributors, retailers and re-exporters across the GCC, Africa and
              CIS with consistent volumes, transparent grading, and Dubai-based consolidation
              through Jebel Ali — under one accountable contract.
            </p>

            <div className="mt-10">
              <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-stone">
                Product Portfolio
              </div>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                {products.map((p, i) => (
                  <li
                    key={p}
                    className="flex items-baseline gap-3 border-b border-ink/10 pb-2 font-display text-lg text-ink"
                  >
                    <span className="text-[10px] italic text-gold-dark">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-stone">
                Markets Served
              </div>
              <div className="flex flex-wrap gap-2">
                {markets.map((m) => (
                  <span
                    key={m}
                    className="rounded-full border border-ink/20 px-4 py-1.5 text-[13px] text-ink/85"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 bg-ink px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] text-paper transition hover:bg-forest"
              >
                Request a quote
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border-b border-gold py-1 text-[12px] font-medium uppercase tracking-[0.22em] text-ink hover:text-gold-dark"
              >
                Become a distributor
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   HEALTHCARE — beige variation
   ============================================================ */
const Healthcare = () => {
  const categories = [
    'Diagnostic Equipment',
    'Patient Monitoring',
    'Surgical Instruments',
    'Hospital Furniture',
    'Consumables & Disposables',
    'Imaging Devices',
    'Lab Equipment',
    'Rehabilitation',
  ];
  const customers = ['Hospitals', 'Clinics', 'Polyclinics', 'Pharmacies', 'Distributors'];

  return (
    <section
      id="healthcare"
      className="relative scroll-mt-20 bg-bone py-28 sm:py-36"
      aria-labelledby="healthcare-heading"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex items-center justify-between">
          <Eyebrow>IV — Healthcare</Eyebrow>
          <span className="hidden text-[11px] uppercase tracking-[0.28em] text-stone sm:inline">
            MOHAP-Compliant · UAE
          </span>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9 }}
            className="lg:pt-8"
          >
            <h2
              id="healthcare-heading"
              className="font-display text-[clamp(1.9rem,4.2vw,3.4rem)] font-light leading-[1.05] tracking-[-0.015em] text-ink"
            >
              MOHAP-compliant medical equipment{' '}
              <span className="italic text-gold-dark">trading & supply</span>.
            </h2>
            <p className="mt-6 max-w-xl text-[16px] leading-[1.75] text-ink/75">
              We supply hospitals, clinics and distributors across the UAE with carefully
              sourced medical equipment — with documentation, traceability and adherence to
              UAE Ministry of Health & Prevention regulations.
            </p>

            <div className="mt-10">
              <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-stone">
                Equipment Categories
              </div>
              <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {categories.map((c, i) => (
                  <li
                    key={c}
                    className="flex items-baseline gap-3 border-b border-ink/10 pb-2 font-display text-lg text-ink"
                  >
                    <span className="text-[10px] italic text-gold-dark">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-stone">
                Target Customers
              </div>
              <div className="flex flex-wrap gap-2">
                {customers.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-ink/20 px-4 py-1.5 text-[13px] text-ink/85"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 bg-ink px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] text-paper transition hover:bg-forest"
              >
                Request catalog
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border-b border-gold py-1 text-[12px] font-medium uppercase tracking-[0.22em] text-ink hover:text-gold-dark"
              >
                Partner with us
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="relative"
          >
            <div className="ornament-frame relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=1200&q=85"
                alt="Minimalist medical instruments — MOHAP-compliant equipment supplied in the UAE"
                loading="lazy"
                className="h-[600px] w-full object-cover"
              />
            </div>
            <div className="mt-6 flex items-start justify-between border-t border-ink/15 pt-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-stone">
                  Plate III
                </div>
                <div className="mt-1 font-display text-lg italic text-ink">
                  Instrumenta · Quiet precision.
                </div>
              </div>
              <div className="font-display text-sm text-gold-dark">— MOHAP</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   WHY VDS — numbered editorial entries
   ============================================================ */
const WhyChoose = () => {
  const items = [
    ['UAE-Registered LLC', 'Accountable Dubai entity. Transparent contracting, banking and invoicing under UAE jurisdiction.'],
    ['Multi-Vertical Operator', 'Agro, healthcare and AI under one operational roof — one point of accountability.'],
    ['Global Logistics Network', 'Jebel Ali consolidation. Full container and LCL flows, documentation handled in-house.'],
    ['Regulatory Compliance', 'MOHAP-aligned medical imports. Documented agro grades. Auditable supply trail.'],
    ['Tri-Continental Reach', 'Active corridors into the GCC, across Africa, and through the CIS region.'],
    ['Quietly Future-Ready', 'AI automation embedded into how we serve and enable our partners.'],
  ];

  return (
    <section className="relative bg-paper py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex items-center justify-between">
          <Eyebrow>V — Why VDS</Eyebrow>
          <span className="hidden text-[11px] uppercase tracking-[0.28em] text-stone sm:inline">
            The case for VDS
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mt-10 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.6rem)] font-light leading-[1.05] tracking-[-0.015em] text-ink"
        >
          Built on trust. <span className="italic text-gold-dark">Engineered</span> for global trade.
        </motion.h2>

        <div className="mt-16 divide-y divide-ink/15 border-y border-ink/15">
          {items.map(([t, d], i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group grid grid-cols-[60px,1fr] items-baseline gap-6 py-8 transition-colors duration-300 hover:bg-cream sm:grid-cols-[80px,1.2fr,2fr] sm:gap-10"
            >
              <div className="font-display text-2xl italic text-gold-dark">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="font-display text-2xl font-light text-ink sm:text-3xl">
                {t}
              </div>
              <div className="col-span-2 max-w-2xl text-[15px] leading-relaxed text-stone sm:col-span-1">
                {d}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   GLOBAL REACH — dark forest, gold map
   ============================================================ */
const GlobalReach = () => {
  const pulses = [
    { cx: 555, cy: 215 },
    { cx: 600, cy: 250 },
    { cx: 530, cy: 280 },
    { cx: 510, cy: 320 },
    { cx: 470, cy: 300 },
    { cx: 560, cy: 160 },
    { cx: 610, cy: 150 },
    { cx: 660, cy: 145 },
    { cx: 800, cy: 320 },
  ];

  return (
    <section className="relative overflow-hidden bg-forest-deep py-28 text-paper grain sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex items-center justify-between">
          <Eyebrow tone="paper">VI — Global Reach</Eyebrow>
          <span className="hidden text-[11px] uppercase tracking-[0.28em] text-paper/55 sm:inline">
            Trade Corridors
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr,1.6fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.4rem)] font-light leading-[1.05] tracking-[-0.015em] text-paper">
              Active corridors across{' '}
              <span className="italic text-gradient-gold">three continents</span>.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-paper/70">
              From Dubai we move goods, equipment and technology where they&apos;re needed — fast,
              compliant, and underwritten by a single accountable operator.
            </p>

            <div className="mt-10 space-y-4 text-sm">
              {[
                ['UAE & GCC', 'Primary market · Direct distribution.'],
                ['Africa', 'East & West Africa re-export corridors.'],
                ['CIS', 'Russia, Central Asia volume flows.'],
                ['South Asia', 'Sourcing & secondary supply.'],
              ].map(([t, d]) => (
                <div
                  key={t}
                  className="flex items-start justify-between gap-6 border-b border-paper/15 pb-4"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-gold" />
                    <div>
                      <div className="font-display text-lg text-paper">{t}</div>
                      <div className="text-[13px] text-paper/55">{d}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <svg
              viewBox="0 0 1000 500"
              className="h-auto w-full"
              role="img"
              aria-label="World map showing VDS Trading active markets in UAE, GCC, Africa and CIS"
            >
              <defs>
                <linearGradient id="routeGrad2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#B58B3F" stopOpacity="0.05" />
                  <stop offset="50%" stopColor="#D9B36A" stopOpacity="1" />
                  <stop offset="100%" stopColor="#B58B3F" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Land dots */}
              {Array.from({ length: 26 }).map((_, row) =>
                Array.from({ length: 56 }).map((_, col) => {
                  const x = 30 + col * 17;
                  const y = 30 + row * 17;
                  const h = Math.abs(Math.sin(row * 13.37 + col * 7.91) * 10000) % 1;
                  const inLand =
                    (x > 430 && x < 780 && y > 80 && y < 380 && h > 0.35) ||
                    (x > 130 && x < 330 && y > 100 && y < 380 && h > 0.5) ||
                    (x > 780 && x < 880 && y > 300 && y < 380 && h > 0.4);
                  if (!inLand) return null;
                  return (
                    <circle
                      key={`${row}-${col}`}
                      cx={x}
                      cy={y}
                      r="1.5"
                      fill="#D9B36A"
                      opacity="0.28"
                    />
                  );
                })
              )}

              {/* Trade arcs from Dubai */}
              {[
                [600, 230, 500, 310],
                [600, 230, 250, 280],
                [600, 230, 620, 150],
                [600, 230, 800, 320],
              ].map(([x1, y1, x2, y2], i) => {
                const mx = (x1 + x2) / 2;
                const my = Math.min(y1, y2) - 80;
                return (
                  <path
                    key={i}
                    d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
                    fill="none"
                    stroke="url(#routeGrad2)"
                    strokeWidth="1.2"
                    strokeDasharray="3 5"
                  />
                );
              })}

              {/* Pulses */}
              {pulses.map((p, i) => (
                <g key={i}>
                  <circle cx={p.cx} cy={p.cy} r="12" fill="#D9B36A" opacity="0.18">
                    <animate
                      attributeName="r"
                      values="5;16;5"
                      dur="2.6s"
                      begin={`${i * 0.2}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.4;0;0.4"
                      dur="2.6s"
                      begin={`${i * 0.2}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx={p.cx} cy={p.cy} r="3" fill="#D9B36A" />
                </g>
              ))}

              {/* Dubai HQ */}
              <g>
                <circle cx="600" cy="230" r="18" fill="#D9B36A" opacity="0.18">
                  <animate attributeName="r" values="9;24;9" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="600" cy="230" r="5" fill="#D9B36A" />
                <text
                  x="612"
                  y="222"
                  fill="#F5EFE3"
                  fontSize="11"
                  fontFamily="serif"
                  fontStyle="italic"
                >
                  Dubai · HQ
                </text>
              </g>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   CONTACT — editorial form
   ============================================================ */
const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    vertical: 'agro',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in name, email and your message.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to send');
      toast.success(data.message || 'Thanks! We will be in touch.');
      setForm({ name: '', email: '', phone: '', vertical: 'agro', message: '' });
    } catch (err) {
      toast.error(err.message || 'Something went wrong. Please email sales@vdsdxb.ae');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 bg-paper py-28 sm:py-36"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex items-center justify-between">
          <Eyebrow>VII — Contact</Eyebrow>
          <span className="hidden text-[11px] uppercase tracking-[0.28em] text-stone sm:inline">
            Begin a Conversation
          </span>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-14 lg:grid-cols-[1fr,1.1fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <h2
              id="contact-heading"
              className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-light leading-[1.05] tracking-[-0.015em] text-ink"
            >
              Let&apos;s build a trade flow{' '}
              <span className="italic text-gold-dark">together</span>.
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-[1.75] text-ink/75">
              Tell us about your sourcing or supply needs. We respond within twenty-four
              hours, every working day.
            </p>

            <div className="mt-10 space-y-6">
              <a
                href="tel:+971542695401"
                className="group flex items-start gap-5 border-b border-ink/15 pb-5 transition hover:border-gold"
              >
                <Phone className="mt-1 h-4 w-4 text-gold-dark" />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-stone">
                    Telephone
                  </div>
                  <div className="mt-1 font-display text-2xl text-ink transition group-hover:text-gold-dark">
                    +971 54 269 5401
                  </div>
                </div>
              </a>

              <a
                href="mailto:sales@vdsdxb.ae"
                className="group flex items-start gap-5 border-b border-ink/15 pb-5 transition hover:border-gold"
              >
                <Mail className="mt-1 h-4 w-4 text-gold-dark" />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-stone">
                    Electronic Mail
                  </div>
                  <div className="mt-1 font-display text-2xl text-ink transition group-hover:text-gold-dark">
                    sales@vdsdxb.ae
                  </div>
                </div>
              </a>

              <div className="flex items-start gap-5 border-b border-ink/15 pb-5">
                <MapPin className="mt-1 h-4 w-4 text-gold-dark" />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-stone">
                    Headquarters
                  </div>
                  <div className="mt-1 font-display text-2xl text-ink">
                    Dubai, United Arab Emirates
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="space-y-7 border-l border-ink/15 pl-0 lg:pl-12"
          >
            <FieldEditorial
              id="name"
              label="Full Name"
              required
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
            />
            <FieldEditorial
              id="email"
              label="Email Address"
              type="email"
              required
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
            />
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
              <FieldEditorial
                id="phone"
                label="Telephone"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
              />
              <div>
                <label
                  htmlFor="vertical"
                  className="block text-[10px] uppercase tracking-[0.28em] text-stone"
                >
                  Interest
                </label>
                <Select
                  value={form.vertical}
                  onValueChange={(v) => setForm({ ...form, vertical: v })}
                >
                  <SelectTrigger
                    id="vertical"
                    className="mt-2 h-auto rounded-none border-0 border-b border-ink/30 bg-transparent px-0 pb-2 font-display text-lg text-ink shadow-none focus:ring-0"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agro">Agro Trading</SelectItem>
                    <SelectItem value="healthcare">Healthcare Equipment</SelectItem>
                    <SelectItem value="ai">AI Agents & Automation</SelectItem>
                    <SelectItem value="general">General Inquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-[10px] uppercase tracking-[0.28em] text-stone"
              >
                Message *
              </label>
              <Textarea
                id="message"
                required
                rows={5}
                className="mt-2 resize-none rounded-none border-0 border-b border-ink/30 bg-transparent px-0 pb-2 font-display text-lg text-ink shadow-none placeholder:text-stone-light focus-visible:border-gold focus-visible:ring-0"
                placeholder="Volumes, target markets, timeline..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="group inline-flex items-center gap-3 bg-ink px-9 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-paper transition hover:bg-forest disabled:opacity-60"
            >
              {submitting ? 'Sending...' : 'Send enquiry'}
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>

            <p className="text-[11px] uppercase tracking-[0.18em] text-stone">
              By submitting, you agree to be contacted by VDS General Trading LLC.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const FieldEditorial = ({ id, label, type = 'text', value, onChange, required }) => (
  <div>
    <label htmlFor={id} className="block text-[10px] uppercase tracking-[0.28em] text-stone">
      {label} {required && '*'}
    </label>
    <Input
      id={id}
      type={type}
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-2 h-auto rounded-none border-0 border-b border-ink/30 bg-transparent px-0 pb-2 font-display text-lg text-ink shadow-none placeholder:text-stone-light focus-visible:border-gold focus-visible:ring-0"
    />
  </div>
);

/* ============================================================
   FOOTER — deep forest
   ============================================================ */
const Footer = () => {
  return (
    <footer
      className="relative bg-forest-deep py-16 text-paper grain"
      aria-label="Footer"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 border-b border-paper/15 pb-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="font-display text-3xl font-light tracking-tight text-paper">
              VDS<span className="text-gold-dark">.</span>
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.32em] text-paper/55">
              General Trading LLC
            </div>
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-paper/70">
              A UAE-registered Dubai trading house — building dependable trade corridors
              across three continents.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-paper/55">
              <span className="h-px w-8 bg-gold" />
              Dubai, UAE
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.28em] text-paper/50">
              Verticals
            </div>
            <ul className="mt-4 space-y-2 font-display text-base">
              <li>
                <a href="#agro" className="text-paper/85 hover:text-gold-light">
                  Agro Trading
                </a>
              </li>
              <li>
                <a href="#healthcare" className="text-paper/85 hover:text-gold-light">
                  Healthcare
                </a>
              </li>
              <li>
                <a
                  href={AI_EXTERNAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-paper/85 hover:text-gold-light"
                >
                  AI Agents
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.28em] text-paper/50">
              Company
            </div>
            <ul className="mt-4 space-y-2 font-display text-base">
              <li>
                <a href="#about" className="text-paper/85 hover:text-gold-light">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-paper/85 hover:text-gold-light">
                  Contact
                </a>
              </li>
              <li>
                <a href="/sitemap.xml" className="text-paper/85 hover:text-gold-light">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.28em] text-paper/50">
              Contact
            </div>
            <ul className="mt-4 space-y-2 font-display text-base">
              <li>
                <a href="tel:+971542695401" className="text-paper/85 hover:text-gold-light">
                  +971 54 269 5401
                </a>
              </li>
              <li>
                <a href="mailto:sales@vdsdxb.ae" className="text-paper/85 hover:text-gold-light">
                  sales@vdsdxb.ae
                </a>
              </li>
              <li className="text-paper/85">Dubai · UAE</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 text-[11px] uppercase tracking-[0.22em] text-paper/45 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} VDS General Trading LLC</div>
          <div className="italic">All rights reserved · Dubai, UAE</div>
        </div>
      </div>
    </footer>
  );
};

/* ============================================================
   APP
   ============================================================ */
const App = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-paper">
      <Hero />
      <About />
      <Verticals />
      <Agro />
      <Healthcare />
      <WhyChoose />
      <GlobalReach />
      <Contact />
      <Footer />
    </main>
  );
};

export default App;
