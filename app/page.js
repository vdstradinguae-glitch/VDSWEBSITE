'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Sprout,
  HeartPulse,
  Bot,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Globe2,
  ShieldCheck,
  Truck,
  Award,
  Building2,
  Menu,
  X,
  CheckCircle2,
  Sparkles,
  ChevronRight,
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
   3D HERO VISUAL — animated globe with orbiting vertical orbs
   ============================================================ */
const HeroVisual = () => {
  return (
    <div className="relative mx-auto h-[420px] w-[420px] max-w-full sm:h-[520px] sm:w-[520px]">
      {/* Glow */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25),transparent_60%)] blur-2xl" />

      {/* Rotating sphere */}
      <motion.div
        className="absolute inset-8 rounded-full border border-cyan-400/20"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(56,189,248,0.35), rgba(15,23,42,0.9) 60%, rgba(2,6,23,1))',
          boxShadow:
            'inset 0 0 80px rgba(56,189,248,0.25), 0 0 60px rgba(56,189,248,0.15)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        {/* meridian lines (SVG) */}
        <svg viewBox="0 0 200 200" className="h-full w-full opacity-50">
          <defs>
            <linearGradient id="gridg" x1="0" x2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.0" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          {[...Array(8)].map((_, i) => (
            <ellipse
              key={i}
              cx="100"
              cy="100"
              rx={100 - i * 12}
              ry="100"
              fill="none"
              stroke="url(#gridg)"
              strokeWidth="0.4"
            />
          ))}
          {[...Array(7)].map((_, i) => (
            <ellipse
              key={`h${i}`}
              cx="100"
              cy="100"
              rx="100"
              ry={(i + 1) * 14}
              fill="none"
              stroke="url(#gridg)"
              strokeWidth="0.3"
            />
          ))}
          {/* Continent-like dots */}
          {[
            [60, 70],
            [80, 65],
            [100, 80],
            [130, 70],
            [70, 110],
            [110, 120],
            [140, 130],
            [90, 140],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3" fill="#22d3ee" opacity="0.85" />
          ))}
        </svg>
      </motion.div>

      {/* Orbital rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border border-white/10"
          style={{
            transform: `rotateX(${65 + i * 8}deg) rotateZ(${i * 30}deg)`,
            transformStyle: 'preserve-3d',
          }}
          animate={{ rotateZ: [i * 30, i * 30 + 360] }}
          transition={{ duration: 30 + i * 10, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* Orbiting vertical badges */}
      <OrbitBadge
        delay={0}
        radius={210}
        speed={22}
        color="from-emerald-400 to-emerald-600"
        icon={<Sprout className="h-6 w-6 text-white" />}
        label="Agro"
      />
      <OrbitBadge
        delay={-7}
        radius={210}
        speed={22}
        color="from-cyan-400 to-blue-600"
        icon={<HeartPulse className="h-6 w-6 text-white" />}
        label="Health"
      />
      <OrbitBadge
        delay={-14}
        radius={210}
        speed={22}
        color="from-violet-500 to-fuchsia-600"
        icon={<Bot className="h-6 w-6 text-white" />}
        label="AI"
      />
    </div>
  );
};

