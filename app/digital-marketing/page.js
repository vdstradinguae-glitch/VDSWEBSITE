import Link from 'next/link';

export const metadata = {
  title: 'Digital Marketing Agency Dubai | SEO GEO AEO',
  description:
    'Dubai digital marketing agency: SEO, GEO (AI search visibility), AEO (featured snippets), PPC & social. Rank #1 on Google, ChatGPT & voice search in UAE.',
  alternates: { canonical: 'https://vdsdxb.ae/digital-marketing' },
  openGraph: {
    title: 'Digital Marketing Agency Dubai | SEO, GEO, AEO UAE',
    description: 'Dubai digital marketing agency: SEO, GEO (AI search), AEO (answer engines), PPC, social media. Rank #1 on Google and AI tools in UAE.',
    url: 'https://vdsdxb.ae/digital-marketing',
  },
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Digital Marketing SEO GEO AEO Services Dubai UAE',
  description:
    'Full-service digital marketing in Dubai: SEO, Generative Engine Optimisation (GEO), Answer Engine Optimisation (AEO), PPC and social media marketing for UAE businesses.',
  provider: {
    '@type': 'Organization',
    name: 'VDS General Trading LLC',
    url: 'https://vdsdxb.ae',
  },
  areaServed: [
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'Saudi Arabia' },
  ],
  url: 'https://vdsdxb.ae/digital-marketing',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is GEO (Generative Engine Optimisation)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GEO is the practice of optimising your website and content so AI tools like ChatGPT, Google AI Overviews, and Perplexity cite and recommend your business. It goes beyond traditional SEO to make your brand visible in AI-generated answers.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is AEO (Answer Engine Optimisation)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AEO structures your content to appear in featured snippets, People Also Ask boxes, and voice search results. It focuses on directly answering the questions your customers are asking.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do UAE businesses need GEO and AEO in 2025?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Over 40% of search queries in the UAE now trigger AI-generated answers. Businesses not optimised for GEO and AEO are invisible in this growing channel. VDS helps UAE businesses rank in traditional search AND in AI-generated results.',
      },
    },
  ],
};

