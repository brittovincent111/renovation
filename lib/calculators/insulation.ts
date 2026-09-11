/**
 * Insulation Calculator Pure Calculation Engine
 *
 * Industry rule-of-thumb constants:
 */
export interface RValueSpec {
  rValue: string;
  nominalR: number;
  label: string;
  recommendedUse: string;
  approxThicknessInches: number;
  coveragePerRollSqFt: number; // standard roll/batt package coverage
}

export const R_VALUE_SPECS: Record<string, RValueSpec> = {
  'R-13': {
    rValue: 'R-13',
    nominalR: 13,
    label: 'R-13 (2x4 Interior / Exterior Walls)',
    recommendedUse: 'Standard 2x4 stud walls & floors',
    approxThicknessInches: 3.5,
    coveragePerRollSqFt: 40.0,
  },
  'R-19': {
    rValue: 'R-19',
    nominalR: 19,
    label: 'R-19 (2x6 Walls & Crawlspaces)',
    recommendedUse: '2x6 exterior walls & floor joists',
    approxThicknessInches: 6.25,
    coveragePerRollSqFt: 48.9,
  },
  'R-30': {
    rValue: 'R-30',
    nominalR: 30,
    label: 'R-30 (Attics - Warm Climates)',
    recommendedUse: 'Ceilings and attics in temperate zones',
    approxThicknessInches: 9.5,
    coveragePerRollSqFt: 31.3,
  },
  'R-38': {
    rValue: 'R-38',
    nominalR: 38,
    label: 'R-38 (Attics - Moderate/Cold Climates)',
    recommendedUse: 'Standard recommended attic insulation level',
    approxThicknessInches: 12.0,
    coveragePerRollSqFt: 24.0,
  },
  'R-49': {
    rValue: 'R-49',
    nominalR: 49,
    label: 'R-49 (Attics - Very Cold Climates)',
    recommendedUse: 'High-efficiency ceiling insulation in northern zones',
    approxThicknessInches: 15.5,
    coveragePerRollSqFt: 18.5,
  },
};

export interface InsulationCalculatorInput {
  unit: 'imperial' | 'metric';
  entryMode: 'dimensions' | 'area';
  length?: number;          // feet or meters
  width?: number;           // feet or meters
  directArea?: number;      // sq ft or sq m
  rValueKey: string;        // 'R-13', 'R-19', 'R-30', 'R-38', 'R-49'
  wastePercent?: number;    // default 5-10%
  pricePerPackage?: number;
}

export interface InsulationCalculatorResult {
  totalAreaSqFt: number;
  totalAreaSqM: number;
  wastePercent: number;
  areaWithWasteSqFt: number;
  areaWithWasteSqM: number;
  rValue: string;
  recommendedUse: string;
  thicknessInches: number;
  thicknessCm: number;
  coveragePerPackageSqFt: number;
  packagesNeeded: number;
  estimatedCost?: number;
}

export function calculateInsulation(input: InsulationCalculatorInput): InsulationCalculatorResult {
  const isMetric = input.unit === 'metric';

  let rawArea = 0;
  if (input.entryMode === 'area' && input.directArea) {
    rawArea = input.directArea;
  } else if (input.length && input.width) {
    rawArea = input.length * input.width;
  }

  const totalAreaSqM = isMetric ? rawArea : rawArea / 10.7639;
  const totalAreaSqFt = isMetric ? rawArea * 10.7639 : rawArea;

  const wastePercent = input.wastePercent !== undefined ? input.wastePercent : 5;
  const areaWithWasteSqFt = totalAreaSqFt * (1 + wastePercent / 100);
  const areaWithWasteSqM = totalAreaSqM * (1 + wastePercent / 100);

  const spec = R_VALUE_SPECS[input.rValueKey] || R_VALUE_SPECS['R-13'];
  const coveragePerPkg = spec.coveragePerRollSqFt;

  const packagesNeeded = Math.ceil(areaWithWasteSqFt / (coveragePerPkg || 1));

  let estimatedCost: number | undefined;
  if (input.pricePerPackage && input.pricePerPackage > 0) {
    estimatedCost = Math.round(packagesNeeded * input.pricePerPackage * 100) / 100;
  }

  return {
    totalAreaSqFt: Math.round(totalAreaSqFt * 100) / 100,
    totalAreaSqM: Math.round(totalAreaSqM * 100) / 100,
    wastePercent,
    areaWithWasteSqFt: Math.round(areaWithWasteSqFt * 100) / 100,
    areaWithWasteSqM: Math.round(areaWithWasteSqM * 100) / 100,
    rValue: spec.rValue,
    recommendedUse: spec.recommendedUse,
    thicknessInches: spec.approxThicknessInches,
    thicknessCm: Math.round(spec.approxThicknessInches * 2.54 * 10) / 10,
    coveragePerPackageSqFt: spec.coveragePerRollSqFt,
    packagesNeeded: Math.max(1, packagesNeeded),
    estimatedCost,
  };
}