const OrbitBadge = ({ delay, radius, speed, color, icon, label }) => {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ width: 0, height: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear', delay }}
    >
      <motion.div
        style={{ x: radius, y: 0 }}
        animate={{ rotate: -360 }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear', delay }}
        className="-translate-x-1/2 -translate-y-1/2"
      >
        <div
          className={`flex items-center gap-2 rounded-full bg-gradient-to-br ${color} px-4 py-2 shadow-2xl ring-1 ring-white/20 backdrop-blur`}
        >
          {icon}
          <span className="text-sm font-semibold text-white">{label}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ============================================================
   NAVBAR
   ============================================================ */
const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#about', label: 'About' },
    { href: '#agro', label: 'Agro Trading' },
    { href: '#healthcare', label: 'Healthcare' },
    {
      href: AI_EXTERNAL_URL,
      label: 'AI Agents',
      external: true,
    },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-[#050814]/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
      >
        <a href="#top" className="group flex items-center gap-2">
          <div className="relative h-9 w-9 overflow-hidden rounded-lg bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 p-[1.5px]">
            <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-[#050814] font-black text-white">
              V
            </div>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-wide text-white">VDS</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
              General Trading
            </span>
          </div>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noopener noreferrer' : undefined}
                className="group relative rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white"
              >
                {l.label}
                {l.external && (
                  <span className="ml-1 text-[10px] text-violet-400">↗</span>
                )}
                <span className="absolute inset-x-3 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button
            asChild
            className="rounded-full bg-white text-slate-900 hover:bg-slate-200"
          >
            <a href="#contact">Get a Quote</a>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="rounded-md p-2 text-slate-200 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-[#050814]/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.external ? '_blank' : undefined}
                    rel={l.external ? 'noopener noreferrer' : undefined}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-3 text-slate-200 hover:bg-white/5"
                  >
                    <span>{l.label}</span>
                    {l.external ? (
                      <span className="text-xs text-violet-400">External ↗</span>
                    ) : (
                      <ChevronRight className="h-4 w-4 opacity-50" />
                    )}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <Button
                  asChild
                  className="w-full rounded-full bg-white text-slate-900 hover:bg-slate-200"
                >
                  <a href="#contact" onClick={() => setOpen(false)}>
                    Get a Quote
                  </a>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

/* ============================================================
   HERO
   ============================================================ */
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate overflow-hidden pt-28 sm:pt-32"
      aria-label="Hero"
    >
      {/* Background glow grid */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_80%_30%,rgba(139,92,246,0.18),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_15%_70%,rgba(16,185,129,0.15),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pb-32">
        <motion.div style={{ y, opacity }} className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            UAE-Registered LLC · Dubai HQ · Serving 3 Continents
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Trading Excellence{' '}
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              Across Continents
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300"
          >
            From premium agricultural commodities and MOHAP-compliant medical equipment to
            next-generation AI automation agents — VDS General Trading LLC is your single
            partner for cross-border commerce out of Dubai.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button
              asChild
              size="lg"
              className="group rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-400"
            >
              <a href="#agro">
                <Sprout className="mr-2 h-4 w-4" /> Explore Agro
                <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="group rounded-full bg-cyan-500 text-white shadow-lg shadow-cyan-500/20 hover:bg-cyan-400"
            >
              <a href="#healthcare">
                <HeartPulse className="mr-2 h-4 w-4" /> Explore Healthcare
                <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="group rounded-full bg-violet-600 text-white shadow-lg shadow-violet-500/20 hover:bg-violet-500"
            >
              <a
                href={AI_EXTERNAL_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Bot className="mr-2 h-4 w-4" /> Explore AI Agents
                <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-10 grid max-w-md grid-cols-3 gap-4 text-sm"
          >
            <Stat number="3" label="Verticals" />
            <Stat number="20+" label="Countries Served" />
            <Stat number="24/7" label="Trade Support" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center"
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
};

const Stat = ({ number, label }) => (
  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 backdrop-blur">
    <div className="text-2xl font-bold text-white">{number}</div>
    <div className="text-xs text-slate-400">{label}</div>
  </div>
);

/* ============================================================
   ABOUT
   ============================================================ */
const About = () => {
  return (
    <section id="about" className="relative py-24 sm:py-32" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionLabel color="text-cyan-300">About VDS</SectionLabel>
        <div className="mt-4 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <h2
              id="about-heading"
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              A Dubai-rooted trading house{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                built for global commerce.
              </span>
            </h2>
            <p className="mt-6 text-lg text-slate-300">
              VDS General Trading LLC is a UAE-registered limited liability company,
              headquartered in Dubai. We operate at the intersection of physical commodities,
              regulated medical supply chains, and emerging AI technology — giving our
              partners a single, accountable, multi-vertical operator.
            </p>
            <p className="mt-4 text-slate-400">
              Our mission is to build dependable trade corridors between producers, hospitals,
              distributors, and enterprises across the GCC, Africa, and the CIS region. Our
              vision is to become the most trusted multi-vertical trading partner emerging
              from the Middle East.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: Building2, t: 'UAE-Registered LLC', d: 'Compliant, accountable entity headquartered in Dubai.' },
                { icon: Globe2, t: 'Global Reach', d: 'Active trade flows across GCC, Africa, and CIS markets.' },
                { icon: ShieldCheck, t: 'Regulatory Trust', d: 'MOHAP-aligned healthcare supply standards.' },
                { icon: Truck, t: 'Logistics Backbone', d: 'Re-export-ready operations through Jebel Ali.' },
              ].map(({ icon: Icon, t, d }) => (
                <div
                  key={t}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur transition hover:border-cyan-300/30 hover:bg-white/[0.06]"
                >
                  <Icon className="h-5 w-5 text-cyan-300" />
                  <div className="mt-3 font-semibold text-white">{t}</div>
                  <p className="mt-1 text-sm text-slate-400">{d}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-violet-500/20 mix-blend-screen" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80"
                alt="Dubai skyline at golden hour representing VDS General Trading's headquarters"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-[#0a1024]/90 p-5 shadow-2xl backdrop-blur sm:left-10 sm:right-auto sm:w-[260px]">
              <div className="text-xs uppercase tracking-widest text-cyan-300">
                Headquartered
              </div>
              <div className="mt-1 text-lg font-semibold text-white">Dubai, UAE</div>
              <div className="text-sm text-slate-400">
                Strategically positioned for tri-continental trade.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SectionLabel = ({ children, color = 'text-cyan-300' }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] ${color}`}
  >
    <span className="h-px w-8 bg-current opacity-60" />
    {children}
  </motion.div>
);

/* ============================================================
   THREE VERTICALS CARDS
   ============================================================ */
const Verticals = () => {
  const items = [
    {
      key: 'agro',
      icon: Sprout,
      title: 'Agro Trading',
      desc: 'Wholesale & re-export of onion, potato, garlic and broader agro commodities to GCC, Africa & CIS.',
      href: '#agro',
      external: false,
      accent: 'from-emerald-400 to-emerald-600',
      ring: 'group-hover:shadow-emerald-500/25',
      tag: 'Commodities',
    },
    {
      key: 'healthcare',
      icon: HeartPulse,
      title: 'Healthcare',
      desc: 'MOHAP-compliant medical equipment trading, supply & distribution across the UAE.',
      href: '#healthcare',
      external: false,
      accent: 'from-cyan-400 to-blue-600',
      ring: 'group-hover:shadow-cyan-500/25',
      tag: 'Regulated Supply',
    },
    {
      key: 'ai',
      icon: Bot,
      title: 'AI Agents & Automation',
      desc: 'AI-powered voice & email automation that handles your calls, leads, and customer ops 24/7.',
      href: AI_EXTERNAL_URL,
      external: true,
      accent: 'from-violet-500 to-fuchsia-600',
      ring: 'group-hover:shadow-violet-500/30',
      tag: 'AI Technology',
    },
  ];

  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="verticals-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Our Verticals</SectionLabel>
          <h2
            id="verticals-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Three pillars. One trusted partner.
          </h2>
          <p className="mt-4 text-slate-400">
            Each vertical operates with dedicated expertise, while sharing the same UAE
            governance, logistics network, and global reach.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.a
              key={it.key}
              href={it.href}
              target={it.external ? '_blank' : undefined}
              rel={it.external ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
              style={{ transformStyle: 'preserve-3d' }}
              className={`group relative block overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-8 backdrop-blur transition-shadow duration-500 hover:shadow-2xl ${it.ring}`}
            >
              <div
                className={`absolute -inset-px -z-10 rounded-3xl bg-gradient-to-br ${it.accent} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20`}
              />
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${it.accent} shadow-lg`}
                >
                  <it.icon className="h-7 w-7 text-white" />
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-widest text-slate-300">
                  {it.tag}
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-white">{it.title}</h3>
              <p className="mt-3 text-slate-400">{it.desc}</p>

              <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white">
                {it.external ? (
                  <>
                    Visit Talkbot Agent
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    <span className="text-xs text-violet-300">↗ external</span>
                  </>
                ) : (
                  <>
                    Learn more
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   AGRO DETAIL
   ============================================================ */
const Agro = () => {
  const products = ['Onion', 'Potato', 'Garlic', 'Ginger', 'Pulses', 'Spices', 'Fresh Produce', 'Dry Grocery'];
  const markets = ['GCC', 'East Africa', 'West Africa', 'CIS Region', 'South Asia'];
  return (
    <section
      id="agro"
      className="relative scroll-mt-20 border-y border-emerald-500/10 bg-gradient-to-b from-emerald-500/[0.04] via-transparent to-transparent py-24 sm:py-32"
      aria-labelledby="agro-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative overflow-hidden rounded-3xl border border-emerald-400/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=1200&q=80"
                alt="Wholesale agricultural commodities — onion, potato, garlic and fresh produce for export from Dubai"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 right-4 rounded-2xl border border-white/10 bg-[#0a1024]/90 p-5 shadow-xl backdrop-blur sm:right-10 sm:w-[280px]">
              <div className="text-xs uppercase tracking-widest text-emerald-300">
                Sourcing Strength
              </div>
              <div className="mt-1 text-lg font-semibold text-white">
                Direct farm & FOB origins
              </div>
              <div className="text-sm text-slate-400">
                Competitive pricing with reliable container flow.
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <SectionLabel color="text-emerald-300">Vertical · Agro Trading</SectionLabel>
            <h2
              id="agro-heading"
              className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Wholesale & re-export of premium{' '}
              <span className="bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                agricultural commodities.
              </span>
            </h2>
            <p className="mt-6 text-lg text-slate-300">
              We supply distributors, retailers, and re-exporters across the GCC, Africa
              and CIS markets with consistent volumes, transparent grading, and Dubai-based
              consolidation through Jebel Ali.
            </p>

            <div className="mt-8">
              <div className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Product Portfolio
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {products.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-sm text-emerald-100"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Markets Served
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {markets.map((m) => (
                  <span
                    key={m}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-slate-200"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="rounded-full bg-emerald-500 text-white hover:bg-emerald-400"
              >
                <a href="#contact">Request Agro Quote</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-emerald-400/30 bg-transparent text-emerald-100 hover:bg-emerald-500/10"
              >
                <a href="#contact">Become a Distributor</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   HEALTHCARE DETAIL
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
  const customers = ['Hospitals', 'Clinics', 'Polyclinics', 'Pharmacies', 'Medical Distributors'];

  return (
    <section
      id="healthcare"
      className="relative scroll-mt-20 border-y border-cyan-500/10 bg-gradient-to-b from-cyan-500/[0.04] via-transparent to-transparent py-24 sm:py-32"
      aria-labelledby="healthcare-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <SectionLabel color="text-cyan-300">Vertical · Healthcare</SectionLabel>
            <h2
              id="healthcare-heading"
              className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              MOHAP-compliant medical equipment{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                trading & distribution.
              </span>
            </h2>
            <p className="mt-6 text-lg text-slate-300">
              We supply hospitals, clinics, and distributors across the UAE with carefully
              sourced medical equipment, ensuring documentation, traceability, and adherence
              to UAE Ministry of Health & Prevention (MOHAP) regulations.
            </p>

            <div className="mt-8">
              <div className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Equipment Categories
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <div
                    key={c}
                    className="flex items-center gap-2 rounded-lg border border-cyan-400/10 bg-cyan-400/5 px-3 py-2 text-sm text-cyan-50"
                  >
                    <CheckCircle2 className="h-4 w-4 flex-none text-cyan-300" />
                    {c}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Target Customers
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {customers.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-slate-200"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="rounded-full bg-cyan-500 text-white hover:bg-cyan-400"
              >
                <a href="#contact">Request Equipment Catalog</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-cyan-400/30 bg-transparent text-cyan-100 hover:bg-cyan-500/10"
              >
                <a href="#contact">Partner With Us</a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&q=80"
                alt="Modern hospital operating room equipped with MOHAP-compliant medical equipment supplied in the UAE"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 left-4 rounded-2xl border border-white/10 bg-[#0a1024]/90 p-5 shadow-xl backdrop-blur sm:left-10 sm:w-[280px]">
              <div className="text-xs uppercase tracking-widest text-cyan-300">
                Compliance First
              </div>
              <div className="mt-1 text-lg font-semibold text-white">
                MOHAP-aligned supply
              </div>
              <div className="text-sm text-slate-400">
                Full traceability and regulated import handling.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   WHY CHOOSE VDS
   ============================================================ */
const WhyChoose = () => {
  const items = [
    {
      icon: Building2,
      t: 'UAE-Registered LLC',
      d: 'Accountable Dubai entity, transparent contracting, banking & invoicing.',
    },
    {
      icon: Award,
      t: 'Multi-Vertical Expertise',
      d: 'Agro, healthcare and AI under one operational roof.',
    },
    {
      icon: Truck,
      t: 'Global Logistics Network',
      d: 'Jebel Ali consolidation, full container & LCL flows.',
    },
    {
      icon: ShieldCheck,
      t: 'Regulatory Compliance',
      d: 'MOHAP-aligned healthcare imports & documented agro grades.',
    },
    {
      icon: Globe2,
      t: 'Tri-Continental Reach',
      d: 'Active corridors across GCC, Africa and CIS.',
    },
    {
      icon: Sparkles,
      t: 'Future-Ready',
      d: 'AI automation infused into our partner enablement.',
    },
  ];

  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="why-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Why Choose VDS</SectionLabel>
          <h2
            id="why-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Built on trust. Engineered for global trade.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, t, d }, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl transition group-hover:bg-cyan-400/20" />
              <Icon className="h-6 w-6 text-cyan-300" />
              <div className="mt-4 text-lg font-semibold text-white">{t}</div>
              <p className="mt-2 text-sm text-slate-400">{d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   GLOBAL REACH MAP
   ============================================================ */
const GlobalReach = () => {
  // Approx normalized SVG coordinates for our highlight regions
  const pulses = [
    { cx: 555, cy: 215, label: 'UAE · GCC', color: '#22d3ee' },
    { cx: 600, cy: 250, label: 'UAE · GCC', color: '#22d3ee' },
    { cx: 530, cy: 280, label: 'East Africa', color: '#34d399' },
    { cx: 510, cy: 320, label: 'Africa', color: '#34d399' },
    { cx: 470, cy: 300, label: 'West Africa', color: '#34d399' },
    { cx: 560, cy: 160, label: 'CIS', color: '#a78bfa' },
    { cx: 610, cy: 150, label: 'CIS', color: '#a78bfa' },
    { cx: 660, cy: 145, label: 'CIS', color: '#a78bfa' },
  ];

  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="reach-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Global Reach</SectionLabel>
          <h2
            id="reach-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Active trade corridors across three continents.
          </h2>
          <p className="mt-4 text-slate-400">
            We move product and expertise where it&apos;s needed most — fast, compliant, and reliable.
          </p>
        </div>

        <div className="relative mt-14 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-4 sm:p-8">
          <svg
            viewBox="0 0 1000 500"
            className="h-auto w-full"
            role="img"
            aria-label="World map showing VDS Trading active markets in UAE, GCC, Africa and CIS"
          >
            <defs>
              <radialGradient id="pulseGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white" stopOpacity="0.9" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Dotted world map (simplified) using deterministic procedural dots */}
            {Array.from({ length: 26 }).map((_, row) =>
              Array.from({ length: 56 }).map((_, col) => {
                const x = 30 + col * 17;
                const y = 30 + row * 17;
                // deterministic pseudo-random based on cell coords (stable SSR/CSR)
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
                    r="1.6"
                    fill="#1e293b"
                    opacity="0.9"
                  />
                );
              })
            )}

            {/* Trade arcs from Dubai (~600,230) */}
            {[
              [600, 230, 500, 310], // Africa
              [600, 230, 250, 280], // West Africa / Atlantic
              [600, 230, 620, 150], // CIS
              [600, 230, 800, 320], // Asia
            ].map(([x1, y1, x2, y2], i) => {
              const mx = (x1 + x2) / 2;
              const my = Math.min(y1, y2) - 80;
              return (
                <g key={i}>
                  <path
                    d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
                    fill="none"
                    stroke="url(#routeGrad)"
                    strokeWidth="1.5"
                    strokeDasharray="4 6"
                  />
                </g>
              );
            })}
            <defs>
              <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Pulsing market markers */}
            {pulses.map((p, i) => (
              <g key={i}>
                <circle cx={p.cx} cy={p.cy} r="14" fill={p.color} opacity="0.15">
                  <animate
                    attributeName="r"
                    values="6;18;6"
                    dur="2.4s"
                    begin={`${i * 0.2}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.4;0;0.4"
                    dur="2.4s"
                    begin={`${i * 0.2}s`}
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx={p.cx} cy={p.cy} r="4" fill={p.color} />
              </g>
            ))}

            {/* Dubai HQ */}
            <g>
              <circle cx="600" cy="230" r="20" fill="#22d3ee" opacity="0.2">
                <animate attributeName="r" values="10;28;10" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="600" cy="230" r="6" fill="#22d3ee" />
              <text x="612" y="225" fill="#e2e8f0" fontSize="13" fontWeight="700">
                Dubai · HQ
              </text>
            </g>
          </svg>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { c: 'bg-cyan-400', l: 'UAE & GCC' },
              { c: 'bg-emerald-400', l: 'Africa' },
              { c: 'bg-violet-400', l: 'CIS' },
              { c: 'bg-white', l: 'Dubai · HQ' },
            ].map((x) => (
              <div key={x.l} className="flex items-center gap-2 text-sm text-slate-300">
                <span className={`h-2.5 w-2.5 rounded-full ${x.c}`} />
                {x.l}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   CONTACT
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
      className="relative scroll-mt-20 py-24 sm:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Contact</SectionLabel>
            <h2
              id="contact-heading"
              className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Let&apos;s build a trade flow together.
            </h2>
            <p className="mt-4 text-slate-300">
              Tell us about your sourcing or supply needs. Our team responds within 24 hours.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="tel:+971542695401"
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-300/30 hover:bg-white/[0.06]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-slate-400">
                    Phone
                  </div>
                  <div className="text-lg font-semibold text-white">+971 54 269 5401</div>
                </div>
              </a>

              <a
                href="mailto:sales@vdsdxb.ae"
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-emerald-300/30 hover:bg-white/[0.06]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-slate-400">
                    Email
                  </div>
                  <div className="text-lg font-semibold text-white">sales@vdsdxb.ae</div>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-slate-400">
                    Location
                  </div>
                  <div className="text-lg font-semibold text-white">
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
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 backdrop-blur sm:p-8"
          >
            <div className="absolute -inset-px -z-10 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10 blur-xl" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-slate-300">
                  Full Name *
                </label>
                <Input
                  id="name"
                  required
                  className="mt-1 border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-slate-300">
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  className="mt-1 border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="phone" className="text-sm font-medium text-slate-300">
                  Phone
                </label>
                <Input
                  id="phone"
                  className="mt-1 border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                  placeholder="+971 ..."
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="vertical" className="text-sm font-medium text-slate-300">
                  Interest
                </label>
                <Select
                  value={form.vertical}
                  onValueChange={(v) => setForm({ ...form, vertical: v })}
                >
                  <SelectTrigger
                    id="vertical"
                    className="mt-1 border-white/10 bg-white/5 text-white"
                  >
                    <SelectValue placeholder="Select" />
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
            <div className="mt-4">
              <label htmlFor="message" className="text-sm font-medium text-slate-300">
                Message *
              </label>
              <Textarea
                id="message"
                required
                rows={5}
                className="mt-1 border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                placeholder="Tell us about your requirement, volumes, target markets..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              size="lg"
              className="mt-6 w-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 text-white shadow-lg shadow-cyan-500/20 hover:opacity-90"
            >
              {submitting ? 'Sending...' : 'Send Inquiry'}
              {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>

            <p className="mt-3 text-center text-xs text-slate-500">
              By submitting, you agree to be contacted by VDS General Trading LLC.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   FOOTER
   ============================================================ */
const Footer = () => {
  return (
    <footer
      className="relative border-t border-white/10 bg-[#040712] py-14"
      aria-label="Footer"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="relative h-9 w-9 overflow-hidden rounded-lg bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 p-[1.5px]">
                <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-[#040712] font-black text-white">
                  V
                </div>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-bold tracking-wide text-white">VDS</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  General Trading LLC
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm text-slate-400">
              UAE-registered trading house powering global agro exports, MOHAP-compliant
              healthcare supply, and next-generation AI automation.
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Verticals</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#agro" className="text-slate-400 hover:text-white">
                  Agro Trading
                </a>
              </li>
              <li>
                <a href="#healthcare" className="text-slate-400 hover:text-white">
                  Healthcare Equipment
                </a>
              </li>
              <li>
                <a
                  href={AI_EXTERNAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white"
                >
                  AI Agents ↗
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Company</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#about" className="text-slate-400 hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-400 hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="/sitemap.xml" className="text-slate-400 hover:text-white">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Contact</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>
                <a href="tel:+971542695401" className="hover:text-white">
                  +971 54 269 5401
                </a>
              </li>
              <li>
                <a href="mailto:sales@vdsdxb.ae" className="hover:text-white">
                  sales@vdsdxb.ae
                </a>
              </li>
              <li>Dubai, United Arab Emirates</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <div>
            © {new Date().getFullYear()} VDS General Trading LLC. All rights reserved.
          </div>
          <div>Dubai, UAE · UAE-Registered LLC</div>
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
    <main className="relative min-h-screen overflow-x-hidden bg-[#050814]">
      <Nav />
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
