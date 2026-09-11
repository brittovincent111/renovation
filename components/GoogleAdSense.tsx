export function GoogleAdSense() {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-8375917458612454';

  if (!clientId || clientId.includes('XXXXXXXXXXXXXXXX')) {
    return null;
  }

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
    />
  );
}

