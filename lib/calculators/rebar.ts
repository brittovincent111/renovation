/**
 * Rebar & Concrete Slab Reinforcement Pure Engine
 */
import { UnitSystem } from '../types';

export interface RebarCalculatorInput {
  unit: UnitSystem;
  slabLengthFeet: number;
  slabWidthFeet: number;
  gridSpacingInches?: 12 | 18 | 24; // standard 12" or 18" on-center
  edgeClearanceInches?: number;    // default 3 in from forms
  rebarBarSize?: '#3 (3/8")' | '#4 (1/2")' | '#5 (5/8")';
  stickLengthFeet?: 20;            // standard rebar stick is 20 ft
  lapSpliceInches?: number;        // standard 30-diameter overlap (~15-18 in for #4)
}

export interface RebarCalculatorResult {
  slabAreaSqFt: number;
  slabAreaSqM: number;
  gridSpacingInches: number;
  totalLinearFtNeeded: number;
  total20ftSticksNeeded: number;
  totalIntersections: number;
  tieWireLbsNeeded: number;
  rebarChairsCount: number; // support chairs every 3 ft
  rebarSize: string;
}

export function calculateRebar(input: RebarCalculatorInput): RebarCalculatorResult {
  const isMetric = input.unit === 'metric';
  const spacing = input.gridSpacingInches ?? 18;
  const edgeClear = input.edgeClearanceInches ?? 3;
  const barSize = input.rebarBarSize ?? '#4 (1/2")';

  const lengthFt = isMetric ? input.slabLengthFeet * 3.28084 : input.slabLengthFeet;
  const widthFt = isMetric ? input.slabWidthFeet * 3.28084 : input.slabWidthFeet;

  const areaSqFt = lengthFt * widthFt;
  const areaSqM = areaSqFt / 10.7639;

  // Clear dimensions inside forms
  const clearLengthFt = Math.max(1, lengthFt - (2 * edgeClear) / 12);
  const clearWidthFt = Math.max(1, widthFt - (2 * edgeClear) / 12);

  // Longitudinal runs (along length spaced across width)
  const longitudinalRuns = Math.ceil((clearWidthFt * 12) / spacing) + 1;
  // Transverse runs (along width spaced across length)
  const transverseRuns = Math.ceil((clearLengthFt * 12) / spacing) + 1;

  const linearFtLongitudinal = longitudinalRuns * clearLengthFt;
  const linearFtTransverse = transverseRuns * clearWidthFt;
  const baseLinearFt = linearFtLongitudinal + linearFtTransverse;

  // Lap splices: When run > 20 ft, add 18" lap per splice
  const splicesPerLong = Math.floor(clearLengthFt / 20);
  const splicesPerTrans = Math.floor(clearWidthFt / 20);
  const totalSpliceFt = (splicesPerLong * longitudinalRuns + splicesPerTrans * transverseRuns) * 1.5;

  const totalLinearFt = Math.ceil((baseLinearFt + totalSpliceFt) * 1.08); // 8% cut waste
  const sticks20ft = Math.ceil(totalLinearFt / 20);

  // Intersections to tie
  const totalIntersections = longitudinalRuns * transverseRuns;
  // Tie wire: approx 1 lb of 16-gauge tie wire ties ~150-200 intersections
  const tieWireLbs = Math.max(1, Math.ceil(totalIntersections / 175));

  // Rebar chairs (support bolsters): 1 every 2.5 to 3 feet in each direction
  const chairsCount = Math.ceil((areaSqFt / 9) * 1.1);

  return {
    slabAreaSqFt: Math.round(areaSqFt * 10) / 10,
    slabAreaSqM: Math.round(areaSqM * 10) / 10,
    gridSpacingInches: spacing,
    totalLinearFtNeeded: totalLinearFt,
    total20ftSticksNeeded: sticks20ft,
    totalIntersections,
    tieWireLbsNeeded: tieWireLbs,
    rebarChairsCount: chairsCount,
    rebarSize: barSize,
  };
}
