import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/login', destination: 'https://staging.karzalay.org/login', permanent: false },
      { source: '/dashboard', destination: 'https://staging.karzalay.org/', permanent: false },
      { source: '/register', destination: '/join', permanent: false },
    ];
  },
  async headers() {
    return [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }];
  },
};

export default nextConfig;
