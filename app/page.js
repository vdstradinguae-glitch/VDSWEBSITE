'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Check,
  Sprout,
  HeartPulse,
  Bot,
  Search,
  Boxes,
  Ship,
  ShieldCheck,
  Globe2,
  Building2,
  Award,
  Quote,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  PhoneCall,
} from 'lucide-react';
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
import GlobeHero from '@/components/GlobeHero';

const AI_EXTERNAL_URL = 'https://www.talkbotagent.com';

/* =========================================================
   TOP UTILITY BAR
   ========================================================= */
const TopBar = () => (
  <div className="hidden border-b border-navy-200 bg-white text-[12px] text-navy-600 md:block" suppressHydrationWarning>
    <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-2.5 lg:px-10" suppressHydrationWarning>
      <div className="flex items-center gap-6" suppressHydrationWarning>
        <a href="mailto:sales@vdsdxb.ae" className="flex items-center gap-2 hover:text-navy" suppressHydrationWarning>
          <Mail className="h-3.5 w-3.5" />
          <span suppressHydrationWarning>sales@vdsdxb.ae</span>
        </a>
        <span className="h-3 w-px bg-navy-200" />
        <a href="tel:+971542695401" className="flex items-center gap-2 hover:text-navy" suppressHydrationWarning>
          <Phone className="h-3.5 w-3.5" />
          <span suppressHydrationWarning>+971 54 269 5401</span>
        </a>
      </div>
      <div className="flex items-center gap-5">
        <span className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5" /> Dubai, UAE
        </span>
        <span className="h-3 w-px bg-navy-200" />
        <div className="flex items-center gap-3 text-navy-500">
          <a href="#" aria-label="LinkedIn" className="hover:text-navy"><Linkedin className="h-3.5 w-3.5" /></a>
          <a href="#" aria-label="Twitter" className="hover:text-navy"><Twitter className="h-3.5 w-3.5" /></a>
          <a href="#" aria-label="Facebook" className="hover:text-navy"><Facebook className="h-3.5 w-3.5" /></a>
        </div>
      </div>
    </div>
  </div>
);

