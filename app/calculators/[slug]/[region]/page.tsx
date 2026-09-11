import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCalculatorBySlug } from '@/lib/calculatorList';
import { CalculatorEngineView } from '@/components/CalculatorEngineView';

interface PageProps {
  params: Promise<{ slug: string; region: string }>;
}

const REGIONAL_CALCULATORS = [
  'tile-calculator',
  'concrete-calculator',
  'paint-calculator',
  'flooring-calculator',
];

const REGIONAL_VARIANTS: Record<
  string,
  { name: string; flag: string; unitName: string; currency: string; metaSuffix: string }
> = {
  uk: {
    name: 'United Kingdom',
    flag: '🇬🇧',
    unitName: 'Metric (Square Metres & Litres)',
    currency: '£',
    metaSuffix: 'UK — Metric (m²) & British Standard Building Estimator',
  },
  india: {
    name: 'India',
    flag: '🇮🇳',
    unitName: 'Metric (Square Metres, Litres & 50kg Bags)',
    currency: '₹',
    metaSuffix: 'India — Metric (m²) & Construction Material Estimator',
  },
};

export async function generateStaticParams() {
  const params: Array<{ slug: string; region: string }> = [];
  for (const slug of REGIONAL_CALCULATORS) {
    for (const region of Object.keys(REGIONAL_VARIANTS)) {
      params.push({ slug, region });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, region } = await params;
  const calc = getCalculatorBySlug(slug);
  const reg = REGIONAL_VARIANTS[region];

  if (!calc || !reg || !REGIONAL_CALCULATORS.includes(slug)) {
    return {
      title: 'Regional Calculator | RenovationCalculator',
    };
  }

  const title = `${calc.name} ${reg.metaSuffix}`;
  const description = `${calc.description} Tailored for ${reg.name} construction standards, metric units (${reg.unitName}), and local material conventions.`;
  const canonicalUrl = `https://buildcalc.io/calculators/${calc.slug}/${region}`;

  return {
    title,
    description,
    keywords: [...calc.keywords, `${calc.shortName.toLowerCase()} calculator ${region}`, `${calc.shortName.toLowerCase()} calculator metric`],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'RenovationCalculator',
    },
  };
}

export default async function RegionalCalculatorPage({ params }: PageProps) {
  const { slug, region } = await params;
  const calc = getCalculatorBySlug(slug);
  const reg = REGIONAL_VARIANTS[region];

  if (!calc || !reg || !REGIONAL_CALCULATORS.includes(slug)) {
    notFound();
  }

  // Create regional copy of metadata
  const regionalMeta = {
    ...calc,
    name: `${calc.name} (${reg.flag} ${reg.name})`,
    description: `${calc.description} Optimized with metric default units for builders and DIYers in the ${reg.name}.`,
  };

  return <CalculatorEngineView meta={regionalMeta} initialUnit="metric" />;
}
