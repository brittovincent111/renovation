import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      // Host canonicalisation: www -> apex, 301, preserving the path.
      //
      // Both hosts were serving 200 OK with identical content, so every page on
      // the site existed at two crawlable URLs. The canonical tag pointed at the
      // apex from both, which is why Search Console reported www copies as
      // "Alternate page with proper canonical tag" - but a canonical is a hint,
      // not a directive, and for two guides Google overrode it and indexed the
      // www copy instead ("Duplicate, Google chose different canonical than
      // user"). Crawl budget was also being spent twice on a new domain that has
      // very little of it.
      //
      // A redirect is a directive, so this removes the ambiguity rather than
      // arguing with it. `has` matches on the Host header, and because the
      // destination is the apex the rule cannot match its own output and loop.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.renovationcalculator.online' }],
        destination: 'https://renovationcalculator.online/:path*',
        // `permanent: true` would emit 308. Google treats 308 as equivalent to
        // 301, but 301 is the long-standing convention for host canonicalisation
        // and is what every third-party SEO tool expects to see here.
        statusCode: 301,
      },
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
