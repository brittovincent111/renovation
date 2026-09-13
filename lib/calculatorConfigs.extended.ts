/**
 * Bespoke configs for the 22 calculators that previously fell through to the
 * generic fallback in getCalculatorConfig().
 *
 * Every calculation module referenced here already existed in lib/calculators/
 * but was never wired into CALCULATOR_CONFIGS, so these pages shipped identical
 * placeholder fields, explanation text and FAQs as one another.
 */
import type { CalculatorConfig } from './calculatorConfigs';
import { calculateFlooring } from './calculators/flooring';
import { calculateTileMortar } from './calculators/tileMortar';
import { calculateWallpaper } from './calculators/wallpaper';
import { calculateDrywall } from './calculators/drywall';
import { calculateDrywallMud } from './calculators/drywallMud';
import { calculateBrick } from './calculators/brick';
import { calculateRebar } from './calculators/rebar';
import { calculatePlywood } from './calculators/plywood';
import { calculateDeck } from './calculators/deck';
import { calculateDeckRailing } from './calculators/deckRailing';
import { calculateDeckFooting } from './calculators/deckFooting';
import { calculateRoofing } from './calculators/roofing';
import { calculateShedRoof } from './calculators/shedRoof';
import { calculateInsulation } from './calculators/insulation';
import { calculateAtticVentilation } from './calculators/atticVentilation';
import { calculateMulchSoil } from './calculators/mulchSoil';
import { calculateSod } from './calculators/sod';
import { calculateFence } from './calculators/fence';
import { calculateFrenchDrain } from './calculators/frenchDrain';
import { calculateDrivewaySealer } from './calculators/drivewaySealer';
import { calculatePlumbingPipe } from './calculators/plumbingPipe';
import { calculateCabinetHardware } from './calculators/cabinetHardware';

