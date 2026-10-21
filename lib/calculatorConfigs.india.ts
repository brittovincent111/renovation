/**
 * India-first calculator configs.
 *
 * Kept in its own file because this is a distinct strategy, not another entry
 * in the generic set: these pages are written rupee-first and square-foot-first
 * for a market the large US calculator sites do not serve, rather than being a
 * US calculator with a regional note bolted on. That difference is the whole
 * reason they have a chance of ranking.
 */
import type { CalculatorConfig } from './calculatorConfigs';
import {
  CITY_OPTIONS,
  QUALITY_LABELS,
  RATE_PROVENANCE,
  QualityTier,
} from './indiaCityRates';
import {
  calculateHouseConstruction,
  formatINR,
  formatLakhCrore,
} from './calculators/houseConstruction';

export const INDIA_CONFIGS: Record<string, CalculatorConfig> = {
  'house-construction-cost-calculator': {
    slug: 'house-construction-cost-calculator',
    defaultInputs: {
      floorArea: 1200,
      floors: 2,
      city: 'bangalore',
      quality: 'standard',
      contingency: 5,
    },
    fields: [
      {
        id: 'floorArea',
        label: 'Built-up Area per Floor',
        type: 'number',
        defaultValue: 1200,
        unitImperial: 'sq ft',
        unitMetric: 'sq ft',
        step: 50,
        min: 100,
        helperText: 'Built-up area, not plot area. A 30×40 plot with standard setbacks gives roughly 1,000–1,100 sq ft per floor.',
      },
      {
        id: 'floors',
        label: 'Number of Floors',
        type: 'number',
        defaultValue: 2,
        step: 1,
        min: 1,
        max: 5,
        helperText: 'Including ground floor. G+1 = 2 floors.',
      },
      {
        id: 'city',
        label: 'City',
        type: 'select',
        defaultValue: 'bangalore',
        options: CITY_OPTIONS,
      },
      {
        id: 'quality',
        label: 'Specification Level',
        type: 'select',
        defaultValue: 'standard',
        options: (Object.keys(QUALITY_LABELS) as QualityTier[]).map((k) => ({
          label: QUALITY_LABELS[k].label,
          value: k,
        })),
        helperText: 'Specification moves the number far more than area does. Read the descriptions below before choosing.',
      },
      {
        id: 'contingency',
        label: 'Your Contingency Buffer %',
        type: 'number',
        defaultValue: 5,
        step: 1,
        min: 0,
        max: 25,
        isAdvanced: true,
        helperText: 'On top of the 6% already inside the breakdown. Hold 10–15% if you have not yet finalised specifications.',
      },
    ],
    formulaHighlight:
      'Total Cost = Built-up Area × Floors × City Rate (₹/sq ft at your specification) × Floor Escalation + Contingency',
    howItIsCalculated: [
      'Built-up area is multiplied by the number of floors, then by a city-specific rate band in rupees per square foot rather than a single national average — construction in Mumbai and in Nagpur do not cost the same thing, and a national figure is useless to both.',
      'Each floor above ground carries a 2% escalation, because material has to be lifted and the structure below must be sized for the additional load. The calculator blends this across all floors rather than applying it flat.',
      'The rate band is set by specification level, which moves the total far more than area does: a luxury specification can cost double a basic one on an identical footprint. The four tiers describe real material choices, not vague adjectives.',
      'The result is split across the nine standard work heads by their typical share of a turnkey residential job. Those proportions are far more stable across cities and years than the absolute rates, so they are the most reliable part of the estimate and the best way to sanity-check a builder quote.',
      `Rates exclude land, statutory approvals, GST and loose furniture. Last reviewed ${RATE_PROVENANCE.lastReviewed}; reviewed again quarterly because steel and cement move within months.`,
    ],
    faqs: [
      {
        question: 'What is the construction cost per square foot in India in 2026?',
        answer:
          'Broadly ₹1,350 to ₹2,050 per sq ft for a basic specification, ₹1,600 to ₹2,900 for standard, ₹2,050 to ₹3,900 for premium, and ₹2,750 upward for luxury — varying by city, with Mumbai highest and tier-2 cities such as Nagpur, Indore and Lucknow lowest. Select your city above for the local band rather than relying on a national average, which is too wide to budget against.',
      },
      {
        question: 'Is this built-up area or plot area?',
        answer:
          'Built-up area, and the distinction matters enormously. Plot area is the land you own; built-up area is the floor area you actually construct, after setbacks required by local building bylaws. On a 30×40 ft plot (1,200 sq ft) with typical setbacks you might build around 1,000–1,100 sq ft per floor. Using plot area here will overstate your cost.',
      },
      {
        question: 'Does this include the cost of land?',
        answer:
          'No. Land is excluded, and in most Indian cities it is the larger number of the two by a wide margin. Also excluded are statutory approvals and plan sanction fees, GST, compound wall and gate, borewell or water connection, and loose furniture. Budget for those separately.',
      },
      {
        question: 'How much cement and steel does a house need?',
        answer:
          'As a rule of thumb for an RCC-framed residential building, roughly 0.4 bags of cement and 3.5 to 4 kg of steel per square foot of built-up area. A 2,400 sq ft G+1 house therefore needs on the order of 950 to 1,000 bags of cement and 8.5 to 9.5 tonnes of steel. Treat these as sanity checks on a contractor estimate, not as a purchase order — the structural drawing governs.',
      },
      {
        question: 'What is the difference between a turnkey contract and item-rate?',
        answer:
          'In a turnkey (or "with material") contract, the builder quotes a single rate per square foot and supplies everything. It is predictable but you must pin down the specification in writing or the quality drifts downward. In an item-rate (or "labour only") contract you buy materials yourself and pay the contractor for labour, typically ₹350 to ₹600 per sq ft. Item-rate is usually cheaper and always more work; turnkey buys you time, not money.',
      },
      {
        question: 'How long does it take to build a house in India?',
        answer:
          'Twelve to eighteen months for a typical G+1 independent house, from foundation to handover. Structure is roughly the first six months and finishes the rest. Monsoon stops concreting and slows curing, so a build starting just before the rains in your region effectively loses weeks — plan the foundation and slab work around it.',
      },
      {
        question: 'Why is my builder quoting much less than this?',
        answer:
          'Usually because the quote excludes something material. Check specifically whether it includes the modular kitchen and wardrobes, the compound wall and gate, electrical fixtures as against only concealed conduit, sanitaryware as against only plumbing lines, and GST. Compare the quote against the work-head breakdown on this page — if a head is missing from the quote, it is not missing from the project.',
      },
      {
        question: 'How accurate are these figures?',
        answer:
          'They are indicative market ranges for budgeting and for checking a quote, not a substitute for one. Rates vary with site access, soil condition, plot shape, your distance from a ready-mix plant, and the specification you finally settle on. Always obtain at least two local quotes before committing, and read our editorial policy for how these figures are compiled and revised.',
      },
    ],
    calculate: (inputs) => {
      const res = calculateHouseConstruction({
        floorArea: Number(inputs.floorArea) || 0,
        floors: Number(inputs.floors) || 1,
        citySlug: String(inputs.city || 'bangalore'),
        quality: (inputs.quality || 'standard') as QualityTier,
        contingencyPercent: Number(inputs.contingency) || 0,
      });

      return {
        primaryValue: `${formatLakhCrore(res.totalMin)} – ${formatLakhCrore(res.totalMax)}`,
        primaryUnit: '',
        primaryLabel: `Estimated Construction Cost — ${res.cityName}`,
        details: [
          {
            label: 'Rate per Sq Ft',
            value: `${formatINR(res.ratePerSqFtMin)} – ${formatINR(res.ratePerSqFtMax)}`,
            highlight: true,
          },
          { label: 'Total Built-up Area', value: res.totalBuiltUpSqFt.toLocaleString('en-IN'), unit: 'sq ft' },
          { label: 'Mid-point Estimate', value: formatLakhCrore(res.totalMid), highlight: true },
          { label: 'Material Component (~62%)', value: formatLakhCrore(res.materialCost) },
          { label: 'Labour Component (~38%)', value: formatLakhCrore(res.labourCost) },
          { label: 'Your Contingency Buffer', value: formatLakhCrore(res.contingencyAmount) },
          ...res.breakdown.map((b) => ({
            label: `${b.head} (${Math.round(b.share * 100)}%)`,
            value: formatLakhCrore(b.amount),
          })),
        ],
        notes: [
          `Excludes land, approvals, GST and loose furniture. ${RATE_PROVENANCE.scope}`,
        ],
        disclaimer:
          'Indicative ranges for budgeting and for checking a builder quote. Obtain at least two local quotes before committing.',
      };
    },
  },
};
