/**
 * Concrete Slab Cost & Volume Estimator (Advanced) Pure Engine
 */
import { UnitSystem } from '../types';

export interface ConcreteSlabCalculatorInput {
  unit: UnitSystem;
  slabLengthFeet: number;
  slabWidthFeet: number;
  slabThicknessInches?: 4 | 5 | 6 | 8; // default 4" for patio/sidewalk, 6" for driveway/garage
  gravelBaseDepthInches?: number;    // default 4" crushed stone base
  includeRebar?: boolean;
  includeEdgeForms?: boolean;
  pricePerCubicYard?: number;        // e.g. $145/cu yd ready-mix
  wastePercent?: number;             // default 8-10% spillage and grade variation
}

export interface ConcreteSlabCalculatorResult {
  slabAreaSqFt: number;
  slabAreaSqM: number;
  slabThicknessInches: number;
  concreteCubicYards: number;
  concreteCubicMeters: number;
  readyMixTruckloads: number; // standard 9-10 cu yd mixer truck
  bags80lbNeeded: number;     // if bag-mixing
  bags60lbNeeded: number;
  gravelBaseCubicYards: number;
  gravelBaseTons: number;
  formingLumberLinearFt: number;
  rebarSticks20ft: number;
  wastePercent: number;
  estimatedMaterialCost?: number;
}

export function calculateConcreteSlab(input: ConcreteSlabCalculatorInput): ConcreteSlabCalculatorResult {
  const isMetric = input.unit === 'metric';
  const thickness = input.slabThicknessInches ?? 4;
  const gravelDepth = input.gravelBaseDepthInches ?? 4;
  const waste = input.wastePercent ?? 10;
  const withRebar = input.includeRebar ?? true;

  const lengthFt = isMetric ? input.slabLengthFeet * 3.28084 : input.slabLengthFeet;
  const widthFt = isMetric ? input.slabWidthFeet * 3.28084 : input.slabWidthFeet;

  const areaSqFt = lengthFt * widthFt;
  const areaSqM = areaSqFt / 10.7639;

  // Concrete volume = Area * (thickness / 12) / 27
  const rawCuFt = areaSqFt * (thickness / 12);
  const cuFtWithWaste = rawCuFt * (1 + waste / 100);
  const concreteCuYds = Math.round((cuFtWithWaste / 27) * 100) / 100;
  const concreteCuM = Math.round(concreteCuYds * 0.764555 * 100) / 100;

  // Truckloads: 9 cubic yards per standard ready-mix delivery truck
  const trucks = Math.ceil(concreteCuYds / 9);

  // Bag counts if mixing on-site
  const bags80lb = Math.ceil(cuFtWithWaste / 0.60);
  const bags60lb = Math.ceil(cuFtWithWaste / 0.45);

  // Sub-base gravel (4" depth with 10% compaction)
  const gravelCuFt = areaSqFt * (gravelDepth / 12) * 1.1;
  const gravelCuYds = Math.round((gravelCuFt / 27) * 10) / 10;
  const gravelTons = Math.round(gravelCuYds * 1.4 * 10) / 10;

  // Perimeter forming boards (2x4 or 2x6)
  const perimeterFt = Math.ceil(2 * (lengthFt + widthFt));

  // Rebar: #4 rebar on 18" grid
  const rebarSticks = withRebar ? Math.ceil(((lengthFt * 12 / 18 + 1) * widthFt + (widthFt * 12 / 18 + 1) * lengthFt) / 20 * 1.1) : 0;

  let estimatedCost: number | undefined;
  if (input.pricePerCubicYard && input.pricePerCubicYard > 0) {
    estimatedCost = Math.round(concreteCuYds * input.pricePerCubicYard * 100) / 100;
  }

  return {
    slabAreaSqFt: Math.round(areaSqFt * 10) / 10,
    slabAreaSqM: Math.round(areaSqM * 10) / 10,
    slabThicknessInches: thickness,
    concreteCubicYards: concreteCuYds,
    concreteCubicMeters: concreteCuM,
    readyMixTruckloads: trucks,
    bags80lbNeeded: bags80lb,
    bags60lbNeeded: bags60lb,
    gravelBaseCubicYards: gravelCuYds,
    gravelBaseTons: gravelTons,
    formingLumberLinearFt: perimeterFt,
    rebarSticks20ft: rebarSticks,
    wastePercent: waste,
    estimatedMaterialCost: estimatedCost,
  };
}
