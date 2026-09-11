import { MetadataRoute } from 'next';
import { ALL_CALCULATORS } from '@/lib/calculatorList';
import { PROJECT_COMBOS } from '@/lib/projectsData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://renovationcalculator.online';
  const lastModified = new Date();

  // Core pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/projects`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/guides`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy-policy`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
  ];

  // 42 Calculator routes
  const calculatorRoutes: MetadataRoute.Sitemap = ALL_CALCULATORS.map((calc) => ({
    url: `${baseUrl}/calculators/${calc.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Regional variant routes
  const regionalRoutes: MetadataRoute.Sitemap = [];
  const topSlugs = ['tile-calculator', 'concrete-calculator', 'paint-calculator', 'flooring-calculator'];
  for (const slug of topSlugs) {
    for (const region of ['uk', 'india']) {
      regionalRoutes.push({
        url: `${baseUrl}/calculators/${slug}/${region}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  // 5 Project combo routes
  const projectRoutes: MetadataRoute.Sitemap = Object.keys(PROJECT_COMBOS).map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.95,
  }));

  // 3 Guide routes
  const guideRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/guides/how-to-tile-a-bathroom-floor`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/guides/how-much-does-a-bathroom-renovation-cost`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/guides/concrete-vs-pavers`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
  ];

  return [...staticRoutes, ...projectRoutes, ...calculatorRoutes, ...regionalRoutes, ...guideRoutes];
}
