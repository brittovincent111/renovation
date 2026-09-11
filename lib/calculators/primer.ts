/**
 * Primer Calculator Pure Engine
 */
import { UnitSystem } from '../types';

export interface PrimerCalculatorInput {
  unit: UnitSystem;
  roomLength: number;
  roomWidth: number;
  wallHeight: number;
  doors?: number;
  windows?: number;
  coats?: number; // default 1
  surfaceType?: 'new-drywall' | 'previously-painted' | 'stained-wood' | 'masonry';
}

export interface PrimerCalculatorResult {
  grossWallAreaSqFt: number;
  netWallAreaSqFt: number;
  netWallAreaSqM: number;
  coverageSqFtPerGal: number;
  gallonsNeeded: number;
  litersNeeded: number;
  cans1Gal: number;
  pails5Gal: number;
  coats: number;
}

export function calculatePrimer(input: PrimerCalculatorInput): PrimerCalculatorResult {
  const isMetric = input.unit === 'metric';
  const coats = input.coats && input.coats > 0 ? input.coats : 1;
  const doors = input.doors ?? 1;
  const windows = input.windows ?? 1;

  const lengthFt = isMetric ? input.roomLength * 3.28084 : input.roomLength;
  const widthFt = isMetric ? input.roomWidth * 3.28084 : input.roomWidth;
  const heightFt = isMetric ? input.wallHeight * 3.28084 : input.wallHeight;

  const perimeterFt = 2 * (lengthFt + widthFt);
  const grossAreaSqFt = perimeterFt * heightFt;

  // Deductions: standard door = 21 sq ft, standard window = 15 sq ft
  const deductionsSqFt = doors * 21 + windows * 15;
  const netAreaSqFt = Math.max(0, grossAreaSqFt - deductionsSqFt);
  const netAreaSqM = netAreaSqFt / 10.7639;

  // Coverage rates:
  // Primer has lower coverage than finish paint due to substrate absorption
  let coverageSqFtPerGal = 250; // default for new drywall
  if (input.surfaceType === 'previously-painted') coverageSqFtPerGal = 300;
  if (input.surfaceType === 'masonry') coverageSqFtPerGal = 200;
  if (input.surfaceType === 'stained-wood') coverageSqFtPerGal = 225;

  const totalAreaToPrime = netAreaSqFt * coats;
  const rawGallons = totalAreaToPrime / coverageSqFtPerGal;
  const gallonsNeeded = Math.round(rawGallons * 10) / 10;
  const litersNeeded = Math.round(gallonsNeeded * 3.78541 * 10) / 10;

  const pails5Gal = Math.floor(gallonsNeeded / 5);
  const remainder = gallonsNeeded % 5;
  const cans1Gal = Math.ceil(remainder);

  return {
    grossWallAreaSqFt: Math.round(grossAreaSqFt),
    netWallAreaSqFt: Math.round(netAreaSqFt),
    netWallAreaSqM: Math.round(netAreaSqM * 10) / 10,
    coverageSqFtPerGal,
    gallonsNeeded: Math.max(1, Math.ceil(gallonsNeeded)),
    litersNeeded: Math.max(3.8, Math.round(litersNeeded * 10) / 10),
    cans1Gal,
    pails5Gal,
    coats,
  };
}
