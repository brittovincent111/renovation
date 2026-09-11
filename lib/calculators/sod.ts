/**
 * Sod & Lawn Turf Calculator Pure Engine
 */
import { UnitSystem } from '../types';

export interface SodCalculatorInput {
  unit: UnitSystem;
  lawnLength: number; // ft or meters
  lawnWidth: number;  // ft or meters
  rollFormat?: 'standard-roll' | 'big-roll' | 'slab';
  wastePercent?: number; // default 5-10%
  pricePerSqFt?: number;
}

export interface SodCalculatorResult {
  lawnAreaSqFt: number;
  lawnAreaSqM: number;
  sqFtWithWaste: number;
  rollsNeeded: number; // standard roll is 2ft x 5ft (10 sq ft)
  palletsNeeded: number; // standard pallet holds ~450-500 sq ft (45-50 rolls)
  wastePercent: number;
  topsoilCuYdsForPrep: number; // 1-inch topsoil dressing prep
  estimatedCost?: number;
}

export function calculateSod(input: SodCalculatorInput): SodCalculatorResult {
  const isMetric = input.unit === 'metric';
  const waste = input.wastePercent ?? 8;

  const lengthFt = isMetric ? input.lawnLength * 3.28084 : input.lawnLength;
  const widthFt = isMetric ? input.lawnWidth * 3.28084 : input.lawnWidth;

  const areaSqFt = lengthFt * widthFt;
  const areaSqM = areaSqFt / 10.7639;

  const areaWithWaste = areaSqFt * (1 + waste / 100);

  // Standard sod roll: 2ft × 5ft = 10 sq ft
  const rollsNeeded = Math.ceil(areaWithWaste / 10);

  // Standard sod pallet: 450 to 500 sq ft (45 to 50 rolls)
  const palletsNeeded = Math.ceil(rollsNeeded / 45);

  // Starter soil prep: 1 inch topsoil layer = (Area * 1/12) / 27
  const topsoilCuYds = Math.round(((areaSqFt * (1 / 12)) / 27) * 10) / 10;

  let estimatedCost: number | undefined;
  if (input.pricePerSqFt && input.pricePerSqFt > 0) {
    estimatedCost = Math.round(areaWithWaste * input.pricePerSqFt * 100) / 100;
  }

  return {
    lawnAreaSqFt: Math.round(areaSqFt * 10) / 10,
    lawnAreaSqM: Math.round(areaSqM * 10) / 10,
    sqFtWithWaste: Math.round(areaWithWaste * 10) / 10,
    rollsNeeded,
    palletsNeeded,
    wastePercent: waste,
    topsoilCuYdsForPrep: topsoilCuYds,
    estimatedCost,
  };
}
