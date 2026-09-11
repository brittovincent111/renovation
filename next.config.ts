import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      {
        source: '/projects/deck-build',
        destination: '/projects/deck-building-cost',
        permanent: true,
      },
      {
        source: '/projects/bathroom-remodel',
        destination: '/projects/bathroom-renovation-cost',
        permanent: true,
      },
      {
        source: '/projects/kitchen-remodel',
        destination: '/projects/kitchen-renovation-cost',
        permanent: true,
      },
      {
        source: '/projects/patio-paving',
        destination: '/projects/backyard-patio-cost',
        permanent: true,
      },
      {
        source: '/projects/garage-epoxy',
        destination: '/calculators/epoxy-floor-calculator',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
