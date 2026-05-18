const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://vdsdxb.ae';

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/#agro`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/#healthcare`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/#about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/#contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];
}
