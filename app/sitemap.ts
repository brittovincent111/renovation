import { MetadataRoute } from 'next';
import { ALL_CALCULATORS } from '@/lib/calculatorList';
import { PROJECT_COMBOS } from '@/lib/projectsData';
import { GUIDES } from '@/lib/guidesData';
import { SITE_URL } from '@/lib/siteIdentity';

/**
 * Deliberate content-revision dates.
 *
 * These were previously `new Date()`, so every deploy told Google that all 58
 * non-guide URLs had just changed, down to the millisecond. Google only trusts
 * `lastmod` when it is consistently accurate; a sitemap that marks everything
 * as fresh on every build teaches it to ignore the field entirely, which is the
 * opposite of what a new domain trying to earn crawl budget wants.
 *
 * Bump the relevant constant when that section's content actually changes.
 * Guides are exempt because they carry their own real dateModified.
 */
const REVISED = {
  /** Bump when calculator formulas, explanations or FAQs change. */
  calculators: '2026-09-22',
  /** Bump when project bills of materials or editorial copy change. */
  projects: '2026-09-22',
  /** Bump when a core/static page is edited. */
  core: '2026-09-22',
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: REVISED.core, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/projects`, lastModified: REVISED.projects, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/guides`, lastModified: REVISED.core, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: REVISED.core, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/editorial-policy`, lastModified: REVISED.core, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy-policy`, lastModified: REVISED.core, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified: REVISED.core, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: REVISED.core, changeFrequency: 'monthly', priority: 0.5 },
  ];

  const calculatorRoutes: MetadataRoute.Sitemap = ALL_CALCULATORS.map((calc) => ({
    url: `${baseUrl}/calculators/${calc.slug}`,
    lastModified: REVISED.calculators,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  // Regional variants (/calculators/[slug]/[region]) are deliberately absent.
  // They carry noindex because they measure 54-62% identical to their parent
  // calculator. Listing a noindexed URL in a sitemap asks Google to crawl a page
  // it has been told not to index, which Search Console reports as a conflict.
  // The previous version also only listed 10 of the 39 that exist, so the file
  // was incomplete as well as contradictory.

  const projectRoutes: MetadataRoute.Sitemap = Object.keys(PROJECT_COMBOS).map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: REVISED.projects,
    changeFrequency: 'monthly',
    priority: 0.95,
  }));

  // Guides carry genuine per-article revision dates from the single registry, so
  // this file cannot drift out of sync with the index and the homepage again.
  const guideRoutes: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: guide.dateModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...guideRoutes, ...projectRoutes, ...calculatorRoutes];
}
