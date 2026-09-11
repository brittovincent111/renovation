/**
 * Precision unit conversion constants and pure utility functions
 */

export const FEET_PER_METER = 3.28084;
export const METERS_PER_FOOT = 1 / FEET_PER_METER;

export const INCHES_PER_CM = 0.393701;
export const CM_PER_INCH = 2.54;

export const SQFT_PER_SQM = 10.7639;
export const SQM_PER_SQFT = 1 / SQFT_PER_SQM;

export const CUFT_PER_CUM = 35.3147;
export const CUM_PER_CUFT = 1 / CUFT_PER_CUM;

export const CUYD_PER_CUM = 1.30795;
export const CUM_PER_CUYD = 1 / CUYD_PER_CUM;

export const LITERS_PER_GALLON = 3.78541;
export const GALLONS_PER_LITER = 1 / LITERS_PER_GALLON;

export const KG_PER_LB = 0.45359237;
export const LB_PER_KG = 2.20462;

export function metersToFeet(meters: number): number {
  return meters * FEET_PER_METER;
}

export function feetToMeters(feet: number): number {
  return feet * METERS_PER_FOOT;
}

export function cmToInches(cm: number): number {
  return cm * INCHES_PER_CM;
}

export function inchesToCm(inches: number): number {
  return inches * CM_PER_INCH;
}

export function sqMetersToSqFeet(sqMeters: number): number {
  return sqMeters * SQFT_PER_SQM;
}

export function sqFeetToSqMeters(sqFeet: number): number {
  return sqFeet * SQM_PER_SQFT;
}

export function litersToGallons(liters: number): number {
  return liters * GALLONS_PER_LITER;
}

export function gallonsToLiters(gallons: number): number {
  return gallons * LITERS_PER_GALLON;
}

export function cuFeetToCuYards(cuFeet: number): number {
  return cuFeet / 27;
}

export function cuYardsToCuMeters(cuYards: number): number {
  return cuYards * CUM_PER_CUYD;
}

export function roundTo(num: number, decimals: number = 2): number {
  if (isNaN(num) || !isFinite(num)) return 0;
  const factor = Math.pow(10, decimals);
  return Math.round((num + Number.EPSILON) * factor) / factor;
}
