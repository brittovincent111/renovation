export function GoogleAdSense() {
  // No hardcoded fallback: an unset publisher ID must render nothing rather
  // than silently serving against a baked-in account.
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

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

