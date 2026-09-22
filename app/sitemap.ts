import { MetadataRoute } from 'next';
import { ALL_CALCULATORS } from '@/lib/calculatorList';
import { PROJECT_COMBOS } from '@/lib/projectsData';
import { GUIDES } from '@/lib/guidesData';
import { SITE_URL } from '@/lib/siteIdentity';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const lastModified = new Date();

  // Core pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/projects`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/guides`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/editorial-policy`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy-policy`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
  ];

  // Calculator routes
  const calculatorRoutes: MetadataRoute.Sitemap = ALL_CALCULATORS.map((calc) => ({
    url: `${baseUrl}/calculators/${calc.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Regional variants (/calculators/[slug]/[region]) are deliberately absent.
  // They carry noindex because they measure 54-62% identical to their parent
  // calculator. Listing a noindexed URL in a sitemap asks Google to crawl a page
  // it has been told not to index, which is a contradiction Search Console
  // reports as an error. The previous version also only listed 10 of the 39 that
  // actually exist, so the file was incomplete as well as wrong.

  // Project combo routes
  const projectRoutes: MetadataRoute.Sitemap = Object.keys(PROJECT_COMBOS).map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.95,
  }));

  // Guide routes, derived from the single registry so this file cannot drift
  // out of sync with the guides index and the homepage again.
  const guideRoutes: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.dateModified),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...guideRoutes, ...projectRoutes, ...calculatorRoutes];
}
