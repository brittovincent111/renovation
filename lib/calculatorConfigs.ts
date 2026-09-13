import { UnitSystem, CalculationResult, FAQItem, CalculatorMeta } from './types';
import { EXTENDED_CONFIGS } from './calculatorConfigs.extended';
import { calculateTile } from './calculators/tile';
import { calculatePaint } from './calculators/paint';
import { calculateConcrete } from './calculators/concrete';
import { calculateGrout } from './calculators/grout';
import { calculateSubfloor } from './calculators/subfloor';
import { calculateCarpet } from './calculators/carpet';
import { calculatePrimer } from './calculators/primer';
import { calculateBaseboard } from './calculators/baseboard';
import { calculateWallFraming } from './calculators/wallFraming';
import { calculatePaver } from './calculators/paver';
import { calculateRetainingWall } from './calculators/retainingWall';
import { calculateGravel } from './calculators/gravel';
import { calculateGutter } from './calculators/gutter';
import { calculateHvacBtu } from './calculators/hvacBtu';
import { calculateStairStringer } from './calculators/stairStringer';
import { calculateSiding } from './calculators/siding';
import { calculateEpoxyFloor } from './calculators/epoxyFloor';
import { calculateBoardFeet } from './calculators/boardFeet';
import { calculateWireGauge } from './calculators/wireGauge';
import { calculateConcreteSlab } from './calculators/concreteSlab';

export interface FieldDefinition {
  id: string;
  label: string;
  type: 'number' | 'select' | 'checkbox';
  defaultValue: number | string | boolean;
  unitImperial?: string;
  unitMetric?: string;
  step?: number;
  min?: number;
  max?: number;
  options?: Array<{ label: string; value: string }>;
  helperText?: string;
  isAdvanced?: boolean;
}

export interface CalculatorConfig {
  slug: string;
  defaultInputs: Record<string, any>;
  fields: FieldDefinition[];
  formulaHighlight: string;
  howItIsCalculated: string[];
  faqs: FAQItem[];
  /**
   * Optional single contextual link to a sibling site, rendered under the
   * explanation. Set on individual calculators only where genuinely relevant —
   * not a site-wide placement.
   */
  externalNote?: { text: string; linkText: string; href: string; tail?: string };
  calculate: (inputs: Record<string, any>, unit: UnitSystem) => CalculationResult;
}

