/**
 * Mulch, Soil & Gravel Pure Calculation Engine
 *
 * Industry rule-of-thumb constants:
 */
export const CUBIC_FEET_PER_CUBIC_YARD = 27;
export const CUBIC_METERS_PER_CUBIC_YARD = 0.764555;
export const STANDARD_BULK_TRUCK_LOAD_CUYD = 10;

export type LandscapingMaterial = 'mulch' | 'topsoil' | 'compost' | 'gravel';

export interface MaterialDetail {
  id: LandscapingMaterial;
  name: string;
  defaultDepthInches: number;
  defaultBagCuFt: number; // typical bag capacity in cubic feet
  weightPerCuYdApproxLbs: number;
}

export const LANDSCAPING_MATERIALS: Record<LandscapingMaterial, MaterialDetail> = {
  mulch: {
    id: 'mulch',
    name: 'Shredded Bark / Wood Mulch',
    defaultDepthInches: 3,
    defaultBagCuFt: 2.0, // standard 2 cu ft mulch bag
    weightPerCuYdApproxLbs: 800,
  },
  topsoil: {
    id: 'topsoil',
    name: 'Topsoil / Screened Dirt',
    defaultDepthInches: 4,
    defaultBagCuFt: 1.0, // standard 1 cu ft or 40 lb soil bag
    weightPerCuYdApproxLbs: 2200,
  },
  compost: {
    id: 'compost',
    name: 'Garden Compost / Organic Matter',
    defaultDepthInches: 2,
    defaultBagCuFt: 1.0,
    weightPerCuYdApproxLbs: 1200,
  },
  gravel: {
    id: 'gravel',
    name: 'Crushed Stone / Pea Gravel',
    defaultDepthInches: 3,
    defaultBagCuFt: 0.5, // standard 0.5 cu ft (~50 lb) gravel bag
    weightPerCuYdApproxLbs: 2700,
  },
};

export interface MulchSoilCalculatorInput {
  unit: 'imperial' | 'metric';
  length: number;           // feet or meters
  width: number;            // feet or meters
  depth: number;            // inches or centimeters
  material: LandscapingMaterial;
  customBagSizeCuFt?: number;
  wastePercent?: number;    // default 5-10%
  pricePerBag?: number;
  pricePerCubicYard?: number;
}

export interface MulchSoilCalculatorResult {
  surfaceAreaSqFt: number;
  surfaceAreaSqM: number;
  depthInches: number;
  depthCm: number;
  volumeCuFt: number;
  volumeCuYards: number;
  volumeCuMeters: number;
  volumeWithWasteCuYards: number;
  volumeWithWasteCuMeters: number;
  bagSizeCuFt: number;
  bagsNeeded: number;
  truckloadsNeeded?: number;
  approxWeightTons: number;
  estimatedBagCost?: number;
  estimatedBulkCost?: number;
}

export function calculateMulchSoil(input: MulchSoilCalculatorInput): MulchSoilCalculatorResult {
  const isMetric = input.unit === 'metric';

  const lenFt = isMetric ? input.length * 3.28084 : input.length;
  const widFt = isMetric ? input.width * 3.28084 : input.width;
  const depthIn = isMetric ? input.depth * 0.393701 : input.depth;

  const surfaceAreaSqFt = lenFt * widFt;
  const surfaceAreaSqM = surfaceAreaSqFt / 10.7639;

  const volumeCuFt = surfaceAreaSqFt * (depthIn / 12);
  const volumeCuYards = volumeCuFt / CUBIC_FEET_PER_CUBIC_YARD;
  const volumeCuMeters = volumeCuFt * 0.0283168;

  const wastePercent = input.wastePercent !== undefined ? input.wastePercent : 5;
  const multiplier = 1 + wastePercent / 100;

  const volumeWithWasteCuFt = volumeCuFt * multiplier;
  const volumeWithWasteCuYards = volumeCuYards * multiplier;
  const volumeWithWasteCuMeters = volumeCuMeters * multiplier;

  const materialConfig = LANDSCAPING_MATERIALS[input.material] || LANDSCAPING_MATERIALS.mulch;
  const bagYieldCuFt =
    input.customBagSizeCuFt && input.customBagSizeCuFt > 0
      ? input.customBagSizeCuFt
      : materialConfig.defaultBagCuFt;

  const bagsNeeded = Math.ceil(volumeWithWasteCuFt / (bagYieldCuFt || 1));

  let truckloadsNeeded: number | undefined;
  if (volumeWithWasteCuYards >= 1.0) {
    truckloadsNeeded = Math.max(1, Math.ceil(volumeWithWasteCuYards / STANDARD_BULK_TRUCK_LOAD_CUYD));
  }

  const approxWeightLbs = volumeWithWasteCuYards * materialConfig.weightPerCuYdApproxLbs;
  const approxWeightTons = Math.round((approxWeightLbs / 2000) * 10) / 10;

  let estimatedBagCost: number | undefined;
  if (input.pricePerBag && input.pricePerBag > 0) {
    estimatedBagCost = Math.round(bagsNeeded * input.pricePerBag * 100) / 100;
  }

  let estimatedBulkCost: number | undefined;
  if (input.pricePerCubicYard && input.pricePerCubicYard > 0) {
    estimatedBulkCost = Math.round(volumeWithWasteCuYards * input.pricePerCubicYard * 100) / 100;
  }

  return {
    surfaceAreaSqFt: Math.round(surfaceAreaSqFt * 100) / 100,
    surfaceAreaSqM: Math.round(surfaceAreaSqM * 100) / 100,
    depthInches: Math.round(depthIn * 10) / 10,
    depthCm: Math.round(depthIn * 2.54 * 10) / 10,
    volumeCuFt: Math.round(volumeCuFt * 100) / 100,
    volumeCuYards: Math.round(volumeCuYards * 100) / 100,
    volumeCuMeters: Math.round(volumeCuMeters * 100) / 100,
    volumeWithWasteCuYards: Math.round(volumeWithWasteCuYards * 100) / 100,
    volumeWithWasteCuMeters: Math.round(volumeWithWasteCuMeters * 100) / 100,
    bagSizeCuFt: bagYieldCuFt,
    bagsNeeded: Math.max(1, bagsNeeded),
    truckloadsNeeded,
    approxWeightTons,
    estimatedBagCost,
    estimatedBulkCost,
  };
}
