const SITE_URL = 'https://vdsdxb.ae';

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // Allow major AI crawlers explicitly
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
