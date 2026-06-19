import Link from 'next/link';

export const metadata = {
  title: 'Wholesale Agro Commodity Trading Dubai',
  description:
    'Wholesale agro commodity trading from Dubai: onion, potato, garlic, ginger, pulses & spices to UAE, GCC, Europe & US via Jebel Ali consolidation.',
  alternates: { canonical: 'https://vdsdxb.ae/agro-trading' },
  openGraph: {
    title: 'Wholesale Agro Commodity Trading Dubai',
    description: 'Wholesale agro commodity trading from Dubai to UAE, GCC, Europe & US. Onion, potato, garlic, ginger, pulses via Jebel Ali. VDS General Trading LLC.',
    url: 'https://vdsdxb.ae/agro-trading',
  },
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Agro Commodity Trading Dubai UAE',
  description: 'Wholesale and re-export of agricultural commodities from Dubai including onion, potato, garlic, ginger, pulses and spices to UAE, GCC, Europe and United States via Jebel Ali.',
  provider: { '@type': 'Organization', name: 'VDS General Trading LLC', url: 'https://vdsdxb.ae' },
  areaServed: [
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'Saudi Arabia' },
    { '@type': 'Country', name: 'Kuwait' },
    { '@type': 'Country', name: 'Qatar' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'Germany' },
  ],
  url: 'https://vdsdxb.ae/agro-trading',
};

export default function AgroTradingPage() {
  const products = [
    { name: 'Onion', origins: 'India, Egypt, Netherlands', specs: 'Various grades, 25kg–1000kg bags' },
    { name: 'Potato', origins: 'Egypt, Australia, Pakistan', specs: 'Fresh & processing grades, 10kg–50kg bags' },
    { name: 'Garlic', origins: 'China, Egypt, Spain', specs: 'Purple & white skin, 500g–10kg packs' },
    { name: 'Ginger', origins: 'India, China', specs: 'Fresh & dry, 10kg–50kg bags' },
    { name: 'Pulses & Lentils', origins: 'India, Canada, Australia', specs: 'Red lentil, chickpeas, moong, urad' },
    { name: 'Spices', origins: 'India, Sri Lanka, Vietnam', specs: 'Cumin, coriander, turmeric, pepper' },
    { name: 'Fresh Produce', origins: 'UAE, Jordan, Morocco', specs: 'Seasonal, region-specific' },
    { name: 'Dry Grocery', origins: 'Multiple', specs: 'Rice, flour, sugar, cooking oil' },
  ];

  const markets = ['UAE', 'Saudi Arabia', 'Kuwait', 'Qatar', 'Bahrain', 'Oman', 'United States', 'United Kingdom', 'Germany', 'France', 'Netherlands'];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <main className="min-h-screen bg-white font-sans">
        <nav className="bg-[#0d1b2a] px-6 py-4 lg:px-10">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                <span className="font-extrabold text-[#0d1b2a]">V</span>
              </div>
              <span className="text-white font-bold text-lg">VDS General Trading</span>
            </Link>
            <Link href="#contact-agro" className="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-[#0d1b2a] hover:bg-amber-300">
              Request Quote
            </Link>
          </div>
        </nav>

        <section className="bg-[#0d1b2a] py-20 px-6 lg:px-10">
          <div className="mx-auto max-w-[1400px]">
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-4">Agro Trading — Dubai, UAE</p>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight max-w-3xl">
              Wholesale Agro<br />
              <span className="text-amber-400">Commodity Trading</span><br />
              Dubai, UAE
            </h1>
            <p className="mt-6 text-lg text-slate-300 max-w-2xl">
              VDS General Trading LLC supplies distributors, retailers and re-exporters with consistent volumes
              of fresh and dry agro commodities — consolidated through Jebel Ali and shipped to UAE, GCC, Europe and United States.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contact-agro" className="rounded-full bg-amber-400 px-8 py-3 font-semibold text-[#0d1b2a] hover:bg-amber-300">
                Request Agro Quote
              </a>
              <a href="tel:+971542695401" className="rounded-full border border-white/30 px-8 py-3 font-semibold text-white hover:border-white">
                +971 54 269 5401
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-8 text-sm text-slate-400">
              <span>✓ Jebel Ali consolidation</span>
              <span>✓ Transparent grading</span>
              <span>✓ Phytosanitary certificates</span>
              <span>✓ 24h response on inquiries</span>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 lg:px-10 bg-slate-50">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="text-3xl font-extrabold text-[#0d1b2a] mb-4">Products we trade &amp; export</h2>
            <p className="text-slate-600 mb-10 max-w-xl">All commodities sourced from verified origins, graded to specification, and shipped with full documentation.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((p) => (
                <div key={p.name} className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
                  <h3 className="text-lg font-bold text-[#0d1b2a] mb-1">{p.name}</h3>
                  <p className="text-xs text-amber-600 font-medium mb-2">Origins: {p.origins}</p>
                  <p className="text-sm text-slate-600">{p.specs}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 lg:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="text-3xl font-extrabold text-[#0d1b2a] mb-4">Markets we supply</h2>
            <div className="flex flex-wrap gap-3 mt-6">
              {markets.map((m) => (
                <span key={m} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-[#0d1b2a]">{m}</span>
              ))}
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Jebel Ali Consolidation', desc: 'We consolidate cargo at Jebel Ali Free Zone — the largest re-export hub in the Middle East — enabling cost-efficient multi-destination shipments.' },
                { title: 'Full Documentation', desc: 'Phytosanitary certificates, certificates of origin, fumigation reports, packing lists and commercial invoices provided for all shipments.' },
                { title: 'Transparent Grading', desc: 'All produce graded against agreed specification before loading. Photo and weight documentation sent before shipment.' },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl bg-slate-50 border border-slate-100 p-6">
                  <h3 className="text-lg font-bold text-[#0d1b2a] mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact-agro" className="py-20 px-6 lg:px-10 bg-[#0d1b2a]">
          <div className="mx-auto max-w-[1400px] text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4">Request an agro commodity quote</h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">Tell us your requirement — commodity, volume, destination and timeline. We respond within 24 hours.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:sales@vdsdxb.ae" className="rounded-full bg-amber-400 px-8 py-3 font-semibold text-[#0d1b2a] hover:bg-amber-300">Email sales@vdsdxb.ae</a>
              <a href="tel:+971542695401" className="rounded-full border border-white/30 px-8 py-3 font-semibold text-white hover:border-white">+971 54 269 5401</a>
            </div>
          </div>
        </section>

        <footer className="bg-[#0d1b2a] border-t border-white/10 py-8 px-6 lg:px-10">
          <div className="mx-auto max-w-[1400px] flex flex-wrap justify-between gap-4 text-sm text-slate-400">
            <p>© 2026 VDS General Trading LLC. Dubai, UAE.</p>
            <nav className="flex gap-6">
              <Link href="/" className="hover:text-white">Home</Link>
              <Link href="/ai-automation" className="hover:text-white">AI Automation</Link>
              <Link href="/digital-marketing" className="hover:text-white">Digital Marketing</Link>
              <Link href="/healthcare-equipment" className="hover:text-white">Healthcare</Link>
              <Link href="/about" className="hover:text-white">About</Link>
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
}
