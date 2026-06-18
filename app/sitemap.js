const SITE_URL = 'https://vdsdxb.ae';

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`,                    lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE_URL}/ai-automation`,       lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/digital-marketing`,   lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/agro-trading`,        lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/healthcare-equipment`,lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/about`,               lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];
}
