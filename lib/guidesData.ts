/**
 * Canonical registry of editorial guides.
 *
 * Previously this list lived inside app/guides/page.tsx while the sitemap and
 * the homepage carried their own hand-maintained copies. Adding a guide meant
 * editing three files, and they had already drifted. Sitemap, homepage and the
 * guides index now all derive from this single array.
 *
 * `datePublished` / `dateModified` are ISO dates because they feed Article
 * schema; `date` is the human label rendered on the card.
 */

export interface GuideLink {
  name: string;
  slug: string;
}

export interface Guide {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  /** Human-facing label, e.g. "September 2026". */
  date: string;
  /** ISO-8601, for Article schema. */
  datePublished: string;
  dateModified: string;
  description: string;
  /** id from EDITORIAL_TEAM; undefined falls back to organization attribution. */
  authorId?: string;
  reviewerId?: string;
  /** Published standards the guide's figures are drawn from. */
  standards?: string[];
  linkedCalculators: GuideLink[];
}

export const GUIDES: Guide[] = [
  {
    slug: 'how-to-tile-a-bathroom-floor',
    title: 'How to Tile a Bathroom Floor (Step by Step)',
    category: 'Flooring & Tiling',
    readTime: '8 min read',
    date: 'January 2026',
    datePublished: '2026-01-08',
    dateModified: '2026-09-22',
    description:
      'Master substrate prep, uncoupling membranes, thinset mortar trowel selection, tile layout grid centering, and stain-resistant grouting without lippage.',
    standards: ['TCNA Handbook (F144, B421)', 'ANSI A108.1', 'ASTM C627'],
    linkedCalculators: [
      { name: 'Tile Calculator', slug: 'tile-calculator' },
      { name: 'Grout Calculator', slug: 'grout-calculator' },
      { name: 'Tile Mortar Calculator', slug: 'tile-mortar-calculator' },
    ],
  },
  {
    slug: 'how-much-does-a-bathroom-renovation-cost',
    title: 'How Much Does a Bathroom Renovation Cost in 2026?',
    category: 'Cost Breakdown',
    readTime: '10 min read',
    date: 'January 2026',
    datePublished: '2026-01-12',
    dateModified: '2026-09-22',
    description:
      'Detailed financial breakdown of DIY vs contractor costs across budget ($5,000), mid-grade ($15,000), and luxury ($30,000+) bathroom remodels. Where to splurge vs save.',
    standards: ['IRC Chapter 27 (plumbing)', 'TCNA Handbook'],
    linkedCalculators: [
      { name: 'Bathroom Remodel Combo', slug: 'projects/bathroom-renovation-cost' },
      { name: 'Paint Calculator', slug: 'paint-calculator' },
      { name: 'Plumbing Pipe Sizing', slug: 'plumbing-pipe-calculator' },
    ],
  },
  {
    slug: 'concrete-vs-pavers',
    title: 'Concrete vs Pavers: Which Is Cheaper for Patios & Driveways?',
    category: 'Hardscape Comparison',
    readTime: '7 min read',
    date: 'January 2026',
    datePublished: '2026-01-20',
    dateModified: '2026-09-22',
    description:
      'An objective comparison of upfront material costs, installation labor, durability, frost-heave cracking risk, and long-term resale value for poured concrete vs interlocking pavers.',
    standards: ['ASTM C936 (paving units)', 'ACI 330R (parking lot concrete)'],
    linkedCalculators: [
      { name: 'Concrete Slab Calculator', slug: 'concrete-slab-calculator' },
      { name: 'Paver Calculator', slug: 'paver-calculator' },
      { name: 'Gravel Calculator', slug: 'gravel-calculator' },
    ],
  },
  {
    slug: 'flat-renovation-cost-guide',
    title: 'Flat Renovation Cost: 1BHK, 2BHK & 3BHK Cost Per Sq Ft Guide',
    category: 'Apartment & Turnkey',
    readTime: '12 min read',
    date: 'September 2026',
    datePublished: '2026-01-15',
    dateModified: '2026-09-22',
    description:
      'Detailed 1BHK, 2BHK, and 3BHK renovation costs per square foot in India. Modular kitchen pricing, bathroom waterproofing, false ceiling rates, and painting budgets.',
    standards: ['IS 456 (concrete)', 'IS 2212 (brickwork)', 'CPWD DSR rates'],
    linkedCalculators: [
      { name: 'House Renovation Cost', slug: 'projects/house-renovation-cost' },
      { name: 'False Ceiling', slug: 'calculators/false-ceiling-calculator/india' },
      { name: 'Renovation Loan', slug: 'calculators/home-renovation-loan-calculator' },
      { name: 'Painting (India)', slug: 'calculators/paint-calculator/india' },
    ],
  },
  {
    slug: 'kitchen-remodel-cost-guide',
    title: 'How Much Does a Kitchen Remodel Cost in 2026?',
    category: 'Cost Breakdown',
    readTime: '11 min read',
    date: 'September 2026',
    datePublished: '2026-09-13',
    dateModified: '2026-09-22',
    description:
      'Full budget breakdown of cabinetry, quartz countertops, plumbing, electrical circuits, and labor for minor ($15k), mid-range ($35k), and custom ($80k+) kitchen remodels.',
    standards: ['NKBA planning guidelines', 'NEC 210.52 (small-appliance circuits)'],
    linkedCalculators: [
      { name: 'Kitchen Remodel Combo', slug: 'projects/kitchen-renovation-cost' },
      { name: 'Backsplash Tile', slug: 'calculators/tile-calculator' },
      { name: 'Flooring', slug: 'calculators/flooring-calculator' },
      { name: 'Cabinet Paint', slug: 'calculators/paint-calculator' },
    ],
  },
  {
    slug: 'drywall-installation-and-finishing-guide',
    title: 'Drywall Installation & Finishing: From Framing to Level 5 Smooth Walls',
    category: 'Carpentry & Framing',
    readTime: '9 min read',
    date: 'September 2026',
    datePublished: '2026-09-13',
    dateModified: '2026-09-22',
    description:
      'Master panel selection (1/2" vs 5/8" Type X), horizontal hanging strategy, ASTM screw spacing standards, mudding coat schedules, and GA-214 Level 5 finish criteria.',
    standards: ['ASTM C840', 'GA-214 (levels of finish)', 'IRC R702.3'],
    linkedCalculators: [
      { name: 'Drywall Calculator', slug: 'calculators/drywall-calculator' },
      { name: 'Wall Framing', slug: 'calculators/wall-framing-calculator' },
      { name: 'PVA Primer & Paint', slug: 'calculators/paint-calculator' },
      { name: 'Baseboards', slug: 'calculators/baseboard-calculator' },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
