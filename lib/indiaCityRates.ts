/**
 * City-wise residential construction rates, India.
 *
 * This is the site's differentiating data asset. US-centric calculator sites
 * (Inch Calculator, Calculator.net, Omni) do not publish Indian city rates at
 * all, which is why competing with them on "tile calculator" is unwinnable
 * while "house construction cost per sq ft in Bangalore" is not.
 *
 * ---------------------------------------------------------------------------
 * OWNER: READ BEFORE PUBLISHING
 *
 * The figures below are compiled indicative market ranges for 2026, not survey
 * data. Before this page carries real authority you must validate each city
 * against at least two genuine local sources — a builder quote, a contractor
 * rate card, or the state PWD/CPWD schedule of rates — and correct anything
 * that is off. Then set `validated: true` on that city.
 *
 * A page whose numbers a local reader recognises as wrong is worse than no
 * page. A page whose numbers a local reader recognises as RIGHT is the thing
 * that earns links, and links are what this site currently has none of.
 *
 * Re-review quarterly: steel and cement move enough to matter within months.
 * ---------------------------------------------------------------------------
 */

export type QualityTier = 'basic' | 'standard' | 'premium' | 'luxury';

export interface RateBand {
  /** INR per sq ft of built-up area. */
  min: number;
  max: number;
}

export interface CityRate {
  slug: string;
  city: string;
  state: string;
  tier: 1 | 2;
  /** Turnkey civil + finishes, excluding land, approvals and GST. */
  rates: Record<QualityTier, RateBand>;
  /** Flip to true once checked against two real local sources. */
  validated: boolean;
}

export const RATE_PROVENANCE = {
  lastReviewed: '2026-10-21',
  nextReviewDue: '2027-01-21',
  scope:
    'Turnkey residential construction — civil structure, masonry, finishes, electrical, plumbing and painting. Excludes land cost, statutory approvals, GST, and loose furniture.',
  basis:
    'Indicative market ranges compiled from prevailing contractor rate cards and published schedules of rates. Validate locally before relying on them.',
} as const;

export const QUALITY_LABELS: Record<QualityTier, { label: string; detail: string }> = {
  basic: {
    label: 'Basic / Budget',
    detail:
      'Standard local brands, vitrified tile throughout, basic sanitaryware, putty and distemper, minimal joinery. Typical for rental stock and budget self-build.',
  },
  standard: {
    label: 'Standard / Mid-range',
    detail:
      'Branded cement and steel, better vitrified or part-granite flooring, branded CP and sanitaryware, emulsion paint, modular kitchen in laminate.',
  },
  premium: {
    label: 'Premium',
    detail:
      'Granite or imported tile, designer bath fittings, false ceiling across living areas, full modular kitchen in acrylic, veneer joinery, part home automation.',
  },
  luxury: {
    label: 'Luxury / Architect-led',
    detail:
      'Architect-specified throughout — imported stone, bespoke joinery, full automation, structural glazing, landscape work. Cost is specification-led, not area-led.',
  },
};

