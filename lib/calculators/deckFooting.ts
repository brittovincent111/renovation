/**
 * Deck Post & Concrete Footing Depth Calculator Pure Engine
 */
import { UnitSystem } from '../types';

export interface DeckFootingCalculatorInput {
  unit: UnitSystem;
  numberOfFootings: number;
  frostDepthInches?: number;    // default 36 in to 48 in depending on US zone
  sonotubeDiameterInches?: 8 | 10 | 12 | 16; // default 10" or 12"
  aboveGradeHeightInches?: number; // default 6 in
  postSize?: '4x4' | '6x6';
  bellBottomBase?: boolean;     // flared footing base (e.g. BigFoot system)
}

export interface DeckFootingCalculatorResult {
  numberOfFootings: number;
  totalHoleDepthInches: number;
  sonotubeDiameterInches: number;
  cuFtPerFooting: number;
  totalCuYdsConcrete: number;
  bags60lbNeeded: number;
  bags80lbNeeded: number;
  crushedGravelBaseLbs: number; // 4-6" gravel at bottom of hole
  postCapBracketsCount: number;
}

export function calculateDeckFooting(input: DeckFootingCalculatorInput): DeckFootingCalculatorResult {
  const isMetric = input.unit === 'metric';
  const numFootings = Math.max(1, input.numberOfFootings);
  const frostDepth = input.frostDepthInches ?? 36;
  const diameterIn = input.sonotubeDiameterInches ?? 10;
  const aboveGrade = input.aboveGradeHeightInches ?? 6;
  const hasBell = input.bellBottomBase ?? false;

  // Code requirement: Footing must extend at least 6" below the frost line
  const totalHoleDepthIn = frostDepth + 6;
  const totalTubeLengthIn = totalHoleDepthIn + aboveGrade;

  // Cylindrical volume: V = pi * r^2 * h
  const radiusFt = (diameterIn / 2) / 12;
  const tubeHeightFt = totalTubeLengthIn / 12;
  let cuFtPerFooting = Math.PI * Math.pow(radiusFt, 2) * tubeHeightFt;

  // If flared bell base (approx adds 1.5 cu ft of concrete)
  if (hasBell) {
    cuFtPerFooting += 1.5;
  }

  const totalCuFt = cuFtPerFooting * numFootings;
  const totalCuYds = Math.round((totalCuFt / 27) * 100) / 100;

  // 1 bag of 60lb concrete yields ~0.45 cu ft
  // 1 bag of 80lb concrete yields ~0.60 cu ft
  const bags60lbNeeded = Math.ceil(totalCuFt / 0.45);
  const bags80lbNeeded = Math.ceil(totalCuFt / 0.60);

  // Gravel drainage base in hole: ~50 lbs per footing hole
  const crushedGravelBaseLbs = numFootings * 50;

  return {
    numberOfFootings: numFootings,
    totalHoleDepthInches: totalHoleDepthIn,
    sonotubeDiameterInches: diameterIn,
    cuFtPerFooting: Math.round(cuFtPerFooting * 10) / 10,
    totalCuYdsConcrete: totalCuYds,
    bags60lbNeeded,
    bags80lbNeeded,
    crushedGravelBaseLbs,
    postCapBracketsCount: numFootings,
  };
}
