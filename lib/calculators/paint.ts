/**
 * Paint Calculator Pure Calculation Engine
 *
 * Industry rule-of-thumb constants:
 */
export const STANDARD_DOOR_SQFT = 21;              // Average interior door area (~3ft x 7ft)
export const STANDARD_DOOR_SQM = 1.95;             // Average interior door area in square meters
export const STANDARD_WINDOW_SQFT = 15;            // Average standard window opening (~3ft x 5ft)
export const STANDARD_WINDOW_SQM = 1.4;            // Average window opening in square meters
export const DEFAULT_COVERAGE_SQFT_PER_GALLON = 350;// Standard latex paint coverage (sq ft per gallon)
export const DEFAULT_COVERAGE_SQM_PER_LITER = 8.6; // Standard paint coverage (sq meters per liter)

export type PaintCanSizeImperial = 'quart' | 'gallon' | 'five-gallon';
export type PaintCanSizeMetric = '1L' | '2.5L' | '5L' | '10L';

export interface PaintCalculatorInput {
  unit: 'imperial' | 'metric';
  wallHeight: number;       // feet or meters
  wallLength: number;       // feet or meters
  doorsCount: number;
  windowsCount: number;
  coats: number;            // default 2
  coverageRate?: number;    // sq ft/gal or sq m/liter
  ceilingIncluded?: boolean;
  ceilingWidth?: number;    // for ceiling calculation
  canSizeImperial?: PaintCanSizeImperial;
  canSizeMetric?: PaintCanSizeMetric;
}

export interface PaintCalculatorResult {
  grossAreaSqFt: number;
  grossAreaSqM: number;
  deductionsSqFt: number;
  deductionsSqM: number;
  netAreaSqFt: number;
  netAreaSqM: number;
  totalCoatsAreaSqFt: number;
  totalCoatsAreaSqM: number;
  paintNeededGallons: number;
  paintNeededLiters: number;
  // Breakdown by cans
  cansRecommendation: {
    primaryCanType: string;
    primaryCansCount: number;
    secondaryCanType?: string;
    secondaryCansCount?: number;
  };
}

export function calculatePaint(input: PaintCalculatorInput): PaintCalculatorResult {
  const isMetric = input.unit === 'metric';

  let grossArea = input.wallHeight * input.wallLength;
  if (input.ceilingIncluded && input.ceilingWidth && input.ceilingWidth > 0) {
    grossArea += input.wallLength * input.ceilingWidth;
  }

  const doorDeduction = input.doorsCount * (isMetric ? STANDARD_DOOR_SQM : STANDARD_DOOR_SQFT);
  const windowDeduction = input.windowsCount * (isMetric ? STANDARD_WINDOW_SQM : STANDARD_WINDOW_SQFT);
  const totalDeductions = doorDeduction + windowDeduction;

  const netArea = Math.max(0, grossArea - totalDeductions);

  const grossAreaSqFt = isMetric ? grossArea * 10.7639 : grossArea;
  const grossAreaSqM = isMetric ? grossArea : grossArea / 10.7639;
  const deductionsSqFt = isMetric ? totalDeductions * 10.7639 : totalDeductions;
  const deductionsSqM = isMetric ? totalDeductions : totalDeductions / 10.7639;
  const netAreaSqFt = isMetric ? netArea * 10.7639 : netArea;
  const netAreaSqM = isMetric ? netArea : netArea / 10.7639;

  const coats = Math.max(1, input.coats || 2);
  const totalCoatsAreaSqFt = netAreaSqFt * coats;
  const totalCoatsAreaSqM = netAreaSqM * coats;

  const coveragePerGallon = input.coverageRate && !isMetric ? input.coverageRate : DEFAULT_COVERAGE_SQFT_PER_GALLON;
  const coveragePerLiter = input.coverageRate && isMetric ? input.coverageRate : DEFAULT_COVERAGE_SQM_PER_LITER;

  const paintNeededGallons = totalCoatsAreaSqFt / coveragePerGallon;
  const paintNeededLiters = totalCoatsAreaSqM / coveragePerLiter;

  // Compute container breakdown
  let primaryCanType = '1-Gallon Cans';
  let primaryCansCount = Math.ceil(paintNeededGallons);
  let secondaryCanType: string | undefined;
  let secondaryCansCount: number | undefined;

  if (isMetric) {
    if (paintNeededLiters > 10) {
      const tens = Math.floor(paintNeededLiters / 10);
      const remainder = paintNeededLiters % 10;
      primaryCanType = '10-Liter Cans';
      primaryCansCount = tens;
      if (remainder > 0) {
        secondaryCanType = remainder <= 2.5 ? '2.5-Liter Can' : '5-Liter Can';
        secondaryCansCount = 1;
      }
    } else if (paintNeededLiters > 4) {
      primaryCanType = '5-Liter Cans';
      primaryCansCount = Math.ceil(paintNeededLiters / 5);
    } else {
      primaryCanType = '2.5-Liter Cans';
      primaryCansCount = Math.ceil(paintNeededLiters / 2.5);
    }
  } else {
    if (paintNeededGallons >= 4) {
      const fives = Math.floor(paintNeededGallons / 5);
      const remainder = paintNeededGallons % 5;
      if (fives > 0) {
        primaryCanType = '5-Gallon Buckets';
        primaryCansCount = fives;
        if (remainder > 0) {
          secondaryCanType = '1-Gallon Cans';
          secondaryCansCount = Math.ceil(remainder);
        }
      } else {
        primaryCanType = '1-Gallon Cans';
        primaryCansCount = Math.ceil(paintNeededGallons);
      }
    } else if (paintNeededGallons < 1) {
      primaryCanType = '1-Quart Cans';
      primaryCansCount = Math.ceil(paintNeededGallons * 4);
    } else {
      primaryCanType = '1-Gallon Cans';
      primaryCansCount = Math.ceil(paintNeededGallons);
    }
  }

  return {
    grossAreaSqFt: Math.round(grossAreaSqFt * 100) / 100,
    grossAreaSqM: Math.round(grossAreaSqM * 100) / 100,
    deductionsSqFt: Math.round(deductionsSqFt * 100) / 100,
    deductionsSqM: Math.round(deductionsSqM * 100) / 100,
    netAreaSqFt: Math.round(netAreaSqFt * 100) / 100,
    netAreaSqM: Math.round(netAreaSqM * 100) / 100,
    totalCoatsAreaSqFt: Math.round(totalCoatsAreaSqFt * 100) / 100,
    totalCoatsAreaSqM: Math.round(totalCoatsAreaSqM * 100) / 100,
    paintNeededGallons: Math.round(paintNeededGallons * 100) / 100,
    paintNeededLiters: Math.round(paintNeededLiters * 100) / 100,
    cansRecommendation: {
      primaryCanType,
      primaryCansCount: primaryCansCount || 1,
      secondaryCanType,
      secondaryCansCount,
    },
  };
}