export const CITY_RATES: CityRate[] = [
  // --- Tier 1 ---
  {
    slug: 'mumbai', city: 'Mumbai', state: 'Maharashtra', tier: 1, validated: false,
    rates: {
      basic: { min: 1900, max: 2250 }, standard: { min: 2250, max: 2900 },
      premium: { min: 2900, max: 3900 }, luxury: { min: 3900, max: 5800 },
    },
  },
  {
    slug: 'delhi-ncr', city: 'Delhi NCR', state: 'Delhi', tier: 1, validated: false,
    rates: {
      basic: { min: 1700, max: 2000 }, standard: { min: 2000, max: 2650 },
      premium: { min: 2650, max: 3550 }, luxury: { min: 3550, max: 5200 },
    },
  },
  {
    slug: 'bangalore', city: 'Bangalore', state: 'Karnataka', tier: 1, validated: false,
    rates: {
      basic: { min: 1750, max: 2050 }, standard: { min: 2050, max: 2700 },
      premium: { min: 2700, max: 3600 }, luxury: { min: 3600, max: 5300 },
    },
  },
  {
    slug: 'chennai', city: 'Chennai', state: 'Tamil Nadu', tier: 1, validated: false,
    rates: {
      basic: { min: 1600, max: 1900 }, standard: { min: 1900, max: 2500 },
      premium: { min: 2500, max: 3350 }, luxury: { min: 3350, max: 4900 },
    },
  },
  {
    slug: 'hyderabad', city: 'Hyderabad', state: 'Telangana', tier: 1, validated: false,
    rates: {
      basic: { min: 1550, max: 1850 }, standard: { min: 1850, max: 2450 },
      premium: { min: 2450, max: 3250 }, luxury: { min: 3250, max: 4800 },
    },
  },
  {
    slug: 'pune', city: 'Pune', state: 'Maharashtra', tier: 1, validated: false,
    rates: {
      basic: { min: 1650, max: 1950 }, standard: { min: 1950, max: 2550 },
      premium: { min: 2550, max: 3400 }, luxury: { min: 3400, max: 5000 },
    },
  },
  {
    slug: 'kolkata', city: 'Kolkata', state: 'West Bengal', tier: 1, validated: false,
    rates: {
      basic: { min: 1500, max: 1800 }, standard: { min: 1800, max: 2350 },
      premium: { min: 2350, max: 3150 }, luxury: { min: 3150, max: 4600 },
    },
  },
  {
    slug: 'ahmedabad', city: 'Ahmedabad', state: 'Gujarat', tier: 1, validated: false,
    rates: {
      basic: { min: 1480, max: 1780 }, standard: { min: 1780, max: 2300 },
      premium: { min: 2300, max: 3100 }, luxury: { min: 3100, max: 4500 },
    },
  },

  // --- Tier 2 ---
  {
    slug: 'kochi', city: 'Kochi', state: 'Kerala', tier: 2, validated: false,
    rates: {
      basic: { min: 1550, max: 1850 }, standard: { min: 1850, max: 2400 },
      premium: { min: 2400, max: 3200 }, luxury: { min: 3200, max: 4700 },
    },
  },
  {
    slug: 'coimbatore', city: 'Coimbatore', state: 'Tamil Nadu', tier: 2, validated: false,
    rates: {
      basic: { min: 1420, max: 1700 }, standard: { min: 1700, max: 2200 },
      premium: { min: 2200, max: 2950 }, luxury: { min: 2950, max: 4300 },
    },
  },
  {
    slug: 'jaipur', city: 'Jaipur', state: 'Rajasthan', tier: 2, validated: false,
    rates: {
      basic: { min: 1400, max: 1680 }, standard: { min: 1680, max: 2180 },
      premium: { min: 2180, max: 2900 }, luxury: { min: 2900, max: 4250 },
    },
  },
  {
    slug: 'chandigarh', city: 'Chandigarh', state: 'Chandigarh', tier: 2, validated: false,
    rates: {
      basic: { min: 1550, max: 1850 }, standard: { min: 1850, max: 2400 },
      premium: { min: 2400, max: 3200 }, luxury: { min: 3200, max: 4650 },
    },
  },
  {
    slug: 'lucknow', city: 'Lucknow', state: 'Uttar Pradesh', tier: 2, validated: false,
    rates: {
      basic: { min: 1350, max: 1620 }, standard: { min: 1620, max: 2100 },
      premium: { min: 2100, max: 2800 }, luxury: { min: 2800, max: 4100 },
    },
  },
  {
    slug: 'indore', city: 'Indore', state: 'Madhya Pradesh', tier: 2, validated: false,
    rates: {
      basic: { min: 1350, max: 1620 }, standard: { min: 1620, max: 2100 },
      premium: { min: 2100, max: 2800 }, luxury: { min: 2800, max: 4100 },
    },
  },
  {
    slug: 'nagpur', city: 'Nagpur', state: 'Maharashtra', tier: 2, validated: false,
    rates: {
      basic: { min: 1320, max: 1580 }, standard: { min: 1580, max: 2050 },
      premium: { min: 2050, max: 2750 }, luxury: { min: 2750, max: 4000 },
    },
  },
  {
    slug: 'visakhapatnam', city: 'Visakhapatnam', state: 'Andhra Pradesh', tier: 2, validated: false,
    rates: {
      basic: { min: 1380, max: 1650 }, standard: { min: 1650, max: 2150 },
      premium: { min: 2150, max: 2850 }, luxury: { min: 2850, max: 4150 },
    },
  },
];

/**
 * Share of total turnkey cost by work head.
 *
 * These proportions are far more stable across cities and years than the
 * absolute rates are — a reader in any city can sanity-check a builder's quote
 * against them, which is what makes the breakdown worth publishing.
 */
export const COST_BREAKDOWN: Array<{ head: string; share: number; note: string }> = [
  { head: 'Foundation & RCC structure', share: 0.28, note: 'Steel, cement, aggregate, shuttering and the labour to place it. The single largest head, and the one most exposed to steel price movement.' },
  { head: 'Masonry & plastering', share: 0.14, note: 'Brick or block work, internal and external plaster. Rises on plots needing retaining or compound walls.' },
  { head: 'Flooring & tiling', share: 0.12, note: 'Vitrified, granite or marble plus bathroom and kitchen wall tiling. The most specification-sensitive head after joinery.' },
  { head: 'Doors, windows & joinery', share: 0.10, note: 'Frames, shutters, grills and railings. Teak and veneer push this well past the share shown.' },
  { head: 'Kitchen & wardrobes', share: 0.09, note: 'Modular units, counters and storage. Often excluded from a builder quote — check before comparing.' },
  { head: 'Plumbing & sanitary', share: 0.08, note: 'Concealed lines, CP and sanitaryware, overhead and underground tanks, drainage.' },
  { head: 'Electrical', share: 0.07, note: 'Concealed conduit, wiring, DBs, switchgear and fixtures. Add for inverter or solar readiness.' },
  { head: 'Painting & finishes', share: 0.06, note: 'Putty, primer and emulsion internally, textured or weather-coat externally.' },
  { head: 'Contingency & miscellaneous', share: 0.06, note: 'Site levelling, water and power during construction, wastage, and the things nobody costed. Do not delete this line from your own budget.' },
];

export function getCityRate(slug: string): CityRate | undefined {
  return CITY_RATES.find((c) => c.slug === slug);
}

export const CITY_OPTIONS = CITY_RATES.map((c) => ({
  label: `${c.city}, ${c.state}`,
  value: c.slug,
}));