export default function DigitalMarketingPage() {
  const services = [
    {
      title: 'SEO (Search Engine Optimisation)',
      desc: 'Technical SEO, on-page optimisation, link building and content strategy to rank #1 on Google UAE for your target keywords. Proven results for Dubai businesses.',
      keywords: ['Technical SEO', 'On-page SEO', 'Link building', 'Content strategy'],
    },
    {
      title: 'GEO — Generative Engine Optimisation',
      desc: 'Optimise your business to appear in ChatGPT, Google AI Overviews, Perplexity, and Claude responses. The new frontier of search — essential for UAE brands in 2025.',
      keywords: ['ChatGPT visibility', 'Google AI Overviews', 'Perplexity ranking', 'llms.txt'],
    },
    {
      title: 'AEO — Answer Engine Optimisation',
      desc: 'Structured content and schema markup to win featured snippets, voice search and People Also Ask results. Own the answer box for your industry.',
      keywords: ['Featured snippets', 'Voice search', 'Schema markup', 'FAQ optimisation'],
    },
    {
      title: 'PPC & Google Ads',
      desc: 'Data-driven pay-per-click campaigns on Google and Meta targeting UAE, GCC and MENA audiences. Every dirham tracked and optimised.',
      keywords: ['Google Ads UAE', 'Meta Ads', 'Retargeting', 'ROI tracking'],
    },
    {
      title: 'Social Media Marketing',
      desc: 'Instagram, LinkedIn, TikTok and Facebook marketing tailored for UAE audiences. Arabic and English content, community management and influencer partnerships.',
      keywords: ['Instagram marketing UAE', 'LinkedIn B2B', 'TikTok UAE', 'Arabic content'],
    },
    {
      title: 'Content Marketing',
      desc: 'SEO-optimised blog articles, case studies, whitepapers and video scripts that build topical authority and drive organic traffic from Google and AI tools.',
      keywords: ['Blog writing', 'Case studies', 'Thought leadership', 'E-E-A-T'],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
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
            <Link href="#contact-dm" className="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-[#0d1b2a] hover:bg-amber-300">
              Get a Free Audit
            </Link>
          </div>
        </nav>

        {/* HERO */}
        <section className="bg-[#0d1b2a] py-20 px-6 lg:px-10">
          <div className="mx-auto max-w-[1400px]">
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-4">Digital Marketing — Dubai, UAE</p>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight max-w-4xl">
              SEO, GEO &amp; AEO<br />
              <span className="text-amber-400">Digital Marketing Agency</span><br />
              Dubai, UAE
            </h1>
            <p className="mt-6 text-lg text-slate-300 max-w-2xl">
              Rank #1 on Google, appear in ChatGPT answers, and dominate voice search —
              VDS delivers full-stack digital marketing for UAE businesses: SEO, Generative Engine Optimisation (GEO),
              Answer Engine Optimisation (AEO), PPC and social media.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contact-dm" className="rounded-full bg-amber-400 px-8 py-3 font-semibold text-[#0d1b2a] hover:bg-amber-300">
                Get a Free SEO Audit
              </a>
              <a href="tel:+971542695401" className="rounded-full border border-white/30 px-8 py-3 font-semibold text-white hover:border-white">
                +971 54 269 5401
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-8 text-sm text-slate-400">
              <span>✓ Rank #1 on Google UAE</span>
              <span>✓ Appear in ChatGPT &amp; Perplexity</span>
              <span>✓ Voice search optimisation</span>
              <span>✓ Arabic &amp; English content</span>
            </div>
          </div>
        </section>

        {/* WHAT IS GEO/AEO */}
        <section className="py-20 px-6 lg:px-10 bg-amber-50">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="text-3xl font-extrabold text-[#0d1b2a] mb-4">SEO vs GEO vs AEO — what's the difference?</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'SEO', full: 'Search Engine Optimisation', desc: 'Ranks your website #1 on Google and Bing for specific keywords. The foundation of digital visibility — still essential in 2025 and beyond.' },
                { label: 'GEO', full: 'Generative Engine Optimisation', desc: 'Optimises your brand to be cited and recommended by AI tools: ChatGPT, Google AI Overviews, Perplexity, Claude. The fastest-growing search channel.' },
                { label: 'AEO', full: 'Answer Engine Optimisation', desc: 'Structures content to appear in featured snippets, People Also Ask, and voice search results. Win the answer box before a user clicks.' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-white border border-amber-200 p-6">
                  <div className="text-2xl font-black text-amber-500 mb-1">{item.label}</div>
                  <div className="text-sm font-semibold text-[#0d1b2a] mb-3">{item.full}</div>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-20 px-6 lg:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="text-3xl font-extrabold text-[#0d1b2a] mb-4">Our digital marketing services in Dubai</h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <div key={s.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                  <h3 className="text-lg font-bold text-[#0d1b2a] mb-2">{s.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.keywords.map((k) => (
                      <span key={k} className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">{k}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6 lg:px-10 bg-slate-50">
          <div className="mx-auto max-w-[1400px] max-w-3xl">
            <h2 className="text-3xl font-extrabold text-[#0d1b2a] mb-8">Frequently asked questions</h2>
            {[
              { q: 'What is GEO (Generative Engine Optimisation)?', a: 'GEO is the practice of optimising your website and content so AI tools like ChatGPT, Google AI Overviews, and Perplexity cite and recommend your business. It goes beyond traditional SEO to make your brand visible in AI-generated answers.' },
              { q: 'What is AEO (Answer Engine Optimisation)?', a: 'AEO structures your content to appear in featured snippets, People Also Ask boxes, and voice search results. It focuses on directly answering the questions your customers are asking on Google and Alexa/Siri.' },
              { q: 'Why do UAE businesses need GEO and AEO?', a: 'Over 40% of search queries in the UAE now trigger AI-generated answers. Businesses not optimised for GEO and AEO are invisible in this fast-growing channel. VDS helps UAE businesses rank in traditional search AND AI-generated results.' },
              { q: 'How long does SEO take to show results in the UAE?', a: 'For most Dubai businesses, you will see measurable organic traffic growth within 3–6 months with a consistent strategy. GEO and AEO can show results faster — often within 4–8 weeks as AI tools re-index content regularly.' },
            ].map((item) => (
              <div key={item.q} className="border-b border-slate-200 py-6">
                <h3 className="font-bold text-[#0d1b2a] mb-2">{item.q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="contact-dm" className="py-20 px-6 lg:px-10 bg-[#0d1b2a]">
          <div className="mx-auto max-w-[1400px] text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4">Get a free SEO &amp; GEO audit for your UAE business</h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              We analyse your current rankings on Google, ChatGPT and Perplexity and identify exactly what needs to change.
              Free, no obligation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:sales@vdsdxb.ae" className="rounded-full bg-amber-400 px-8 py-3 font-semibold text-[#0d1b2a] hover:bg-amber-300">
                Email sales@vdsdxb.ae
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
              <Link href="/ai-automation" className="hover:text-white">AI Automation</Link>
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
