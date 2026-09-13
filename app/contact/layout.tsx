import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: 'https://renovationcalculator.online/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
