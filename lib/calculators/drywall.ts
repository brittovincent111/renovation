/**
 * Drywall / Plasterboard Calculator Pure Calculation Engine
 *
 * Industry rule-of-thumb constants:
 */
export const DRYWALL_DOOR_DEDUCTION_SQFT = 21;      // Standard interior door ~21 sq ft
export const DRYWALL_WINDOW_DEDUCTION_SQFT = 15;    // Standard window ~15 sq ft
export const DRYWALL_DOOR_DEDUCTION_SQM = 1.95;
export const DRYWALL_WINDOW_DEDUCTION_SQM = 1.4;

export const SHEET_4X8_SQFT = 32;                   // 4 ft x 8 ft sheet = 32 sq ft
export const SHEET_4X12_SQFT = 48;                  // 4 ft x 12 ft sheet = 48 sq ft

export const SQFT_PER_JOINT_COMPOUND_BUCKET = 600;  // 1 standard 4.5-gal box/bucket of joint compound covers ~600 sq ft
export const SCREW_WEIGHT_LBS_PER_SHEET = 1.5;      // Approx 1.5 lbs of drywall screws per sheet (~35 screws per 4x8)
export const TAPE_FEET_PER_SHEET = 35;              // Approx 35 linear feet of joint tape per 4x8 sheet
export const STANDARD_TAPE_ROLL_FEET = 500;         // 500 ft roll of paper or fiberglass tape

export type DrywallSheetSize = '4x8' | '4x12';

export interface DrywallCalculatorInput {
  unit: 'imperial' | 'metric';
  roomLength: number;
  roomWidth: number;
  roomHeight: number;
  includeCeiling: boolean;
  doorsCount: number;
  windowsCount: number;
  sheetSize: DrywallSheetSize;
  wastePercent?: number;    // default 10%
}

export interface DrywallCalculatorResult {
  wallGrossSqFt: number;
  wallGrossSqM: number;
  deductionsSqFt: number;
  deductionsSqM: number;
  netWallAreaSqFt: number;
  netWallAreaSqM: number;
  ceilingAreaSqFt: number;
  ceilingAreaSqM: number;
  totalAreaSqFt: number;
  totalAreaSqM: number;
  sheetSizeSqFt: number;
  sheetsNeeded: number;
  jointCompoundBuckets: number;
  screwsLbs: number;
  screwsCountApprox: number;
  tapeRollsNeeded: number;
}

export function calculateDrywall(input: DrywallCalculatorInput): DrywallCalculatorResult {
  const isMetric = input.unit === 'metric';

  const lenFt = isMetric ? input.roomLength * 3.28084 : input.roomLength;
  const widFt = isMetric ? input.roomWidth * 3.28084 : input.roomWidth;
  const hgtFt = isMetric ? input.roomHeight * 3.28084 : input.roomHeight;

  const wallGrossSqFt = 2 * (lenFt + widFt) * hgtFt;
  const deductionsSqFt =
    input.doorsCount * DRYWALL_DOOR_DEDUCTION_SQFT +
    input.windowsCount * DRYWALL_WINDOW_DEDUCTION_SQFT;

  const netWallAreaSqFt = Math.max(0, wallGrossSqFt - deductionsSqFt);
  const ceilingAreaSqFt = input.includeCeiling ? lenFt * widFt : 0;
  const totalAreaSqFt = netWallAreaSqFt + ceilingAreaSqFt;

  const sheetSizeSqFt = input.sheetSize === '4x12' ? SHEET_4X12_SQFT : SHEET_4X8_SQFT;
  const wasteMultiplier = 1 + (input.wastePercent !== undefined ? input.wastePercent : 10) / 100;

  const sheetsNeeded = Math.ceil((totalAreaSqFt / sheetSizeSqFt) * wasteMultiplier);

  // Accessories estimates
  const jointCompoundBuckets = Math.max(1, Math.ceil(totalAreaSqFt / SQFT_PER_JOINT_COMPOUND_BUCKET));
  const screwsLbs = Math.round(sheetsNeeded * SCREW_WEIGHT_LBS_PER_SHEET * 10) / 10;
  const screwsCountApprox = sheetsNeeded * (input.sheetSize === '4x12' ? 50 : 35);
  const totalTapeFt = sheetsNeeded * TAPE_FEET_PER_SHEET;
  const tapeRollsNeeded = Math.max(1, Math.ceil(totalTapeFt / STANDARD_TAPE_ROLL_FEET));

  return {
    wallGrossSqFt: Math.round(wallGrossSqFt * 100) / 100,
    wallGrossSqM: Math.round((wallGrossSqFt / 10.7639) * 100) / 100,
    deductionsSqFt: Math.round(deductionsSqFt * 100) / 100,
    deductionsSqM: Math.round((deductionsSqFt / 10.7639) * 100) / 100,
    netWallAreaSqFt: Math.round(netWallAreaSqFt * 100) / 100,
    netWallAreaSqM: Math.round((netWallAreaSqFt / 10.7639) * 100) / 100,
    ceilingAreaSqFt: Math.round(ceilingAreaSqFt * 100) / 100,
    ceilingAreaSqM: Math.round((ceilingAreaSqFt / 10.7639) * 100) / 100,
    totalAreaSqFt: Math.round(totalAreaSqFt * 100) / 100,
    totalAreaSqM: Math.round((totalAreaSqFt / 10.7639) * 100) / 100,
    sheetSizeSqFt,
    sheetsNeeded: Math.max(1, sheetsNeeded),
    jointCompoundBuckets,
    screwsLbs,
    screwsCountApprox,
    tapeRollsNeeded,
  };
}
