/**
 * Tile Mortar & Thinset Calculator Pure Engine
 */
import { UnitSystem } from '../types';

export interface TileMortarCalculatorInput {
  unit: UnitSystem;
  tileAreaSqFt: number; // sq ft or sq meters
  trowelNotchSize?: '1/4x1/4' | '1/4x3/8' | '1/2x1/2' | 'v-notch';
  substrate?: 'concrete' | 'cement-backer' | 'plywood' | 'membrane';
  wastePercent?: number; // default 10%
}

export interface TileMortarCalculatorResult {
  tileAreaSqFt: number;
  tileAreaSqM: number;
  bags50lbNeeded: number;
  coveragePerBagSqFt: number;
  waterGallonsForMixing: number;
  recommendedTrowel: string;
  wastePercent: number;
}

export function calculateTileMortar(input: TileMortarCalculatorInput): TileMortarCalculatorResult {
  const isMetric = input.unit === 'metric';
  const waste = input.wastePercent ?? 10;
  const trowel = input.trowelNotchSize ?? '1/4x3/8';

  const areaSqFt = isMetric ? input.tileAreaSqFt * 10.7639 : input.tileAreaSqFt;
  const areaSqM = areaSqFt / 10.7639;

  // Thinset coverage rates for 50 lb bag:
  // V-Notch (small mosaic tile <4"): ~80-90 sq ft per 50lb bag
  // 1/4" x 1/4" square notch (4" to 8" tiles): ~65-75 sq ft
  // 1/4" x 3/8" square notch (8" to 15" tiles): ~50-60 sq ft
  // 1/2" x 1/2" square notch (large format tiles >15"): ~35-45 sq ft
  let coveragePerBag = 55;
  let trowelLabel = '1/4" × 3/8" Square Notch (Medium tile 8"-15")';

  if (trowel === 'v-notch') {
    coveragePerBag = 85;
    trowelLabel = '3/16" V-Notch (Mosaics & wall tiles up to 4")';
  } else if (trowel === '1/4x1/4') {
    coveragePerBag = 70;
    trowelLabel = '1/4" × 1/4" Square Notch (Standard tile 4"-8")';
  } else if (trowel === '1/2x1/2') {
    coveragePerBag = 40;
    trowelLabel = '1/2" × 1/2" Square Notch (Large format tile 15"+)';
  }

  const areaWithWaste = areaSqFt * (1 + waste / 100);
  const bags50lbNeeded = Math.ceil(areaWithWaste / coveragePerBag);

  // Each 50lb bag of dry thinset requires approx 5 to 6 quarts (1.3 to 1.5 gallons) of clean water
  const waterGallonsForMixing = Math.round(bags50lbNeeded * 1.4 * 10) / 10;

  return {
    tileAreaSqFt: Math.round(areaSqFt * 10) / 10,
    tileAreaSqM: Math.round(areaSqM * 10) / 10,
    bags50lbNeeded,
    coveragePerBagSqFt: coveragePerBag,
    waterGallonsForMixing,
    recommendedTrowel: trowelLabel,
    wastePercent: waste,
  };
}