/* =========================================================
   NAVBAR — dark navy with pill CTA
   ========================================================= */
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
    { href: '#verticals', label: 'Verticals' },
    { href: '#agro', label: 'Agro' },
    { href: '#healthcare', label: 'Healthcare' },
    { href: AI_EXTERNAL_URL, label: 'AI Agents', external: true },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 bg-navy-900 transition-shadow ${
        scrolled ? 'shadow-xl shadow-navy-900/20' : ''
      }`}
      aria-label="Site header"
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
            <span className="font-extrabold text-navy-900">V</span>
          </div>
          <div className="leading-tight">
            <div className="text-lg font-bold text-white">VDS</div>
            <div className="text-[10px] uppercase tracking-mid text-navy-300">
              General Trading
            </div>
          </div>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noopener noreferrer' : undefined}
                className="group inline-flex items-center gap-1 text-[14px] font-medium text-white/85 transition hover:text-white"
              >
                {l.label}
                {l.external && <ArrowUpRight className="h-3.5 w-3.5 text-accent" />}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy-900 transition hover:bg-accent hover:text-white"
          >
            Book a Meeting
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="rounded-md p-2 text-white lg:hidden"
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
            className="overflow-hidden border-t border-navy-800 bg-navy-900 lg:hidden"
          >
            <ul className="px-6 py-3">
              {links.map((l) => (
                <li key={l.label} className="border-b border-navy-800 last:border-0">
                  <a
                    href={l.href}
                    target={l.external ? '_blank' : undefined}
                    rel={l.external ? 'noopener noreferrer' : undefined}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-4 text-white"
                  >
                    <span>{l.label}</span>
                    <ArrowUpRight className={`h-4 w-4 ${l.external ? 'text-accent' : 'text-navy-400'}`} />
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-navy-900"
                >
                  Book a Meeting
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

/* =========================================================
   COMMON UI
   ========================================================= */
const Eyebrow = ({ children, tone = 'dark' }) => (
  <div
    className={`inline-flex items-center gap-2 rounded-md border px-4 py-2 text-[11px] font-bold uppercase tracking-mid ${
      tone === 'dark'
        ? 'border-navy-200 bg-white text-navy-900'
        : 'border-white/15 bg-white/5 text-white/85'
    }`}
  >
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2L14.39 8.26L21 9.27L16 13.97L17.5 20.5L12 17.27L6.5 20.5L8 13.97L3 9.27L9.61 8.26L12 2Z" fill="#F59E0B" />
    </svg>
    {children}
  </div>
);

const PillBtn = ({ children, href, variant = 'dark', external, className = '' }) => {
  const base =
    'group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition';
  const styles = {
    dark: 'bg-navy-900 text-white hover:bg-accent hover:text-white',
    light: 'bg-white text-navy-900 hover:bg-accent hover:text-white border border-navy-200',
    accent: 'bg-accent text-white hover:bg-navy-900',
    outline: 'border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white',
  };
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
};

const SectionTitle = ({ eyebrow, title, accent, center, tone = 'dark', children }) => (
  <div className={center ? 'mx-auto max-w-3xl text-center' : ''}>
    <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
    <h2
      className={`mt-5 text-[clamp(2rem,4.4vw,3.4rem)] font-extrabold leading-[1.1] text-spread ${
        tone === 'dark' ? 'text-navy-900' : 'text-white'
      }`}
    >
      {title}
      {accent && (
        <>
          {' '}
          <span className="text-accent">{accent}</span>
        </>
      )}
    </h2>
    {children}
  </div>
);

/* =========================================================
   HERO — Bold heading + image collage with floating stat
   ========================================================= */
const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden bg-white pt-10 lg:pt-16">
      {/* Decorative background grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_10%_0%,#FEF3C7,transparent_60%)]" />
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[520px] w-[520px] rounded-full bg-navy-100/60 blur-3xl" />

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-6 pb-24 lg:grid-cols-[1.05fr,1fr] lg:gap-20 lg:px-10 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <Eyebrow>Trading Excellence Since Dubai</Eyebrow>
          <h1 className="mt-6 text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.02] text-navy-900 text-spread">
            Trading <span className="text-accent">Excellence</span>
            <br /> Across Continents
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-600">
            From wholesale agricultural commodities and MOHAP-compliant medical equipment
            to AI-powered automation agents — VDS General Trading LLC connects producers,
            hospitals and enterprises across the UAE, GCC, Europe and the United States.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <PillBtn href="#verticals" variant="dark">
              View Verticals
            </PillBtn>
            <a
              href="tel:+971542695401"
              className="group inline-flex items-center gap-3 text-sm font-semibold text-navy-900"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-navy-200 transition group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                <PhoneCall className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[11px] font-medium uppercase tracking-mid text-navy-500">
                  Call us anytime
                </span>
                <span className="block text-base">+971 54 269 5401</span>
              </span>
            </a>
          </div>

          {/* trust strip */}
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-navy-100 pt-8 text-[12px] uppercase tracking-mid text-navy-500">
            <div className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> UAE-Registered LLC</div>
            <div className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> MOHAP-Compliant</div>
            <div className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> Jebel Ali Logistics</div>
          </div>
        </motion.div>

        {/* 3D Interactive Globe with trade routes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[640px]">
            <GlobeHero />

            {/* Floating "UAE Registered LLC" badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.8 }}
              className="absolute -left-2 top-8 z-10 hidden items-center gap-4 rounded-2xl bg-white p-4 shadow-2xl shadow-navy-900/15 ring-1 ring-navy-100 sm:flex"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-mid text-navy-500">UAE</div>
                <div className="text-base font-extrabold text-navy-900">Registered LLC</div>
              </div>
            </motion.div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1 }}
              className="absolute -right-2 bottom-20 z-10 hidden rounded-2xl bg-navy-900 p-5 text-white shadow-2xl shadow-navy-900/30 sm:block"
            >
              <div className="text-4xl font-extrabold leading-none">
                20<span className="text-accent">+</span>
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-mid text-navy-300">
                Active Markets
              </div>
              <div className="text-[11px] text-navy-400">UAE · GCC · Europe · US</div>
            </motion.div>

            {/* "Drag to rotate" hint */}
            <div className="pointer-events-none absolute right-4 top-4 hidden items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-mid text-navy-600 shadow-sm ring-1 ring-navy-100 sm:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              Drag to rotate
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
   ABOUT — image stack with floating stat + content right
   ========================================================= */
const About = () => {
  return (
    <section id="about" className="relative scroll-mt-20 bg-offwhite py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-[2rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1661756977826-c66970f2a2cb?w=600&q=85"
                alt="Cargo port operations at golden hour"
                className="h-[420px] w-full object-cover"
              />
            </div>
            <div className="mt-12 overflow-hidden rounded-[2rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=600&q=85"
                alt="Medical equipment supply"
                className="h-[420px] w-full object-cover"
              />
            </div>
          </div>
          {/* Floating stat */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-2xl bg-navy-900 p-6 text-white shadow-2xl shadow-navy-900/30">
            <div className="text-5xl font-extrabold leading-none text-accent">III</div>
            <div className="mt-2 text-[11px] uppercase tracking-mid text-navy-300">Business Verticals</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Eyebrow>About VDS Trading</Eyebrow>
          <h2 className="mt-5 text-[clamp(2rem,4.4vw,3.4rem)] font-extrabold leading-[1.1] text-navy-900 text-spread">
            A Dubai trading house{' '}
            <span className="text-accent">built for global commerce.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-navy-600">
            VDS General Trading LLC is a UAE-registered limited liability company,
            headquartered in Dubai. We operate at the intersection of physical commodities,
            regulated medical supply chains, and emerging AI technology — giving partners
            a single, accountable, multi-vertical operator.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { icon: Building2, t: 'UAE-Registered', d: 'Accountable Dubai LLC entity.' },
              { icon: Globe2, t: 'Global Reach', d: 'Active trade in 3 continents.' },
              { icon: ShieldCheck, t: 'Compliance First', d: 'MOHAP-aligned supply.' },
              { icon: Ship, t: 'Jebel Ali', d: 'Consolidation & re-export.' },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="flex items-start gap-4 rounded-2xl border border-navy-100 bg-white p-5">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-navy-900">{t}</div>
                  <div className="text-sm text-navy-500">{d}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <PillBtn href="#contact" variant="dark">About Us</PillBtn>
            <a href="tel:+971542695401" className="group flex items-center gap-3 text-navy-900">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white">
                <PhoneCall className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs text-navy-500">Call us anytime</div>
                <div className="font-bold">+971 54 269 5401</div>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
   VERTICALS — Invena-style horizontal list rows
   ========================================================= */
const Verticals = () => {
  const items = [
    {
      key: 'agro',
      icon: Sprout,
      title: 'Agro Trading',
      desc: 'Wholesale and re-export of onion, potato, garlic and broader agricultural commodities to the UAE, GCC, Europe and United States markets.',
      href: '#agro',
      external: false,
    },
    {
      key: 'healthcare',
      icon: HeartPulse,
      title: 'Healthcare Equipment',
      desc: 'MOHAP-compliant medical equipment trading and distribution to hospitals, clinics and medical distributors across the UAE.',
      href: '#healthcare',
      external: false,
    },
    {
      key: 'ai',
      icon: Bot,
      title: 'AI Agents & Automation',
      desc: 'AI-powered voice and email automation that runs your inbound calls, leads and customer operations — 24/7.',
      href: AI_EXTERNAL_URL,
      external: true,
    },
  ];

  return (
    <section id="verticals" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionTitle eyebrow="Our Verticals" title="Three pillars," accent="one trusted partner." center />
        <p className="mx-auto mt-5 max-w-2xl text-center text-base text-navy-500">
          Each vertical operates with its own dedicated team — while sharing the same UAE
          governance, logistics network and global reach.
        </p>

        <div className="mt-14 space-y-4">
          {items.map((it, i) => (
            <motion.a
              key={it.key}
              href={it.href}
              target={it.external ? '_blank' : undefined}
              rel={it.external ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative grid grid-cols-1 items-center gap-6 overflow-hidden rounded-3xl bg-offwhite p-6 transition-colors duration-500 hover:bg-navy-900 sm:grid-cols-[auto,1.4fr,2fr,auto] sm:gap-8 sm:p-8"
            >
              {/* decorative pattern on hover */}
              <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:block">
                <svg viewBox="0 0 400 200" className="h-full w-full">
                  {Array.from({ length: 6 }).map((_, r) =>
                    Array.from({ length: 12 }).map((_, c) => (
                      <rect
                        key={`${r}-${c}`}
                        x={c * 36 + 6}
                        y={r * 36 + 6}
                        width="2"
                        height="2"
                        fill="#F59E0B"
                        opacity="0.4"
                      />
                    ))
                  )}
                </svg>
              </div>

              <div className="flex h-20 w-20 flex-none items-center justify-center rounded-2xl bg-white text-navy-900 transition-colors duration-500 group-hover:bg-accent group-hover:text-white">
                <it.icon className="h-9 w-9" />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold uppercase tracking-mid text-navy-500 transition group-hover:text-accent">
                  {`0${i + 1} · Vertical`}
                </span>
                <h3 className="text-2xl font-extrabold text-navy-900 transition-colors duration-500 group-hover:text-white sm:text-3xl">
                  {it.title}
                </h3>
              </div>

              <p className="max-w-xl text-base leading-relaxed text-navy-600 transition-colors duration-500 group-hover:text-navy-200">
                {it.desc}
              </p>

              <div className="flex flex-none items-center justify-end">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-white transition-all duration-500 group-hover:bg-accent group-hover:-rotate-12">
                  {it.external ? <ArrowUpRight className="h-6 w-6" /> : <ArrowRight className="h-6 w-6" />}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   CTA BANNER — Dark navy with photo background
   ========================================================= */
const CtaBanner = () => {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 text-white lg:py-24">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1605732562742-3023a888e56e?w=1600&q=85')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-900/30" />
      <div className="relative mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 px-6 lg:flex-row lg:items-center lg:px-10">
        <h3 className="max-w-3xl text-[clamp(1.6rem,3.5vw,2.6rem)] font-extrabold leading-tight text-spread">
          Let&apos;s discuss how we can move your{' '}
          <span className="text-accent">commodity, equipment</span> or AI requirement
          forward.
        </h3>
        <a
          href="#contact"
          className="group inline-flex flex-none items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold text-navy-900 transition hover:bg-accent hover:text-white"
        >
          Let&apos;s Work Together
          <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  );
};

/* =========================================================
   PROCESS — Easy 3 steps
   ========================================================= */
const Process = () => {
  const steps = [
    { icon: Search, n: '01', t: 'Inquiry & Discovery', d: 'Tell us your requirement, target market, volume and timeline. We respond in 24h.' },
    { icon: Boxes, n: '02', t: 'Sourcing & Compliance', d: 'We source, grade, document and clear — agro produce or medical equipment.' },
    { icon: Ship, n: '03', t: 'Delivery & Re-Export', d: 'Consolidation through Jebel Ali, shipped to UAE, GCC, Europe or United States destinations.' },
  ];
  return (
    <section className="bg-offwhite py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionTitle eyebrow="How We Work" title="Three steps," accent="from inquiry to delivery." center />
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative rounded-3xl bg-white p-8 shadow-sm ring-1 ring-navy-100"
            >
              <div className="absolute -right-3 -top-3 rounded-xl bg-accent px-3 py-1 text-xs font-bold text-white">
                Step {s.n}
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-900 text-white">
                <s.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-2xl font-extrabold text-navy-900">{s.t}</h3>
              <p className="mt-3 text-navy-600">{s.d}</p>
              {i < steps.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden h-px w-8 -translate-y-1/2 bg-navy-200 md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   AGRO DETAIL — big image left + dark navy panel right (project-style)
   ========================================================= */
const AgroDetail = () => {
  const products = ['Onion', 'Potato', 'Garlic', 'Ginger', 'Pulses', 'Spices', 'Fresh Produce', 'Dry Grocery'];
  const markets = ['UAE', 'GCC', 'Europe', 'United States'];
  return (
    <section id="agro" className="scroll-mt-24 bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionTitle eyebrow="Agro Vertical · 01" title="Wholesale & re-export of" accent="agricultural commodities." center />
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden rounded-[2.5rem]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=1100&q=85"
              alt="Wholesale agricultural commodities for export"
              className="h-full max-h-[640px] w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative overflow-hidden rounded-[2.5rem] bg-navy-900 p-10 text-white lg:p-12"
          >
            <Sprout className="h-10 w-10 text-accent" />
            <h3 className="mt-6 text-3xl font-extrabold sm:text-4xl">
              Premium agro commodities,{' '}
              <span className="text-accent">Dubai-consolidated.</span>
            </h3>
            <p className="mt-4 text-navy-300">
              We supply distributors, retailers and re-exporters with consistent volumes,
              transparent grading and Jebel Ali consolidation — under a single accountable
              contract.
            </p>

            <div className="mt-8">
              <div className="mb-3 text-[11px] uppercase tracking-mid text-navy-400">Products</div>
              <div className="flex flex-wrap gap-2">
                {products.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-3 text-[11px] uppercase tracking-mid text-navy-400">Markets</div>
              <div className="flex flex-wrap gap-2">
                {markets.map((m) => (
                  <span key={m} className="rounded-full bg-accent/15 px-4 py-1.5 text-sm text-accent">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <PillBtn href="#contact" variant="accent">Request Agro Quote</PillBtn>
            </div>

            {/* decorative dot pattern */}
            <div className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   HEALTHCARE DETAIL — mirrored
   ========================================================= */
const HealthcareDetail = () => {
  const categories = ['Diagnostic Equipment', 'Patient Monitoring', 'Surgical Instruments', 'Hospital Furniture', 'Consumables', 'Imaging Devices', 'Lab Equipment', 'Rehabilitation'];
  const customers = ['Hospitals', 'Clinics', 'Polyclinics', 'Pharmacies', 'Distributors'];
  return (
    <section id="healthcare" className="scroll-mt-24 bg-offwhite py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionTitle eyebrow="Healthcare Vertical · 02" title="MOHAP-compliant" accent="medical equipment supply." center />
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="relative order-2 overflow-hidden rounded-[2.5rem] bg-navy-900 p-10 text-white lg:order-1 lg:p-12"
          >
            <HeartPulse className="h-10 w-10 text-accent" />
            <h3 className="mt-6 text-3xl font-extrabold sm:text-4xl">
              Regulated medical equipment{' '}
              <span className="text-accent">trading & distribution.</span>
            </h3>
            <p className="mt-4 text-navy-300">
              We supply hospitals, clinics and distributors across the UAE — with
              documentation, traceability and full adherence to UAE Ministry of Health
              regulations.
            </p>

            <div className="mt-8">
              <div className="mb-3 text-[11px] uppercase tracking-mid text-navy-400">Equipment Categories</div>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <div
                    key={c}
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  >
                    <Check className="h-4 w-4 flex-none text-accent" /> {c}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-3 text-[11px] uppercase tracking-mid text-navy-400">Customers</div>
              <div className="flex flex-wrap gap-2">
                {customers.map((c) => (
                  <span key={c} className="rounded-full bg-accent/15 px-4 py-1.5 text-sm text-accent">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <PillBtn href="#contact" variant="accent">Request Catalog</PillBtn>
            </div>
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="order-1 overflow-hidden rounded-[2.5rem] lg:order-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1100&q=85"
              alt="MOHAP-compliant medical equipment in modern hospital"
              className="h-full max-h-[640px] w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   MARKETS STRIP — marquee
   ========================================================= */
const Markets = () => {
  const items = [
    'United Arab Emirates',
    'Saudi Arabia',
    'Oman',
    'Kuwait',
    'Qatar',
    'Bahrain',
    'United States',
    'United Kingdom',
    'Germany',
    'France',
    'Netherlands',
    'Italy',
    'Spain',
    'Belgium',
  ];
  return (
    <section className="border-y border-navy-100 bg-white py-12">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-6 flex items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-mid text-navy-500">
          <span className="h-px w-12 bg-navy-200" />
          Markets we serve
          <span className="h-px w-12 bg-navy-200" />
        </div>
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee gap-12">
            {[...items, ...items].map((m, i) => (
              <div key={i} className="flex items-center gap-3 whitespace-nowrap">
                <Globe2 className="h-5 w-5 text-accent" />
                <span className="text-lg font-bold text-navy-700">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   WHY VDS — pricing-style 3-column cards w/ floating tags
   ========================================================= */
const WhyVDS = () => {
  const cards = [
    {
      tag: 'Trust',
      title: 'UAE-Registered Entity',
      bullets: [
        'Compliant Dubai LLC',
        'Transparent contracting',
        'UAE-banked invoicing',
        'Auditable supply chain',
        'English & Arabic teams',
      ],
    },
    {
      tag: 'Scale',
      title: 'Tri-Continental Reach',
      bullets: [
        'UAE & GCC corridors',
        'European trade lanes',
        'United States flows',
        'Direct & FOB origins',
        'Jebel Ali consolidation',
      ],
      featured: true,
    },
    {
      tag: 'Standard',
      title: 'Compliance Forward',
      bullets: [
        'MOHAP-aligned imports',
        'Documented agro grades',
        'Full traceability',
        'In-house customs',
        'Regulated re-export',
      ],
    },
  ];
  return (
    <section className="bg-offwhite py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionTitle eyebrow="Why VDS" title="Built on trust." accent="Engineered for trade." center />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`relative rounded-3xl p-8 ring-1 ${
                c.featured
                  ? 'bg-navy-900 text-white ring-navy-900'
                  : 'bg-white text-navy-900 ring-navy-100'
              }`}
            >
              {/* Floating dark tag (like pricing table /month $) */}
              <div
                className={`absolute -top-6 left-6 inline-flex flex-col rounded-2xl px-5 py-3 shadow-lg ${
                  c.featured ? 'bg-accent text-white' : 'bg-navy-900 text-white'
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-mid opacity-80">Pillar</span>
                <span className="text-lg font-extrabold leading-none">{c.tag}</span>
              </div>

              <div className="pt-6">
                <h3 className={`text-2xl font-extrabold ${c.featured ? 'text-white' : 'text-navy-900'}`}>
                  {c.title}
                </h3>
                <ul className="mt-6 space-y-3">
                  {c.bullets.map((b) => (
                    <li key={b} className={`flex items-start gap-3 text-sm ${c.featured ? 'text-navy-200' : 'text-navy-600'}`}>
                      <span className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full ${c.featured ? 'bg-accent text-white' : 'bg-accent/20 text-accent'}`}>
                        <Check className="h-3 w-3" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <a
                    href="#contact"
                    className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                      c.featured
                        ? 'bg-white text-navy-900 hover:bg-accent hover:text-white'
                        : 'bg-navy-900 text-white hover:bg-accent'
                    }`}
                  >
                    Talk to us
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   TESTIMONIALS — image left + quote right with controls
   ========================================================= */
const Testimonials = () => {
  const items = [
    {
      name: 'Karim Al-Hassan',
      role: 'Procurement Head · Regional Distributor, Riyadh',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85',
      quote:
        'VDS handled our entire onion sourcing pipeline out of Dubai for two seasons. Grading was consistent, paperwork was clean, and the team responded around the clock. A genuinely professional trading partner.',
    },
    {
      name: 'Dr. Reem Al-Mansoori',
      role: 'Biomedical Director · Private Hospital Group, UAE',
      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=85',
      quote:
        'Their MOHAP documentation discipline is exactly what a hospital chain needs. We expanded our patient-monitoring fleet through VDS with full traceability — and zero compliance friction.',
    },
    {
      name: 'James Whitmore',
      role: 'Procurement Lead · Wholesale Importers, London',
      img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=85',
      quote:
        'Reliable container flow into Europe is rare. VDS treats every shipment as accountable — consistent grading, on-time delivery, and that is why we keep coming back.',
    },
  ];
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((i) => (i + 1) % items.length);
  const prev = () => setIdx((i) => (i - 1 + items.length) % items.length);
  const t = items[idx];

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionTitle eyebrow="Testimonials" title="What partners" accent="say about us." center />

        <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr,1.5fr] lg:gap-16">
          <motion.div
            key={t.img}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-[2.5rem]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.img} alt={t.name} className="h-[480px] w-full object-cover" />
            <div className="absolute bottom-6 left-6 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-navy-100">
              <Quote className="h-6 w-6 text-accent" />
            </div>
          </motion.div>

          <motion.div
            key={t.name}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Quote className="h-10 w-10 text-accent" />
            <p className="mt-4 text-2xl font-medium leading-snug text-navy-900 sm:text-3xl">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-8">
              <div className="text-lg font-extrabold text-navy-900">{t.name}</div>
              <div className="text-sm text-navy-500">{t.role}</div>
            </div>

            <div className="mt-10 flex items-center gap-3">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-navy-200 text-navy-700 transition hover:border-accent hover:bg-accent hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-white transition hover:bg-accent"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <span className="ml-4 text-sm font-semibold text-navy-500">
                {String(idx + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   CONTACT — Request a free quote form
   ========================================================= */
const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', vertical: 'agro', message: '' });
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
    <section id="contact" className="scroll-mt-24 bg-offwhite py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 lg:grid-cols-[1fr,1.1fr] lg:gap-20 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Eyebrow>Make an Inquiry</Eyebrow>
          <h2 className="mt-5 text-[clamp(2rem,4.4vw,3.4rem)] font-extrabold leading-[1.1] text-navy-900 text-spread">
            Let&apos;s build a <span className="text-accent">trade flow</span> together.
          </h2>
          <p className="mt-5 max-w-md text-navy-600">
            Tell us about your sourcing or supply requirement. Our team responds within
            24 hours.
          </p>

          <div className="mt-10 space-y-4">
            <a
              href="tel:+971542695401"
              className="group flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-5 transition hover:border-accent"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent transition group-hover:bg-accent group-hover:text-white">
                <Phone className="h-6 w-6" />
              </span>
              <div>
                <div className="text-xs font-bold uppercase tracking-mid text-navy-500">Phone</div>
                <div className="text-lg font-extrabold text-navy-900">+971 54 269 5401</div>
              </div>
            </a>
            <a
              href="mailto:sales@vdsdxb.ae"
              className="group flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-5 transition hover:border-accent"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent transition group-hover:bg-accent group-hover:text-white">
                <Mail className="h-6 w-6" />
              </span>
              <div>
                <div className="text-xs font-bold uppercase tracking-mid text-navy-500">Email</div>
                <div className="text-lg font-extrabold text-navy-900">sales@vdsdxb.ae</div>
              </div>
            </a>
            <div className="flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-5">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                <MapPin className="h-6 w-6" />
              </span>
              <div>
                <div className="text-xs font-bold uppercase tracking-mid text-navy-500">Location</div>
                <div className="text-lg font-extrabold text-navy-900">Dubai, United Arab Emirates</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-navy-100 sm:p-10"
        >
          <h3 className="text-2xl font-extrabold text-navy-900">Request a free quote</h3>
          <p className="mt-2 text-sm text-navy-500">We&apos;ll respond within 24 hours.</p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FieldBox id="name" label="Full Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <FieldBox id="email" type="email" label="Email *" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            <FieldBox id="phone" label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
            <div>
              <label htmlFor="vertical" className="mb-1.5 block text-xs font-bold uppercase tracking-mid text-navy-500">
                Interest
              </label>
              <Select value={form.vertical} onValueChange={(v) => setForm({ ...form, vertical: v })}>
                <SelectTrigger id="vertical" className="h-12 rounded-xl border-navy-200 bg-white text-navy-900">
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
          <div className="mt-4">
            <label htmlFor="message" className="mb-1.5 block text-xs font-bold uppercase tracking-mid text-navy-500">
              Message *
            </label>
            <Textarea
              id="message"
              required
              rows={5}
              className="resize-none rounded-xl border-navy-200 bg-white text-navy-900"
              placeholder="Volumes, target markets, timeline..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="group mt-6 inline-flex items-center gap-3 rounded-full bg-navy-900 px-8 py-4 text-sm font-bold text-white transition hover:bg-accent disabled:opacity-60"
          >
            {submitting ? 'Submitting...' : 'Submit Message'}
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </motion.form>
      </div>
    </section>
  );
};

const FieldBox = ({ id, label, type = 'text', value, onChange }) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-xs font-bold uppercase tracking-mid text-navy-500">
      {label}
    </label>
    <Input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-12 rounded-xl border-navy-200 bg-white text-navy-900"
    />
  </div>
);

/* =========================================================
   NEWSLETTER + READY TO WORK STRIP
   ========================================================= */
const Newsletter = () => {
  const [email, setEmail] = useState('');
  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-8 rounded-[2.5rem] bg-navy-900 px-8 py-12 lg:grid-cols-2 lg:gap-12 lg:px-14 lg:py-16">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-mid text-accent">
            Stay In Touch
          </div>
          <h3 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl text-spread">
            Ready to <span className="text-accent">work with us?</span>
          </h3>
          <p className="mt-3 max-w-md text-navy-300">
            Subscribe for monthly updates on commodity flows, healthcare procurement
            insights, and trade corridor news.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!email) return;
            toast.success('Subscribed! We\'ll be in touch.');
            setEmail('');
          }}
          className="flex w-full items-center gap-2 rounded-full bg-white p-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="min-w-0 flex-1 bg-transparent px-5 py-3 text-navy-900 outline-none placeholder:text-navy-400"
          />
          <button
            type="submit"
            className="group inline-flex flex-none items-center gap-2 rounded-full bg-navy-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-accent"
          >
            Subscribe
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
};

