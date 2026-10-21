import { AD_CLIENT } from '@/lib/adConfig';

export function GoogleAdSense() {
  const clientId = AD_CLIENT;

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

