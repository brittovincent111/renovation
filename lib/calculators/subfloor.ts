/**
 * Subfloor & Underlayment Calculator Pure Engine
 */
import { UnitSystem } from '../types';

export interface SubfloorCalculatorInput {
  unit: UnitSystem;
  roomLength: number; // ft or meters
  roomWidth: number;  // ft or meters
  sheetSize?: '4x8' | '4x9' | '4x10';
  thickness?: '1/4"' | '1/2"' | '5/8"' | '3/4"';
  wastePercent?: number; // default 10%
  joistSpacing?: 16 | 24; // inches OC
  includeAdhesive?: boolean;
}

export interface SubfloorCalculatorResult {
  totalAreaSqFt: number;
  totalAreaSqM: number;
  sheetsNeeded: number;
  rawSheets: number;
  wastePercent: number;
  screwsNeeded: number;
  adhesiveTubesNeeded: number;
  thickness: string;
}

export function calculateSubfloor(input: SubfloorCalculatorInput): SubfloorCalculatorResult {
  const isMetric = input.unit === 'metric';
  const waste = input.wastePercent ?? 10;
  const sheetType = input.sheetSize ?? '4x8';
  const thickness = input.thickness ?? '3/4"';
  const joistSpacing = input.joistSpacing ?? 16;

  const rawArea = input.roomLength * input.roomWidth;
  const totalAreaSqM = isMetric ? rawArea : rawArea / 10.7639;
  const totalAreaSqFt = isMetric ? rawArea * 10.7639 : rawArea;

  let sheetAreaSqFt = 32; // 4x8
  if (sheetType === '4x9') sheetAreaSqFt = 36;
  if (sheetType === '4x10') sheetAreaSqFt = 40;

  const rawSheets = totalAreaSqFt / sheetAreaSqFt;
  const sheetsNeeded = Math.ceil(rawSheets * (1 + waste / 100));

  // Fasteners: Approx 30-35 screws per 4x8 sheet (6" OC on edges, 12" on field)
  const screwsPerSheet = joistSpacing === 16 ? 36 : 30;
  const screwsNeeded = sheetsNeeded * screwsPerSheet;

  // Subfloor adhesive: 1 standard 28oz cartridge covers approx 2 to 2.5 4x8 sheets
  const adhesiveTubesNeeded = Math.ceil(sheetsNeeded / 2);

  return {
    totalAreaSqFt: Math.round(totalAreaSqFt * 10) / 10,
    totalAreaSqM: Math.round(totalAreaSqM * 10) / 10,
    sheetsNeeded,
    rawSheets: Math.round(rawSheets * 10) / 10,
    wastePercent: waste,
    screwsNeeded,
    adhesiveTubesNeeded,
    thickness,
  };
}