/* =========================================================
   FOOTER
   ========================================================= */
const Footer = () => {
  return (
    <footer className="bg-navy-950 pt-16 text-white">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <a href="#top" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                <span className="font-extrabold text-navy-900">V</span>
              </div>
              <div>
                <div className="text-xl font-bold">VDS</div>
                <div className="text-[10px] uppercase tracking-mid text-navy-400">
                  General Trading LLC
                </div>
              </div>
            </a>
            <p className="mt-6 max-w-sm text-sm text-navy-300">
              A UAE-registered Dubai trading house — building dependable trade corridors
              across the UAE, GCC, Europe and the United States, across three carefully chosen
              verticals.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Linkedin, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/85 transition hover:border-accent hover:bg-accent hover:text-white"
                  aria-label="social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="text-sm font-bold uppercase tracking-mid text-white">Verticals</div>
            <ul className="mt-5 space-y-3 text-sm text-navy-300">
              <li><a href="#agro" className="hover:text-accent">Agro Trading</a></li>
              <li><a href="#healthcare" className="hover:text-accent">Healthcare</a></li>
              <li>
                <a href={AI_EXTERNAL_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-accent">
                  AI Agents <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="text-sm font-bold uppercase tracking-mid text-white">Company</div>
            <ul className="mt-5 space-y-3 text-sm text-navy-300">
              <li><a href="#about" className="hover:text-accent">About</a></li>
              <li><a href="#contact" className="hover:text-accent">Contact</a></li>
              <li><a href="/sitemap.xml" className="hover:text-accent">Sitemap</a></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-sm font-bold uppercase tracking-mid text-white">Get In Touch</div>
            <ul className="mt-5 space-y-3 text-sm text-navy-300">
              <li><a href="tel:+971542695401" className="hover:text-accent">+971 54 269 5401</a></li>
              <li><a href="mailto:sales@vdsdxb.ae" className="hover:text-accent">sales@vdsdxb.ae</a></li>
              <li>Dubai, United Arab Emirates</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 py-6 text-xs text-navy-400 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} VDS General Trading LLC. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-accent">About</a>
            <a href="#contact" className="hover:text-accent">Contact</a>
            <a href="/sitemap.xml" className="hover:text-accent">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* =========================================================
   APP
   ========================================================= */
const App = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white">
      <TopBar />
      <Nav />
      <Hero />
      <About />
      <Verticals />
      <CtaBanner />
      <Process />
      <AgroDetail />
      <HealthcareDetail />
      <Markets />
      <WhyVDS />
      <Testimonials />
      <Contact />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default App;
