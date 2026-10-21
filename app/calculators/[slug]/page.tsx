import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ALL_CALCULATORS, getCalculatorBySlug } from '@/lib/calculatorList';
import { CalculatorEngineView } from '@/components/CalculatorEngineView';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_CALCULATORS.map((calc) => ({
    slug: calc.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);

  if (!calc) {
    return {
      title: 'Calculator Not Found | RenovationCalculator',
    };
  }

  const canonicalUrl = `https://renovationcalculator.online/calculators/${calc.slug}`;

  return {
    // `absolute` bypasses the root layout's " | RenovationCalculator"
    // suffix. These titles carry the page's keywords and were running to a
    // median of 87 characters; the brand is the least valuable 23 of them
    // while the site has no name recognition to trade on.
    title: { absolute: calc.metaTitle },
    description: calc.metaDescription,
    keywords: calc.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: calc.metaTitle,
      description: calc.metaDescription,
      url: canonicalUrl,
      type: 'website',
      siteName: 'RenovationCalculator',
    },
    twitter: {
      card: 'summary_large_image',
      title: calc.metaTitle,
      description: calc.metaDescription,
    },
  };
}

export default async function CalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);

  if (!calc) {
    notFound();
  }

  return <CalculatorEngineView meta={calc} />;
}
