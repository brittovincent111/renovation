/**
 * Serves /ads.txt from the configured publisher ID.
 *
 * AdSense requires an ads.txt at the domain root; without it Google reports
 * "Earnings at risk" and restricts programmatic demand. Generating it from the
 * same env var the ad units read means it cannot drift from the publisher ID
 * actually serving the ads.
 *
 * GET handlers default to dynamic since Next 15, so force-static prerenders
 * this at build time alongside robots.txt and sitemap.xml.
 */
export const dynamic = 'force-static';

// Google's certification authority ID — a fixed public constant for AdSense.
const GOOGLE_CERTIFICATION_AUTHORITY_ID = 'f08c47fec0942fa0';

export function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  if (!client) {
    return new Response('', {
      status: 404,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    });
  }

  // ads.txt records use the bare publisher ID, without the "ca-" prefix.
  const publisherId = client.replace(/^ca-/, '');

  return new Response(
    `google.com, ${publisherId}, DIRECT, ${GOOGLE_CERTIFICATION_AUTHORITY_ID}\n`,
    { headers: { 'content-type': 'text/plain; charset=utf-8' } }
  );
}
