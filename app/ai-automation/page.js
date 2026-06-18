import Link from 'next/link';

export const metadata = {
  title: 'AI Voice Automation Agents Dubai UAE | VDS General Trading',
  description:
    'AI voice and email automation agents for UAE businesses. 24/7 inbound call handling, lead qualification, customer operations — by VDS General Trading LLC Dubai.',
  alternates: { canonical: 'https://vdsdxb.ae/ai-automation' },
  openGraph: {
    title: 'AI Voice Automation Agents Dubai UAE | VDS General Trading',
    description: 'AI-powered voice and email automation for UAE businesses. Handle inbound calls, qualify leads and run customer operations 24/7.',
    url: 'https://vdsdxb.ae/ai-automation',
  },
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI Voice & Email Automation Agents UAE',
  description:
    'AI-powered voice and email automation agents that handle inbound calls, qualify leads and run customer operations 24/7 for UAE businesses.',
  provider: {
    '@type': 'Organization',
    name: 'VDS General Trading LLC',
    url: 'https://vdsdxb.ae',
  },
  areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
  url: 'https://vdsdxb.ae/ai-automation',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'AED',
    availability: 'https://schema.org/InStock',
  },
};

export default function AIAutomationPage() {
  const features = [
    { title: '24/7 AI Voice Agents', desc: 'Never miss a call. Our AI voice agents answer, qualify and route every inbound call around the clock — in English and Arabic.' },
    { title: 'AI Email Automation', desc: 'Automated email responses, follow-ups and CRM updates triggered by customer behaviour. Zero manual effort.' },
    { title: 'Lead Qualification', desc: 'AI agents ask the right questions, score leads and pass hot prospects directly to your sales team.' },
    { title: 'CRM Integration', desc: 'Connects with your existing CRM — Salesforce, HubSpot, Zoho and more. Every conversation logged automatically.' },
    { title: 'Multilingual (EN/AR)', desc: 'Full Arabic and English support — essential for UAE, GCC and MENA markets.' },
    { title: 'Analytics Dashboard', desc: 'Real-time call metrics, conversion rates and customer sentiment reports.' },
  ];

  const useCases = [
    'Real estate agencies — qualify buyer and tenant inquiries 24/7',
    'Healthcare clinics — appointment booking and patient triage',
    'E-commerce — order tracking and customer support automation',
    'Financial services — lead qualification and callback scheduling',
    'Trading companies — supplier and buyer inquiry handling',
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <main className="min-h-screen bg-white font-sans">
        {/* NAV */}
        <nav className="bg-[#0d1b2a] px-6 py-4 lg:px-10">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                <span className="font-extrabold text-[#0d1b2a]">V</span>
              </div>
              <span className="text-white font-bold text-lg">VDS General Trading</span>
            </Link>
            <Link href="#contact-ai" className="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-[#0d1b2a] hover:bg-amber-300">
              Get a Demo
            </Link>
          </div>
        </nav>

        {/* HERO */}
        <section className="bg-[#0d1b2a] py-20 px-6 lg:px-10">
          <div className="mx-auto max-w-[1400px]">
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-4">AI Automation — Dubai, UAE</p>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight max-w-3xl">
              AI Voice &amp; Email<br />
              <span className="text-amber-400">Automation Agents</span><br />
              for UAE Businesses
            </h1>
            <p className="mt-6 text-lg text-slate-300 max-w-2xl">
              Let AI handle your inbound calls, lead qualification and customer operations — 24/7, in English and Arabic.
              VDS deploys proven AI agents for UAE businesses across every sector.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contact-ai" className="rounded-full bg-amber-400 px-8 py-3 font-semibold text-[#0d1b2a] hover:bg-amber-300">
                Book a Free Demo
              </a>
              <a href="tel:+971542695401" className="rounded-full border border-white/30 px-8 py-3 font-semibold text-white hover:border-white">
                +971 54 269 5401
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-8 text-sm text-slate-400">
              <span>✓ 24/7 availability</span>
              <span>✓ English &amp; Arabic</span>
              <span>✓ UAE-based support</span>
              <span>✓ CRM integration</span>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-20 px-6 lg:px-10 bg-slate-50">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="text-3xl font-extrabold text-[#0d1b2a] mb-4">What our AI agents do</h2>
            <p className="text-slate-600 max-w-xl mb-12">
              A complete AI-powered front office for your UAE business — deployed in days, not months.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => (
                <div key={f.title} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
                  <h3 className="text-lg font-bold text-[#0d1b2a] mb-2">{f.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section className="py-20 px-6 lg:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="text-3xl font-extrabold text-[#0d1b2a] mb-4">Industries we serve in the UAE</h2>
            <ul className="mt-8 space-y-3 max-w-2xl">
              {useCases.map((u) => (
                <li key={u} className="flex items-start gap-3 text-slate-700">
                  <span className="mt-1 text-amber-400 font-bold">→</span>
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section id="contact-ai" className="py-20 px-6 lg:px-10 bg-[#0d1b2a]">
          <div className="mx-auto max-w-[1400px] text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4">Ready to automate your business?</h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              Talk to our team. We will design an AI automation solution for your UAE business — agnostic to your industry.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:sales@vdsdxb.ae" className="rounded-full bg-amber-400 px-8 py-3 font-semibold text-[#0d1b2a] hover:bg-amber-300">
                Email us — sales@vdsdxb.ae
              </a>
              <a href="tel:+971542695401" className="rounded-full border border-white/30 px-8 py-3 font-semibold text-white hover:border-white">
                Call +971 54 269 5401
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#0d1b2a] border-t border-white/10 py-8 px-6 lg:px-10">
          <div className="mx-auto max-w-[1400px] flex flex-wrap justify-between gap-4 text-sm text-slate-400">
            <p>© 2026 VDS General Trading LLC. Dubai, UAE.</p>
            <nav className="flex gap-6">
              <Link href="/" className="hover:text-white">Home</Link>
              <Link href="/digital-marketing" className="hover:text-white">Digital Marketing</Link>
              <Link href="/agro-trading" className="hover:text-white">Agro Trading</Link>
              <Link href="/healthcare-equipment" className="hover:text-white">Healthcare</Link>
              <Link href="/about" className="hover:text-white">About</Link>
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
}
