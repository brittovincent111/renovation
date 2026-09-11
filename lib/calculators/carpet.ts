/**
 * Carpet & Underlayment Calculator Pure Engine
 */
import { UnitSystem } from '../types';

export interface CarpetCalculatorInput {
  unit: UnitSystem;
  roomLength: number; // ft or meters
  roomWidth: number;  // ft or meters
  rollWidth?: number; // default 12 ft (or 3.66m)
  wastePercent?: number; // default 10%
  pricePerSqYd?: number;
}

export interface CarpetCalculatorResult {
  roomAreaSqFt: number;
  roomAreaSqM: number;
  sqYardsNeeded: number;
  sqMetersNeeded: number;
  stripsNeeded: number;
  rollLengthFt: number;
  rollLengthM: number;
  wastePercent: number;
  tackStripLinearFt: number;
  paddingSqYds: number;
  estimatedCost?: number;
}

export function calculateCarpet(input: CarpetCalculatorInput): CarpetCalculatorResult {
  const isMetric = input.unit === 'metric';
  const waste = input.wastePercent ?? 10;
  const rollWidthFt = input.rollWidth ?? (isMetric ? 3.66 * 3.28084 : 12);

  const lengthFt = isMetric ? input.roomLength * 3.28084 : input.roomLength;
  const widthFt = isMetric ? input.roomWidth * 3.28084 : input.roomWidth;

  const roomAreaSqFt = lengthFt * widthFt;
  const roomAreaSqM = roomAreaSqFt / 10.7639;

  // Carpet rolls are standard 12' or 15' wide.
  // Must account for roll strip seams
  const stripsNeeded = Math.ceil(widthFt / rollWidthFt);
  const rawLinearFt = stripsNeeded * lengthFt;
  const linearFtWithWaste = rawLinearFt * (1 + waste / 100);
  const totalCarpetSqFt = linearFtWithWaste * rollWidthFt;

  // US standard unit: Square Yards (1 sq yd = 9 sq ft)
  const sqYardsNeeded = Math.ceil(totalCarpetSqFt / 9);
  const sqMetersNeeded = Math.round((sqYardsNeeded * 0.836127) * 10) / 10;

  // Tack strips: perimeter of room minus door opening (~3ft)
  const perimeterFt = 2 * (lengthFt + widthFt) - 3;
  const tackStripLinearFt = Math.ceil(perimeterFt);

  // Underlayment padding: matches square yardage with 5% waste
  const paddingSqYds = Math.ceil((roomAreaSqFt * 1.05) / 9);

  let estimatedCost: number | undefined;
  if (input.pricePerSqYd && input.pricePerSqYd > 0) {
    estimatedCost = Math.round(sqYardsNeeded * input.pricePerSqYd * 100) / 100;
  }

  return {
    roomAreaSqFt: Math.round(roomAreaSqFt * 10) / 10,
    roomAreaSqM: Math.round(roomAreaSqM * 10) / 10,
    sqYardsNeeded,
    sqMetersNeeded,
    stripsNeeded,
    rollLengthFt: Math.round(linearFtWithWaste * 10) / 10,
    rollLengthM: Math.round((linearFtWithWaste * 0.3048) * 10) / 10,
    wastePercent: waste,
    tackStripLinearFt,
    paddingSqYds,
    estimatedCost,
  };
}
