import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { GoogleAdSense } from '@/components/GoogleAdSense';
import { RegionProvider } from '@/lib/regionContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://buildcalc.io'),
  title: {
    default: 'RenovationCalculator — Free Home Renovation & Material Calculators',
    template: '%s | RenovationCalculator',
  },
  description:
    'Free, instant, client-side construction and material calculators. Accurately calculate tile, concrete, paint, flooring, lumber, drywall, roofing, pavers, and full renovation project estimates.',
  keywords: [
    'renovation calculator',
    'construction calculator',
    'tile calculator',
    'concrete calculator',
    'paint calculator',
    'drywall calculator',
    'flooring calculator',
    'material cost estimator',
  ],
  authors: [{ name: 'RenovationCalculator Team' }],
  creator: 'RenovationCalculator',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://buildcalc.io',
    siteName: 'RenovationCalculator',
    title: 'RenovationCalculator — Free Home Renovation & Construction Calculators',
    description:
      'Instant material estimation suite for contractors, DIYers, and homeowners. 40+ calculators and comprehensive renovation project combo estimators.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RenovationCalculator — Free Home Renovation & Construction Calculators',
    description:
      'Instant material estimation suite for contractors, DIYers, and homeowners. 40+ calculators with zero sign-up.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/brand-icon-circle.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <GoogleAdSense />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#263238] selection:bg-terracotta selection:text-white">
        <RegionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
        </RegionProvider>
      </body>
    </html>
  );
}
