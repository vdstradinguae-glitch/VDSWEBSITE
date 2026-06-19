import Link from 'next/link';

export const metadata = {
  title: 'About VDS General Trading Dubai',
  description:
    'About VDS General Trading LLC — UAE-registered Dubai company in AI automation, digital marketing, agro commodities and MOHAP medical equipment.',
  alternates: { canonical: 'https://vdsdxb.ae/about' },
  openGraph: {
    title: 'About VDS General Trading Dubai',
    description: 'UAE-registered Dubai trading company. AI automation, digital marketing, agro commodities and medical equipment. Serving UAE, GCC, MENA, US.',
    url: 'https://vdsdxb.ae/about',
  },
};

export default function AboutPage() {
  const verticals = [
    { title: 'AI Voice & Automation', href: '/ai-automation', desc: 'AI agents for UAE businesses — voice, email, lead qualification.' },
    { title: 'Digital Marketing (SEO/GEO/AEO)', href: '/digital-marketing', desc: 'Rank #1 on Google, ChatGPT and voice search in UAE.' },
    { title: 'Agro Commodity Trading', href: '/agro-trading', desc: 'Wholesale onion, potato, garlic and more via Jebel Ali.' },
    { title: 'Healthcare Equipment', href: '/healthcare-equipment', desc: 'MOHAP-compliant medical equipment supply and rental UAE.' },
  ];

  return (
    <main className="min-h-screen bg-white font-sans">
      <nav className="bg-[#0d1b2a] px-6 py-4 lg:px-10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <span className="font-extrabold text-[#0d1b2a]">V</span>
            </div>
            <span className="text-white font-bold text-lg">VDS General Trading</span>
          </Link>
          <Link href="/#contact" className="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-[#0d1b2a] hover:bg-amber-300">
            Contact Us
          </Link>
        </div>
      </nav>

      <section className="bg-[#0d1b2a] py-20 px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-4">About Us</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight max-w-3xl">
            VDS General Trading LLC<br />
            <span className="text-amber-400">Dubai, United Arab Emirates</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl">
            A UAE-registered limited liability company headquartered in Dubai, operating at the intersection
            of AI technology, digital marketing, physical commodity trading and regulated medical supply chains.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-10 bg-white">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-extrabold text-[#0d1b2a] mb-6">Who we are</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                VDS General Trading LLC is a Dubai-based UAE-registered trading company founded to serve the convergence of
                traditional commodity trade and modern technology services. We are a single, accountable partner for businesses
                across the UAE, GCC, MENA, Europe and United States.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Our four verticals — AI automation, digital marketing, agro commodity trading and healthcare equipment —
                operate with their own dedicated teams while sharing the same UAE governance, compliance framework and global network.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We are UAE-registered, Dubai-banked, and committed to transparent, auditable supply chains across every vertical.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#0d1b2a] mb-6">Our values</h2>
              {[
                { title: 'Trust', desc: 'UAE-registered entity. Compliant, transparent contracting, UAE-banked invoicing, auditable supply chains.' },
                { title: 'Scale', desc: 'Active trade in UAE, GCC, MENA, Europe and United States. Jebel Ali consolidation and re-export.' },
                { title: 'Compliance', desc: 'MOHAP-aligned imports, documented agro grades, full traceability and regulated re-export procedures.' },
                { title: 'Innovation', desc: 'AI-first approach to business operations and client services — applying AI tools across every vertical.' },
              ].map((v) => (
                <div key={v.title} className="mb-5">
                  <h3 className="font-bold text-[#0d1b2a] mb-1">{v.title}</h3>
                  <p className="text-slate-600 text-sm">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-10 bg-slate-50">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="text-3xl font-extrabold text-[#0d1b2a] mb-10">Our four verticals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {verticals.map((v) => (
              <Link key={v.title} href={v.href} className="group rounded-2xl bg-white border border-slate-100 p-6 hover:border-amber-300 transition">
                <h3 className="font-bold text-[#0d1b2a] mb-2 group-hover:text-amber-600 transition">{v.title} →</h3>
                <p className="text-slate-600 text-sm">{v.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-10 bg-white">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="text-3xl font-extrabold text-[#0d1b2a] mb-8">Get in touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Phone', value: '+971 54 269 5401', href: 'tel:+971542695401' },
              { label: 'Email', value: 'sales@vdsdxb.ae', href: 'mailto:sales@vdsdxb.ae' },
              { label: 'Location', value: 'Dubai, United Arab Emirates', href: '#' },
            ].map((c) => (
              <a key={c.label} href={c.href} className="rounded-2xl bg-slate-50 border border-slate-100 p-6 hover:border-amber-300 transition">
                <p className="text-xs text-amber-600 font-bold uppercase tracking-widest mb-1">{c.label}</p>
                <p className="font-semibold text-[#0d1b2a]">{c.value}</p>
              </a>
            ))}
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
            <Link href="/agro-trading" className="hover:text-white">Agro Trading</Link>
            <Link href="/healthcare-equipment" className="hover:text-white">Healthcare</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
