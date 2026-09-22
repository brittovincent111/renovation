import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCalculatorBySlug } from '@/lib/calculatorList';
import { getRegionalContent, hasRegionalContent } from '@/lib/regionalContent';
import { CalculatorEngineView } from '@/components/CalculatorEngineView';

interface PageProps {
  params: Promise<{ slug: string; region: string }>;
}

/**
 * Calculators that get regional variants. Restricted to trades where local
 * product sizes, standards or units genuinely differ — a regional page with
 * nothing region-specific to say is a duplicate, not an extra page.
 */
const REGIONAL_CALCULATORS = [
  'tile-calculator',
  'concrete-calculator',
  'paint-calculator',
  'flooring-calculator',
  'false-ceiling-calculator',
  'brick-calculator',
  'roofing-calculator',
  'insulation-calculator',
  'plumbing-pipe-calculator',
  'drywall-calculator',
  'wallpaper-calculator',
  'fence-calculator',
  'gravel-calculator',
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
  australia: {
    name: 'Australia',
    flag: '🇦🇺',
    unitName: 'Metric (Square Metres, Litres & 20kg Bags)',
    currency: 'A$',
    metaSuffix: 'Australia — Metric (m²) & AS/NZS Standard Estimator',
  },
};

export async function generateStaticParams() {
  const params: Array<{ slug: string; region: string }> = [];
  for (const slug of REGIONAL_CALCULATORS) {
    for (const region of Object.keys(REGIONAL_VARIANTS)) {
      // A combination without its own copy would render the parent calculator's
      // text verbatim — a duplicate page, not an extra one. Skip until written.
      if (!hasRegionalContent(slug, region)) continue;
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
  const canonicalUrl = `https://renovationcalculator.online/calculators/${calc.slug}/${region}`;

  return {
    title,
    description,
    keywords: [...calc.keywords, `${calc.shortName.toLowerCase()} calculator ${region}`, `${calc.shortName.toLowerCase()} calculator metric`],
    alternates: {
      canonical: canonicalUrl,
    },
    // Measured against their parent, these variants share 54-62% of their text:
    // the same widget, headings and layout, differing only in a short regional
    // explanation and FAQ block. Indexing 39 of them tripled the URL count with
    // near-duplicates, which is precisely the "scaled content" pattern that gets
    // a site classified as thin. They stay fully usable for readers who land on
    // them or switch region, but they no longer compete with the parent page.
    // `follow` keeps their internal links flowing equity back to the originals.
    //
    // Self-referencing canonical, deliberately: pointing the canonical at the
    // parent while also sending noindex sends Google two contradictory
    // instructions about the same URL.
    robots: {
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
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

  if (!calc || !reg || !REGIONAL_CALCULATORS.includes(slug) || !hasRegionalContent(slug, region)) {
    notFound();
  }

  // Create regional copy of metadata
  const regionalMeta = {
    ...calc,
    name: `${calc.name} (${reg.flag} ${reg.name})`,
    description: `${calc.description} Optimized with metric default units for builders and DIYers in the ${reg.name}.`,
  };

  // Region-specific body copy and FAQs, so this page is not a duplicate of its parent.
  const regionalContent = getRegionalContent(calc.slug, region);

  return (
    <CalculatorEngineView
      meta={regionalMeta}
      initialUnit="metric"
      canonicalPath={`${calc.slug}/${region}`}
      contentOverride={regionalContent}
    />
  );
}
