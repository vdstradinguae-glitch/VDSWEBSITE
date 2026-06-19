import Link from 'next/link';

export const metadata = {
  title: 'MOHAP Medical Equipment Supplier UAE',
  description:
    'MOHAP-compliant medical equipment trading & rental to UAE hospitals, clinics and distributors. Diagnostic, surgical, monitoring, imaging & lab equipment.',
  alternates: { canonical: 'https://vdsdxb.ae/healthcare-equipment' },
  openGraph: {
    title: 'MOHAP Medical Equipment Supplier UAE | Healthcare Equipment Dubai',
    description: 'MOHAP-approved medical equipment trading and rental for UAE hospitals, clinics and distributors. Full documentation and traceability.',
    url: 'https://vdsdxb.ae/healthcare-equipment',
  },
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MOHAP Medical Equipment Supply and Rental UAE',
  description: 'MOHAP-compliant medical equipment trading, rental and distribution to hospitals, clinics and medical distributors across the UAE and GCC.',
  provider: { '@type': 'Organization', name: 'VDS General Trading LLC', url: 'https://vdsdxb.ae' },
  areaServed: [
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'Saudi Arabia' },
    { '@type': 'Country', name: 'Kuwait' },
  ],
  url: 'https://vdsdxb.ae/healthcare-equipment',
};

export default function HealthcarePage() {
  const categories = [
    { name: 'Diagnostic Equipment', items: 'X-ray, ultrasound, ECG, spirometry, audiometry' },
    { name: 'Patient Monitoring', items: 'Vital signs monitors, pulse oximeters, blood pressure monitors, fetal monitors' },
    { name: 'Surgical Instruments', items: 'General surgery sets, laparoscopic tools, orthopaedic instruments' },
    { name: 'Hospital Furniture', items: 'Hospital beds, ICU beds, examination tables, procedure chairs' },
    { name: 'Imaging Devices', items: 'MRI, CT scan (referral), digital X-ray, mammography' },
    { name: 'Lab Equipment', items: 'Analysers, centrifuges, microscopes, PCR machines' },
    { name: 'Consumables', items: 'Gloves, syringes, wound care, IV sets, catheters' },
    { name: 'Rehabilitation', items: 'Physiotherapy equipment, mobility aids, orthopaedic supports' },
  ];

  const customers = ['Hospitals', 'Polyclinics', 'Specialist Clinics', 'Day Surgery Centres', 'Pharmacies', 'Medical Distributors', 'Home Healthcare Providers'];

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
            <Link href="#contact-hc" className="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-[#0d1b2a] hover:bg-amber-300">
              Request Catalog
            </Link>
          </div>
        </nav>

        <section className="bg-[#0d1b2a] py-20 px-6 lg:px-10">
          <div className="mx-auto max-w-[1400px]">
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-4">Healthcare Equipment — Dubai, UAE</p>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight max-w-3xl">
              MOHAP-Compliant<br />
              <span className="text-amber-400">Medical Equipment</span><br />
              Supply &amp; Rental UAE
            </h1>
            <p className="mt-6 text-lg text-slate-300 max-w-2xl">
              VDS General Trading LLC supplies and rents MOHAP-approved medical equipment to hospitals, clinics
              and distributors across the UAE and GCC. Full documentation, traceability and UAE Ministry of Health compliance on every order.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contact-hc" className="rounded-full bg-amber-400 px-8 py-3 font-semibold text-[#0d1b2a] hover:bg-amber-300">
                Request Equipment Catalog
              </a>
              <a href="tel:+971542695401" className="rounded-full border border-white/30 px-8 py-3 font-semibold text-white hover:border-white">
                +971 54 269 5401
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-8 text-sm text-slate-400">
              <span>✓ MOHAP-compliant</span>
              <span>✓ Full documentation &amp; traceability</span>
              <span>✓ Sales &amp; rental options</span>
              <span>✓ UAE-wide delivery</span>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 lg:px-10 bg-slate-50">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="text-3xl font-extrabold text-[#0d1b2a] mb-4">Equipment categories</h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((c) => (
                <div key={c.name} className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
                  <h3 className="font-bold text-[#0d1b2a] mb-2">{c.name}</h3>
                  <p className="text-sm text-slate-600">{c.items}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 lg:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="text-3xl font-extrabold text-[#0d1b2a] mb-4">Customers we serve</h2>
            <div className="flex flex-wrap gap-3 mt-6">
              {customers.map((c) => (
                <span key={c} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-[#0d1b2a]">{c}</span>
              ))}
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'MOHAP Compliance', desc: 'All equipment imported and supplied under full UAE Ministry of Health and Prevention regulatory compliance — documented for audit.' },
                { title: 'Sales & Rental Options', desc: 'Flexible commercial terms: outright purchase or equipment rental for short-term and long-term needs. Custom lease structures available.' },
                { title: 'UAE-Wide Delivery', desc: 'Delivery and installation across Dubai, Abu Dhabi, Sharjah, Ajman, RAK, Fujairah and Al Ain. After-sales support available.' },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl bg-slate-50 border border-slate-100 p-6">
                  <h3 className="font-bold text-[#0d1b2a] mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact-hc" className="py-20 px-6 lg:px-10 bg-[#0d1b2a]">
          <div className="mx-auto max-w-[1400px] text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4">Request a medical equipment catalog</h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">Tell us your facility type, required equipment and preferred terms. We respond within 24 hours.</p>
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
              <Link href="/agro-trading" className="hover:text-white">Agro Trading</Link>
              <Link href="/about" className="hover:text-white">About</Link>
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
}
