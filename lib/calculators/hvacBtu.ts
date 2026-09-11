/**
 * HVAC BTU Sizing Calculator Pure Engine
 */
import { UnitSystem } from '../types';

export interface HvacBtuCalculatorInput {
  unit: UnitSystem;
  roomArea: number; // sq ft or sq meters
  ceilingHeight?: number; // ft (default 8 ft)
  climateZone?: 'mild' | 'moderate' | 'hot' | 'extreme';
  insulationQuality?: 'poor' | 'average' | 'good';
  sunExposure?: 'low' | 'average' | 'high';
  kitchenIncluded?: boolean; // +4,000 BTU for kitchen cooking heat
  occupants?: number; // +600 BTU per person over 2
}

export interface HvacBtuCalculatorResult {
  roomAreaSqFt: number;
  roomAreaSqM: number;
  recommendedBtuRange: string;
  recommendedBtuMin: number;
  recommendedBtuMax: number;
  recommendedTons: number;
  baseBtu: number;
  climateAdjustmentBtu: number;
  heightAdjustmentBtu: number;
  disclaimer: string;
}

export function calculateHvacBtu(input: HvacBtuCalculatorInput): HvacBtuCalculatorResult {
  const isMetric = input.unit === 'metric';
  const ceilingHeight = input.ceilingHeight ?? 8;
  const climate = input.climateZone ?? 'moderate';
  const insulation = input.insulationQuality ?? 'average';
  const sun = input.sunExposure ?? 'average';
  const kitchen = input.kitchenIncluded ?? false;
  const occupants = input.occupants ?? 2;

  const areaSqFt = isMetric ? input.roomArea * 10.7639 : input.roomArea;
  const areaSqM = areaSqFt / 10.7639;

  // Rule of thumb baseline: 20 BTU per sq ft (for standard 8ft ceilings)
  let btuPerSqFt = 20;

  // Climate adjustments
  let climateFactor = 1.0;
  if (climate === 'mild') climateFactor = 0.9;
  if (climate === 'hot') climateFactor = 1.15;
  if (climate === 'extreme') climateFactor = 1.25;

  // Insulation factor
  let insulationFactor = 1.0;
  if (insulation === 'poor') insulationFactor = 1.15;
  if (insulation === 'good') insulationFactor = 0.9;

  // Sun exposure factor
  let sunFactor = 1.0;
  if (sun === 'low') sunFactor = 0.9;
  if (sun === 'high') sunFactor = 1.1;

  // Ceiling height adjustment (scale proportionally if higher than 8 ft)
  const heightMultiplier = Math.max(1, ceilingHeight / 8);

  const baseBtu = areaSqFt * btuPerSqFt;
  let totalBtu = baseBtu * climateFactor * insulationFactor * sunFactor * heightMultiplier;

  // Add kitchen heat if applicable
  if (kitchen) {
    totalBtu += 4000;
  }

  // Occupants over 2: add 600 BTU per additional person
  if (occupants > 2) {
    totalBtu += (occupants - 2) * 600;
  }

  // Range +/- 10%
  const recommendedBtuMin = Math.round((totalBtu * 0.95) / 500) * 500;
  const recommendedBtuMax = Math.round((totalBtu * 1.1) / 500) * 500;

  // AC Tonnage: 1 Ton = 12,000 BTU
  const tons = Math.round((recommendedBtuMax / 12000) * 2) / 2;

  return {
    roomAreaSqFt: Math.round(areaSqFt * 10) / 10,
    roomAreaSqM: Math.round(areaSqM * 10) / 10,
    recommendedBtuRange: `${recommendedBtuMin.toLocaleString()} – ${recommendedBtuMax.toLocaleString()} BTU`,
    recommendedBtuMin,
    recommendedBtuMax,
    recommendedTons: Math.max(0.5, tons),
    baseBtu: Math.round(baseBtu),
    climateAdjustmentBtu: Math.round(totalBtu - baseBtu),
    heightAdjustmentBtu: Math.round(baseBtu * (heightMultiplier - 1)),
    disclaimer:
      'Rough planning estimate only. Final HVAC system sizing requires a professional Manual J load calculation accounting for window ductwork, air leakage, and local energy codes.',
  };
}
