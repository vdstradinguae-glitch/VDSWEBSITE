const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://vdsdxb.ae';

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
