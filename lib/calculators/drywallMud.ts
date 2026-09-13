/**
 * Drywall Mud & Joint Compound Pure Engine
 */
import { UnitSystem } from '../types';

export interface DrywallMudCalculatorInput {
  unit: UnitSystem;
  drywallAreaSqFt: number; // square footage of drywall installed
  finishLevel?: 'level-3' | 'level-4' | 'level-5'; // Level 4 is standard paint finish; Level 5 includes full skim coat
  wastePercent?: number;   // default 10%
}

export interface DrywallMudCalculatorResult {
  drywallAreaSqFt: number;
  drywallAreaSqM: number;
  totalMudGallons: number;
  buckets4_5GalNeeded: number; // standard 4.5 gal / 17L ready-mix compound bucket
  paperTapeRolls500ft: number; // 500 ft rolls of joint tape
  cornerBeadLinearFt: number;
  finishLevelDescription: string;
}

export function calculateDrywallMud(input: DrywallMudCalculatorInput): DrywallMudCalculatorResult {
  const isMetric = input.unit === 'metric';
  const waste = input.wastePercent ?? 10;
  const level = input.finishLevel ?? 'level-4';

  const areaSqFt = isMetric ? input.drywallAreaSqFt * 10.7639 : input.drywallAreaSqFt;
  const areaSqM = areaSqFt / 10.7639;

  // Joint compound consumption rule of thumb:
  // Ready-mix joint compound coverage, per ASTM C840 finish level.
  // Level 3 (tape + 1 coat):            ~1 x 4.5 gal bucket per 550 sq ft
  // Level 4 (tape + fill + finish):     ~1 x 4.5 gal bucket per 400 sq ft
  // Level 5 (Level 4 + full skim coat): ~1 x 4.5 gal bucket per 250 sq ft
  let galPerSqFt = 0.0113;
  let desc = 'Level 4 Standard: 3 coats over seams & screws, ready for flat or eggshell paint';

  if (level === 'level-3') {
    galPerSqFt = 0.0082;
    desc = 'Level 3 Heavy Texture: 2 coats, suitable for heavy spray textures or heavy wall coverings';
  } else if (level === 'level-5') {
    galPerSqFt = 0.018;
    desc = 'Level 5 Premium: 3 coats over fasteners plus full skim coat for gloss paint or critical lighting';
  }

  const rawGallons = areaSqFt * galPerSqFt;
  const totalMudGallons = Math.ceil(rawGallons * (1 + waste / 100));

  // 1 standard pail/carton of ready-mix joint compound = 4.5 gallons (or 3.5 gal lightweight)
  const buckets4_5Gal = Math.max(1, Math.ceil(totalMudGallons / 4.5));

  // Tape: Rule of thumb is ~37 linear feet of joint tape per 100 sq ft of drywall
  const tapeLinearFt = (areaSqFt / 100) * 37 * 1.1; // with 10% buffer
  const paperTapeRolls500ft = Math.max(1, Math.ceil(tapeLinearFt / 500));

  // Corner bead estimate: ~10% of perimeter
  const cornerBeadLinearFt = Math.ceil(Math.sqrt(areaSqFt) * 2);

  return {
    drywallAreaSqFt: Math.round(areaSqFt),
    drywallAreaSqM: Math.round(areaSqM * 10) / 10,
    totalMudGallons,
    buckets4_5GalNeeded: buckets4_5Gal,
    paperTapeRolls500ft,
    cornerBeadLinearFt,
    finishLevelDescription: desc,
  };
}
