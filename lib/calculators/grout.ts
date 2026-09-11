/**
 * Grout Calculator Pure Engine
 */
import { UnitSystem } from '../types';

export interface GroutCalculatorInput {
  unit: UnitSystem;
  tileArea: number;       // sq ft (imperial) or sq meters (metric)
  tileLength: number;     // inches (imperial) or cm (metric)
  tileWidth: number;      // inches (imperial) or cm (metric)
  tileThickness?: number; // inches (imperial) or mm (metric), default 0.375 in (9.5mm)
  lineWidth: number;      // inches (imperial) or mm (metric), e.g. 0.125 in (3mm)
  wastePercent?: number;  // default 10%
  groutType?: 'sanded' | 'unsanded' | 'epoxy';
}

export interface GroutCalculatorResult {
  groutWeightLbs: number;
  groutWeightKg: number;
  bags10lb: number;
  bags25lb: number;
  bags50lb: number;
  coveragePerBag25lbSqFt: number;
  groutVolumeCuIn: number;
  wastePercent: number;
}

export function calculateGrout(input: GroutCalculatorInput): GroutCalculatorResult {
  const isMetric = input.unit === 'metric';
  const wastePercent = input.wastePercent ?? 10;

  // Convert inputs into inches internally for calculation
  const areaSqFt = isMetric ? input.tileArea * 10.7639 : input.tileArea;
  const tileL_in = isMetric ? input.tileLength / 2.54 : input.tileLength;
  const tileW_in = isMetric ? input.tileWidth / 2.54 : input.tileWidth;
  const tileT_in = input.tileThickness
    ? (isMetric ? input.tileThickness / 25.4 : input.tileThickness)
    : 0.375; // default 3/8"

  const lineW_in = isMetric ? input.lineWidth / 25.4 : input.lineWidth;

  // Grout density approx 100-105 lbs per cubic foot => ~0.060 lbs per cubic inch
  // Standard tile industry formula:
  // Weight (lbs) = (Area_sqin / (L * W)) * ((L + W) * lineW * lineDepth) * density
  // Area_sqin = areaSqFt * 144
  const safeTileArea_in = Math.max(1, tileL_in * tileW_in);
  const numTiles = (areaSqFt * 144) / safeTileArea_in;
  const jointPerTile_cuin = (tileL_in + tileW_in) * lineW_in * tileT_in;
  const rawVolume_cuin = numTiles * jointPerTile_cuin;

  // With waste
  const totalVolume_cuin = rawVolume_cuin * (1 + wastePercent / 100);
  const groutWeightLbs = Math.max(1, Math.round(totalVolume_cuin * 0.060 * 10) / 10);
  const groutWeightKg = Math.round(groutWeightLbs * 0.453592 * 10) / 10;

  const bags10lb = Math.ceil(groutWeightLbs / 10);
  const bags25lb = Math.ceil(groutWeightLbs / 25);
  const bags50lb = Math.ceil(groutWeightLbs / 50);

  const coveragePerBag25lb = groutWeightLbs > 0 ? Math.round((25 / (groutWeightLbs / areaSqFt)) * 10) / 10 : 100;

  return {
    groutWeightLbs,
    groutWeightKg,
    bags10lb,
    bags25lb,
    bags50lb,
    coveragePerBag25lbSqFt: coveragePerBag25lb,
    groutVolumeCuIn: Math.round(totalVolume_cuin),
    wastePercent,
  };
}
