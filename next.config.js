/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    // Enable Next.js image optimisation
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security
          { key: 'X-Frame-Options',           value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options',     value: 'nosniff' },
          { key: 'Referrer-Policy',            value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',         value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy',    value: "frame-ancestors 'self'" },
          // Performance
          { key: 'X-DNS-Prefetch-Control',     value: 'on' },
        ],
      },
      // Cache static assets
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Redirect legacy anchor links to new sub-pages
      {
        source: '/',
        has: [{ type: 'query', key: 'section', value: 'agro' }],
        destination: '/agro-trading',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
