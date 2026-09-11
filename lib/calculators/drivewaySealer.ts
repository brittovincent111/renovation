/**
 * Asphalt Driveway Sealer Calculator Pure Engine
 */
import { UnitSystem } from '../types';

export interface DrivewaySealerCalculatorInput {
  unit: UnitSystem;
  drivewayLengthFeet: number;
  drivewayWidthFeet: number;
  surfaceCondition?: 'smooth' | 'moderate' | 'rough-cracked';
  coats?: number; // default 1 or 2
}

export interface DrivewaySealerCalculatorResult {
  drivewayAreaSqFt: number;
  drivewayAreaSqM: number;
  pails5GalNeeded: number;
  totalGallons: number;
  coveragePerPailSqFt: number;
  crackFillerLbsNeeded: number;
  coats: number;
}

export function calculateDrivewaySealer(input: DrivewaySealerCalculatorInput): DrivewaySealerCalculatorResult {
  const isMetric = input.unit === 'metric';
  const condition = input.surfaceCondition ?? 'moderate';
  const coats = input.coats ?? 1;

  const lengthFt = isMetric ? input.drivewayLengthFeet * 3.28084 : input.drivewayLengthFeet;
  const widthFt = isMetric ? input.drivewayWidthFeet * 3.28084 : input.drivewayWidthFeet;

  const areaSqFt = lengthFt * widthFt;
  const areaSqM = areaSqFt / 10.7639;

  // 5-gallon pail asphalt sealer coverage:
  // Smooth / previously sealed: 400-500 sq ft per 5-gal pail
  // Moderate porosity: 300-350 sq ft per 5-gal pail
  // Rough / heavily aged: 200-250 sq ft per 5-gal pail
  let coveragePerPail = 325;
  if (condition === 'smooth') coveragePerPail = 450;
  if (condition === 'rough-cracked') coveragePerPail = 225;

  const totalAreaToSeal = areaSqFt * coats;
  const pailsNeeded = Math.max(1, Math.ceil(totalAreaToSeal / coveragePerPail));
  const totalGallons = pailsNeeded * 5;

  // Rubberized crack filler: rule of thumb ~1 quart (or 2.5 lbs) per 50 sq ft of driveway for moderate condition
  const crackFillerLbs = condition === 'rough-cracked' ? Math.ceil(areaSqFt / 40) : Math.ceil(areaSqFt / 90);

  return {
    drivewayAreaSqFt: Math.round(areaSqFt),
    drivewayAreaSqM: Math.round(areaSqM * 10) / 10,
    pails5GalNeeded: pailsNeeded,
    totalGallons,
    coveragePerPailSqFt: coveragePerPail,
    crackFillerLbsNeeded: crackFillerLbs,
    coats,
  };
}