export const EXTENDED_CONFIGS: Record<string, CalculatorConfig> = {
  'flooring-calculator': {
    slug: 'flooring-calculator',
    defaultInputs: { length: 20, width: 14, material: 'laminate', boxCoverage: 20, price: 0 },
    fields: [
      { id: 'length', label: 'Room Length', type: 'number', defaultValue: 20, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      { id: 'width', label: 'Room Width', type: 'number', defaultValue: 14, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      { id: 'material', label: 'Flooring Material', type: 'select', defaultValue: 'laminate', options: [
        { label: 'Solid / Engineered Hardwood', value: 'hardwood' },
        { label: 'Laminate', value: 'laminate' },
        { label: 'Luxury Vinyl Plank (LVP)', value: 'vinyl' },
        { label: 'Ceramic / Porcelain Tile', value: 'tile' },
      ], helperText: 'Waste allowance is set automatically from the material — hardwood needs more than vinyl.' },
      { id: 'boxCoverage', label: 'Coverage per Box', type: 'number', defaultValue: 20, unitImperial: 'sq ft', unitMetric: 'm²', step: 1, min: 1, isAdvanced: true, helperText: 'Printed on the carton. Varies by brand and plank width.' },
      { id: 'price', label: 'Price per Sq Ft / m² (optional)', type: 'number', defaultValue: 0, step: 0.25, min: 0, isAdvanced: true },
    ],
    formulaHighlight: 'Boxes = ⌈(Room Area × (1 + Waste%)) ÷ Coverage per Box⌉',
    howItIsCalculated: [
      'Room area is multiplied by a material-specific waste factor rather than a flat number: hardwood and tile are cut to fit and run higher, while click-lock laminate and vinyl plank waste less because offcuts start the next row.',
      'Box counts always round up — flooring is sold by the carton, and dye-lot variation between batches means a mid-job top-up rarely matches.',
      'Diagonal or herringbone layouts add roughly 5-10% on top of the figure shown here because every board meets the wall at an angle.',
    ],
    faqs: [
      { question: 'How much extra flooring should I buy?', answer: 'Plan on 5-7% for straight-lay laminate or vinyl plank, 10% for hardwood, and 10-15% for tile or any diagonal pattern. Keep at least one full box sealed after the job for future repairs — a plank damaged in year three cannot usually be colour-matched.' },
      { question: 'Do I subtract kitchen islands and cabinets?', answer: 'Subtract permanent islands and full-height cabinetry. Do not subtract appliances — flooring should run under a dishwasher or refrigerator so the unit can be pulled out for service without hitting a lip.' },
      { question: 'Why does my box coverage differ from the default?', answer: 'Coverage per carton varies from about 16 to 30 sq ft depending on plank width and thickness. Always read the figure from the actual carton you are buying rather than the calculator default.' },
      { question: 'Can I install new flooring over existing floors?', answer: 'Floating floors (laminate, LVP) can usually go over vinyl or tile if the surface is flat within 3/16" over 10 ft. Never float over carpet, and never install over a subfloor reading above 12% moisture.' },
      { question: 'How much does underlayment add?', answer: 'Underlayment is sold by the same square footage as the floor, so use the room area figure rather than the waste-adjusted one. Many laminates and LVPs ship with a pad pre-attached — check before buying it twice.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateFlooring({
        unit,
        roomLength: Number(inputs.length),
        roomWidth: Number(inputs.width),
        materialType: inputs.material,
        sqUnitsPerBox: Number(inputs.boxCoverage) || undefined,
        pricePerUnit: Number(inputs.price) || undefined,
      });
      return {
        primaryValue: unit === 'imperial' ? res.materialNeededSqFt : res.materialNeededSqM,
        primaryUnit: unit === 'imperial' ? 'sq ft' : 'm²',
        primaryLabel: `${res.materialName} to Purchase`,
        details: [
          ...(res.boxesNeeded ? [{ label: 'Boxes Needed', value: res.boxesNeeded, unit: 'boxes', highlight: true }] : []),
          { label: 'Room Area', value: unit === 'imperial' ? res.roomAreaSqFt : res.roomAreaSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
          { label: 'Waste Allowance Applied', value: `${res.wastePercent}%` },
          ...(res.estimatedCost ? [{ label: 'Estimated Material Cost', value: `$${res.estimatedCost.toLocaleString()}` }] : []),
        ],
      };
    },
  },

  'tile-mortar-calculator': {
    slug: 'tile-mortar-calculator',
    defaultInputs: { area: 120, trowel: '1/4x3/8', substrate: 'cement-backer', waste: 10 },
    fields: [
      { id: 'area', label: 'Tiled Surface Area', type: 'number', defaultValue: 120, unitImperial: 'sq ft', unitMetric: 'm²', step: 5, min: 1 },
      { id: 'trowel', label: 'Trowel Notch Size', type: 'select', defaultValue: '1/4x3/8', options: [
        { label: 'V-notch (mosaic, small tile)', value: 'v-notch' },
        { label: '1/4" x 1/4" square notch', value: '1/4x1/4' },
        { label: '1/4" x 3/8" square notch', value: '1/4x3/8' },
        { label: '1/2" x 1/2" square notch (large format)', value: '1/2x1/2' },
      ], helperText: 'Notch size is the single biggest driver of coverage — it roughly halves between the smallest and largest.' },
      { id: 'substrate', label: 'Substrate', type: 'select', defaultValue: 'cement-backer', options: [
        { label: 'Concrete slab', value: 'concrete' },
        { label: 'Cement backer board', value: 'cement-backer' },
        { label: 'Plywood / OSB', value: 'plywood' },
        { label: 'Uncoupling membrane (Ditra etc.)', value: 'membrane' },
      ] },
      { id: 'waste', label: 'Waste Buffer %', type: 'number', defaultValue: 10, step: 1, min: 0, isAdvanced: true },
    ],
    formulaHighlight: 'Bags = ⌈(Area × (1 + Waste%)) ÷ Coverage per 50 lb Bag⌉',
    howItIsCalculated: [
      'Coverage is driven by trowel notch, not by tile size directly — a 1/4" x 1/4" notch spreads roughly twice as far as a 1/2" x 1/2" notch from the same bag.',
      'Porous substrates such as plywood and backer board absorb moisture from the mortar bed and consume measurably more than a sealed concrete slab or an uncoupling membrane.',
      'Large-format tile over 15" on any side generally needs back-buttering, which adds material beyond the notch figure. Treat the result as a floor, not a ceiling.',
    ],
    faqs: [
      { question: 'How many square feet does a 50 lb bag of thinset cover?', answer: 'Roughly 95-100 sq ft with a 1/4" x 1/4" notch, 60-70 sq ft with a 1/4" x 3/8" notch, and 40-45 sq ft with a 1/2" x 1/2" notch. Those figures assume a flat substrate — an uneven floor can consume far more.' },
      { question: 'What trowel size do I need for my tile?', answer: 'As a rule: mosaics and tile under 4" use a V-notch or 1/4" x 1/4"; 8"-12" tile uses 1/4" x 3/8"; anything 12" x 24" or larger uses 1/2" x 1/2" with back-buttering. Correct notch should leave at least 80% mortar contact under the tile when you pull one up to check.' },
      { question: 'Can I mix thinset the day before?', answer: 'No. Modified thinset has a pot life of roughly 2-4 hours once water is added, and re-tempering it with more water after it stiffens destroys the bond strength. Mix only what you can place in that window.' },
      { question: 'Do I need modified or unmodified thinset?', answer: 'Use unmodified over uncoupling membranes such as Ditra — the membrane cannot breathe through modified mortar and the cure is compromised. Use modified for most other substrates and for porcelain, which is dense and less absorbent.' },
      { question: 'How much water does a bag need?', answer: 'Typically 5-6 quarts per 50 lb bag, but follow the bag. Mix, slake for 5-10 minutes, then remix without adding water — skipping the slake is the most common cause of weak bond.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateTileMortar({
        unit,
        tileAreaSqFt: Number(inputs.area),
        trowelNotchSize: inputs.trowel,
        substrate: inputs.substrate,
        wastePercent: Number(inputs.waste),
      });
      return {
        primaryValue: res.bags50lbNeeded,
        primaryUnit: 'bags',
        primaryLabel: '50 lb Thinset Bags Needed',
        details: [
          { label: 'Coverage per Bag', value: res.coveragePerBagSqFt, unit: 'sq ft', highlight: true },
          { label: 'Recommended Trowel', value: res.recommendedTrowel },
          { label: 'Mixing Water Required', value: res.waterGallonsForMixing, unit: 'gal' },
          { label: 'Tiled Area', value: unit === 'imperial' ? res.tileAreaSqFt : res.tileAreaSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
          { label: 'Waste Allowance', value: `${res.wastePercent}%` },
        ],
      };
    },
  },

  'wallpaper-calculator': {
    slug: 'wallpaper-calculator',
    defaultInputs: { height: 8, perimeter: 48, rollWidth: 20.5, rollLength: 33, repeat: 0, doors: 1, windows: 2 },
    fields: [
      { id: 'height', label: 'Wall Height', type: 'number', defaultValue: 8, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      { id: 'perimeter', label: 'Total Wall Length', type: 'number', defaultValue: 48, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1, helperText: 'Add the length of every wall you are papering.' },
      { id: 'repeat', label: 'Pattern Repeat', type: 'number', defaultValue: 0, unitImperial: 'in', unitMetric: 'cm', step: 1, min: 0, helperText: 'Printed on the roll label. Enter 0 for plain, textured or non-repeating paper.' },
      { id: 'doors', label: 'Doors', type: 'number', defaultValue: 1, step: 1, min: 0 },
      { id: 'windows', label: 'Windows', type: 'number', defaultValue: 2, step: 1, min: 0 },
      { id: 'rollWidth', label: 'Roll Width', type: 'number', defaultValue: 20.5, unitImperial: 'in', unitMetric: 'cm', step: 0.5, min: 1, isAdvanced: true },
      { id: 'rollLength', label: 'Roll Length', type: 'number', defaultValue: 33, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1, isAdvanced: true },
    ],
    formulaHighlight: 'Rolls = ⌈Strips Needed ÷ Strips per Roll⌉, where strip length = wall height + pattern repeat',
    howItIsCalculated: [
      'Wallpaper is estimated in vertical strips, not by area. Each strip must be cut to the full wall height plus one pattern repeat so the design lines up with its neighbour, and the offcut is usually unusable.',
      'A large repeat is expensive: a 21" repeat on an 8 ft wall can waste nearly a fifth of every roll, which is why two papers covering the same wall can differ by several rolls.',
      'Doors and windows are deducted at standard sizes, but only where a full strip is displaced — a window in the middle of a wall still needs paper above and below it.',
    ],
    faqs: [
      { question: 'Why does pattern repeat matter so much?', answer: 'Every strip has to be cut so its pattern aligns with the strip beside it, so the usable length of a roll drops by up to one repeat per strip. A paper with a 24" repeat can need 25-30% more rolls than a plain paper covering the same wall.' },
      { question: 'What is the difference between a single and a double roll?', answer: 'American wallpaper is priced by the single roll but almost always packaged and sold as a double roll — twice the length in one bolt. This calculator returns single-roll equivalents, so halve the figure when ordering doubles.' },
      { question: 'Should I order all rolls at once?', answer: 'Yes, and check that every bolt carries the same batch or run number. Colour varies measurably between print runs, and a top-up roll ordered later will often read as a different shade on the wall.' },
      { question: 'Do I deduct doors and windows?', answer: 'Deduct them, but conservatively. A door removes roughly 20 sq ft and a window 15 sq ft of coverage, but you still need continuous strips above a door and above and below a window, so the saving is smaller than the opening suggests.' },
      { question: 'How much extra should I buy?', answer: 'One extra single roll beyond the calculated figure for a straight-match paper, two for a large drop-match repeat. Papering is unforgiving of a miscut, and a batch-matched spare is worth far more than its price.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateWallpaper({
        unit,
        wallHeight: Number(inputs.height),
        totalWallLength: Number(inputs.perimeter),
        rollWidth: Number(inputs.rollWidth),
        rollLength: Number(inputs.rollLength),
        patternRepeat: Number(inputs.repeat),
        doorsCount: Number(inputs.doors),
        windowsCount: Number(inputs.windows),
      });
      return {
        primaryValue: res.rollsNeededWithBuffer,
        primaryUnit: 'rolls',
        primaryLabel: 'Single Rolls to Order',
        details: [
          { label: 'Rolls Before Buffer', value: res.rollsNeeded, unit: 'rolls' },
          { label: 'Strips Required', value: res.stripsNeeded, unit: 'strips', highlight: true },
          { label: 'Usable Strips per Roll', value: res.stripsPerRoll },
          { label: 'Pattern Repeat Applied', value: res.patternRepeatApplied, unit: unit === 'imperial' ? 'in' : 'cm' },
          { label: 'Net Wall Area', value: unit === 'imperial' ? res.totalWallAreaSqFt : res.totalWallAreaSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
        ],
      };
    },
  },

  'drywall-calculator': {
    slug: 'drywall-calculator',
    defaultInputs: { length: 14, width: 12, height: 8, ceiling: true, doors: 1, windows: 2, sheet: '4x8', waste: 10 },
    fields: [
      { id: 'length', label: 'Room Length', type: 'number', defaultValue: 14, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      { id: 'width', label: 'Room Width', type: 'number', defaultValue: 12, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      { id: 'height', label: 'Ceiling Height', type: 'number', defaultValue: 8, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      { id: 'sheet', label: 'Sheet Size', type: 'select', defaultValue: '4x8', options: [
        { label: "4' x 8' (32 sq ft) — easiest to handle", value: '4x8' },
        { label: "4' x 12' (48 sq ft) — fewer butt joints", value: '4x12' },
      ] },
      { id: 'ceiling', label: 'Include Ceiling', type: 'checkbox', defaultValue: true },
      { id: 'doors', label: 'Doors', type: 'number', defaultValue: 1, step: 1, min: 0 },
      { id: 'windows', label: 'Windows', type: 'number', defaultValue: 2, step: 1, min: 0 },
      { id: 'waste', label: 'Waste Buffer %', type: 'number', defaultValue: 10, step: 1, min: 0, isAdvanced: true },
    ],
    formulaHighlight: 'Sheets = ⌈(Net Wall Area + Ceiling Area) × (1 + Waste%) ÷ Sheet Area⌉',
    howItIsCalculated: [
      'Gross wall area is perimeter × height, less standard deductions for each door (about 21 sq ft) and window (about 12 sq ft). Ceilings are added separately when selected.',
      'Longer 4\' x 12\' sheets reduce the number of butt joints — the hardest joints to finish invisibly, because they have no tapered edge — so they are usually worth the extra handling on walls over 8 ft.',
      'Screw, tape and compound quantities are derived from the final sheet count using standard spacing of 16" in the field and 8" along edges.',
    ],
    faqs: [
      { question: 'Should I hang drywall horizontally or vertically?', answer: 'Horizontally on walls in residential work. It puts the tapered seam at a comfortable working height, reduces total joint length by around 25%, and ties more studs together. Vertical hanging is normal in commercial work where fire-rated assemblies specify it.' },
      { question: 'What thickness do I need?', answer: '1/2" is standard for walls and for ceilings framed at 16" on centre. Use 5/8" on ceilings framed at 24" on centre to prevent sag, and 5/8" Type X wherever a fire rating is required, such as a garage sharing a wall with living space.' },
      { question: 'How many screws per sheet?', answer: 'About 32 screws for a 4\' x 8\' sheet at 16" field spacing and 8" edge spacing — roughly 1 lb of screws per 5-6 sheets. Set each screw just below the surface without breaking the paper face; a torn face holds almost nothing.' },
      { question: 'Do I need moisture-resistant board in a bathroom?', answer: 'Use mould-resistant board throughout a bathroom, and cement backer board rather than any drywall directly behind tile in a shower or tub surround. Standard greenboard is not a tile backer in a wet area.' },
      { question: 'How much does a sheet weigh?', answer: 'A 4\' x 8\' sheet of 1/2" board is about 51 lb; a 4\' x 12\' sheet of 5/8" is about 96 lb. Plan on two people for ceilings, or hire a panel lift — ceiling sheets are the most common cause of injury on a drywall job.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateDrywall({
        unit,
        roomLength: Number(inputs.length),
        roomWidth: Number(inputs.width),
        roomHeight: Number(inputs.height),
        includeCeiling: Boolean(inputs.ceiling),
        doorsCount: Number(inputs.doors),
        windowsCount: Number(inputs.windows),
        sheetSize: inputs.sheet,
        wastePercent: Number(inputs.waste),
      });
      return {
        primaryValue: res.sheetsNeeded,
        primaryUnit: 'sheets',
        primaryLabel: `${inputs.sheet === '4x12' ? "4' x 12'" : "4' x 8'"} Sheets Needed`,
        details: [
          { label: 'Total Area to Cover', value: unit === 'imperial' ? res.totalAreaSqFt : res.totalAreaSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²', highlight: true },
          { label: 'Net Wall Area', value: unit === 'imperial' ? res.netWallAreaSqFt : res.netWallAreaSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
          { label: 'Deducted for Openings', value: unit === 'imperial' ? res.deductionsSqFt : res.deductionsSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
          { label: 'Joint Compound', value: res.jointCompoundBuckets, unit: 'buckets' },
          { label: 'Joint Tape', value: res.tapeRollsNeeded, unit: 'rolls' },
          { label: 'Screws', value: res.screwsLbs, unit: 'lbs' },
        ],
      };
    },
  },

  'drywall-mud-calculator': {
    slug: 'drywall-mud-calculator',
    defaultInputs: { area: 800, level: 'level-4', waste: 10 },
    fields: [
      { id: 'area', label: 'Drywall Area Installed', type: 'number', defaultValue: 800, unitImperial: 'sq ft', unitMetric: 'm²', step: 10, min: 1 },
      { id: 'level', label: 'Finish Level', type: 'select', defaultValue: 'level-4', options: [
        { label: 'Level 3 — texture or heavy wallcovering', value: 'level-3' },
        { label: 'Level 4 — standard flat paint finish', value: 'level-4' },
        { label: 'Level 5 — full skim coat, gloss or raking light', value: 'level-5' },
      ], helperText: 'Level 5 uses roughly twice the compound of Level 4.' },
      { id: 'waste', label: 'Waste Buffer %', type: 'number', defaultValue: 10, step: 1, min: 0, isAdvanced: true },
    ],
    formulaHighlight: 'Compound Volume = Area × Level Coefficient × (1 + Waste%)',
    howItIsCalculated: [
      'Compound is estimated from the finish level defined by ASTM C840, not from a single rate per square foot — the difference between a Level 3 and a Level 5 finish is roughly double.',
      'Level 4 covers taping, two fill coats over joints and three coats over fastener heads. Level 5 adds a skim coat across the entire surface, which is what prevents joint photographing under raking light or gloss paint.',
      'Tape and corner bead are derived from typical joint density for the area given, assuming standard 4\' x 8\' sheet layout.',
    ],
    faqs: [
      { question: 'What is the difference between finish levels?', answer: 'Level 3 is for heavy texture or wallcovering. Level 4 is the residential standard for flat paint. Level 5 adds a full skim coat and is what you need for gloss or semi-gloss paint, or any wall that catches strong side light — without it, every joint shows.' },
      { question: 'Should I use all-purpose or lightweight compound?', answer: 'All-purpose for embedding tape, because it bonds harder. Lightweight or topping compound for the fill and finish coats, because it sands with far less effort. Using all-purpose throughout makes the final sanding punishing.' },
      { question: 'How long between coats?', answer: 'Ready-mix compound needs 12-24 hours per coat depending on humidity and coat thickness. Setting-type compound sets chemically in 20-90 minutes by formula and can be recoated sooner, which is why it is used to compress a schedule.' },
      { question: 'How many coats do I need?', answer: 'Three over tapered joints and three over screw heads for Level 4. Butt joints usually need a fourth, feathered very wide — 16" or more each side — because there is no tapered recess to hide the build-up.' },
      { question: 'Can I skip sanding with a wet sponge?', answer: 'Wet sponging works well and eliminates the dust, but it is slower and can raise the paper nap if you work too aggressively. It is best on small patches; for a whole room a pole sander with a vacuum attachment is faster.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateDrywallMud({
        unit,
        drywallAreaSqFt: Number(inputs.area),
        finishLevel: inputs.level,
        wastePercent: Number(inputs.waste),
      });
      return {
        primaryValue: res.buckets4_5GalNeeded,
        primaryUnit: 'buckets',
        primaryLabel: '4.5 Gallon Compound Buckets',
        details: [
          { label: 'Total Compound Volume', value: res.totalMudGallons, unit: 'gal', highlight: true },
          { label: 'Finish Level', value: res.finishLevelDescription },
          { label: 'Paper Tape (500 ft rolls)', value: res.paperTapeRolls500ft, unit: 'rolls' },
          { label: 'Corner Bead', value: res.cornerBeadLinearFt, unit: 'linear ft' },
          { label: 'Drywall Area', value: unit === 'imperial' ? res.drywallAreaSqFt : res.drywallAreaSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
        ],
      };
    },
  },

  'brick-calculator': {
    slug: 'brick-calculator',
    defaultInputs: { length: 30, height: 8, brickType: 'modular', thickness: 'single-wythe', doors: 1, windows: 2, waste: 10 },
    fields: [
      { id: 'length', label: 'Wall Length', type: 'number', defaultValue: 30, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'height', label: 'Wall Height', type: 'number', defaultValue: 8, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      { id: 'brickType', label: 'Brick Size', type: 'select', defaultValue: 'modular', options: [
        { label: 'Modular (7 5/8" × 2 1/4") — 6.86 per sq ft', value: 'modular' },
        { label: 'Standard (8" × 2 1/4") — 6.55 per sq ft', value: 'standard' },
        { label: 'Queen (7 5/8" × 2 3/4") — 5.76 per sq ft', value: 'queen' },
        { label: 'King (9 5/8" × 2 5/8") — 4.61 per sq ft', value: 'king' },
      ] },
      { id: 'thickness', label: 'Wall Construction', type: 'select', defaultValue: 'single-wythe', options: [
        { label: 'Single wythe (veneer / single skin)', value: 'single-wythe' },
        { label: 'Double wythe (structural)', value: 'double-wythe' },
      ] },
      { id: 'doors', label: 'Door Openings', type: 'number', defaultValue: 1, step: 1, min: 0 },
      { id: 'windows', label: 'Window Openings', type: 'number', defaultValue: 2, step: 1, min: 0 },
      { id: 'waste', label: 'Waste Buffer %', type: 'number', defaultValue: 10, step: 1, min: 0, isAdvanced: true },
    ],
    formulaHighlight: 'Bricks = Net Wall Area × Bricks per Sq Ft × Wythe Count × (1 + Waste%)',
    howItIsCalculated: [
      'Brick count per square foot is fixed by the brick size including a standard 3/8" mortar joint — the joint is part of the module, which is why a nominal 8" brick does not measure 8".',
      'A double-wythe wall doubles the brick count and adds header courses or wall ties, so structural walls cost far more per square foot of face than a veneer.',
      'Mortar is estimated at roughly 7 bags of Type N or S per 1,000 bricks, plus masonry sand at about 1 cubic yard per 8 bags.',
    ],
    faqs: [
      { question: 'How many bricks are in a square foot?', answer: 'With a 3/8" mortar joint: 6.86 modular, 6.55 standard, 5.76 queen and 4.61 king. Multiply by wall area rather than counting courses — it is faster and less error-prone.' },
      { question: 'What mortar type should I use?', answer: 'Type N for most above-grade veneer work — it is softer than the brick, so movement cracks the mortar rather than the units. Type S where the wall is below grade or carries structural load. Type M only for severe conditions; it is harder than many bricks and will damage them.' },
      { question: 'How many bricks can one person lay in a day?', answer: 'An experienced mason lays 300-500 face bricks a day on straightforward wall runs, dropping sharply around openings, corners and detail work. A first-timer should plan on well under half that.' },
      { question: 'Why order 10% extra?', answer: 'Breakage in transit and on site, cuts at openings and corners, and colour blending all consume brick. Brick is also produced in batches with real colour variation, so a top-up order weeks later frequently will not match the wall.' },
      { question: 'Do I need weep holes?', answer: 'Yes, in any veneer wall. Leave open head joints at roughly 24" spacing along the base course above the flashing. A brick veneer is not waterproof — it is a rain screen, and water that gets behind it has to have a route out.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateBrick({
        unit,
        wallLengthFeet: Number(inputs.length),
        wallHeightFeet: Number(inputs.height),
        brickType: inputs.brickType,
        wallThickness: inputs.thickness,
        doors: Number(inputs.doors),
        windows: Number(inputs.windows),
        wastePercent: Number(inputs.waste),
      });
      return {
        primaryValue: res.totalBricksNeeded,
        primaryUnit: 'bricks',
        primaryLabel: 'Bricks to Order',
        details: [
          { label: 'Brick Size', value: res.brickTypeLabel, highlight: true },
          { label: 'Before Waste', value: res.rawBricks, unit: 'bricks' },
          { label: 'Mortar (80 lb bags)', value: res.mortarBagsNeeded, unit: 'bags' },
          { label: 'Masonry Sand', value: res.masonrySandCuYds, unit: 'cu yd' },
          { label: 'Net Wall Area', value: unit === 'imperial' ? res.wallAreaSqFt : res.wallAreaSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
          { label: 'Waste Allowance', value: `${res.wastePercent}%` },
        ],
      };
    },
  },

  'rebar-calculator': {
    slug: 'rebar-calculator',
    defaultInputs: { length: 30, width: 20, spacing: 18, barSize: '#4 (1/2")', clearance: 3 },
    fields: [
      { id: 'length', label: 'Slab Length', type: 'number', defaultValue: 30, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'width', label: 'Slab Width', type: 'number', defaultValue: 20, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'spacing', label: 'Grid Spacing (on centre)', type: 'select', defaultValue: 18, options: [
        { label: '12" — heavy load, driveways with truck traffic', value: '12' },
        { label: '18" — standard residential slab', value: '18' },
        { label: '24" — light duty, patios and walkways', value: '24' },
      ] },
      { id: 'barSize', label: 'Rebar Size', type: 'select', defaultValue: '#4 (1/2")', options: [
        { label: '#3 (3/8") — patios, light slabs', value: '#3 (3/8")' },
        { label: '#4 (1/2") — standard residential', value: '#4 (1/2")' },
        { label: '#5 (5/8") — footings, heavy load', value: '#5 (5/8")' },
      ] },
      { id: 'clearance', label: 'Edge Clearance', type: 'number', defaultValue: 3, unitImperial: 'in', unitMetric: 'cm', step: 1, min: 1, isAdvanced: true, helperText: 'Concrete cover from the form. 3" is standard where concrete is cast against earth.' },
    ],
    formulaHighlight: 'Sticks = ⌈(Bars Lengthwise + Bars Widthwise, incl. lap splices) ÷ 20 ft⌉',
    howItIsCalculated: [
      'Bar counts are derived in each direction from the slab dimension less twice the edge clearance, divided by the grid spacing, plus one — the fencepost rule, which is where most manual estimates go wrong.',
      'Lap splices are added wherever a run exceeds the 20 ft stock length. Standard practice is an overlap of 30 bar diameters, about 15" for #4 bar, and that overlap is real steel you have to buy.',
      'Tie wire and support chairs are estimated from the number of grid intersections and a chair roughly every 3 ft, which keeps the mat at mid-depth where it does structural work.',
    ],
    faqs: [
      { question: 'What size rebar for a residential slab?', answer: '#4 (1/2") at 18" on centre covers most residential slabs, patios and garage floors. Move to #5 (5/8") at 12" for driveways carrying vehicles heavier than a pickup, or where a structural engineer specifies it.' },
      { question: 'How far apart should rebar be?', answer: '18" on centre each way is the residential standard. Tighten to 12" for heavy loads, open to 24" for light-duty walkways. Spacing should never exceed three times the slab thickness.' },
      { question: 'Should rebar sit on the ground?', answer: 'Never. Steel laid on the base does nothing structurally and will rust. It must sit at mid-depth or slightly below centre, held there by chairs or dobies. Pulling the mat up during the pour — "hooking" — is unreliable and leaves large areas unsupported.' },
      { question: 'How much overlap at a splice?', answer: 'Thirty bar diameters is the common rule: about 12" for #3, 15" for #4, and 19" for #5. Tie the overlap in at least two places. Never simply butt two bars end to end.' },
      { question: 'Can I use wire mesh instead?', answer: 'Welded wire mesh works for thin, lightly loaded slabs but offers far less tensile capacity and is notoriously hard to keep at the right height during a pour. For anything carrying a vehicle or supporting a structure, use rebar.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateRebar({
        unit,
        slabLengthFeet: Number(inputs.length),
        slabWidthFeet: Number(inputs.width),
        gridSpacingInches: Number(inputs.spacing) as 12 | 18 | 24,
        edgeClearanceInches: Number(inputs.clearance),
        rebarBarSize: inputs.barSize,
      });
      return {
        primaryValue: res.total20ftSticksNeeded,
        primaryUnit: 'sticks',
        primaryLabel: '20 ft Rebar Sticks Needed',
        details: [
          { label: 'Total Linear Length', value: res.totalLinearFtNeeded, unit: 'ft', highlight: true },
          { label: 'Bar Size', value: res.rebarSize },
          { label: 'Grid Spacing', value: res.gridSpacingInches, unit: 'in O.C.' },
          { label: 'Grid Intersections to Tie', value: res.totalIntersections },
          { label: 'Tie Wire', value: res.tieWireLbsNeeded, unit: 'lbs' },
          { label: 'Support Chairs', value: res.rebarChairsCount, unit: 'chairs' },
          { label: 'Slab Area', value: unit === 'imperial' ? res.slabAreaSqFt : res.slabAreaSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
        ],
      };
    },
  },

  'plywood-calculator': {
    slug: 'plywood-calculator',
    defaultInputs: { length: 20, width: 14, sheetPreset: '4x8', waste: 10, price: 0 },
    fields: [
      { id: 'length', label: 'Area Length', type: 'number', defaultValue: 20, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      { id: 'width', label: 'Area Width', type: 'number', defaultValue: 14, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      { id: 'sheetPreset', label: 'Sheet Size', type: 'select', defaultValue: '4x8', options: [
        { label: "4' x 8' (32 sq ft) — standard", value: '4x8' },
        { label: "4' x 9' (36 sq ft)", value: '4x9' },
        { label: "4' x 10' (40 sq ft)", value: '4x10' },
        { label: "5' x 5' (25 sq ft) — Baltic birch", value: '5x5' },
      ] },
      { id: 'waste', label: 'Waste Buffer %', type: 'number', defaultValue: 10, step: 1, min: 0, isAdvanced: true },
      { id: 'price', label: 'Price per Sheet (optional)', type: 'number', defaultValue: 0, step: 1, min: 0, isAdvanced: true },
    ],
    formulaHighlight: 'Sheets = ⌈(Area × (1 + Waste%)) ÷ Sheet Area⌉',
    howItIsCalculated: [
      'Total area is divided by the area of one sheet and rounded up. The raw figure before rounding is shown separately so you can see how much of the last sheet is actually used.',
      'A 10% waste allowance covers saw kerf, edge trimming and the offcuts created by staggering joints — sheathing seams should never line up across adjacent rows.',
      'Area-based estimating is a starting point, not a cutting list. A room whose dimensions are not close multiples of 4 ft will generate more offcut than the percentage suggests.',
    ],
    faqs: [
      { question: 'What thickness of plywood do I need?', answer: '3/4" for subfloors over joists at 16" on centre, 1/2" for wall sheathing, 5/8" for roof sheathing at 24" rafter spacing, and 1/4" for cabinet backs or underlayment. Going thinner on a subfloor is the usual cause of a floor that flexes and squeaks.' },
      { question: 'What do the plywood grades mean?', answer: 'Two letters, one per face: A is sanded and near-defect-free, B has minor repairs, C has knots and small voids, D has the largest. BC is a common one-good-face choice; CDX is sheathing where neither face shows — the X refers to exterior glue, not an exterior-rated panel.' },
      { question: 'Is OSB as good as plywood?', answer: 'For sheathing and most subfloors, OSB performs comparably and costs less. Plywood dries faster after wetting and holds screws better at edges, which makes it the safer choice where the panel may be exposed to weather during construction or will be repeatedly fastened.' },
      { question: 'Should I leave a gap between sheets?', answer: 'Yes — 1/8" at panel edges and ends. Panels absorb moisture and expand, and tightly butted sheathing buckles at the seams. Most sheathing panels are printed with spacing marks for this.' },
      { question: 'How much does a sheet weigh?', answer: 'A 4\' x 8\' sheet of 3/4" plywood is about 60-70 lb; 1/2" is about 40-50 lb; OSB of the same thickness runs slightly heavier. Factor that into how many you can move and how you will get them up a stair.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculatePlywood({
        unit,
        entryMode: 'dimensions',
        length: Number(inputs.length),
        width: Number(inputs.width),
        sheetSizePreset: inputs.sheetPreset,
        wastePercent: Number(inputs.waste),
        pricePerSheet: Number(inputs.price) || undefined,
      });
      return {
        primaryValue: res.sheetsNeeded,
        primaryUnit: 'sheets',
        primaryLabel: 'Plywood Sheets Needed',
        details: [
          { label: 'Area Including Waste', value: unit === 'imperial' ? res.areaWithWasteSqFt : res.areaWithWasteSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²', highlight: true },
          { label: 'Before Rounding Up', value: res.rawSheetsNeeded, unit: 'sheets' },
          { label: 'Coverage per Sheet', value: unit === 'imperial' ? res.singleSheetAreaSqFt : res.singleSheetAreaSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
          { label: 'Waste Allowance', value: `${res.wastePercent}%` },
          ...(res.estimatedCost ? [{ label: 'Estimated Cost', value: `$${res.estimatedCost.toLocaleString()}` }] : []),
        ],
      };
    },
  },

  'deck-calculator': {
    slug: 'deck-calculator',
    defaultInputs: { length: 20, width: 14, boardWidth: 5.5, gap: 0.25, boardLength: 16, waste: 10 },
    fields: [
      { id: 'length', label: 'Deck Length (along boards)', type: 'number', defaultValue: 20, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'width', label: 'Deck Width (across boards)', type: 'number', defaultValue: 14, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'boardLength', label: 'Board Length Purchased', type: 'select', defaultValue: 16, options: [
        { label: "8 ft", value: '8' }, { label: "10 ft", value: '10' }, { label: "12 ft", value: '12' },
        { label: "16 ft — least waste on most decks", value: '16' }, { label: "20 ft", value: '20' },
      ] },
      { id: 'boardWidth', label: 'Board Face Width', type: 'number', defaultValue: 5.5, unitImperial: 'in', unitMetric: 'cm', step: 0.25, min: 1, isAdvanced: true, helperText: 'A nominal 2x6 actually measures 5.5".' },
      { id: 'gap', label: 'Gap Between Boards', type: 'number', defaultValue: 0.25, unitImperial: 'in', unitMetric: 'cm', step: 0.0625, min: 0, isAdvanced: true },
      { id: 'waste', label: 'Waste Buffer %', type: 'number', defaultValue: 10, step: 1, min: 0, isAdvanced: true },
    ],
    formulaHighlight: 'Boards = ⌈Deck Width ÷ (Board Width + Gap)⌉ × Rows, rounded to stock lengths',
    howItIsCalculated: [
      'Board count comes from the deck width divided by the actual face width plus the gap — a nominal 2x6 is 5.5" wide, so a 14 ft deck takes 29 boards at a 1/4" gap, not 28.',
      'Choosing a stock length that divides evenly into your deck run matters more than price per board: a 20 ft deck built from 16 ft stock wastes a quarter of every board unless you stagger the butt joints over joists.',
      'Joist count assumes 16" on-centre spacing, which suits most decking. Composite boards often require 12" on centre — check the manufacturer span table, because composite sags where wood would not.',
    ],
    faqs: [
      { question: 'How much gap should I leave between deck boards?', answer: 'Leave 1/4" for kiln-dried or composite boards. Wet pressure-treated lumber can be laid nearly tight, because it shrinks as it dries and will open its own gap — often to 3/8" or more.' },
      { question: 'How far apart should deck joists be?', answer: '16" on centre is standard for 5/4 and 2x wood decking laid perpendicular to the joists. Drop to 12" for most composite decking and for any decking run at 45 degrees, where the effective span between bearing points increases.' },
      { question: 'Pressure-treated or composite?', answer: 'Pressure-treated costs roughly a third as much up front but needs cleaning and re-sealing every 2-3 years. Composite costs more initially and is effectively maintenance-free, usually reaching cost parity somewhere around year 10-12.' },
      { question: 'How many screws will I need?', answer: 'Two screws per board at every joist crossing — roughly 350 screws per 100 sq ft of deck. Use coated or stainless fasteners rated for ACQ-treated lumber; standard zinc corrodes rapidly in contact with modern treatment chemicals.' },
      { question: 'Should boards run parallel or perpendicular to the house?', answer: 'Perpendicular is standard and simplest. Running diagonally looks better on large decks and stiffens the frame, but adds about 15% to board consumption and requires tighter joist spacing.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateDeck({
        unit,
        deckLength: Number(inputs.length),
        deckWidth: Number(inputs.width),
        boardWidthInches: Number(inputs.boardWidth),
        gapInches: Number(inputs.gap),
        selectedBoardLength: Number(inputs.boardLength) as 8 | 10 | 12 | 16 | 20,
        wastePercent: Number(inputs.waste),
      });
      return {
        primaryValue: res.boardsNeeded,
        primaryUnit: 'boards',
        primaryLabel: `${res.selectedBoardLengthFt} ft Deck Boards Needed`,
        details: [
          { label: 'Deck Area', value: unit === 'imperial' ? res.deckAreaSqFt : res.deckAreaSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²', highlight: true },
          { label: 'Boards per Row', value: res.boardsPerRow },
          { label: 'Total Linear Length', value: unit === 'imperial' ? res.totalLinearFtNeeded : res.totalLinearMNeeded, unit: unit === 'imperial' ? 'ft' : 'm' },
          { label: 'Joists (16" O.C.)', value: res.joistsEstimateCount, unit: 'joists' },
          { label: 'Deck Screws', value: res.screwsNeededApprox, unit: 'screws' },
          { label: 'Waste Allowance', value: `${res.wastePercent}%` },
        ],
      };
    },
  },

  'deck-railing-calculator': {
    slug: 'deck-railing-calculator',
    defaultInputs: { length: 44, postSpacing: 6, balusterWidth: 1.5, maxGap: 4, stairs: 0 },
    fields: [
      { id: 'length', label: 'Railing Length', type: 'number', defaultValue: 44, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1, helperText: 'Total perimeter needing railing — exclude the house side and any stair opening.' },
      { id: 'postSpacing', label: 'Post Spacing', type: 'number', defaultValue: 6, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1, helperText: 'IRC allows a maximum of 6 ft for most wood systems.' },
      { id: 'stairs', label: 'Stair Railing Length', type: 'number', defaultValue: 0, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 0 },
      { id: 'balusterWidth', label: 'Baluster Width', type: 'number', defaultValue: 1.5, unitImperial: 'in', unitMetric: 'cm', step: 0.25, min: 0.5, isAdvanced: true },
      { id: 'maxGap', label: 'Maximum Gap (code)', type: 'number', defaultValue: 4, unitImperial: 'in', unitMetric: 'cm', step: 0.25, min: 1, isAdvanced: true, helperText: 'IRC R312: a 4" sphere must not pass through.' },
    ],
    formulaHighlight: 'Balusters = ⌈Rail Length ÷ (Baluster Width + Max Gap)⌉ per section, spacing adjusted to stay under code',
    howItIsCalculated: [
      'Baluster spacing is solved backwards from the building code rather than divided evenly: IRC R312 requires that a 4" sphere cannot pass through any opening, so the calculator finds the smallest count whose resulting gap stays under that limit.',
      'Spacing is computed per section between posts, not across the whole run, because sections are rarely identical and an average would put some gaps over code.',
      'Post count includes one at each end of every section plus gate and corner posts — the fencepost rule again, which is why a 44 ft rail needs more posts than 44 divided by 6.',
    ],
    faqs: [
      { question: 'What is the maximum gap between balusters?', answer: 'A 4" sphere must not pass through any opening in the guard, per IRC R312. The practical build target is 3.5"-3.9" to leave tolerance for lumber that is not perfectly straight. This is the single most commonly failed deck inspection item.' },
      { question: 'How tall does deck railing need to be?', answer: '36" minimum for residential decks more than 30" above grade under the IRC; some jurisdictions and most commercial work require 42". Stair handrails are measured differently — 34"-38" above the tread nosing.' },
      { question: 'How far apart can railing posts be?', answer: '6 ft is the common maximum for 4x4 wood posts; some composite and metal systems permit 8 ft. The guard must withstand a 200 lb concentrated load in any direction at the top rail, and post spacing is what governs that.' },
      { question: 'Should posts be notched around the rim joist?', answer: 'No. Notching removes most of the post cross-section exactly where bending stress is highest and is now prohibited or discouraged in most jurisdictions. Use full-section posts with tension-rated hardware such as through-bolts and hold-down brackets.' },
      { question: 'How do I handle an uneven number of balusters?', answer: 'Never stretch the last gap to absorb the remainder. Recalculate the section with one more baluster and distribute the spacing evenly — a single oversized gap fails inspection just as surely as several.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateDeckRailing({
        unit,
        railingLengthFeet: Number(inputs.length),
        postSpacingFeet: Number(inputs.postSpacing),
        balusterWidthInches: Number(inputs.balusterWidth),
        maxBalusterGapInches: Number(inputs.maxGap),
        stairsRailingLengthFeet: Number(inputs.stairs),
      });
      return {
        primaryValue: res.balustersNeeded,
        primaryUnit: 'balusters',
        primaryLabel: 'Balusters Needed',
        details: [
          { label: 'Exact Gap Between Balusters', value: res.exactBalusterSpacingInches, unit: 'in', highlight: true },
          { label: 'Railing Posts (4x4)', value: res.railPostsNeeded, unit: 'posts' },
          { label: 'Top Rails (2x4 × 8 ft)', value: res.topRailsNeeded, unit: 'boards' },
          { label: 'Bottom Rails', value: res.bottomRailsNeeded, unit: 'boards' },
          { label: 'Total Railing Length', value: unit === 'imperial' ? res.totalRailingLinearFt : res.totalRailingLinearM, unit: unit === 'imperial' ? 'ft' : 'm' },
          { label: 'Code Check', value: res.codeComplianceNote },
        ],
      };
    },
  },

  'deck-footing-calculator': {
    slug: 'deck-footing-calculator',
    defaultInputs: { footings: 8, frostDepth: 36, diameter: 12, aboveGrade: 6, postSize: '6x6', bellBottom: false },
    fields: [
      { id: 'footings', label: 'Number of Footings', type: 'number', defaultValue: 8, step: 1, min: 1 },
      { id: 'frostDepth', label: 'Frost Depth', type: 'number', defaultValue: 36, unitImperial: 'in', unitMetric: 'cm', step: 6, min: 0, helperText: 'Set by your local building department. 0" in frost-free regions, 48"+ across the northern US and Canada.' },
      { id: 'diameter', label: 'Footing Tube Diameter', type: 'select', defaultValue: 12, options: [
        { label: '8" — light duty', value: '8' }, { label: '10" — standard residential', value: '10' },
        { label: '12" — larger decks, 6x6 posts', value: '12' }, { label: '16" — heavy load, hot tubs', value: '16' },
      ] },
      { id: 'postSize', label: 'Post Size', type: 'select', defaultValue: '6x6', options: [
        { label: '4x4', value: '4x4' }, { label: '6x6 — required for most raised decks', value: '6x6' },
      ] },
      { id: 'aboveGrade', label: 'Height Above Grade', type: 'number', defaultValue: 6, unitImperial: 'in', unitMetric: 'cm', step: 1, min: 0, isAdvanced: true },
      { id: 'bellBottom', label: 'Flared / Bell-Bottom Base', type: 'checkbox', defaultValue: false, isAdvanced: true },
    ],
    formulaHighlight: 'Concrete Volume = π × (Diameter ÷ 2)² × Total Depth × Footing Count',
    howItIsCalculated: [
      'Hole depth is frost depth plus the height you want the tube standing above grade — the footing base must sit below the frost line or the deck will heave and settle with each freeze cycle.',
      'Concrete volume is the cylinder area times total depth, converted to 60 lb and 80 lb bag equivalents so you can compare bagged mix against ordering ready-mix.',
      'A flared base spreads the bearing load over a wider area of soil, which matters on soft ground; it also adds roughly 40% to the concrete for that footing.',
    ],
    faqs: [
      { question: 'How deep do deck footings need to be?', answer: 'Below your local frost line, which ranges from 0" in southern Florida to 48" or more across the northern US and Canada. This is set by your building department, not by rule of thumb — call and ask before you dig.' },
      { question: 'What diameter footing do I need?', answer: '10"-12" covers most residential decks. Size is really governed by tributary load and soil bearing capacity: a footing carrying a corner of a large deck, or supporting a hot tub, needs to be substantially larger.' },
      { question: 'How many bags of concrete per footing?', answer: 'A 12" diameter footing 42" deep takes roughly 3.3 cu ft — about 6 bags of 60 lb or 4.5 bags of 80 lb mix. Above roughly 20 footings it is usually cheaper and far faster to order ready-mix.' },
      { question: 'Can I set posts directly in concrete?', answer: 'Avoid it. Wood encased in concrete traps moisture at the interface and rots from the inside even when pressure-treated. Pour the footing, then use a galvanised standoff post base that holds the post an inch above the concrete.' },
      { question: 'Do I need gravel at the bottom of the hole?', answer: 'Yes — 4"-6" of compacted crushed gravel gives drainage beneath the footing and prevents water pooling under the concrete, which is what drives frost heave even below the nominal frost line.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateDeckFooting({
        unit,
        numberOfFootings: Number(inputs.footings),
        frostDepthInches: Number(inputs.frostDepth),
        sonotubeDiameterInches: Number(inputs.diameter) as 8 | 10 | 12 | 16,
        aboveGradeHeightInches: Number(inputs.aboveGrade),
        postSize: inputs.postSize,
        bellBottomBase: Boolean(inputs.bellBottom),
      });
      return {
        primaryValue: res.bags80lbNeeded,
        primaryUnit: 'bags',
        primaryLabel: '80 lb Concrete Bags Needed',
        details: [
          { label: 'Total Concrete Volume', value: res.totalCuYdsConcrete, unit: 'cu yd', highlight: true },
          { label: '60 lb Bags (alternative)', value: res.bags60lbNeeded, unit: 'bags' },
          { label: 'Hole Depth Each', value: res.totalHoleDepthInches, unit: 'in' },
          { label: 'Concrete per Footing', value: res.cuFtPerFooting, unit: 'cu ft' },
          { label: 'Gravel Base', value: res.crushedGravelBaseLbs, unit: 'lbs' },
          { label: 'Post Base Brackets', value: res.postCapBracketsCount, unit: 'brackets' },
        ],
      };
    },
  },

  'roofing-calculator': {
    slug: 'roofing-calculator',
    defaultInputs: { length: 40, width: 28, pitch: 'medium', overhang: 12, waste: 10 },
    fields: [
      { id: 'length', label: 'Building Footprint Length', type: 'number', defaultValue: 40, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'width', label: 'Building Footprint Width', type: 'number', defaultValue: 28, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'pitch', label: 'Roof Pitch', type: 'select', defaultValue: 'medium', options: [
        { label: 'Flat / low slope (2:12) — walkable', value: 'flat' },
        { label: 'Low (4:12) — walkable', value: 'low' },
        { label: 'Medium (6:12) — most common', value: 'medium' },
        { label: 'Steep (9:12) — requires staging', value: 'steep' },
        { label: 'Very steep (12:12+) — roof jacks required', value: 'verysteep' },
      ], helperText: 'Pitch multiplies the true surface area well beyond the footprint.' },
      { id: 'overhang', label: 'Eave Overhang', type: 'number', defaultValue: 12, unitImperial: 'in', unitMetric: 'cm', step: 1, min: 0 },
      { id: 'waste', label: 'Waste Buffer %', type: 'number', defaultValue: 10, step: 1, min: 0, isAdvanced: true, helperText: 'Use 15% for hip roofs or any roof with multiple valleys.' },
    ],
    formulaHighlight: 'Squares = (Footprint Area × Pitch Multiplier) ÷ 100, then × (1 + Waste%)',
    externalNote: {
      text: 'Re-roofing is the cheapest time to add solar, since the panels mount to a new deck and you only pay for roof access once. Use our',
      linkText: 'Solar Payback Calculator',
      href: 'https://solarpaybackcalculator.online',
      tail: 'to check whether panels pay for themselves on your roof.',
    },
    howItIsCalculated: [
      'Roof area is the footprint including overhangs multiplied by a pitch factor — a 6:12 roof has about 12% more surface than its footprint, and a 12:12 roof about 41% more. Estimating from the footprint alone is the classic way to come up short.',
      'Material is counted in squares: one square is 100 sq ft, and three bundles of standard architectural shingle cover one square.',
      'Underlayment is estimated at 400 sq ft per roll, and ridge cap at roughly one bundle per 25-30 linear feet of ridge and hip.',
    ],
    faqs: [
      { question: 'What is a roofing square?', answer: '100 square feet of finished roof surface. Shingles are sold in bundles, and three bundles of standard architectural shingle make one square. Roofers quote in squares almost universally, so it is worth working in the same unit.' },
      { question: 'How do I find my roof pitch without climbing up?', answer: 'From inside the attic, hold a level horizontally against a rafter, mark 12" along it, and measure straight down to the rafter. That drop in inches is the rise over 12 — a 6" drop is a 6:12 pitch.' },
      { question: 'How much waste should I allow?', answer: '10% for a simple gable roof, 15% for a hip roof, and up to 20% where there are several valleys, dormers or skylights. Every valley and hip means cutting shingles at an angle, and the offcut is rarely reusable.' },
      { question: 'Can I roof over existing shingles?', answer: 'Most codes permit two layers total, but it is rarely a good idea. You cannot inspect the decking for rot, the new shingles telegraph the old profile, the added weight can matter on marginal framing, and the roof runs hotter, shortening its life.' },
      { question: 'How long do asphalt shingles actually last?', answer: 'Three-tab shingles run 15-20 years in practice; architectural shingles 25-30. Warranty periods are longer than real-world life almost everywhere, and heat and ventilation matter more than the warranty class — an under-ventilated attic will cook a roof from below.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateRoofing({
        unit,
        footprintLength: Number(inputs.length),
        footprintWidth: Number(inputs.width),
        overhangInches: Number(inputs.overhang),
        pitch: inputs.pitch,
        wastePercent: Number(inputs.waste),
      });
      return {
        primaryValue: res.bundlesNeeded,
        primaryUnit: 'bundles',
        primaryLabel: 'Shingle Bundles Needed',
        details: [
          { label: 'Roofing Squares (with waste)', value: res.squaresWithWaste, unit: 'squares', highlight: true },
          { label: 'Actual Roof Surface', value: unit === 'imperial' ? res.actualRoofAreaSqFt : res.actualRoofAreaSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
          { label: 'Pitch Multiplier Applied', value: `×${res.pitchMultiplier}` },
          { label: 'Footprint Area', value: unit === 'imperial' ? res.footprintAreaSqFt : res.footprintAreaSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
          { label: 'Underlayment Rolls', value: res.underlaymentRolls, unit: 'rolls' },
          { label: 'Ridge Cap Bundles', value: res.ridgeCapBundles, unit: 'bundles' },
        ],
      };
    },
  },

  'shed-roof-calculator': {
    slug: 'shed-roof-calculator',
    defaultInputs: { width: 12, length: 16, pitch: '4/12', overhang: 12, spacing: 16 },
    fields: [
      { id: 'width', label: 'Shed Width (across the slope)', type: 'number', defaultValue: 12, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'length', label: 'Shed Length (along the ridge)', type: 'number', defaultValue: 16, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'pitch', label: 'Roof Pitch', type: 'select', defaultValue: '4/12', options: [
        { label: '2/12 — minimum for most shingles', value: '2/12' },
        { label: '3/12', value: '3/12' },
        { label: '4/12 — common shed pitch', value: '4/12' },
        { label: '6/12 — sheds snow well', value: '6/12' },
        { label: '8/12 — steep, maximises headroom', value: '8/12' },
      ] },
      { id: 'spacing', label: 'Rafter Spacing', type: 'select', defaultValue: 16, options: [
        { label: '16" on centre — stronger, heavier snow loads', value: '16' },
        { label: '24" on centre — standard for light sheds', value: '24' },
      ] },
      { id: 'overhang', label: 'Eave Overhang', type: 'number', defaultValue: 12, unitImperial: 'in', unitMetric: 'cm', step: 1, min: 0, isAdvanced: true },
    ],
    formulaHighlight: 'Rafter Length = √(Run² + Rise²), rounded up to the next stock board length',
    howItIsCalculated: [
      'Rafter length is the hypotenuse of the run and rise given by the pitch, plus the overhang. The figure is then rounded up to the next stock lumber length, since you cannot buy a 10 ft 4 in board.',
      'Rafter count follows from the shed length divided by the on-centre spacing, plus one for the final rafter at the end wall.',
      'Sheathing is counted in 4\' x 8\' sheets against the sloped area, not the footprint — the same pitch correction that catches people out on full roofs applies here.',
    ],
    faqs: [
      { question: 'What is the minimum pitch for a shed roof?', answer: '2/12 is the minimum for asphalt shingles, and it requires a double layer of underlayment. Below 2/12 you need a membrane roof — EPDM, TPO or rolled roofing — because shingles rely on gravity to shed water and will leak on a shallower slope.' },
      { question: 'Should rafters be 16" or 24" on centre?', answer: '24" is fine for a small shed with a light roof covering in a mild climate. Use 16" where snow load is significant, where you are using heavier roofing such as metal or tile, or where the span exceeds about 12 ft.' },
      { question: 'What size lumber do I need for shed rafters?', answer: '2x4 handles spans up to roughly 8 ft at 24" on centre; 2x6 covers most sheds up to 12-14 ft; beyond that use 2x8. Snow load changes these figures substantially — check your local span tables rather than relying on a rule of thumb.' },
      { question: 'Do I need a ridge board?', answer: 'For a gable shed, yes — a ridge board keeps rafter pairs aligned and makes assembly far easier, even where it is not carrying structural load. Use stock one size deeper than the rafters so the angled rafter cut bears fully against it.' },
      { question: 'How much overhang should a shed roof have?', answer: '6"-12" is typical. Overhang keeps rainwater off the walls and doors, which extends siding life considerably. Beyond about 16" you need to consider uplift in wind and may need to size the rafter tails accordingly.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateShedRoof({
        unit,
        shedWidthFeet: Number(inputs.width),
        shedLengthFeet: Number(inputs.length),
        roofPitch: inputs.pitch,
        overhangInches: Number(inputs.overhang),
        rafterSpacingInches: Number(inputs.spacing) as 16 | 24,
      });
      return {
        primaryValue: res.totalRaftersNeeded,
        primaryUnit: 'rafters',
        primaryLabel: 'Rafters Needed',
        details: [
          { label: 'Board Length to Buy', value: res.rafterBoardLengthFeet, unit: 'ft', highlight: true },
          { label: 'Exact Rafter Length', value: res.rafterLengthInches, unit: 'in' },
          { label: 'Roof Slope Angle', value: res.roofSlopeAngleDegrees, unit: '°' },
          { label: 'Roof Area', value: unit === 'imperial' ? res.totalRoofAreaSqFt : res.totalRoofAreaSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
          { label: "Sheathing (4' x 8' sheets)", value: res.plywoodSheathingSheets4x8, unit: 'sheets' },
          { label: 'Roofing Squares', value: res.roofSquaresNeeded, unit: 'squares' },
          { label: 'Fascia', value: res.fasciaLinearFeet, unit: 'linear ft' },
        ],
      };
    },
  },

  'insulation-calculator': {
    slug: 'insulation-calculator',
    defaultInputs: { length: 30, width: 20, rValue: 'R-30', waste: 10 },
    fields: [
      { id: 'length', label: 'Area Length', type: 'number', defaultValue: 30, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'width', label: 'Area Width', type: 'number', defaultValue: 20, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'rValue', label: 'R-Value', type: 'select', defaultValue: 'R-30', options: [
        { label: 'R-13 — 2x4 exterior walls', value: 'R-13' },
        { label: 'R-19 — 2x6 walls, floors over crawlspace', value: 'R-19' },
        { label: 'R-30 — attics in mild climates', value: 'R-30' },
        { label: 'R-38 — attics, most US climate zones', value: 'R-38' },
        { label: 'R-49 — attics in cold climates', value: 'R-49' },
      ] },
      { id: 'waste', label: 'Waste Buffer %', type: 'number', defaultValue: 10, step: 1, min: 0, isAdvanced: true },
    ],
    formulaHighlight: 'Packages = ⌈(Area × (1 + Waste%)) ÷ Coverage per Package⌉',
    howItIsCalculated: [
      'Coverage per package varies sharply with R-value, because higher R means thicker batts and fewer square feet rolled into the same bag — an R-49 package covers roughly a third of what an R-13 package does.',
      'The calculator reports the cavity depth each R-value needs, which is the practical constraint: R-19 will not fit in a 2x4 wall without compressing, and compressed insulation loses much of its rated value.',
      'Waste covers trimming around outlets, pipes, wiring and irregular joist bays.',
    ],
    faqs: [
      { question: 'What R-value do I need in my attic?', answer: 'The US Department of Energy recommends R-38 to R-49 for attics in most of the country, rising to R-60 in the coldest zones. Walls are typically R-13 in 2x4 framing or R-19 to R-21 in 2x6. Your local energy code sets the minimum.' },
      { question: 'Can I put new insulation over old?', answer: 'Yes in an attic, provided the new layer is unfaced. Adding a second faced batt traps moisture between the two vapour barriers and can cause condensation and rot within the assembly. Never compress the existing layer.' },
      { question: 'Does compressed insulation still work?', answer: 'Not at its rated value. Fibreglass works by trapping still air, so squeezing R-19 into a 2x4 cavity yields roughly R-13 — you pay for R-19 and get R-13. Match the batt to the cavity depth instead.' },
      { question: 'Faced or unfaced batts?', answer: 'Faced batts have a kraft or foil vapour retarder that goes towards the heated side of the assembly. Use faced in walls and in first-layer attic or crawlspace work; use unfaced when adding over existing insulation or where a separate vapour barrier is installed.' },
      { question: 'Should I leave a gap at the eaves?', answer: 'Yes. Insulation must not block soffit vents, or the attic loses its intake air and ventilation stops working. Install baffles at each rafter bay to hold the insulation back and keep a clear air channel from soffit to ridge.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateInsulation({
        unit,
        entryMode: 'dimensions',
        length: Number(inputs.length),
        width: Number(inputs.width),
        rValueKey: inputs.rValue,
        wastePercent: Number(inputs.waste),
      });
      return {
        primaryValue: res.packagesNeeded,
        primaryUnit: 'packages',
        primaryLabel: `${res.rValue} Insulation Packages`,
        details: [
          { label: 'Coverage per Package', value: res.coveragePerPackageSqFt, unit: 'sq ft', highlight: true },
          { label: 'Required Cavity Depth', value: unit === 'imperial' ? res.thicknessInches : res.thicknessCm, unit: unit === 'imperial' ? 'in' : 'cm' },
          { label: 'Typical Application', value: res.recommendedUse },
          { label: 'Area Including Waste', value: unit === 'imperial' ? res.areaWithWasteSqFt : res.areaWithWasteSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
          { label: 'Waste Allowance', value: `${res.wastePercent}%` },
        ],
      };
    },
  },

  'attic-ventilation-calculator': {
    slug: 'attic-ventilation-calculator',
    defaultInputs: { length: 40, width: 28, rule: '1:300' },
    fields: [
      { id: 'length', label: 'Attic Floor Length', type: 'number', defaultValue: 40, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'width', label: 'Attic Floor Width', type: 'number', defaultValue: 28, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'rule', label: 'Code Ventilation Ratio', type: 'select', defaultValue: '1:300', options: [
        { label: '1:300 — with balanced intake/exhaust and vapour retarder', value: '1:300' },
        { label: '1:150 — no vapour retarder, or unbalanced venting', value: '1:150' },
      ], helperText: 'IRC R806. The 1:300 ratio requires 40-50% of the vent area to be low intake.' },
    ],
    formulaHighlight: 'Net Free Area = Attic Floor Area ÷ Ratio, split 50% intake at the soffit and 50% exhaust at the ridge',
    howItIsCalculated: [
      'Required ventilation is expressed as Net Free Area — the actual open area of a vent after the screen and louvre are deducted, which is typically far less than the vent\'s physical size.',
      'The total is split evenly between low intake at the soffits and high exhaust at the ridge. Balance is what makes the system work: exhaust without matching intake simply pulls conditioned air up out of the house.',
      'Ridge vent is converted to linear feet assuming roughly 18 sq in of NFA per foot, and soffit vents at about 50 sq in each for a standard 16" × 8" undereave vent.',
    ],
    faqs: [
      { question: 'How much attic ventilation do I need?', answer: 'One square foot of net free area per 300 sq ft of attic floor, provided intake and exhaust are balanced and a vapour retarder is present. Without those conditions the code requires 1:150 — twice as much.' },
      { question: 'What is net free area?', answer: 'The actual unobstructed opening after screening and louvres are deducted. A 16" × 8" soffit vent measures 128 sq in but typically delivers only about 50 sq in of NFA. Using physical dimensions instead of NFA leaves attics badly under-vented.' },
      { question: 'Can I have too much exhaust ventilation?', answer: 'Yes, and it is a common and damaging mistake. Exhaust exceeding intake makes the ridge vent draw make-up air from the living space below, pulling out conditioned air and pushing humidity into the attic. Never mix ridge vents with powered fans or box vents on the same roof plane.' },
      { question: 'Do soffit vents work if insulation covers them?', answer: 'No. Blown insulation routinely buries soffit vents and stops intake entirely. Install rafter baffles to hold a clear air channel from the soffit up past the insulation — this is one of the most common attic problems found during energy audits.' },
      { question: 'Do I need ventilation with spray foam?', answer: 'Not if the attic is a sealed, unvented conditioned space with foam applied at the roof deck — that is a deliberately different assembly. It must be designed as such, with attention to moisture control and, in many jurisdictions, an ignition barrier.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateAtticVentilation({
        unit,
        atticLengthFeet: Number(inputs.length),
        atticWidthFeet: Number(inputs.width),
        ventilationCodeRule: inputs.rule,
      });
      return {
        primaryValue: res.totalNetFreeAreaSqIn,
        primaryUnit: 'sq in NFA',
        primaryLabel: 'Total Net Free Area Required',
        details: [
          { label: 'Soffit Vents Needed', value: res.soffitVentsNeeded, unit: 'vents', highlight: true },
          { label: 'Ridge Vent Length', value: res.ridgeVentLinearFtNeeded, unit: 'linear ft', highlight: true },
          { label: 'Intake NFA (50% low)', value: res.intakeSoffitNfaSqIn, unit: 'sq in' },
          { label: 'Exhaust NFA (50% high)', value: res.exhaustRidgeNfaSqIn, unit: 'sq in' },
          { label: 'Attic Floor Area', value: unit === 'imperial' ? res.atticFloorAreaSqFt : res.atticFloorAreaSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
          { label: 'Code Rule Applied', value: res.codeRuleApplied },
        ],
      };
    },
  },

  'mulch-soil-calculator': {
    slug: 'mulch-soil-calculator',
    defaultInputs: { length: 30, width: 12, depth: 3, material: 'mulch', waste: 5 },
    fields: [
      { id: 'length', label: 'Bed Length', type: 'number', defaultValue: 30, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'width', label: 'Bed Width', type: 'number', defaultValue: 12, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'depth', label: 'Application Depth', type: 'number', defaultValue: 3, unitImperial: 'in', unitMetric: 'cm', step: 0.5, min: 0.5, helperText: '2-3" for mulch, 4-6" for new topsoil, 2" for compost dressing.' },
      { id: 'material', label: 'Material', type: 'select', defaultValue: 'mulch', options: [
        { label: 'Bark mulch', value: 'mulch' },
        { label: 'Topsoil', value: 'topsoil' },
        { label: 'Compost', value: 'compost' },
        { label: 'Decorative gravel', value: 'gravel' },
      ] },
      { id: 'waste', label: 'Waste Buffer %', type: 'number', defaultValue: 5, step: 1, min: 0, isAdvanced: true },
    ],
    formulaHighlight: 'Cubic Yards = (Area × Depth in ft) ÷ 27',
    howItIsCalculated: [
      'Volume is area times depth, converted to cubic yards — the unit bulk material is actually sold in. One cubic yard covers 108 sq ft at 3" deep, which is the number worth remembering.',
      'Bag counts use the typical bag size for each material: mulch is usually sold in 2 cu ft bags, topsoil and compost in 1 to 1.5 cu ft bags, so the same volume needs very different bag counts.',
      'Approximate delivered weight is included because bulk material is often sold and hauled by the ton, and a half-yard of wet topsoil will overload a light trailer.',
    ],
    faqs: [
      { question: 'How many bags of mulch are in a cubic yard?', answer: 'Thirteen and a half 2 cu ft bags make one cubic yard. Bulk delivery is usually cheaper above about 3 cubic yards, and far less handling — 13 bags is a lot of lifting for the same material.' },
      { question: 'How deep should mulch be?', answer: 'Two to three inches. Deeper than four inches starves roots of oxygen and can hold enough moisture against stems to cause rot. Never pile mulch against a tree trunk — the "mulch volcano" is a common and genuinely damaging mistake.' },
      { question: 'How much does a cubic yard of topsoil weigh?', answer: 'Roughly 2,000-2,700 lb depending on moisture and clay content — around a ton per yard. Wet topsoil is much heavier, which matters both for what your vehicle can legally carry and for what a wheelbarrow can move.' },
      { question: 'Should I remove old mulch before adding new?', answer: 'Not usually — old mulch breaks down into the soil, which is part of its benefit. But if the existing layer is already 3" or more, rake it loose to break up any matted crust rather than adding depth on top.' },
      { question: 'How often does mulch need replacing?', answer: 'Top up annually with an inch or so; bark mulch decomposes noticeably over a year. Decorative gravel does not decompose and needs only occasional weeding and topping up where it has scattered.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateMulchSoil({
        unit,
        length: Number(inputs.length),
        width: Number(inputs.width),
        depth: Number(inputs.depth),
        material: inputs.material,
        wastePercent: Number(inputs.waste),
      });
      return {
        primaryValue: unit === 'imperial' ? res.volumeWithWasteCuYards : res.volumeWithWasteCuMeters,
        primaryUnit: unit === 'imperial' ? 'cu yd' : 'm³',
        primaryLabel: 'Bulk Volume Needed',
        details: [
          { label: `Bags Needed (${res.bagSizeCuFt} cu ft each)`, value: res.bagsNeeded, unit: 'bags', highlight: true },
          { label: 'Coverage Area', value: unit === 'imperial' ? res.surfaceAreaSqFt : res.surfaceAreaSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
          { label: 'Depth Applied', value: unit === 'imperial' ? res.depthInches : res.depthCm, unit: unit === 'imperial' ? 'in' : 'cm' },
          { label: 'Approximate Weight', value: res.approxWeightTons, unit: 'tons' },
          ...(res.truckloadsNeeded ? [{ label: 'Pickup Truckloads', value: res.truckloadsNeeded, unit: 'loads' }] : []),
        ],
      };
    },
  },

  'sod-calculator': {
    slug: 'sod-calculator',
    defaultInputs: { length: 60, width: 40, format: 'standard-roll', waste: 8 },
    fields: [
      { id: 'length', label: 'Lawn Length', type: 'number', defaultValue: 60, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'width', label: 'Lawn Width', type: 'number', defaultValue: 40, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'format', label: 'Sod Format', type: 'select', defaultValue: 'standard-roll', options: [
        { label: "Standard roll (2' × 5', 10 sq ft)", value: 'standard-roll' },
        { label: 'Big roll (installer equipment required)', value: 'big-roll' },
        { label: "Slab (16\" × 24\")", value: 'slab' },
      ] },
      { id: 'waste', label: 'Waste Buffer %', type: 'number', defaultValue: 8, step: 1, min: 0, isAdvanced: true, helperText: 'Use 10-15% for curved or irregular lawns.' },
    ],
    formulaHighlight: 'Rolls = ⌈(Lawn Area × (1 + Waste%)) ÷ 10 sq ft per roll⌉',
    howItIsCalculated: [
      'Sod is ordered by area, but delivered by the pallet — typically 450-500 sq ft. The pallet figure matters most, because sod is a perishable product and suppliers rarely split them.',
      'Waste allows for cutting around beds, paths and curves. Straight rectangular lawns come in near the low end; anything with curved borders runs 12-15%.',
      'Topsoil for preparation is estimated at a 1" dressing, which is the usual amendment before laying onto an existing graded base.',
    ],
    faqs: [
      { question: 'How long can sod sit on the pallet?', answer: 'Install within 24 hours in cool weather, and the same day in summer heat. Stacked sod heats up and begins composting from the middle of the pallet outward — by 48 hours in hot weather much of it will be dead. Schedule delivery for the morning you intend to lay it.' },
      { question: 'How much does a pallet of sod cover?', answer: 'Typically 450-500 sq ft, which is about 45-50 standard rolls. A pallet weighs 1,500-3,000 lb depending on soil moisture, so plan access for a forklift or pallet jack rather than moving it by hand.' },
      { question: 'How do I prepare the ground before laying sod?', answer: 'Remove existing grass and weeds, till to 4-6", grade away from the house, and add 1" of topsoil or compost. Roll the surface lightly so it is firm rather than fluffy — sod laid on soft ground settles unevenly and leaves ridges at every seam.' },
      { question: 'How much should I water new sod?', answer: 'Keep it consistently damp for the first two weeks — usually daily, twice daily in heat. After roots knit into the soil, taper to deeper, less frequent watering. Lift a corner at day 10: if it resists, it has rooted.' },
      { question: 'When can I mow new sod?', answer: 'After about 14 days, once the sod resists a gentle tug. Mow high, never removing more than a third of the blade, and make sure the mower blade is sharp — a dull blade tears young grass out of the soil rather than cutting it.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateSod({
        unit,
        lawnLength: Number(inputs.length),
        lawnWidth: Number(inputs.width),
        rollFormat: inputs.format,
        wastePercent: Number(inputs.waste),
      });
      return {
        primaryValue: res.rollsNeeded,
        primaryUnit: 'rolls',
        primaryLabel: 'Sod Rolls Needed',
        details: [
          { label: 'Pallets to Order', value: res.palletsNeeded, unit: 'pallets', highlight: true },
          { label: 'Area Including Waste', value: res.sqFtWithWaste, unit: 'sq ft' },
          { label: 'Lawn Area', value: unit === 'imperial' ? res.lawnAreaSqFt : res.lawnAreaSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
          { label: 'Topsoil for Prep (1" dressing)', value: res.topsoilCuYdsForPrep, unit: 'cu yd' },
          { label: 'Waste Allowance', value: `${res.wastePercent}%` },
        ],
      };
    },
  },

  'fence-calculator': {
    slug: 'fence-calculator',
    defaultInputs: { length: 150, height: 6, type: 'privacy-panel', postSpacing: 8, picketWidth: 6, picketGap: 0, gates: 1, gateWidth: 4 },
    fields: [
      { id: 'length', label: 'Total Fence Length', type: 'number', defaultValue: 150, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'height', label: 'Fence Height', type: 'number', defaultValue: 6, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      { id: 'type', label: 'Fence Style', type: 'select', defaultValue: 'privacy-panel', options: [
        { label: 'Privacy — boards butted tight', value: 'privacy-panel' },
        { label: 'Picket — spaced boards', value: 'picket' },
        { label: 'Split rail', value: 'split-rail' },
      ] },
      { id: 'postSpacing', label: 'Post Spacing', type: 'number', defaultValue: 8, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1, helperText: '8 ft is standard; 6 ft in high wind areas.' },
      { id: 'gates', label: 'Number of Gates', type: 'number', defaultValue: 1, step: 1, min: 0 },
      { id: 'gateWidth', label: 'Gate Width', type: 'number', defaultValue: 4, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1, isAdvanced: true },
      { id: 'picketWidth', label: 'Picket Width', type: 'number', defaultValue: 6, unitImperial: 'in', unitMetric: 'cm', step: 0.5, min: 1, isAdvanced: true },
      { id: 'picketGap', label: 'Gap Between Pickets', type: 'number', defaultValue: 0, unitImperial: 'in', unitMetric: 'cm', step: 0.25, min: 0, isAdvanced: true },
    ],
    formulaHighlight: 'Posts = ⌈Net Length ÷ Post Spacing⌉ + 1, plus two posts per gate',
    howItIsCalculated: [
      'Gate openings are subtracted from the run before sections are counted, then gate posts are added back — gates need a post on each side, and those posts carry swinging load so they are usually set deeper.',
      'Post count follows the fencepost rule: a 150 ft run at 8 ft spacing needs 20 posts, not 19, because the final section still needs a post at its end.',
      'Concrete is estimated at roughly one to two 50 lb bags per post depending on hole size, assuming a hole three times the post width and one third of the post height deep.',
    ],
    faqs: [
      { question: 'How deep should fence posts be set?', answer: 'One third of the above-ground height, or below the frost line, whichever is deeper. A 6 ft fence needs posts about 2 ft deep in frost-free ground, and deeper where the ground freezes. Corner and gate posts should go deeper still.' },
      { question: 'How far apart should fence posts be?', answer: '8 ft is standard for most wood fencing and matches stock rail lengths. Use 6 ft for tall privacy fences, in exposed windy locations, or where the ground is soft — a 6 ft privacy fence is effectively a sail.' },
      { question: 'Do I need concrete for every post?', answer: 'Concrete every post for privacy and picket fences. Split rail can often be tamped with gravel, which drains better and lets posts be replaced more easily. Where you do use concrete, crown it above grade so water sheds away from the post.' },
      { question: 'How many pickets do I need?', answer: 'For privacy fencing, divide the net length by the picket width — a 150 ft fence with 5.5" pickets takes about 328. For spaced picket fencing, divide by picket width plus gap. Add 5% for culls; not every board off the pile is straight enough to use.' },
      { question: 'Should I check property lines first?', answer: 'Always, and it is worth paying for a survey if there is any doubt. A fence built even a few inches over a boundary can be ordered removed at your cost. Also call 811 before digging — hitting a buried utility line is both dangerous and expensive.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateFence({
        unit,
        totalLength: Number(inputs.length),
        fenceHeight: Number(inputs.height),
        fenceType: inputs.type,
        postSpacing: Number(inputs.postSpacing),
        picketWidthInches: Number(inputs.picketWidth),
        picketSpacingInches: Number(inputs.picketGap),
        gateCount: Number(inputs.gates),
        gateWidth: Number(inputs.gateWidth),
      });
      return {
        primaryValue: res.postsNeeded,
        primaryUnit: 'posts',
        primaryLabel: 'Fence Posts Needed',
        details: [
          ...(res.picketsNeeded ? [{ label: 'Pickets Needed', value: res.picketsNeeded, unit: 'pickets', highlight: true }] : []),
          ...(res.panelsNeeded ? [{ label: 'Pre-built Panels', value: res.panelsNeeded, unit: 'panels' }] : []),
          { label: 'Rails', value: res.railsNeeded, unit: `rails (${res.railsPerSection} per section)` },
          { label: 'Sections', value: res.sectionsCount, unit: 'sections' },
          { label: 'Gate Posts Included', value: res.gatePostsIncluded, unit: 'posts' },
          { label: 'Concrete (50 lb bags)', value: res.concreteBagsNeeded, unit: 'bags' },
          { label: 'Net Fence Length', value: unit === 'imperial' ? res.netLengthFt : res.netLengthM, unit: unit === 'imperial' ? 'ft' : 'm' },
        ],
      };
    },
  },

  'french-drain-calculator': {
    slug: 'french-drain-calculator',
    defaultInputs: { length: 60, width: 12, depth: 18, pipeDia: 4 },
    fields: [
      { id: 'length', label: 'Trench Length', type: 'number', defaultValue: 60, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'width', label: 'Trench Width', type: 'number', defaultValue: 12, unitImperial: 'in', unitMetric: 'cm', step: 1, min: 4 },
      { id: 'depth', label: 'Trench Depth', type: 'number', defaultValue: 18, unitImperial: 'in', unitMetric: 'cm', step: 1, min: 6, helperText: '18-24" for surface water; to footing depth for a foundation drain.' },
      { id: 'pipeDia', label: 'Perforated Pipe Diameter', type: 'select', defaultValue: 4, options: [
        { label: '4" — standard residential', value: '4' },
        { label: '6" — high volume or long runs', value: '6' },
      ] },
    ],
    formulaHighlight: 'Gravel Volume = (Trench Volume − Pipe Volume) ÷ 27 cu ft per cubic yard',
    howItIsCalculated: [
      'Excavation volume is trench length times width times depth. Gravel volume subtracts the space the pipe occupies, which is significant on a 6" pipe over a long run.',
      'Gravel is converted to tons as well as cubic yards, because washed drainage stone is usually sold by weight — roughly 1.4 tons per cubic yard.',
      'Filter fabric is calculated to line the trench fully and overlap at the top, which is what stops fine soil migrating into the stone and silting the drain up.',
    ],
    faqs: [
      { question: 'What gravel should I use in a French drain?', answer: 'Washed 3/4" angular drainage stone. It must be washed — unwashed stone carries fines that clog the voids you are relying on. Angular stone locks together and keeps its void space better than rounded pea gravel.' },
      { question: 'Which way do the pipe holes face?', answer: 'Holes down. This is counter-intuitive and very commonly got wrong: water rises into the pipe from the gravel bed below, and holes-down lets the pipe drain the water table rather than waiting for water to reach pipe-crown height.' },
      { question: 'Do I really need filter fabric?', answer: 'Yes. Without non-woven geotextile separating soil from stone, silt migrates into the gravel and the drain clogs within a few years. Line the full trench and overlap the fabric across the top before backfilling — a burrito wrap, not just a liner.' },
      { question: 'How much slope does a French drain need?', answer: 'At least 1% — about 1" of fall for every 8-10 ft of run. Without positive slope the pipe holds standing water and stops working. Check the fall with a string line and level before you lay any stone.' },
      { question: 'How deep should the trench be?', answer: '18-24" handles surface and lawn water. A drain protecting a foundation must sit at or below the footing to relieve hydrostatic pressure against the wall, which usually means a much deeper trench and often a professional excavator.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateFrenchDrain({
        unit,
        trenchLengthFeet: Number(inputs.length),
        trenchWidthInches: Number(inputs.width),
        trenchDepthInches: Number(inputs.depth),
        pipeDiameterInches: Number(inputs.pipeDia) as 4 | 6,
      });
      return {
        primaryValue: res.gravelVolumeCuYds,
        primaryUnit: 'cu yd',
        primaryLabel: 'Drainage Gravel Needed',
        details: [
          { label: 'Gravel Weight', value: res.gravelTons, unit: 'tons', highlight: true },
          { label: 'Perforated Pipe', value: res.perforatedPipeFt, unit: 'ft' },
          { label: 'Filter Fabric', value: res.geotextileFabricSqFt, unit: 'sq ft' },
          { label: 'Fabric Roll Width Needed', value: res.geotextileRollWidthFt, unit: 'ft' },
          { label: 'Soil to Excavate', value: res.excavationVolumeCuYds, unit: 'cu yd' },
          { label: 'Trench Length', value: unit === 'imperial' ? res.trenchLengthFt : res.trenchLengthM, unit: unit === 'imperial' ? 'ft' : 'm' },
        ],
      };
    },
  },

  'driveway-sealer-calculator': {
    slug: 'driveway-sealer-calculator',
    defaultInputs: { length: 50, width: 16, condition: 'moderate', coats: 2 },
    fields: [
      { id: 'length', label: 'Driveway Length', type: 'number', defaultValue: 50, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'width', label: 'Driveway Width', type: 'number', defaultValue: 16, unitImperial: 'ft', unitMetric: 'm', step: 1, min: 1 },
      { id: 'condition', label: 'Surface Condition', type: 'select', defaultValue: 'moderate', options: [
        { label: 'Smooth — recently sealed, tight surface', value: 'smooth' },
        { label: 'Moderate — some texture and oxidation', value: 'moderate' },
        { label: 'Rough / cracked — porous, never sealed', value: 'rough-cracked' },
      ], helperText: 'A porous surface can absorb nearly twice the sealer of a smooth one.' },
      { id: 'coats', label: 'Number of Coats', type: 'select', defaultValue: 2, options: [
        { label: '1 coat — maintenance recoat', value: '1' },
        { label: '2 coats — recommended for most driveways', value: '2' },
      ] },
    ],
    formulaHighlight: 'Pails = ⌈(Area × Coats) ÷ Coverage per 5 Gallon Pail⌉',
    howItIsCalculated: [
      'Coverage depends heavily on surface porosity. A smooth, previously sealed driveway takes roughly 400 sq ft per 5 gallon pail, while a rough oxidised surface can drop below 250.',
      'Two thin coats outperform one thick coat consistently — a heavy single application skins over on top, stays soft underneath, and tracks onto shoes and tyres for weeks.',
      'Crack filler is estimated separately from sealer, because cracks must be filled and cured before any sealer goes down.',
    ],
    faqs: [
      { question: 'How often should I seal my asphalt driveway?', answer: 'Every 2-3 years for most climates. Sealing annually is actively harmful — the coating builds up, becomes brittle and cracks off in sheets. Wait for a new driveway to cure at least 6-12 months before its first seal.' },
      { question: 'What temperature do I need to seal?', answer: 'Above 50°F and rising, with no rain forecast for 24-48 hours and none in the previous 24. Sealer needs warm, dry conditions to cure; applying it in the cool of the evening or before rain ruins the coat entirely.' },
      { question: 'Should I fill cracks first?', answer: 'Yes, and let the filler cure fully before sealing. Sealer is a surface coating, not a filler — it bridges nothing wider than a hairline and will simply sink into an open crack. Fill anything wider than 1/4" with rubberised crack filler first.' },
      { question: 'One thick coat or two thin ones?', answer: 'Two thin coats, always. A heavy coat traps solvent beneath a skinned surface, stays tacky for weeks, and tracks indoors. Let the first coat dry fully — usually 4-8 hours — before the second.' },
      { question: 'How long before I can drive on it?', answer: 'Foot traffic after 4-8 hours; vehicles after 24-48 hours, and longer in cool or humid weather. Keep cars off the surface for the full period — tyre scuffing on uncured sealer leaves permanent marks, especially where wheels turn while stationary.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateDrivewaySealer({
        unit,
        drivewayLengthFeet: Number(inputs.length),
        drivewayWidthFeet: Number(inputs.width),
        surfaceCondition: inputs.condition,
        coats: Number(inputs.coats),
      });
      return {
        primaryValue: res.pails5GalNeeded,
        primaryUnit: 'pails',
        primaryLabel: '5 Gallon Sealer Pails Needed',
        details: [
          { label: 'Total Sealer Volume', value: res.totalGallons, unit: 'gal', highlight: true },
          { label: 'Coverage per Pail', value: res.coveragePerPailSqFt, unit: 'sq ft' },
          { label: 'Crack Filler', value: res.crackFillerLbsNeeded, unit: 'lbs' },
          { label: 'Coats Applied', value: res.coats },
          { label: 'Driveway Area', value: unit === 'imperial' ? res.drivewayAreaSqFt : res.drivewayAreaSqM, unit: unit === 'imperial' ? 'sq ft' : 'm²' },
        ],
      };
    },
  },

  'plumbing-pipe-calculator': {
    slug: 'plumbing-pipe-calculator',
    defaultInputs: { bathrooms: 2, halfBaths: 1, kitchenSinks: 1, dishwashers: 1, washers: 1, hoseBibbs: 2, psi: 55, developedLength: 80 },
    fields: [
      { id: 'bathrooms', label: 'Full Bathrooms', type: 'number', defaultValue: 2, step: 1, min: 0, helperText: 'Toilet, sink and shower or tub.' },
      { id: 'halfBaths', label: 'Half Baths', type: 'number', defaultValue: 1, step: 1, min: 0 },
      { id: 'kitchenSinks', label: 'Kitchen Sinks', type: 'number', defaultValue: 1, step: 1, min: 0 },
      { id: 'dishwashers', label: 'Dishwashers', type: 'number', defaultValue: 1, step: 1, min: 0 },
      { id: 'washers', label: 'Washing Machines', type: 'number', defaultValue: 1, step: 1, min: 0 },
      { id: 'hoseBibbs', label: 'Outdoor Hose Bibbs', type: 'number', defaultValue: 2, step: 1, min: 0 },
      { id: 'psi', label: 'Supply Pressure', type: 'number', defaultValue: 55, unitImperial: 'PSI', unitMetric: 'PSI', step: 5, min: 20, isAdvanced: true },
      { id: 'developedLength', label: 'Developed Length to Farthest Fixture', type: 'number', defaultValue: 80, unitImperial: 'ft', unitMetric: 'm', step: 5, min: 5, isAdvanced: true, helperText: 'Pipe run length, not straight-line distance.' },
    ],
    formulaHighlight: 'Pipe size is selected from total Water Supply Fixture Units (WSFU) against developed length and available pressure',
    howItIsCalculated: [
      'Fixtures are converted to Water Supply Fixture Units under the IPC/UPC method. WSFU is a demand weighting, not a count — it reflects the probability that fixtures run simultaneously, which is why ten fixtures do not need ten times one fixture\'s capacity.',
      'Total WSFU is converted to peak demand in gallons per minute using the Hunter curve, then matched against pipe capacity at your supply pressure.',
      'Developed length is the actual pipe run including every fitting, not the straight-line distance. Friction loss grows with length, so a long run may need the next size up at the same fixture count.',
    ],
    faqs: [
      { question: 'What size main water line does a house need?', answer: '3/4" serves most homes with two to three bathrooms. Move to 1" where there are four or more bathrooms, a long run from the meter, or low supply pressure. Undersizing the main is the usual reason a shower drops when someone flushes.' },
      { question: 'What is a fixture unit?', answer: 'A weighted measure of probable demand, not a flow rate. A toilet is about 2.5 WSFU, a shower 2, a hose bibb 2.5. Fixtures rarely run at once, so the system is sized on statistical peak rather than the sum of every fixture at full flow.' },
      { question: 'PEX or copper?', answer: 'PEX is cheaper, faster to install, tolerates freezing far better and needs fewer fittings on a home run layout. Copper lasts longer, handles high temperatures, and is required in some jurisdictions for specific applications. Both are code-approved almost everywhere for supply.' },
      { question: 'What pressure should my house have?', answer: '40-60 PSI is the normal range. Above 80 PSI a pressure-reducing valve is required by code — high pressure damages appliance valves, causes water hammer, and dramatically increases leak risk at fittings.' },
      { question: 'Why does my shower lose pressure when a tap opens?', answer: 'Usually an undersized branch or main, or a run too long for its diameter. Pressure-balancing shower valves prevent the temperature swing but not the flow drop. The real fix is correct pipe sizing, which is what this calculator is estimating.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculatePlumbingPipe({
        unit,
        bathrooms: Number(inputs.bathrooms),
        halfBaths: Number(inputs.halfBaths),
        kitchenSinks: Number(inputs.kitchenSinks),
        dishwashers: Number(inputs.dishwashers),
        washingMachines: Number(inputs.washers),
        outdoorHoseBibbs: Number(inputs.hoseBibbs),
        waterPressurePsi: Number(inputs.psi),
        developedLengthFt: Number(inputs.developedLength),
      });
      return {
        primaryValue: res.recommendedMainPipeSize,
        primaryUnit: '',
        primaryLabel: 'Recommended Main Supply Size',
        details: [
          { label: 'Branch Line Size', value: res.recommendedBranchSize, highlight: true },
          { label: 'Total Fixture Units', value: res.totalFixtureUnits, unit: 'WSFU' },
          { label: 'Estimated Peak Demand', value: res.estimatedPeakGpm, unit: 'GPM' },
          { label: 'Developed Length', value: res.developedLengthFt, unit: 'ft' },
          { label: 'System Summary', value: res.systemSummary },
        ],
      };
    },
  },

  'cabinet-hardware-calculator': {
    slug: 'cabinet-hardware-calculator',
    defaultInputs: { drawerWidth: 24, hardwareType: 'single-pull', pullSize: 3.75, drawers: 12, doors: 18 },
    fields: [
      { id: 'drawerWidth', label: 'Drawer Front Width', type: 'number', defaultValue: 24, unitImperial: 'in', unitMetric: 'cm', step: 1, min: 4 },
      { id: 'hardwareType', label: 'Hardware Style', type: 'select', defaultValue: 'single-pull', options: [
        { label: 'Single knob — centred', value: 'single-knob' },
        { label: 'Single pull — centred', value: 'single-pull' },
        { label: 'Two pulls — wide drawers over 30"', value: 'double-pulls' },
      ] },
      { id: 'pullSize', label: 'Pull Centre-to-Centre', type: 'select', defaultValue: 3.75, options: [
        { label: '3" (76mm)', value: '3' },
        { label: '3.75" (96mm) — most common', value: '3.75' },
        { label: '5" (128mm)', value: '5' },
        { label: '6.3" (160mm)', value: '6.3' },
      ], helperText: 'The distance between screw holes, not the overall length of the pull.' },
      { id: 'drawers', label: 'Total Drawers', type: 'number', defaultValue: 12, step: 1, min: 0 },
      { id: 'doors', label: 'Total Doors', type: 'number', defaultValue: 18, step: 1, min: 0 },
    ],
    formulaHighlight: 'Hole Position = (Drawer Width − Centre-to-Centre) ÷ 2 from each edge',
    howItIsCalculated: [
      'Hole positions are measured from each edge so the pull ends up truly centred — measuring from one side and marking the second hole from the first compounds any error across the run.',
      'The rule-of-thirds position is given as well, which is the conventional placement for pulls on cabinet doors: roughly one third up from the bottom rail on an upper door, and one third down on a lower.',
      'Screw count assumes two per pull and one per knob, which is what ships in a standard hardware pack.',
    ],
    faqs: [
      { question: 'What size pull for a 24 inch drawer?', answer: 'A pull between one third and one half the drawer width reads correctly — for a 24" drawer that is 5" to 8" centre-to-centre. Anything smaller looks lost on the front, and undersized hardware is the most common visual mistake in a kitchen refit.' },
      { question: 'Where do knobs go on cabinet doors?', answer: 'Typically 2.5"-3" in from the stile edge and 2.5"-3" from the bottom rail on upper doors, mirrored to the top rail on lower doors. Keep the measurement consistent throughout the kitchen — the eye picks up variation immediately across a long run.' },
      { question: 'Knobs or pulls?', answer: 'Pulls are easier to grip, which matters most on heavy drawers and for anyone with limited hand strength. A common approach is pulls on drawers and knobs on doors. Pulls cost more and need two holes, so a mistake is harder to correct.' },
      { question: 'When should a drawer get two pulls?', answer: 'Above about 30" wide. A single pull on a very wide drawer makes it rack in its slides when pulled from one end. Two pulls placed at the quarter points spread the load and open the drawer squarely.' },
      { question: 'How do I drill the holes accurately?', answer: 'Use a hardware jig rather than measuring each front. Drill from the face side into scrap backing to prevent tear-out where the bit exits, and always test the setup on an offcut first — a misplaced hole in a finished drawer front is rarely repairable.' },
    ],
    calculate: (inputs, unit) => {
      const res = calculateCabinetHardware({
        unit,
        drawerWidthInches: Number(inputs.drawerWidth),
        hardwareType: inputs.hardwareType,
        pullCenterToCenterInches: Number(inputs.pullSize),
        totalDrawers: Number(inputs.drawers),
        totalDoors: Number(inputs.doors),
      });
      return {
        primaryValue: res.holePositionFromLeftInches,
        primaryUnit: 'in from each edge',
        primaryLabel: 'Drill Hole Position',
        details: [
          { label: 'Total Hardware Pieces', value: res.totalHardwarePieces, unit: 'pieces', highlight: true },
          { label: 'Distance Between Holes', value: res.distanceBetweenHolesInches, unit: 'in' },
          { label: 'Rule-of-Thirds Placement', value: res.ruleOfThirdsPlacementInches, unit: 'in' },
          { label: 'Hardware Style', value: res.hardwareType },
          { label: 'Pull Centre-to-Centre', value: res.pullCenterToCenterInches, unit: 'in' },
          { label: 'Screws Needed', value: res.screwsNeeded, unit: 'screws' },
        ],
      };
    },
  },

  'false-ceiling-calculator': {
    slug: 'false-ceiling-calculator',
    defaultInputs: { length: 15, width: 12, design: 'cove', boardSize: '4x6', waste: 10, price: 0 },
    fields: [
      { id: 'length', label: 'Room Length', type: 'number', defaultValue: 15, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      { id: 'width', label: 'Room Width', type: 'number', defaultValue: 12, unitImperial: 'ft', unitMetric: 'm', step: 0.5, min: 1 },
      {
        id: 'design',
        label: 'Ceiling Design Style',
        type: 'select',
        defaultValue: 'cove',
        options: [
          { label: 'Flush Flat Gypsum / Plasterboard', value: 'plain' },
          { label: 'Perimeter Cove with LED Channel', value: 'cove' },
          { label: 'Stepped Multi-Level / Island POP', value: 'stepped' },
          { label: '2x2 Drop Grid Acoustic Tile', value: 'grid' },
        ],
        helperText: 'Cove and stepped multi-level designs add vertical drop fascia surfaces.',
      },
      {
        id: 'boardSize',
        label: 'Sheet / Board Dimension',
        type: 'select',
        defaultValue: '4x6',
        options: [
          { label: '4 × 6 ft (24 sq ft) — Standard POP / Gyproc', value: '4x6' },
          { label: '4 × 8 ft (32 sq ft) — Large Drywall Panel', value: '4x8' },
        ],
      },
      { id: 'waste', label: 'Waste Buffer %', type: 'number', defaultValue: 10, step: 1, min: 0, isAdvanced: true },
      { id: 'price', label: 'Installed Cost per Sq Ft / m² (optional)', type: 'number', defaultValue: 0, step: 0.5, min: 0, isAdvanced: true },
    ],
    formulaHighlight: 'Sheets = ⌈(Ceiling Area × Fascia Factor × (1 + Waste%)) ÷ Sheet Area⌉',
    howItIsCalculated: [
      'Base ceiling area is computed from room length × width. Cove and stepped designs add 15% to 25% surface area for vertical drop fascias and LED light troughs.',
      'Perimeter channel (wall angle) runs the room perimeter; intermediate channels are spaced at 4 ft (1.2m) centres, and ceiling section channels at 16" (400mm) centres.',
      'Fasteners, fiber joint tape, and joint compound are calculated based on total perimeter and board seam lengths.',
    ],
    faqs: [
      { question: 'What is the average false ceiling cost per square foot in 2026?', answer: 'In the US and UK, standard gypsum false ceilings cost between $4.50 to $10.00 per square foot installed. In India, POP and Gyproc false ceilings typically range between ₹90 to ₹150 per sq ft including materials, channel grid framing, tape, and labor.' },
      { question: 'Which is better: Gypsum board or POP (Plaster of Paris)?', answer: 'Gypsum board false ceilings install much faster, produce less dust, and give clean factory-uniform seams. POP (Plaster of Paris) applied on chicken mesh is better for complex curved shapes, medallions, and custom cornices, but requires skilled masons and several days drying time.' },
      { question: 'How much ceiling height is lost with a false ceiling?', answer: 'A plain flush false ceiling drops the ceiling by 4 to 5 inches (100–125mm). If incorporating a cove with concealed LED strip lighting, plan for a 6 to 8 inch drop (150–200mm) to allow room for the light trough and driver.' },
      { question: 'How much perimeter channel is needed?', answer: 'The perimeter channel mounts to all four perimeter walls. Measure room perimeter (2 × (Length + Width)) and add 10% for overlapping corners and cuts.' },
      { question: 'How many LED downlights should I plan for?', answer: 'A common rule of thumb is one 7W–9W recessed LED downlight for every 25 to 35 square feet of floor area for living rooms and bedrooms, augmented by warm 3000K LED strip lights inside the cove.' },
    ],
    calculate: (inputs, unit) => {
      const isMetric = unit === 'metric';
      const l = Number(inputs.length) || 15;
      const w = Number(inputs.width) || 12;
      const waste = Number(inputs.waste) || 10;
      const design = inputs.design || 'cove';
      const boardSize = inputs.boardSize || '4x6';
      const customPrice = Number(inputs.price) || 0;

      const baseArea = l * w;
      const perimeter = 2 * (l + w);
      const fasciaFactor = design === 'stepped' ? 1.25 : design === 'cove' ? 1.15 : 1.0;
      const effectiveArea = baseArea * fasciaFactor;

      const sheetSqFt = boardSize === '4x6' ? 24 : 32;
      const sheetArea = isMetric ? sheetSqFt / 10.7639 : sheetSqFt;
      const sheetsNeeded = Math.ceil((effectiveArea * (1 + waste / 100)) / sheetArea);

      const perimeterLength = Math.ceil(perimeter * 1.1);
      const intermediateChannelPieces = Math.ceil((l / (isMetric ? 1.2 : 4)) * 1.1);
      const ceilingSectionPieces = Math.ceil((w / (isMetric ? 0.4 : 1.33)) * 1.1);
      const screwsNeeded = sheetsNeeded * 32;
      const coveLedLength = design === 'cove' || design === 'stepped' ? Math.round(perimeter) : 0;

      const defaultRateMin = isMetric ? 45 : 4.5;
      const defaultRateMax = isMetric ? 95 : 9.5;
      const estCostMin = customPrice > 0 ? Math.round(baseArea * customPrice) : Math.round(baseArea * defaultRateMin);
      const estCostMax = customPrice > 0 ? Math.round(baseArea * customPrice * 1.15) : Math.round(baseArea * defaultRateMax);

      return {
        primaryValue: sheetsNeeded,
        primaryUnit: 'sheets',
        primaryLabel: `${boardSize} Gypsum Boards Needed`,
        details: [
          { label: 'Ceiling Surface Area', value: Math.round(baseArea * 10) / 10, unit: isMetric ? 'm²' : 'sq ft', highlight: true },
          { label: 'Perimeter Channel Required', value: perimeterLength, unit: isMetric ? 'm' : 'linear ft' },
          { label: 'Intermediate Main Channels', value: intermediateChannelPieces, unit: 'lengths' },
          { label: 'Ceiling Section Furring Channels', value: ceilingSectionPieces, unit: 'lengths' },
          { label: 'Drywall Screws (25mm)', value: screwsNeeded, unit: 'screws' },
          ...(coveLedLength > 0 ? [{ label: 'Cove LED Profile Length', value: coveLedLength, unit: isMetric ? 'm' : 'linear ft' }] : []),
          { label: 'Estimated Installed Cost', value: `$${estCostMin.toLocaleString()} – $${estCostMax.toLocaleString()}` },
        ],
      };
    },
  },

  'home-renovation-loan-calculator': {
    slug: 'home-renovation-loan-calculator',
    defaultInputs: { loanAmount: 35000, interestRate: 7.5, termYears: 5, loanType: 'personal' },
    fields: [
      { id: 'loanAmount', label: 'Renovation Budget / Loan Amount', type: 'number', defaultValue: 35000, step: 1000, min: 1000, max: 500000 },
      { id: 'interestRate', label: 'Interest Rate (APR %)', type: 'number', defaultValue: 7.5, step: 0.1, min: 1, max: 25 },
      {
        id: 'termYears',
        label: 'Loan Term Length',
        type: 'select',
        defaultValue: 5,
        options: [
          { label: '3 Years (36 Months)', value: '3' },
          { label: '5 Years (60 Months) — Most Common', value: '5' },
          { label: '7 Years (84 Months)', value: '7' },
          { label: '10 Years (120 Months)', value: '10' },
          { label: '15 Years (180 Months) — Fixed Home Equity', value: '15' },
          { label: '20 Years (240 Months)', value: '20' },
        ],
      },
      {
        id: 'loanType',
        label: 'Financing Vehicle',
        type: 'select',
        defaultValue: 'personal',
        options: [
          { label: 'Unsecured Personal Remodel Loan (No Equity Needed)', value: 'personal' },
          { label: 'Home Equity Line of Credit (HELOC)', value: 'heloc' },
          { label: 'Fixed-Rate Home Equity Loan', value: 'homeEquity' },
          { label: 'Cash-Out Refinance Mortgage', value: 'cashOut' },
        ],
        helperText: 'Personal loans fund within 48h with no appraisal. Home equity options offer lower rates using home collateral.',
      },
    ],
    formulaHighlight: 'Monthly Payment = P × [r(1 + r)ⁿ] ÷ [(1 + r)ⁿ − 1], where r = APR ÷ 12 and n = Months',
    howItIsCalculated: [
      'Calculates exact monthly amortization payments based on principal borrowed, APR interest rate, and term length.',
      'Computes total interest charges paid across the full lifetime of the renovation financing loan.',
      'Compares financing vehicles (unsecured personal loan vs. HELOC vs. fixed home equity loan) to clarify total project carrying costs.',
    ],
    faqs: [
      { question: 'What credit score do I need for a home renovation loan?', answer: 'Unsecured personal renovation loans typically require a 620+ FICO score, with the most competitive interest rates reserved for 720+ scores. Home equity loans and HELOCs usually require at least a 680 score and 15% to 20% remaining home equity.' },
      { question: 'Is a HELOC or Personal Loan better for home remodeling?', answer: 'A HELOC is ideal when remodeling in phases with unpredictable contractor draws because you only pay interest on funds as you draw them. A personal renovation loan is superior if you need quick funding (24–72 hours), do not want an appraisal fee, or do not wish to put your house up as collateral.' },
      { question: 'Are home renovation loan interest payments tax deductible?', answer: 'Under current IRS guidelines in the United States, interest paid on home equity loans and HELOCs is tax-deductible if the borrowed funds are used to substantially buy, build, or improve the home securing the loan. Interest on unsecured personal loans is not tax-deductible.' },
      { question: 'How much can I borrow for a home renovation?', answer: 'For home equity loans and HELOCs, most lenders cap your borrowing at 80% to 85% combined loan-to-value (CLTV) minus your remaining mortgage balance. Unsecured personal home improvement loans typically lend between $5,000 up to $100,000 depending on debt-to-income ratio.' },
      { question: 'How can I lower my monthly renovation loan payments?', answer: 'Extending your loan term from 5 years to 10 or 15 years significantly reduces your monthly obligation, though it increases total cumulative interest. Alternatively, combining savings with a smaller loan reduces principal burden.' },
    ],
    calculate: (inputs) => {
      const principal = Math.max(1000, Number(inputs.loanAmount) || 35000);
      const apr = Math.max(0.1, Number(inputs.interestRate) || 7.5);
      const years = Math.max(1, Number(inputs.termYears) || 5);
      const months = years * 12;
      const monthlyRate = (apr / 100) / 12;

      const monthlyPayment = Math.round(
        (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
        (Math.pow(1 + monthlyRate, months) - 1)
      );

      const totalPayments = monthlyPayment * months;
      const totalInterest = totalPayments - principal;
      const interestRatio = Math.round((totalInterest / principal) * 100);

      return {
        primaryValue: monthlyPayment,
        primaryUnit: '/ month',
        primaryLabel: 'Estimated Monthly Payment',
        details: [
          { label: 'Borrowed Loan Amount', value: `$${principal.toLocaleString()}`, highlight: true },
          { label: 'Total Interest Paid', value: `$${totalInterest.toLocaleString()}` },
          { label: 'Total Financing Cost', value: `$${totalPayments.toLocaleString()}` },
          { label: 'Loan Term Length', value: `${years} Years (${months} months)` },
          { label: 'Interest-to-Principal Ratio', value: `${interestRatio}%` },
          { label: 'Effective APR', value: `${apr.toFixed(2)}%` },
        ],
      };
    },
  },
};
