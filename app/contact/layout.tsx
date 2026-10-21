import type { Metadata } from 'next';

// The page itself is a client component and cannot export metadata, so it
// lives here. Previously only the canonical was set, so /contact inherited the
// root layout's title and description verbatim and duplicated the homepage.
export const metadata: Metadata = {
  title: 'Contact & Editorial Enquiries',
  description:
    'Report a calculation error, submit a local building standard or regional trade rate, or suggest a new calculator. We review corrections within two business days.',
  alternates: { canonical: 'https://renovationcalculator.online/contact' },
  openGraph: {
    title: 'Contact the RenovationCalculator Team',
    description:
      'Report a calculation error, submit a local building standard, or suggest a new calculator.',
    url: 'https://renovationcalculator.online/contact',
    type: 'website',
    siteName: 'RenovationCalculator',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