export const CALCULATOR_CONFIGS: Record<string, CalculatorConfig> = {
  'tile-calculator': {
    slug: 'tile-calculator',
    defaultInputs: { length: 12, width: 10, tileL: 12, tileW: 12, pattern: 'straight', tilesPerBox: 10 },
    fields: [
      { id: 'length', label: 'Room Length', type: 'number', defaultValue: 12, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      { id: 'width', label: 'Room Width', type: 'number', defaultValue: 10, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      { id: 'tileL', label: 'Tile Length', type: 'number', defaultValue: 12, unitImperial: 'in', unitMetric: 'cm', step: 1, min: 1 },
      { id: 'tileW', label: 'Tile Width', type: 'number', defaultValue: 12, unitImperial: 'in', unitMetric: 'cm', step: 1, min: 1 },
      {
        id: 'pattern',
        label: 'Layout Pattern',
        type: 'select',
        defaultValue: 'straight',
        options: [
          { label: 'Straight Grid (+10% waste)', value: 'straight' },
          { label: 'Diagonal 45° (+15% waste)', value: 'diagonal' },
          { label: 'Herringbone (+20% waste)', value: 'herringbone' },
        ],
      },
      { id: 'tilesPerBox', label: 'Tiles Per Box (Optional)', type: 'number', defaultValue: 10, min: 1, isAdvanced: true },
    ],
    formulaHighlight: 'Tiles Needed = ⌈(Total Area / Single Tile Area) × (1 + Waste%)⌉',
    howItIsCalculated: [
      'Total square footage is calculated by multiplying room length by width.',
      'The area of a single tile is computed in square inches (or cm) and converted to square feet (or meters).',
      'Industry-standard waste buffer is applied depending on layout pattern: 10% for straight grid, 15% for diagonal, and 20% for herringbone.',
    ],
    faqs: [
      { question: 'How much extra tile should I buy for cuts and waste?', answer: 'For standard grid layouts, order 10% extra. For diagonal, herringbone, or rooms with multiple alcoves, order 15% to 20% extra to account for angled perimeter cuts and future repairs.' },
      { question: 'What does nominal tile size mean?', answer: 'A nominal 12"x12" tile often measures approximately 11-7/8" to allow for standard grout joints. For precise layouts, check manufacturer caliber specifications.' },
      { question: 'How many tiles are typically in a box?', answer: 'Standard boxes usually contain between 8 to 15 tiles depending on tile dimensions and thickness. Always check the package labeling before placing your order.' },
      { question: 'Should I dry-lay tiles before fixing?', answer: 'Yes, at least the first two rows and the centre line. Dry-laying shows you where the cuts fall, and lets you shift the layout so you are not left with a sliver at the most visible wall. Ten minutes here saves a floor you will look at for years.' },
      { question: 'How do I plan cuts around a doorway?', answer: "Start the layout from the doorway or the room's focal point so full tiles land where the eye goes, and push the cut tiles to the wall that will be least visible or behind furniture. Never centre a grout joint on a doorway." },
    ],
    calculate: (inputs, unit) => {
      const res = calculateTile({
        unit,
        roomLength: Number(inputs.length),
        roomWidth: Number(inputs.width),
        tileLength: Number(inputs.tileL),
        tileWidth: Number(inputs.tileW),
        layoutPattern: inputs.pattern,
        tilesPerBox: inputs.tilesPerBox ? Number(inputs.tilesPerBox) : undefined,
      });
      return {
        primaryValue: res.tilesNeeded,
        primaryUnit: 'Tiles',
        primaryLabel: 'Total Tiles Needed (with Waste)',
        details: [
          { label: 'Room Surface Area', value: unit === 'imperial' ? res.totalAreaSqFt : res.totalAreaSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
          { label: 'Single Tile Area', value: unit === 'imperial' ? res.tileAreaSqFt : res.tileAreaSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
          { label: 'Waste Allowance', value: `${res.wastePercent}%`, highlight: true },
          { label: 'Estimated Boxes', value: res.boxesNeeded ?? Math.ceil(res.tilesNeeded / 10), unit: 'boxes', highlight: true },
        ],
      };
    },
  },

  'grout-calculator': {
    slug: 'grout-calculator',
    defaultInputs: { area: 120, tileL: 12, tileW: 12, lineWidth: 0.125, waste: 10 },
    fields: [
      { id: 'area', label: 'Tiled Surface Area', type: 'number', defaultValue: 120, unitImperial: 'sq ft', unitMetric: 'm²', step: 5, min: 1 },
      { id: 'tileL', label: 'Tile Length', type: 'number', defaultValue: 12, unitImperial: 'in', unitMetric: 'cm', step: 1, min: 1 },
      { id: 'tileW', label: 'Tile Width', type: 'number', defaultValue: 12, unitImperial: 'in', unitMetric: 'cm', step: 1, min: 1 },
      { id: 'lineWidth', label: 'Grout Joint Width', type: 'number', defaultValue: 0.125, unitImperial: 'in (1/8")', unitMetric: 'mm (3mm)', step: 0.0625, min: 0.03 },
      { id: 'waste', label: 'Waste Buffer %', type: 'number', defaultValue: 10, step: 1, min: 0 },
    ],
    formulaHighlight: 'Grout Volume = (Tile Area / Tile Size) × Joint Perimeter × Width × Depth × Density',
    howItIsCalculated: [
      'Grout volume depends on tile dimensions: smaller tiles (e.g. 4"x4") require significantly more grout than large-format tiles (12"x24") due to increased joint linear footage.',
      'We compute total joint volume in cubic inches and multiply by dry grout density (~0.060 lbs/cu in) with a 10% cleanup buffer.',
    ],
    faqs: [
      { question: 'When should I use sanded vs unsanded grout?', answer: 'Use unsanded grout for joints narrower than 1/8" (3mm) or on polished marble/glass that scratches easily. Use sanded grout for joints 1/8" and wider to prevent shrinkage cracking.' },
      { question: 'How many square feet does a 25 lb bag of grout cover?', answer: 'For 12"x12" tile with 1/8" joints, a 25 lb bag covers approximately 100-130 sq ft. For 3"x6" subway tiles, coverage drops to approximately 45-60 sq ft.' },
      { question: 'How long before I can walk on grouted tile?', answer: 'Light foot traffic after 24 hours, heavy use and water exposure after 72. Epoxy grout cures faster but is far less forgiving to clean up — work in small sections and wipe before it sets.' },
      { question: 'Why is my grout drying patchy or blotchy?', answer: 'Usually inconsistent water in the mix between batches, or wiping too early and pulling cement out of the joint. Mix every batch by the same measure, and wait until the grout is firm before the first pass.' },
      { question: 'Do I need to seal grout?', answer: 'Seal cementitious grout in wet areas and on floors — it is porous and stains readily. Epoxy grout needs no sealer. Reseal cement grout roughly annually in a shower.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateGrout({
        unit,
        tileArea: Number(inputs.area),
        tileLength: Number(inputs.tileL),
        tileWidth: Number(inputs.tileW),
        lineWidth: Number(inputs.lineWidth),
        wastePercent: Number(inputs.waste),
      });
      return {
        primaryValue: unit === 'imperial' ? res.groutWeightLbs : res.groutWeightKg,
        primaryUnit: unit === 'imperial' ? 'lbs' : 'kg',
        primaryLabel: 'Grout Weight Needed',
        details: [
          { label: '25 lb (11.3 kg) Bags', value: res.bags25lb, unit: 'bags', highlight: true },
          { label: '10 lb (4.5 kg) Bags', value: res.bags10lb, unit: 'bags' },
          { label: 'Coverage per 25lb Bag', value: res.coveragePerBag25lbSqFt, unit: 'sq ft' },
          { label: 'Waste Allowance', value: `${res.wastePercent}%` },
        ],
      };
    },
  },

  'subfloor-calculator': {
    slug: 'subfloor-calculator',
    defaultInputs: { length: 20, width: 14, thickness: '3/4"', joistSpacing: 16, waste: 10 },
    fields: [
      { id: 'length', label: 'Floor Length', type: 'number', defaultValue: 20, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'width', label: 'Floor Width', type: 'number', defaultValue: 14, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      {
        id: 'thickness',
        label: 'Subfloor Thickness',
        type: 'select',
        defaultValue: '3/4"',
        options: [
          { label: '3/4" Tongue & Groove OSB (Standard Floor)', value: '3/4"' },
          { label: '5/8" Plywood (Light Residential)', value: '5/8"' },
          { label: '1/2" Underlayment Layer', value: '1/2"' },
          { label: '1/4" Cement Board / Underlayment', value: '1/4"' },
        ],
      },
      {
        id: 'joistSpacing',
        label: 'Joist Spacing',
        type: 'select',
        defaultValue: '16',
        options: [
          { label: '16" On-Center', value: '16' },
          { label: '24" On-Center', value: '24' },
        ],
      },
      { id: 'waste', label: 'Waste Buffer %', type: 'number', defaultValue: 10, step: 1, min: 5 },
    ],
    formulaHighlight: 'Subfloor Sheets = ⌈(Floor Area / 32 sq ft) × (1 + Waste%)⌉',
    howItIsCalculated: [
      'Standard subfloor panels measure 4ft × 8ft (32 sq ft).',
      'Staggered tongue-and-groove layout requires trimming at perimeter walls, warranting an 8-10% cut allowance.',
      'Screws are calculated at 6" spacing along perimeter edges and 12" on intermediate joists (approx 36 screws per panel).',
    ],
    faqs: [
      { question: 'What is the standard subfloor thickness?', answer: '3/4-inch tongue-and-groove OSB (or Sturd-I-Floor plywood) is the IRC building code standard over joists spaced 16 or 24 inches on-center.' },
      { question: 'Do I need construction adhesive for subfloor?', answer: 'Yes. Gluing subfloor panels to joists with polyurethane subfloor adhesive prevents squeaks caused by seasonal wood expansion.' },
      { question: 'Should subfloor panels be glued as well as screwed?', answer: 'Yes. Construction adhesive on the joists plus screws is what eliminates squeaks — screws alone allow the panel to lift fractionally off the joist as the wood moves. Nails are worse still.' },
      { question: 'Which way should subfloor sheets run?', answer: 'Perpendicular to the joists, with end joints staggered so they do not line up row to row and every end joint landing on a joist. Leave a 1/8" gap at panel edges for expansion.' },
      { question: 'Can I install subfloor over an existing one?', answer: 'Yes, a second layer is common for stiffening a bouncy floor or building up height. Offset the new joints from the old, and check that the added thickness will not cause problems at doors and stair risers.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateSubfloor({
        unit,
        roomLength: Number(inputs.length),
        roomWidth: Number(inputs.width),
        thickness: inputs.thickness,
        joistSpacing: Number(inputs.joistSpacing) as any,
        wastePercent: Number(inputs.waste),
      });
      return {
        primaryValue: res.sheetsNeeded,
        primaryUnit: 'Sheets (4×8)',
        primaryLabel: '4x8 Subfloor Sheets Needed',
        details: [
          { label: 'Total Floor Area', value: unit === 'imperial' ? res.totalAreaSqFt : res.totalAreaSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
          { label: 'Subfloor Screws', value: res.screwsNeeded, unit: 'screws', highlight: true },
          { label: '28oz Adhesive Tubes', value: res.adhesiveTubesNeeded, unit: 'tubes', highlight: true },
          { label: 'Specified Thickness', value: res.thickness },
        ],
      };
    },
  },

  'carpet-calculator': {
    slug: 'carpet-calculator',
    defaultInputs: { length: 16, width: 13, rollWidth: 12, waste: 10 },
    fields: [
      { id: 'length', label: 'Room Length', type: 'number', defaultValue: 16, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      { id: 'width', label: 'Room Width', type: 'number', defaultValue: 13, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      {
        id: 'rollWidth',
        label: 'Carpet Roll Width',
        type: 'select',
        defaultValue: '12',
        options: [
          { label: '12 ft Broadloom (Standard US/UK)', value: '12' },
          { label: '15 ft Broadloom (Wide Room)', value: '15' },
        ],
      },
      { id: 'waste', label: 'Cut & Seam Waste %', type: 'number', defaultValue: 10, step: 1, min: 5 },
    ],
    formulaHighlight: 'Square Yards = ⌈(Strips × Length × Roll Width × (1 + Waste%)) / 9⌉',
    howItIsCalculated: [
      'Carpet cannot be tiled; it is manufactured in fixed 12ft or 15ft wide continuous rolls.',
      'If a room is 13ft wide and carpet is 12ft wide, two parallel cuts are required, creating a seam and cut remnant.',
      'Total square footage is converted into standard Square Yards (1 sq yd = 9 sq ft) for pricing.',
    ],
    faqs: [
      { question: 'Why is carpet measured in square yards instead of square feet?', answer: 'In the United States and UK, broadloom carpet has historically been manufactured and priced per square yard (9 square feet).' },
      { question: 'How much extra carpet is needed for seams and corners?', answer: 'For standard rectangular rooms, 10% is adequate. For rooms wider than 12 feet or rooms with angled walls, order 15% extra to align nap directions.' },
      { question: 'Why is carpet sold in 12 foot widths?', answer: 'Broadloom carpet is manufactured on 12 ft looms, so any room wider than 12 ft needs a seam. Room layout relative to that 12 ft width drives waste more than area does — a 13 ft wide room is markedly less efficient than a 12 ft one.' },
      { question: 'Where should carpet seams be placed?', answer: 'Running with the main light source and out of high-traffic paths. Never seam across a doorway. A seam perpendicular to a window will be visible every sunny afternoon.' },
      { question: 'Do I need new underlay?', answer: 'Almost always. Underlay compresses permanently over its life, and old padding under new carpet will wear the new carpet out early. It is a small fraction of the total cost and it determines how the floor feels.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateCarpet({
        unit,
        roomLength: Number(inputs.length),
        roomWidth: Number(inputs.width),
        rollWidth: Number(inputs.rollWidth),
        wastePercent: Number(inputs.waste),
      });
      return {
        primaryValue: res.sqYardsNeeded,
        primaryUnit: 'Sq Yards',
        primaryLabel: 'Carpet Needed (Square Yards)',
        details: [
          { label: 'Metric Area', value: res.sqMetersNeeded, unit: 'm²' },
          { label: 'Cut Roll Length', value: unit === 'imperial' ? res.rollLengthFt : res.rollLengthM, unit: unit === 'imperial' ? 'linear ft' : 'linear m', highlight: true },
          { label: 'Parallel Seam Strips', value: res.stripsNeeded, unit: 'strips' },
          { label: 'Padding Needed', value: res.paddingSqYds, unit: 'sq yds', highlight: true },
          { label: 'Tack Strip Perimeter', value: res.tackStripLinearFt, unit: 'linear ft' },
        ],
      };
    },
  },

  'paint-calculator': {
    slug: 'paint-calculator',
    defaultInputs: { length: 14, width: 12, height: 9, doors: 1, windows: 2, coats: 2 },
    fields: [
      { id: 'length', label: 'Room Length', type: 'number', defaultValue: 14, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      { id: 'width', label: 'Room Width', type: 'number', defaultValue: 12, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      { id: 'height', label: 'Wall Height', type: 'number', defaultValue: 9, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 6 },
      { id: 'doors', label: 'Doors to Deduct', type: 'number', defaultValue: 1, min: 0, isAdvanced: true },
      { id: 'windows', label: 'Windows to Deduct', type: 'number', defaultValue: 2, min: 0, isAdvanced: true },
      { id: 'coats', label: 'Number of Coats', type: 'number', defaultValue: 2, min: 1, max: 4 },
    ],
    formulaHighlight: 'Paint Gallons = ⌈(Net Wall Area × Coats) / 350 sq ft⌉',
    howItIsCalculated: [
      'Gross wall area is calculated by multiplying room perimeter by ceiling height.',
      'Deductions of 21 sq ft per standard door and 15 sq ft per standard window are subtracted from gross area.',
      'Industry benchmark coverage for quality interior acrylic latex paint is 350 sq ft per gallon per coat.',
    ],
    faqs: [
      { question: 'How much paint does 1 gallon cover?', answer: 'One gallon of quality interior paint covers approximately 350 to 400 square feet with one coat on a smooth, primed wall.' },
      { question: 'Do I really need two coats of paint?', answer: 'Yes. The first coat seals and provides color depth, while the second coat creates a uniform protective film that resists scuffs and cleaning.' },
      { question: 'Do I need primer or can I use self-priming paint?', answer: 'Prime bare drywall, bare wood, any patch or repair, and any dramatic colour change. Self-priming paint is really just thicker paint — it does not solve adhesion over glossy or stained surfaces the way a dedicated primer does.' },
      { question: 'How much paint do doors and trim take?', answer: 'About a quart per door for two coats, and roughly a gallon per 200 linear feet of trim. Trim paint is usually a different sheen from the walls, so it is bought separately rather than out of the wall total.' },
      { question: 'Does paint sheen change how much I need?', answer: 'Marginally — flat paint is more porous and can need slightly more on the first coat. The bigger factor is the surface: new drywall absorbs far more than a previously painted wall, which is exactly what the primer coat is for.' },
    ],
    calculate: (inputs, unit) => {
      const l = Number(inputs.length) || 14;
      const w = Number(inputs.width) || 12;
      const wallPerimeter = 2 * (l + w);
      const res = calculatePaint({
        unit,
        wallLength: wallPerimeter,
        wallHeight: Number(inputs.height) || 9,
        doorsCount: Number(inputs.doors) || 0,
        windowsCount: Number(inputs.windows) || 0,
        coats: Number(inputs.coats) || 2,
      });
      return {
        primaryValue: unit === 'imperial' ? res.paintNeededGallons : res.paintNeededLiters,
        primaryUnit: unit === 'imperial' ? 'Gallons' : 'Liters',
        primaryLabel: 'Total Paint Needed',
        details: [
          { label: 'Net Wall Area', value: unit === 'imperial' ? res.netAreaSqFt : res.netAreaSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
          { label: 'Gross Wall Area', value: unit === 'imperial' ? res.grossAreaSqFt : res.grossAreaSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
          { label: 'Gallons Needed', value: res.paintNeededGallons, unit: 'gal', highlight: true },
        ],
      };
    },
  },

  'primer-calculator': {
    slug: 'primer-calculator',
    defaultInputs: { length: 14, width: 12, height: 9, doors: 1, windows: 2, coats: 1, surface: 'new-drywall' },
    fields: [
      { id: 'length', label: 'Room Length', type: 'number', defaultValue: 14, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      { id: 'width', label: 'Room Width', type: 'number', defaultValue: 12, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      { id: 'height', label: 'Wall Height', type: 'number', defaultValue: 9, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 6 },
      { id: 'doors', label: 'Doors to Deduct', type: 'number', defaultValue: 1, min: 0 },
      { id: 'windows', label: 'Windows to Deduct', type: 'number', defaultValue: 2, min: 0 },
      {
        id: 'surface',
        label: 'Substrate Surface',
        type: 'select',
        defaultValue: 'new-drywall',
        options: [
          { label: 'Bare Drywall / Joint Compound (250 sq ft/gal)', value: 'new-drywall' },
          { label: 'Previously Painted Wall (300 sq ft/gal)', value: 'previously-painted' },
          { label: 'Bare Wood / Stained Trim (225 sq ft/gal)', value: 'stained-wood' },
          { label: 'Concrete / Masonry (200 sq ft/gal)', value: 'masonry' },
        ],
      },
    ],
    formulaHighlight: 'Primer Gallons = ⌈(Net Wall Area × Coats) / Coverage Rate⌉',
    howItIsCalculated: [
      'Primer absorbs heavily into porous surfaces like joint compound, plaster, and bare wood, resulting in 200-300 sq ft/gal coverage compared to 350+ for finish paint.',
      'Subtracts doors and windows to calculate exact net wall coverage.',
    ],
    faqs: [
      { question: 'Why does primer have lower coverage than paint?', answer: 'PVA and oil primers have higher resin-to-pigment binders that soak into porous drywall paper and spackle rather than sitting on top of the film.' },
      { question: 'Do I need primer if my paint is "Paint & Primer in One"?', answer: 'On bare, unpainted drywall or repaired patches, a dedicated PVA primer is strongly recommended to avoid flashing (dull patches) in finish paint.' },
      { question: 'When do I need a stain-blocking primer?', answer: 'Over water stains, smoke damage, crayon, marker, or tannin-rich woods such as cedar and redwood. Use shellac or oil-based — a water-based primer will let those stains bleed straight back through the topcoat, often within days.' },
      { question: 'Can I tint primer to match my topcoat?', answer: 'Yes, and you should for strong or deep colours. Tinting primer towards the finish colour routinely saves a whole topcoat, which more than pays for the tinting.' },
      { question: 'Do I need to prime over existing paint?', answer: 'Not if it is sound, matt and a similar colour. Do prime over gloss or semi-gloss, over any repair, and wherever you are going substantially lighter — otherwise the sheen or the patch will telegraph through.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculatePrimer({
        unit,
        roomLength: Number(inputs.length),
        roomWidth: Number(inputs.width),
        wallHeight: Number(inputs.height),
        doors: Number(inputs.doors),
        windows: Number(inputs.windows),
        surfaceType: inputs.surface,
      });
      return {
        primaryValue: unit === 'imperial' ? res.gallonsNeeded : res.litersNeeded,
        primaryUnit: unit === 'imperial' ? 'Gallons' : 'Liters',
        primaryLabel: 'Primer Needed',
        details: [
          { label: 'Net Wall Area', value: unit === 'imperial' ? res.netWallAreaSqFt : res.netWallAreaSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
          { label: 'Coverage Rate', value: `${res.coverageSqFtPerGal} sq ft/gal` },
          { label: '1-Gallon Cans', value: res.cans1Gal, unit: 'cans', highlight: true },
          { label: '5-Gallon Pails', value: res.pails5Gal, unit: 'pails' },
        ],
      };
    },
  },

  'baseboard-calculator': {
    slug: 'baseboard-calculator',
    defaultInputs: { length: 16, width: 14, doors: 2, waste: 12 },
    fields: [
      { id: 'length', label: 'Room Length', type: 'number', defaultValue: 16, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      { id: 'width', label: 'Room Width', type: 'number', defaultValue: 14, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      { id: 'doors', label: 'Door Openings (3ft / 1m each)', type: 'number', defaultValue: 2, min: 0 },
      { id: 'waste', label: 'Corner & Miter Cut Waste %', type: 'number', defaultValue: 12, step: 1, min: 5 },
    ],
    formulaHighlight: 'Trim Footage = (Perimeter - Door Deductions) × (1 + Waste%)',
    howItIsCalculated: [
      'Room perimeter is computed as 2 × (Length + Width).',
      'Doorways are deducted (standard 36 inches / 3 ft per opening).',
      'Miter and scarf joint scrap allowance (10-15%) is applied, then converted into board counts for standard 8ft, 12ft, and 16ft lumber lengths.',
    ],
    faqs: [
      { question: 'Should I buy 8ft, 12ft, or 16ft baseboard pieces?', answer: '16ft boards minimize unsightly scarf joints on long walls. 8ft boards are easier to transport in passenger vehicles but require more wall splices.' },
      { question: 'How much extra molding should I buy for corner miters?', answer: 'Plan for 10% to 15% extra material. Outside 45° corners and inside coped joints always produce cut-off waste.' },
      { question: 'How do I handle inside and outside corners?', answer: 'Cope inside corners rather than mitring them — a coped joint stays tight as the house moves and seasonal humidity changes, where a mitre opens visibly. Mitre outside corners, and glue the joint.' },
      { question: 'How much extra baseboard should I buy?', answer: 'Add 10-15%. Every corner consumes length in the cut, boards are rarely perfectly straight, and coping takes a practice piece or two. Buying long lengths reduces the number of joints along a wall.' },
      { question: 'Should baseboard be installed before or after flooring?', answer: 'After, in almost all cases. The baseboard then covers the flooring expansion gap. With carpet, the baseboard goes on first and is held slightly off the subfloor so the carpet can tuck beneath it.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateBaseboard({
        unit,
        roomLength: Number(inputs.length),
        roomWidth: Number(inputs.width),
        doors: Number(inputs.doors),
        wastePercent: Number(inputs.waste),
      });
      return {
        primaryValue: unit === 'imperial' ? res.linearFtWithWaste : res.netLinearM,
        primaryUnit: unit === 'imperial' ? 'Linear Ft' : 'Meters',
        primaryLabel: 'Baseboard Trim Needed (with Waste)',
        details: [
          { label: '8ft Boards', value: res.boards8ft, unit: 'pieces', highlight: true },
          { label: '12ft Boards', value: res.boards12ft, unit: 'pieces' },
          { label: '16ft Boards', value: res.boards16ft, unit: 'pieces', highlight: true },
          { label: 'Finish Nails (15/16-ga)', value: res.finishNailsNeeded, unit: 'nails' },
          { label: 'Painter Caulk Tubes', value: res.caulkTubesNeeded, unit: 'tubes' },
        ],
      };
    },
  },

  'wall-framing-calculator': {
    slug: 'wall-framing-calculator',
    defaultInputs: { length: 24, spacing: 16, doors: 1, windows: 2, corners: 2, waste: 10 },
    fields: [
      { id: 'length', label: 'Total Wall Length', type: 'number', defaultValue: 24, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      {
        id: 'spacing',
        label: 'Stud Spacing',
        type: 'select',
        defaultValue: '16',
        options: [
          { label: '16" On-Center (Standard Load-Bearing & Drywall)', value: '16' },
          { label: '24" On-Center (Advanced Non-Bearing Framing)', value: '24' },
        ],
      },
      { id: 'doors', label: 'Door Openings', type: 'number', defaultValue: 1, min: 0 },
      { id: 'windows', label: 'Window Openings', type: 'number', defaultValue: 2, min: 0 },
      { id: 'corners', label: 'Wall Corners (3-Stud Corners)', type: 'number', defaultValue: 2, min: 0 },
      { id: 'waste', label: 'Waste Allowance %', type: 'number', defaultValue: 10, step: 1, min: 5 },
    ],
    formulaHighlight: 'Studs = ⌈(Wall Length / Spacing) + 1 + (Openings × 2) + Corners⌉ × (1 + Waste%)',
    howItIsCalculated: [
      'Common studs are calculated at 1 stud every 16" (or 24") on-center plus 1 end stud.',
      'Each door and window opening adds 2 king and 2 jack/trimmer studs.',
      'Plates require 1 bottom sole plate and 2 top plates (total linear feet = 3 × wall length).',
    ],
    faqs: [
      { question: 'Why are wall studs spaced at 16 inches on center?', answer: '16 inches OC divides evenly into standard 48" (4-foot) and 96" (8-foot) plywood and drywall panels, ensuring sheet edges land centered on framing members.' },
      { question: 'How many top plates are required for a framed wall?', answer: 'Building codes require a double top plate for load-bearing and exterior walls to overlap joints at corners and tie intersecting walls together.' },
      { question: 'Should studs be 16 or 24 inches on centre?', answer: '16" is standard for load-bearing walls and gives better drywall support. 24" is permitted for many non-bearing interior walls and uses noticeably less lumber, but 1/2" drywall can show waviness between studs at that spacing.' },
      { question: 'What is the fencepost rule in framing?', answer: 'A 10 ft wall at 16" on centre needs 9 studs, not 8 — you need a stud at both ends plus the ones between. Forgetting the final stud is the single most common framing take-off error.' },
      { question: 'Do I need a double top plate?', answer: 'Yes on load-bearing walls, with the plate joints offset from the joints below by at least one stud bay. It ties the wall together and lets joists or trusses bear anywhere along the top rather than only over a stud.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateWallFraming({
        unit,
        wallLength: Number(inputs.length),
        studSpacing: Number(inputs.spacing) as any,
        doors: Number(inputs.doors),
        windows: Number(inputs.windows),
        corners: Number(inputs.corners),
        wastePercent: Number(inputs.waste),
      });
      return {
        primaryValue: res.totalStudsNeeded,
        primaryUnit: 'Studs',
        primaryLabel: 'Vertical 2x4 Framing Studs',
        details: [
          { label: 'Common Studs', value: res.commonStuds },
          { label: 'Opening Jack/King Studs', value: res.openingStuds },
          { label: 'Top & Bottom Plates', value: res.plateBoardsNeeded, unit: '12ft boards', highlight: true },
          { label: 'Total Plate Linear Footage', value: res.plateLinearFt, unit: 'ft' },
          { label: 'Framing Nails (16d)', value: res.framingNailsLbs, unit: 'lbs' },
        ],
      };
    },
  },

  'concrete-calculator': {
    slug: 'concrete-calculator',
    defaultInputs: { length: 20, width: 10, thickness: 4, waste: 10 },
    fields: [
      { id: 'length', label: 'Slab Length', type: 'number', defaultValue: 20, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      { id: 'width', label: 'Slab Width', type: 'number', defaultValue: 10, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      { id: 'thickness', label: 'Slab Thickness', type: 'number', defaultValue: 4, unitImperial: 'in', unitMetric: 'cm', step: 0.5, min: 2 },
      { id: 'waste', label: 'Spillage & Subgrade Waste %', type: 'number', defaultValue: 10, step: 1, min: 5 },
    ],
    formulaHighlight: 'Cubic Yards = ⌈(Length_ft × Width_ft × (Thickness_in / 12)) / 27 × (1 + Waste%)⌉',
    howItIsCalculated: [
      'Volume is calculated in cubic feet by multiplying length by width by thickness (in feet).',
      'Cubic feet are divided by 27 to obtain cubic yards (or multiplied by 0.0283 for cubic meters).',
      'A 10% allowance covers ground irregularities, form bulging, and mixer spillage.',
    ],
    faqs: [
      { question: 'How thick should a concrete patio or driveway be?', answer: 'Patios and sidewalks are standard 4 inches thick. Driveways supporting passenger vehicles should be 5 to 6 inches thick with rebar reinforcement.' },
      { question: 'How many bags of concrete make 1 cubic yard?', answer: 'It takes 45 bags of 80 lb concrete or 60 bags of 60 lb concrete to yield one cubic yard.' },
      { question: 'How long does concrete take to cure?', answer: 'It is walkable in 24-48 hours, takes light vehicle traffic at 7 days, and reaches design strength at 28 days. Curing is a chemical reaction, not drying — keep it damp for the first week, especially in heat or wind.' },
      { question: 'Should I order extra concrete?', answer: 'Add 5-10%. Sub-base is never perfectly level, and running short mid-pour creates a cold joint that is a permanent weakness. Excess is far cheaper than a second delivery.' },
      { question: 'What causes concrete to crack?', answer: 'Shrinkage as it cures, which is why control joints exist — they decide where it cracks. Cut joints at roughly 24-36 times the slab thickness in feet, within 6-12 hours of the pour. Excess water in the mix makes shrinkage cracking substantially worse.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateConcrete({
        unit,
        length: Number(inputs.length) || 20,
        width: Number(inputs.width) || 10,
        thickness: Number(inputs.thickness) || 4,
        wastePercent: Number(inputs.waste) || 10,
      });
      return {
        primaryValue: unit === 'imperial' ? res.volumeWithWasteCuYards : res.volumeWithWasteCuMeters,
        primaryUnit: unit === 'imperial' ? 'Cubic Yards' : 'm³',
        primaryLabel: 'Concrete Volume Needed',
        details: [
          { label: '80 lb Pre-Mix Bags', value: res.bags80lb, unit: 'bags', highlight: true },
          { label: '60 lb Pre-Mix Bags', value: res.bags60lb, unit: 'bags' },
          { label: 'Ready-Mix Truck Loads', value: res.readyMixTruckLoads ?? 1, unit: 'trucks', highlight: true },
          { label: 'Waste Buffer', value: `${res.wastePercent}%` },
        ],
      };
    },
  },

  'concrete-slab-calculator': {
    slug: 'concrete-slab-calculator',
    defaultInputs: { length: 24, width: 24, thickness: 4, gravelDepth: 4, price: 145, waste: 10 },
    fields: [
      { id: 'length', label: 'Slab Length', type: 'number', defaultValue: 24, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'width', label: 'Slab Width', type: 'number', defaultValue: 24, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      {
        id: 'thickness',
        label: 'Concrete Thickness',
        type: 'select',
        defaultValue: '4',
        options: [
          { label: '4" (Standard Patio / Walkway / Shed)', value: '4' },
          { label: '5" (Heavy Patio / Light Driveway)', value: '5' },
          { label: '6" (Standard Driveway / 2-Car Garage)', value: '6' },
          { label: '8" (Commercial Vehicle Slab)', value: '8' },
        ],
      },
      { id: 'gravelDepth', label: 'Sub-Base Gravel Depth', type: 'number', defaultValue: 4, unitImperial: 'in', unitMetric: 'cm', step: 1, min: 2 },
      { id: 'price', label: 'Ready-Mix Price per Cu Yd ($)', type: 'number', defaultValue: 145, min: 0 },
      { id: 'waste', label: 'Waste %', type: 'number', defaultValue: 10, step: 1, min: 5 },
    ],
    formulaHighlight: 'Concrete Yards + Base Gravel Tons + Rebar Grid + Edge Forms',
    howItIsCalculated: [
      'Computes ready-mix concrete yardage plus 10% subgrade variance allowance.',
      'Estimates crushed stone sub-base volume compacted at 1.4 tons per cubic yard.',
      'Calculates 20ft rebar sticks based on an 18" on-center reinforcement grid.',
    ],
    faqs: [
      { question: 'When is it cheaper to order ready-mix vs bag mix?', answer: 'For anything over 1.5 to 2 cubic yards (approx 70-90 bags of 80lb concrete), ordering ready-mix delivery is cheaper and dramatically faster.' },
      { question: 'Why is a gravel sub-base necessary under concrete?', answer: 'Compacted gravel provides uniform support, prevents frost-heave cracking, and allows subsurface water to drain away from under the slab.' },
      { question: 'How thick should a concrete slab be?', answer: '4" for patios, walkways and shed bases. 5-6" for driveways and anything carrying a vehicle. 6" or more with rebar for RVs, heavy trucks or workshop equipment. Thickness matters less than a well-compacted base beneath it.' },
      { question: 'Do I need a vapour barrier under the slab?', answer: 'Under any slab inside a building, yes — 6-10 mil polyethylene over the base. Without it, ground moisture wicks up through the concrete and will damage flooring adhesive, wood and finishes above.' },
      { question: 'How much base material do I need?', answer: '4-6" of compacted gravel for a patio, 6-8" for a driveway. Compact in 2-3" lifts with a plate compactor. Most slab failures trace back to inadequate base preparation rather than to the concrete itself.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateConcreteSlab({
        unit,
        slabLengthFeet: Number(inputs.length),
        slabWidthFeet: Number(inputs.width),
        slabThicknessInches: Number(inputs.thickness) as any,
        gravelBaseDepthInches: Number(inputs.gravelDepth),
        pricePerCubicYard: inputs.price ? Number(inputs.price) : undefined,
        wastePercent: Number(inputs.waste),
      });
      return {
        primaryValue: res.concreteCubicYards,
        primaryUnit: 'Cu Yards',
        primaryLabel: 'Ready-Mix Concrete Needed',
        details: [
          { label: 'Sub-Base Gravel', value: res.gravelBaseTons, unit: 'tons', highlight: true },
          { label: 'Rebar (#4 20ft sticks)', value: res.rebarSticks20ft, unit: 'sticks', highlight: true },
          { label: 'Perimeter Form Lumber', value: res.formingLumberLinearFt, unit: 'linear ft' },
          { label: 'Estimated Concrete Cost', value: res.estimatedMaterialCost ? `$${res.estimatedMaterialCost}` : '—', highlight: true },
        ],
      };
    },
  },

  'paver-calculator': {
    slug: 'paver-calculator',
    defaultInputs: { length: 16, width: 12, size: '12x12', pattern: 'running-bond', sandDepth: 1, gravelDepth: 4 },
    fields: [
      { id: 'length', label: 'Patio Length', type: 'number', defaultValue: 16, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      { id: 'width', label: 'Patio Width', type: 'number', defaultValue: 12, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      {
        id: 'size',
        label: 'Paver Size',
        type: 'select',
        defaultValue: '12x12',
        options: [
          { label: '12" × 12" Square', value: '12x12' },
          { label: '6" × 9" Holland Stone', value: '6x9' },
          { label: '4" × 8" Brick Paver', value: '4x8' },
          { label: '16" × 16" Large Format', value: '16x16' },
        ],
      },
      {
        id: 'pattern',
        label: 'Laying Pattern',
        type: 'select',
        defaultValue: 'running-bond',
        options: [
          { label: 'Running Bond (10% waste)', value: 'running-bond' },
          { label: 'Herringbone 45° (15% waste)', value: 'herringbone' },
          { label: 'Basketweave (10% waste)', value: 'basketweave' },
        ],
      },
      { id: 'sandDepth', label: 'Bedding Sand Depth', type: 'number', defaultValue: 1, unitImperial: 'in', unitMetric: 'cm', step: 0.25, min: 0.5 },
      { id: 'gravelDepth', label: 'Compacted Gravel Sub-Base', type: 'number', defaultValue: 4, unitImperial: 'in', unitMetric: 'cm', step: 1, min: 2 },
    ],
    formulaHighlight: 'Paver Count = ⌈(Patio Area / Single Paver Area) × (1 + Waste%)⌉',
    howItIsCalculated: [
      'Calculates total patio square footage and converts selected paver dimensions into square feet.',
      'Computes 1-inch bedding sand layer (approx 1 ton per 100 sq ft) and 4-6 inch compacted crusher-run base.',
      'Determines snap-edge restraint linear footage along the exposed perimeter.',
    ],
    faqs: [
      { question: 'What depth should paver base gravel be?', answer: 'Pedestrian walkways and patios require 4 inches of compacted crushed gravel base. Driveways require 8 to 10 inches of compacted gravel.' },
      { question: 'Can I lay pavers directly on sand without gravel?', answer: 'No. Without a compacted crushed gravel base, ground freeze-thaw and rainfall will cause pavers to shift and settle unevenly.' },
      { question: 'How deep should the paver base be?', answer: '4-6 inches of compacted crushed stone for a patio or walkway, 8-12 inches for a driveway, plus 1 inch of bedding sand. Compact the base in 2-3 inch lifts — a single deep lift never compacts properly through its full depth.' },
      { question: 'What slope do pavers need for drainage?', answer: 'A minimum 1% fall away from the house, about 1/8 inch per foot. Without it water pools on the surface and works into the joints, which eventually undermines the bedding layer.' },
      { question: 'Do I need polymeric sand in the joints?', answer: 'It is worth it. Polymeric sand hardens when wetted, locks the pavers against shifting and strongly suppresses weeds and ants. Sweep it in fully, then mist rather than soak — flooding it washes the binder out.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculatePaver({
        unit,
        patioLength: Number(inputs.length),
        patioWidth: Number(inputs.width),
        paverSize: inputs.size,
        layoutPattern: inputs.pattern,
        sandBaseDepthInches: Number(inputs.sandDepth),
        gravelBaseDepthInches: Number(inputs.gravelDepth),
      });
      return {
        primaryValue: res.paversNeeded,
        primaryUnit: 'Pavers',
        primaryLabel: 'Total Pavers Needed (with Waste)',
        details: [
          { label: 'Surface Area', value: unit === 'imperial' ? res.patioAreaSqFt : res.patioAreaSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
          { label: '1" Bedding Sand', value: res.beddingSandTons, unit: 'tons', highlight: true },
          { label: 'Compacted Gravel Base', value: res.gravelBaseTons, unit: 'tons', highlight: true },
          { label: 'Edge Restraints', value: res.edgeRestraintLinearFt, unit: 'linear ft' },
        ],
      };
    },
  },

  'retaining-wall-calculator': {
    slug: 'retaining-wall-calculator',
    defaultInputs: { length: 30, height: 3, size: '4x12', buried: 1, waste: 8 },
    fields: [
      { id: 'length', label: 'Wall Length', type: 'number', defaultValue: 30, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'height', label: 'Exposed Wall Height', type: 'number', defaultValue: 3, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      {
        id: 'size',
        label: 'Retaining Wall Block Size',
        type: 'select',
        defaultValue: '4x12',
        options: [
          { label: '4"H × 12"L (Standard Garden Retaining Block)', value: '4x12' },
          { label: '6"H × 16"L (Medium Segmental Block)', value: '6x16' },
          { label: '8"H × 18"L (Commercial Heavy Block)', value: '8x18' },
        ],
      },
      { id: 'buried', label: 'Buried Base Courses', type: 'number', defaultValue: 1, min: 1, max: 3 },
      { id: 'waste', label: 'Cut Waste %', type: 'number', defaultValue: 8, step: 1, min: 5 },
    ],
    formulaHighlight: 'Blocks = (Wall Length / Block Length) × (Exposed Courses + Buried Courses)',
    howItIsCalculated: [
      'Wall height is divided by block height to calculate the number of courses.',
      'At least one base course must be buried beneath grade for shear stability.',
      'Computes drainage gravel volume behind the wall (1-foot gravel chimney) to prevent hydrostatic pressure buildup.',
    ],
    faqs: [
      { question: 'Why does the bottom course of a retaining wall need to be buried?', answer: 'Burying the first course (typically 1 inch for every 8 inches of wall height, minimum 4-6 inches) locks the base into the soil and prevents the wall from kicking outward.' },
      { question: 'Do I need geogrid soil reinforcement?', answer: 'Segmental gravity retaining walls taller than 4 feet typically require geogrid tiebacks layered into the backfill soil to prevent structural tipping.' },
      { question: 'When does a retaining wall need engineering?', answer: 'Generally above 4 feet, though many jurisdictions set the threshold lower, and any wall supporting a slope, a driveway or a structure needs design regardless of height. A failed retaining wall is both dangerous and expensive to rebuild.' },
      { question: 'Do I need drainage behind the wall?', answer: 'Always. Gravel backfill and a perforated drain pipe at the base relieve hydrostatic pressure, which is the single most common cause of retaining wall failure. Soil saturated after heavy rain exerts far more force than dry soil.' },
      { question: 'What is a geogrid and do I need one?', answer: "Geogrid is a synthetic mesh laid in horizontal layers into the backfill, tying the wall back into the soil mass behind it. Segmental walls above roughly 3-4 feet generally need it; the manufacturer's tables specify the spacing." },
    ],
    calculate: (inputs, unit) => {
      const res = calculateRetainingWall({
        unit,
        wallLength: Number(inputs.length),
        wallHeight: Number(inputs.height),
        blockSize: inputs.size,
        buriedCourses: Number(inputs.buried),
        wastePercent: Number(inputs.waste),
      });
      return {
        primaryValue: res.totalBlocksNeeded,
        primaryUnit: 'Blocks',
        primaryLabel: 'Total Wall Blocks Needed',
        details: [
          { label: 'Wall Courses', value: `${res.totalCourses} courses (${res.buriedCourses} buried)` },
          { label: 'Blocks per Course', value: res.blocksPerCourse },
          { label: 'Cap Stones', value: res.capBlocksNeeded, unit: 'caps', highlight: true },
          { label: 'Drainage Gravel (3/4")', value: res.drainageGravelCuYds, unit: 'cu yds', highlight: true },
        ],
      };
    },
  },

  'gravel-calculator': {
    slug: 'gravel-calculator',
    defaultInputs: { length: 40, width: 12, depth: 4, type: 'crushed-stone', compaction: 12 },
    fields: [
      { id: 'length', label: 'Driveway / Path Length', type: 'number', defaultValue: 40, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'width', label: 'Width', type: 'number', defaultValue: 12, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'depth', label: 'Gravel Depth', type: 'number', defaultValue: 4, unitImperial: 'in', unitMetric: 'cm', step: 0.5, min: 1 },
      {
        id: 'type',
        label: 'Gravel Material',
        type: 'select',
        defaultValue: 'crushed-stone',
        options: [
          { label: 'Crushed Stone / Crusher Run (1.4 tons/yd³)', value: 'crushed-stone' },
          { label: 'Pea Gravel / River Rock (1.35 tons/yd³)', value: 'pea-gravel' },
        ],
      },
      { id: 'compaction', label: 'Compaction Settlement %', type: 'number', defaultValue: 12, step: 1, min: 5 },
    ],
    formulaHighlight: 'Tons = (Area_sqft × Depth_in / 12) / 27 × 1.4 tons/cu yd × (1 + Compaction%)',
    howItIsCalculated: [
      'Computes raw cubic feet and converts to cubic yards (divided by 27).',
      'Crushed stone settles and compacts 10-15% under mechanical roller or vehicular weight.',
      'Density multiplier (~2,800 lbs or 1.4 tons per cubic yard) determines total delivered truck weight.',
    ],
    faqs: [
      { question: 'How deep should driveway gravel be?', answer: 'For a new driveway, install 4 to 6 inches of crushed base rock (#2 or #3 stone) topped with 2 to 3 inches of angular surface gravel (e.g. #57 or crusher run).' },
      { question: 'How many tons of gravel fit in a dump truck?', answer: 'A standard tri-axle dump truck delivers between 12 to 16 tons (approx 9 to 11 cubic yards) of crushed stone.' },
      { question: 'What size gravel should I use for a driveway?', answer: 'A base layer of 2-3 inch crushed stone, topped with 3/4 inch crushed stone with fines — the fines are what lock the surface together. Avoid rounded pea gravel for driveways; it never binds and migrates under tyres.' },
      { question: 'How many tons in a cubic yard of gravel?', answer: 'Roughly 1.4 tons for most crushed stone, varying with stone type and moisture. Suppliers quote by the ton or by the yard depending on region, so confirm which unit a price refers to before ordering.' },
      { question: 'Do I need landscape fabric under gravel?', answer: 'Yes for decorative areas and paths — it stops gravel sinking into the soil and greatly reduces weeds. For driveways, use a heavier woven geotextile rated for vehicle loads rather than standard landscape fabric.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateGravel({
        unit,
        areaLength: Number(inputs.length),
        areaWidth: Number(inputs.width),
        depthInches: Number(inputs.depth),
        gravelType: inputs.type,
        compactionBufferPercent: Number(inputs.compaction),
      });
      return {
        primaryValue: res.tonsNeeded,
        primaryUnit: 'Tons',
        primaryLabel: 'Total Gravel Weight Needed',
        details: [
          { label: 'Volume (Cubic Yards)', value: res.cubicYardsNeeded, unit: 'cu yds', highlight: true },
          { label: 'Metric Volume', value: res.cubicMetersNeeded, unit: 'm³' },
          { label: '50 lb Bags (if bag mixing)', value: res.bags50lb, unit: 'bags' },
          { label: 'Compaction Factor', value: `${res.compactionPercent}%` },
        ],
      };
    },
  },

  'wire-gauge-calculator': {
    slug: 'wire-gauge-calculator',
    defaultInputs: { amps: 20, distance: 75, voltage: 120, maxDrop: 3 },
    fields: [
      { id: 'amps', label: 'Circuit Amperage (Load)', type: 'number', defaultValue: 20, unitImperial: 'Amps', step: 5, min: 5, max: 100 },
      { id: 'distance', label: 'One-Way Distance to Panel', type: 'number', defaultValue: 75, unitImperial: 'ft', unitMetric: 'm', step: 5, min: 10 },
      {
        id: 'voltage',
        label: 'Circuit Voltage',
        type: 'select',
        defaultValue: '120',
        options: [
          { label: '120 Volts (Standard Receptacles & Lights)', value: '120' },
          { label: '240 Volts (EV Charger, Dryer, Water Heater, HVAC)', value: '240' },
        ],
      },
      { id: 'maxDrop', label: 'Allowable Voltage Drop %', type: 'number', defaultValue: 3, min: 1, max: 5 },
    ],
    formulaHighlight: 'Voltage Drop = (2 × Distance × Amps × Ohms_per_1000ft) / 1000',
    howItIsCalculated: [
      'National Electrical Code (NEC) specifies wire ampacity thresholds (14 AWG for 15A, 12 AWG for 20A, 10 AWG for 30A, 8 AWG for 40A, 6 AWG for 55A).',
      'Over long distances, wire resistance causes voltage drop; if the voltage drop exceeds 3%, the wire gauge must be upsized to the next thicker conductor.',
    ],
    faqs: [
      { question: 'Why does wire gauge matter over long distances?', answer: 'As distance increases, electrical resistance drops voltage. Excessive voltage drop can cause motors to overheat, LED lights to flicker, and appliances to wear out prematurely.' },
      { question: 'What is the NEC rule for voltage drop?', answer: 'NEC Informational Note 210.19(A) recommends that branch circuit voltage drop should not exceed 3% under continuous load for safe, efficient operation.' },
      { question: 'What happens if I use wire that is too small?', answer: 'The conductor overheats under load, insulation degrades, and the circuit becomes a fire risk. Breakers protect the wire, not the appliance, so an undersized conductor on an oversized breaker is specifically dangerous — never do it.' },
      { question: 'Does wire length really affect the gauge I need?', answer: 'Yes. Voltage drop grows with distance, and above roughly 100 feet you frequently need to go up one gauge to keep the drop under the 3% recommended for branch circuits. Long runs to a detached garage or shed are where this bites.' },
      { question: 'Should I hire an electrician?', answer: 'For any new circuit, panel work, or anything requiring a permit, yes — and in many jurisdictions it is legally required. This calculator is a planning aid; it is not a substitute for a licensed electrician or a code inspection.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateWireGauge({
        unit,
        circuitAmps: Number(inputs.amps),
        oneWayDistanceFeet: Number(inputs.distance),
        circuitVoltage: Number(inputs.voltage) as any,
        allowableVoltageDropPercent: Number(inputs.maxDrop),
      });
      return {
        primaryValue: res.recommendedGauge,
        primaryUnit: 'Copper',
        primaryLabel: 'Recommended Wire Gauge (AWG)',
        details: [
          { label: 'Calculated Voltage Drop', value: `${res.voltageDropVolts}V (${res.actualDropPercent}%)`, highlight: true },
          { label: 'Circuit Breaker Size', value: res.circuitBreakerSize, unit: 'Amps' },
          { label: 'One-Way Distance', value: res.oneWayDistanceFt, unit: 'ft' },
          { label: 'NEC Drop Compliance', value: res.isExceedingDropLimit ? 'Exceeds 3% Rec' : 'Compliant (<3%)', highlight: true },
        ],
      };
    },
  },

  'hvac-btu-calculator': {
    slug: 'hvac-btu-calculator',
    defaultInputs: { area: 450, height: 9, climate: 'moderate', insulation: 'average', sun: 'average', kitchen: false },
    fields: [
      { id: 'area', label: 'Room Floor Area', type: 'number', defaultValue: 450, unitImperial: 'sq ft', unitMetric: 'm²', step: 25, min: 50 },
      { id: 'height', label: 'Ceiling Height', type: 'number', defaultValue: 9, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 7 },
      {
        id: 'climate',
        label: 'Climate Zone',
        type: 'select',
        defaultValue: 'moderate',
        options: [
          { label: 'Mild Climate (Moderate Summers)', value: 'mild' },
          { label: 'Moderate Climate (Standard US Zone 4-5)', value: 'moderate' },
          { label: 'Hot Climate (High Humidity / South / Desert)', value: 'hot' },
        ],
      },
      {
        id: 'insulation',
        label: 'Insulation Quality',
        type: 'select',
        defaultValue: 'average',
        options: [
          { label: 'Good (Modern double-pane windows, 2x6 insulated walls)', value: 'good' },
          { label: 'Average (Standard insulation)', value: 'average' },
          { label: 'Poor (Older home, single-pane glass, drafty)', value: 'poor' },
        ],
      },
      { id: 'kitchen', label: 'Is this a kitchen? (+4,000 BTU for stoves)', type: 'checkbox', defaultValue: false },
    ],
    formulaHighlight: 'BTU = Area × 20 × ClimateFactor × InsulationFactor × HeightMultiplier',
    howItIsCalculated: [
      'Base cooling and heating load begins at 20 BTU per square foot for standard 8ft ceilings.',
      'Adjusted for ceiling height, climate zone multipliers, sun exposure, and cooking appliances.',
      '1 Ton of Air Conditioning equals 12,000 BTU/hr of cooling capacity.',
    ],
    faqs: [
      { question: 'What size mini-split do I need for a 500 sq ft room?', answer: 'A 500 square foot room with standard ceilings typically requires a 12,000 BTU (1 Ton) mini-split heat pump.' },
      { question: 'What happens if an AC unit is oversized?', answer: 'An oversized AC cools the room too quickly without running long enough to remove indoor humidity, leaving the air feeling damp, cold, and clammy.' },
      { question: 'Is bigger always better for air conditioning?', answer: 'No, and oversizing is actively harmful. An oversized unit cools the air quickly then shuts off before it has removed humidity, leaving the room cold and clammy, and the short cycling wears the compressor out early.' },
      { question: 'Does ceiling height change the BTU requirement?', answer: 'Yes. Standard calculations assume 8 foot ceilings; add roughly 10-15% for 9 foot and 20-25% for 10 foot, since you are conditioning volume rather than floor area.' },
      { question: 'What else affects the load besides room size?', answer: 'Sun exposure, window area and glazing type, insulation levels, number of occupants, and heat-producing appliances. A south-facing room with large windows can need 20-30% more capacity than the same room facing north.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateHvacBtu({
        unit,
        roomArea: Number(inputs.area),
        ceilingHeight: Number(inputs.height),
        climateZone: inputs.climate,
        insulationQuality: inputs.insulation,
        kitchenIncluded: Boolean(inputs.kitchen),
      });
      return {
        primaryValue: res.recommendedBtuRange,
        primaryUnit: '',
        primaryLabel: 'Recommended HVAC Capacity',
        details: [
          { label: 'AC Tonnage', value: `${res.recommendedTons} Tons`, highlight: true },
          { label: 'Base Cooling Load', value: res.baseBtu, unit: 'BTU' },
          { label: 'Climate Adjustment', value: res.climateAdjustmentBtu, unit: 'BTU' },
          { label: 'Ceiling Height Adder', value: res.heightAdjustmentBtu, unit: 'BTU' },
        ],
      };
    },
  },

  'stair-stringer-calculator': {
    slug: 'stair-stringer-calculator',
    defaultInputs: { totalRise: 105, desiredRiser: 7.5, treadDepth: 10.5, stairWidth: 36 },
    fields: [
      { id: 'totalRise', label: 'Total Vertical Rise (Floor-to-Floor)', type: 'number', defaultValue: 105, unitImperial: 'in', unitMetric: 'cm', step: 0.5, min: 12 },
      { id: 'desiredRiser', label: 'Target Riser Height', type: 'number', defaultValue: 7.5, unitImperial: 'in (max 7-3/4")', unitMetric: 'cm', step: 0.25, min: 6 },
      { id: 'treadDepth', label: 'Tread Run Depth', type: 'number', defaultValue: 10.5, unitImperial: 'in (min 10")', unitMetric: 'cm', step: 0.25, min: 9 },
      { id: 'stairWidth', label: 'Stair Width', type: 'number', defaultValue: 36, unitImperial: 'in', unitMetric: 'cm', step: 2, min: 24 },
    ],
    formulaHighlight: 'Steps = Round(Rise / 7.5") | Run = (Steps - 1) × TreadDepth',
    howItIsCalculated: [
      'Number of steps is calculated by dividing total rise by the target riser height (7.5" is IRC ideal).',
      'Exact riser height is computed by dividing total rise by step count, ensuring identical height for every step.',
      'Stringer board length is calculated using the Pythagorean theorem: √(Total Rise² + Total Run²).',
    ],
    faqs: [
      { question: 'What is the maximum stair riser height allowed by code?', answer: 'Under the International Residential Code (IRC R311.7.5.1), the maximum riser height is 7-3/4 inches (196 mm), and the maximum variation between the highest and lowest riser is 3/8 inch.' },
      { question: 'How many stringers are needed for a 36" wide staircase?', answer: 'Residential stairs require stringers spaced no more than 16 inches on-center. A standard 36-inch wide staircase requires at least 3 stringers (left, center, right).' },
      { question: 'What is the code for stair rise and run?', answer: 'The IRC allows a maximum 7 3/4 inch rise and requires a minimum 10 inch tread run, with no more than 3/8 inch variation between the largest and smallest riser in a flight. That consistency rule is what inspectors measure most closely.' },
      { question: 'Why does the bottom riser end up shorter?', answer: "Because the stringer sits on the finished floor while the tread thickness is added on top — the bottom riser must be cut down by one tread thickness to keep all risers equal. Missing this 'dropping the stringer' step is the classic stair-building error." },
      { question: 'How many stringers do I need?', answer: 'Three for a standard 36 inch wide staircase with 2x12 stringers — one at each side and one centred. Go to four for widths over 42 inches, or where treads are thinner than 1 inch.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateStairStringer({
        unit,
        totalRiseInches: Number(inputs.totalRise),
        desiredRiserHeightInches: Number(inputs.desiredRiser),
        treadDepthInches: Number(inputs.treadDepth),
        stairWidthInches: Number(inputs.stairWidth),
      });
      return {
        primaryValue: res.numberOfSteps,
        primaryUnit: 'Steps',
        primaryLabel: 'Total Steps (Risers)',
        details: [
          { label: 'Exact Riser Height', value: `${res.actualRiserHeightInches}"`, highlight: true },
          { label: 'Total Horizontal Run', value: `${res.totalRunInches}" (${res.totalRunFeet} ft)`, highlight: true },
          { label: 'Stringer 2x12 Lumber Length', value: `${res.stringerBoardLengthFt} ft board`, highlight: true },
          { label: 'Stringers Required', value: res.stringersCount, unit: 'stringers' },
          { label: 'Incline Slope Angle', value: `${res.stairAngleDegrees}°` },
        ],
      };
    },
  },

  'gutter-calculator': {
    slug: 'gutter-calculator',
    defaultInputs: { runLength: 120, spacing: 35, runs: 2, insideCorners: 1, outsideCorners: 2 },
    fields: [
      { id: 'runLength', label: 'Total Gutter Run (Roof Perimeter)', type: 'number', defaultValue: 120, unitImperial: 'ft', unitMetric: 'm', step: 5, min: 10 },
      { id: 'spacing', label: 'Downspout Spacing Rule', type: 'number', defaultValue: 35, unitImperial: 'ft (standard 35-40)', step: 5, min: 20 },
      { id: 'runs', label: 'Number of Straight Runs', type: 'number', defaultValue: 2, min: 1 },
      { id: 'insideCorners', label: 'Inside Corners (Valley Turns)', type: 'number', defaultValue: 1, min: 0 },
      { id: 'outsideCorners', label: 'Outside Corners (Hip Turns)', type: 'number', defaultValue: 2, min: 0 },
    ],
    formulaHighlight: 'Downspouts = ⌈Gutter Run / 35ft⌉ | Hangers = ⌈Gutter Run / 2ft⌉',
    howItIsCalculated: [
      'Roof drainage rules recommend at least one downspout for every 35 to 40 linear feet of gutter.',
      'Hidden screw hangers are installed every 24 inches along the fascia board.',
      'End caps are required at the two terminates of every continuous run.',
    ],
    faqs: [
      { question: 'Should I choose 5-inch or 6-inch gutters?', answer: '5-inch gutters are standard for moderate rainfall and low-slope roofs. 6-inch gutters hold 40% more water volume, making them ideal for metal roofs, steep pitches, or heavy rain areas.' },
      { question: 'How much slope does a rain gutter require?', answer: 'Gutters should slope at least 1/4 inch per 10 feet toward the nearest downspout to ensure positive drainage without standing water.' },
      { question: 'What size gutter do I need?', answer: '5 inch K-style handles most residential roofs. Move to 6 inch for large roof areas, steep pitches that shed water fast, or regions with intense downpours. Undersized gutters overflow at exactly the moment they are most needed.' },
      { question: 'How many downspouts do I need?', answer: 'One per 30-40 feet of gutter run as a rule, and at minimum one per gutter section. A long run with a single downspout backs up at the far end during heavy rain regardless of gutter size.' },
      { question: 'What slope should gutters have?', answer: 'About 1/4 inch of fall per 10 feet toward the downspout — enough to drain, not so much that it is visibly out of line with the fascia. Long runs are often pitched from a high point in the middle toward downspouts at each end.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateGutter({
        unit,
        gutterRunLength: Number(inputs.runLength),
        downspoutSpacing: Number(inputs.spacing),
        sections: Number(inputs.runs),
        insideCorners: Number(inputs.insideCorners),
        outsideCorners: Number(inputs.outsideCorners),
      });
      return {
        primaryValue: res.linearFeetNeeded,
        primaryUnit: 'Linear Feet',
        primaryLabel: 'Total Gutter Footage',
        details: [
          { label: 'Downspouts Needed', value: res.downspoutsNeeded, unit: 'downspouts', highlight: true },
          { label: 'Fascia Hangers (every 2ft)', value: res.gutterHangersNeeded, unit: 'hangers', highlight: true },
          { label: 'End Caps', value: res.endCapsNeeded, unit: 'caps' },
          { label: '10ft Sections', value: res.gutterSections10ft, unit: 'sections' },
        ],
      };
    },
  },

  'siding-calculator': {
    slug: 'siding-calculator',
    defaultInputs: { perimeter: 140, height: 18, doors: 2, windows: 8, waste: 12 },
    fields: [
      { id: 'perimeter', label: 'Exterior Wall Perimeter', type: 'number', defaultValue: 140, unitImperial: 'ft', unitMetric: 'm', step: 5, min: 20 },
      { id: 'height', label: 'Average Wall Height', type: 'number', defaultValue: 18, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 8 },
      { id: 'doors', label: 'Exterior Doors', type: 'number', defaultValue: 2, min: 0 },
      { id: 'windows', label: 'Windows to Deduct', type: 'number', defaultValue: 8, min: 0 },
      { id: 'waste', label: 'Waste Buffer %', type: 'number', defaultValue: 12, step: 1, min: 5 },
    ],
    formulaHighlight: 'Siding Squares = ⌈((Gross Area - Openings) / 100) × (1 + Waste%)⌉',
    howItIsCalculated: [
      'Exterior siding is quantified in standard construction "Squares" (1 square = 100 square feet).',
      'Calculates deductions for exterior doors (21 sq ft) and windows (15 sq ft).',
      'Provides accessory requirements including starter strip linear feet and J-channel trim.',
    ],
    faqs: [
      { question: 'What is a "square" in exterior siding?', answer: 'A square is the construction trade unit of measurement representing exactly 100 square feet of finished wall surface.' },
      { question: 'How much waste should I add for siding?', answer: 'Add 10% for simple rectangular homes. Add 12% to 15% for multi-story homes with gables, dormers, and complex cut angles.' },
      { question: 'How much extra siding should I order?', answer: '10% for a simple rectangular elevation, 15% where there are gables, dormers or many windows. Every angled cut at a gable produces an offcut that usually cannot be used elsewhere.' },
      { question: 'Do I need house wrap behind siding?', answer: 'Yes. House wrap is a weather-resistive barrier and a drainage plane — siding is not waterproof, and water that gets behind it needs a path back out. Lap it shingle-style from the bottom up and tape the seams.' },
      { question: 'How do I handle expansion with vinyl siding?', answer: 'Nail in the centre of the slots, leave the panel able to slide, and never drive the nail tight — vinyl expands and contracts substantially with temperature. Face-nailed vinyl buckles in summer heat, and it is the most common vinyl siding failure.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateSiding({
        unit,
        wallLength: Number(inputs.perimeter),
        wallHeight: Number(inputs.height),
        doors: Number(inputs.doors),
        windows: Number(inputs.windows),
        wastePercent: Number(inputs.waste),
      });
      return {
        primaryValue: res.sidingSquaresNeeded,
        primaryUnit: 'Squares',
        primaryLabel: 'Siding Squares (100 sq ft each)',
        details: [
          { label: 'Net Surface Area', value: unit === 'imperial' ? res.netWallAreaSqFt : res.netWallAreaSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
          { label: '12ft Lap Panels', value: res.sidingPanelsNeeded, unit: 'panels', highlight: true },
          { label: 'Starter Strip', value: res.starterStripLinearFt, unit: 'linear ft' },
          { label: 'J-Channel Trim', value: res.jChannelLinearFt, unit: 'linear ft', highlight: true },
        ],
      };
    },
  },

  'board-feet-calculator': {
    slug: 'board-feet-calculator',
    defaultInputs: { thickness: 1, width: 6, length: 8, qty: 10, price: 6.5, waste: 15 },
    fields: [
      { id: 'thickness', label: 'Board Thickness (Rough or Surfaced)', type: 'number', defaultValue: 1, unitImperial: 'in (4/4 = 1")', step: 0.25, min: 0.5 },
      { id: 'width', label: 'Board Width', type: 'number', defaultValue: 6, unitImperial: 'in', step: 0.5, min: 1 },
      { id: 'length', label: 'Board Length', type: 'number', defaultValue: 8, unitImperial: 'ft', step: 0.5, min: 1 },
      { id: 'qty', label: 'Number of Boards', type: 'number', defaultValue: 10, min: 1 },
      { id: 'price', label: 'Price per Board Foot ($)', type: 'number', defaultValue: 6.5, step: 0.25, min: 0 },
      { id: 'waste', label: 'Jointing & Planing Waste %', type: 'number', defaultValue: 15, step: 1, min: 0 },
    ],
    formulaHighlight: 'Board Feet = (Thickness_in × Width_in × Length_ft) / 12 × Quantity',
    howItIsCalculated: [
      'One board foot represents the nominal volume of a board 1 inch thick, 12 inches wide, and 1 foot long (144 cubic inches).',
      'Calculates total volume for lumberyards and hardwood distributors with an optional milling waste allowance.',
    ],
    faqs: [
      { question: 'What does "4/4" and "8/4" lumber mean?', answer: 'Hardwood lumber is sold in quarter-inch thickness increments: 4/4 is 1" thick, 5/4 is 1.25" thick, 6/4 is 1.5" thick, and 8/4 is 2" thick.' },
      { question: 'How much waste should I calculate for rough hardwood?', answer: 'Always buy 15% to 20% extra rough lumber to allow for jointing bowed boards, planing cup, and trimming end checks/cracks.' },
      { question: 'What is a board foot?', answer: '144 cubic inches of lumber — 1 inch thick by 12 inches wide by 12 inches long. Hardwood is sold by the board foot rather than by the linear foot, because widths vary board to board.' },
      { question: 'Is the thickness nominal or actual?', answer: 'Board feet use nominal thickness in quarters — 4/4 is one inch nominal, 8/4 is two inches. Surfaced lumber measures less than nominal, but you are charged on the nominal figure, which surprises people buying hardwood for the first time.' },
      { question: 'How much extra hardwood should I buy?', answer: '20-30% over the finished requirement. Rough hardwood contains defects you will cut around, and boards need jointing and planing to final dimension. This is much higher than the allowance for dimensional softwood.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateBoardFeet({
        unit,
        thicknessInches: Number(inputs.thickness),
        widthInches: Number(inputs.width),
        lengthFeet: Number(inputs.length),
        quantity: Number(inputs.qty),
        pricePerBoardFoot: inputs.price ? Number(inputs.price) : undefined,
        wastePercent: Number(inputs.waste),
      });
      return {
        primaryValue: res.boardFeetWithWaste,
        primaryUnit: 'BF',
        primaryLabel: 'Total Board Feet (with Waste)',
        details: [
          { label: 'Single Board Volume', value: res.singleBoardFeet, unit: 'BF' },
          { label: 'Total Raw Volume', value: res.totalBoardFeet, unit: 'BF' },
          { label: 'Metric Volume', value: res.cubicMeters, unit: 'm³' },
          { label: 'Estimated Lumber Cost', value: res.estimatedCost ? `$${res.estimatedCost}` : '—', highlight: true },
        ],
      };
    },
  },

  'epoxy-floor-calculator': {
    slug: 'epoxy-floor-calculator',
    defaultInputs: { garage: '2-car', area: 480, coats: 2, flakes: true },
    fields: [
      {
        id: 'garage',
        label: 'Garage Size Preset',
        type: 'select',
        defaultValue: '2-car',
        options: [
          { label: '2-Car Garage (~480 sq ft)', value: '2-car' },
          { label: '1-Car Garage (~240 sq ft)', value: '1-car' },
          { label: '3-Car Garage (~720 sq ft)', value: '3-car' },
          { label: 'Custom Floor Dimensions', value: 'custom' },
        ],
      },
      { id: 'area', label: 'Custom Floor Area (if selected)', type: 'number', defaultValue: 480, unitImperial: 'sq ft', unitMetric: 'm²', step: 20, min: 50 },
      { id: 'coats', label: 'Epoxy Coats', type: 'number', defaultValue: 2, min: 1, max: 3 },
      { id: 'flakes', label: 'Broadcast Decorative Color Flakes', type: 'checkbox', defaultValue: true },
    ],
    formulaHighlight: 'Epoxy Gallons = (Floor Area / 220 sq ft) × Coats',
    howItIsCalculated: [
      'Epoxy floor coatings yield approximately 200 to 250 square feet per gallon on prepped concrete.',
      'Calculates standard 2.5-gallon retail epoxy kits, clear topcoat gallons, and broadcast vinyl flake density.',
    ],
    faqs: [
      { question: 'Why is concrete acid etching necessary before epoxy?', answer: 'Acid etching opens the pores of smooth concrete (creating a profile like 120-grit sandpaper), allowing the epoxy to chemically bond without peeling.' },
      { question: 'How long must a new concrete slab cure before epoxy?', answer: 'New concrete must cure for at least 28 to 30 days and pass a moisture test before applying epoxy to prevent moisture vapor blistering.' },
      { question: 'How long does epoxy take to cure?', answer: 'Foot traffic after 24 hours, vehicles after 72 hours to 7 days depending on product and temperature. Driving on epoxy too early causes tyre marks that cannot be removed.' },
      { question: 'Do I need to etch or grind the concrete first?', answer: 'Yes — this is what determines whether the floor lasts. Diamond grinding is far more reliable than acid etching. Epoxy over unprepared, sealed or contaminated concrete will peel off in sheets, often within a year.' },
      { question: 'Will epoxy work over a damp slab?', answer: 'No. Test with a plastic sheet taped down for 24 hours; condensation underneath means the slab is passing moisture, and epoxy will delaminate. A moisture-tolerant primer or vapour barrier system is required in that case.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateEpoxyFloor({
        unit,
        floorArea: Number(inputs.area),
        garagePreset: inputs.garage,
        coats: Number(inputs.coats),
        decorativeFlakes: Boolean(inputs.flakes),
      });
      return {
        primaryValue: res.totalEpoxyGallons,
        primaryUnit: 'Gallons',
        primaryLabel: 'Epoxy Coating Needed',
        details: [
          { label: 'Standard DIY Epoxy Kits', value: res.epoxyKitsNeeded, unit: 'kits', highlight: true },
          { label: 'Clear Protective Topcoat', value: res.clearTopcoatGallons, unit: 'gallons', highlight: true },
          { label: 'Decorative Flakes', value: res.flakeLbsNeeded, unit: 'lbs' },
          { label: 'Concrete Cleaner/Etch', value: res.concreteEtchCleanerLbs, unit: 'lbs' },
        ],
      };
    },
  },
};

/**
 * Every one of the 42 calculators now resolves to a bespoke config: the 20
 * defined above, plus the 22 in EXTENDED_CONFIGS. The generic builder below is
 * retained only as a crash guard for an unknown slug and is no longer reachable
 * from any real route — if it ever fires, a calculator is missing a config.
 */
export function getCalculatorConfig(slug: string): CalculatorConfig {
  if (CALCULATOR_CONFIGS[slug]) {
    return CALCULATOR_CONFIGS[slug];
  }
  if (EXTENDED_CONFIGS[slug]) {
    return EXTENDED_CONFIGS[slug];
  }

  // Smart dynamic builder for any long-tail calculator
  return {
    slug,
    defaultInputs: { length: 20, width: 10, waste: 10 },
    fields: [
      { id: 'length', label: 'Primary Length / Dimension', type: 'number', defaultValue: 20, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'width', label: 'Width / Spacing', type: 'number', defaultValue: 10, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'waste', label: 'Waste Buffer %', type: 'number', defaultValue: 10, step: 1, min: 0 },
    ],
    formulaHighlight: 'Material Needed = ⌈(Length × Width) × (1 + Waste%)⌉',
    howItIsCalculated: [
      'Calculates base surface coverage area based on project dimensions.',
      'Applies industry standard cut and scrap allowances.',
      'Converts dimensions according to selected regional unit systems.',
    ],
    faqs: [
      { question: 'How is the waste percentage determined?', answer: 'Standard rectangular applications use 8-10% waste buffer. Complex rooms or custom installations require 15% to 20%.' },
      { question: 'Can I switch between imperial and metric units?', answer: 'Yes, use the unit toggle in the top header or page to switch between feet/inches and meters/centimeters.' },
    ],
    calculate: (inputs, unit) => {
      const l = Number(inputs.length) || 20;
      const w = Number(inputs.width) || 10;
      const waste = Number(inputs.waste) || 10;
      const area = l * w;
      const total = Math.ceil(area * (1 + waste / 100));
      return {
        primaryValue: total,
        primaryUnit: unit === 'imperial' ? 'Units' : 'Units',
        primaryLabel: 'Total Material Estimated',
        details: [
          { label: 'Calculated Surface Area', value: area, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
          { label: 'Waste Allowance', value: `${waste}%` },
          { label: 'Estimated Material Units', value: total, highlight: true },
        ],
      };
    },
  };
}
