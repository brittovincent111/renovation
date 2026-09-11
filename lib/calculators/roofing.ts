/**
 * Roofing Shingle Calculator Pure Calculation Engine
 *
 * Industry rule-of-thumb constants:
 */
export const SQFT_PER_ROOFING_SQUARE = 100;         // 1 roofing "square" = 100 sq ft
export const BUNDLES_PER_SQUARE = 3;                // Standard architectural or 3-tab shingles: 3 bundles per square
export const DEFAULT_ROOFING_WASTE_PERCENT = 10;    // 10% for simple gable roofs; up to 15-20% for hip/valley roofs

export type RoofPitch = 'flat' | 'low' | 'medium' | 'steep' | 'verysteep';

export interface PitchDetail {
  id: RoofPitch;
  label: string;
  slopeRatio: string;
  multiplier: number;
  wasteDefault: number;
}

export const PITCH_PRESETS: Record<RoofPitch, PitchDetail> = {
  flat: { id: 'flat', label: 'Flat (0/12 to 2/12)', slopeRatio: '0-2/12', multiplier: 1.00, wasteDefault: 10 },
  low: { id: 'low', label: 'Low Pitch (3/12 to 5/12)', slopeRatio: '4/12', multiplier: 1.054, wasteDefault: 10 },
  medium: { id: 'medium', label: 'Medium Pitch (6/12 to 8/12)', slopeRatio: '6/12', multiplier: 1.15, wasteDefault: 12 },
  steep: { id: 'steep', label: 'Steep Pitch (9/12 to 11/12)', slopeRatio: '9/12', multiplier: 1.30, wasteDefault: 15 },
  verysteep: { id: 'verysteep', label: 'Very Steep (12/12+)', slopeRatio: '12/12', multiplier: 1.414, wasteDefault: 18 },
};

export interface RoofingCalculatorInput {
  unit: 'imperial' | 'metric';
  footprintLength: number;   // feet or meters
  footprintWidth: number;    // feet or meters
  overhangInches?: number;   // e.g. 12 inches (1 foot) all around
  pitch: RoofPitch;
  wastePercent?: number;     // e.g. 10%, 15%
  pricePerBundle?: number;
}

export interface RoofingCalculatorResult {
  footprintAreaSqFt: number;
  footprintAreaSqM: number;
  pitchMultiplier: number;
  actualRoofAreaSqFt: number;
  actualRoofAreaSqM: number;
  squares: number;
  wastePercent: number;
  squaresWithWaste: number;
  bundlesNeeded: number;
  underlaymentRolls: number; // 400 sq ft per roll
  ridgeCapBundles: number;   // approx 1 bundle per 25-30 lin ft of ridge
  estimatedCost?: number;
}

export function calculateRoofing(input: RoofingCalculatorInput): RoofingCalculatorResult {
  const isMetric = input.unit === 'metric';

  let lenFt = isMetric ? input.footprintLength * 3.28084 : input.footprintLength;
  let widFt = isMetric ? input.footprintWidth * 3.28084 : input.footprintWidth;

  // Add overhang if provided (inches on each side)
  if (input.overhangInches && input.overhangInches > 0) {
    const overhangFt = (input.overhangInches / 12) * 2;
    lenFt += overhangFt;
    widFt += overhangFt;
  }

  const footprintAreaSqFt = lenFt * widFt;
  const footprintAreaSqM = footprintAreaSqFt / 10.7639;

  const pitchConfig = PITCH_PRESETS[input.pitch] || PITCH_PRESETS.medium;
  const pitchMultiplier = pitchConfig.multiplier;

  const actualRoofAreaSqFt = footprintAreaSqFt * pitchMultiplier;
  const actualRoofAreaSqM = actualRoofAreaSqFt / 10.7639;

  const squares = actualRoofAreaSqFt / SQFT_PER_ROOFING_SQUARE;

  const wastePercent =
    input.wastePercent !== undefined ? input.wastePercent : pitchConfig.wasteDefault;
  const wasteMultiplier = 1 + wastePercent / 100;

  const squaresWithWaste = squares * wasteMultiplier;
  const bundlesNeeded = Math.ceil(squaresWithWaste * BUNDLES_PER_SQUARE);

  // 1 roll of standard synthetic roof underlayment covers ~400 sq ft
  const underlaymentRolls = Math.max(1, Math.ceil(actualRoofAreaSqFt / 400));

  // Ridge cap estimate: approx 1 bundle per roof length ridge
  const ridgeCapBundles = Math.max(1, Math.ceil(lenFt / 30));

  let estimatedCost: number | undefined;
  if (input.pricePerBundle && input.pricePerBundle > 0) {
    estimatedCost = Math.round(bundlesNeeded * input.pricePerBundle * 100) / 100;
  }

  return {
    footprintAreaSqFt: Math.round(footprintAreaSqFt * 100) / 100,
    footprintAreaSqM: Math.round(footprintAreaSqM * 100) / 100,
    pitchMultiplier,
    actualRoofAreaSqFt: Math.round(actualRoofAreaSqFt * 100) / 100,
    actualRoofAreaSqM: Math.round(actualRoofAreaSqM * 100) / 100,
    squares: Math.round(squares * 100) / 100,
    wastePercent,
    squaresWithWaste: Math.round(squaresWithWaste * 100) / 100,
    bundlesNeeded: Math.max(1, bundlesNeeded),
    underlaymentRolls,
    ridgeCapBundles,
    estimatedCost,
  };
}
