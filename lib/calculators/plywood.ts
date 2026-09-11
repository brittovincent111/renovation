/**
 * Plywood & Sheet Material Pure Calculation Engine
 *
 * Industry rule-of-thumb constants:
 */
export const DEFAULT_SHEET_WASTE_PERCENT = 10;     // 10% standard waste for cutting offcuts
export const STANDARD_SHEET_4X8_SQFT = 32;          // 4 ft x 8 ft = 32 sq ft (approx 2.97 sq m)
export const STANDARD_SHEET_4X9_SQFT = 36;          // 4 ft x 9 ft = 36 sq ft
export const STANDARD_SHEET_4X10_SQFT = 40;         // 4 ft x 10 ft = 40 sq ft
export const STANDARD_SHEET_5X5_SQFT = 25;          // 5 ft x 5 ft Baltic birch = 25 sq ft

export type SheetSizePreset = '4x8' | '4x9' | '4x10' | '5x5' | 'custom';

export interface PlywoodCalculatorInput {
  unit: 'imperial' | 'metric';
  entryMode: 'dimensions' | 'area';
  length?: number;          // feet or meters
  width?: number;           // feet or meters
  directArea?: number;      // sq ft or sq m
  sheetSizePreset: SheetSizePreset;
  customSheetLength?: number;
  customSheetWidth?: number;
  wastePercent?: number;    // default 10%
  pricePerSheet?: number;
}

export interface PlywoodCalculatorResult {
  totalAreaSqFt: number;
  totalAreaSqM: number;
  singleSheetAreaSqFt: number;
  singleSheetAreaSqM: number;
  wastePercent: number;
  rawSheetsNeeded: number;
  sheetsNeeded: number;
  areaWithWasteSqFt: number;
  areaWithWasteSqM: number;
  estimatedCost?: number;
}

export function calculatePlywood(input: PlywoodCalculatorInput): PlywoodCalculatorResult {
  const isMetric = input.unit === 'metric';

  let rawArea = 0;
  if (input.entryMode === 'area' && input.directArea) {
    rawArea = input.directArea;
  } else if (input.length && input.width) {
    rawArea = input.length * input.width;
  }

  const totalAreaSqM = isMetric ? rawArea : rawArea / 10.7639;
  const totalAreaSqFt = isMetric ? rawArea * 10.7639 : rawArea;

  // Single sheet area
  let singleSheetAreaSqFt = STANDARD_SHEET_4X8_SQFT;
  switch (input.sheetSizePreset) {
    case '4x9':
      singleSheetAreaSqFt = STANDARD_SHEET_4X9_SQFT;
      break;
    case '4x10':
      singleSheetAreaSqFt = STANDARD_SHEET_4X10_SQFT;
      break;
    case '5x5':
      singleSheetAreaSqFt = STANDARD_SHEET_5X5_SQFT;
      break;
    case 'custom':
      if (input.customSheetLength && input.customSheetWidth) {
        if (isMetric) {
          const areaM2 = input.customSheetLength * input.customSheetWidth;
          singleSheetAreaSqFt = areaM2 * 10.7639;
        } else {
          singleSheetAreaSqFt = input.customSheetLength * input.customSheetWidth;
        }
      }
      break;
    case '4x8':
    default:
      singleSheetAreaSqFt = STANDARD_SHEET_4X8_SQFT;
      break;
  }

  const singleSheetAreaSqM = singleSheetAreaSqFt / 10.7639;
  const wastePercent = input.wastePercent !== undefined ? input.wastePercent : DEFAULT_SHEET_WASTE_PERCENT;

  const rawSheets = totalAreaSqFt / (singleSheetAreaSqFt || 1);
  const sheetsNeeded = Math.ceil(rawSheets * (1 + wastePercent / 100));

  const areaWithWasteSqFt = totalAreaSqFt * (1 + wastePercent / 100);
  const areaWithWasteSqM = totalAreaSqM * (1 + wastePercent / 100);

  let estimatedCost: number | undefined;
  if (input.pricePerSheet && input.pricePerSheet > 0) {
    estimatedCost = Math.round(sheetsNeeded * input.pricePerSheet * 100) / 100;
  }

  return {
    totalAreaSqFt: Math.round(totalAreaSqFt * 100) / 100,
    totalAreaSqM: Math.round(totalAreaSqM * 100) / 100,
    singleSheetAreaSqFt: Math.round(singleSheetAreaSqFt * 100) / 100,
    singleSheetAreaSqM: Math.round(singleSheetAreaSqM * 100) / 100,
    wastePercent,
    rawSheetsNeeded: Math.ceil(rawSheets),
    sheetsNeeded: Math.max(1, sheetsNeeded),
    areaWithWasteSqFt: Math.round(areaWithWasteSqFt * 100) / 100,
    areaWithWasteSqM: Math.round(areaWithWasteSqM * 100) / 100,
    estimatedCost,
  };
}
