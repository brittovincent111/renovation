/**
 * Concrete Calculator Pure Calculation Engine
 *
 * Industry rule-of-thumb constants:
 */
export const CUBIC_FEET_PER_CUBIC_YARD = 27;
export const CUBIC_METERS_PER_CUBIC_YARD = 0.764555;
export const CUBIC_YARDS_PER_CUBIC_METER = 1.30795;
export const DEFAULT_CONCRETE_WASTE_PERCENT = 10;   // 10% standard waste for spillage and subgrade variance

// Bag yields (volume of mixed wet concrete yielded per bag)
export const YIELD_80LB_BAG_CUFT = 0.60;            // Standard 80lb bag yields ~0.60 cu ft
export const YIELD_60LB_BAG_CUFT = 0.45;            // Standard 60lb bag yields ~0.45 cu ft
export const YIELD_40LB_BAG_CUFT = 0.30;            // Standard 40lb bag yields ~0.30 cu ft

export const YIELD_25KG_BAG_CUM = 0.012;            // Standard 25kg pre-mix bag yields ~0.012 m³
export const YIELD_40KG_BAG_CUM = 0.019;            // Standard 40kg pre-mix bag yields ~0.019 m³

export const STANDARD_TRUCK_LOAD_CUYD = 10;         // Typical ready-mix delivery truck capacity (10 yards)

export type ConcreteBagSize = '80lb' | '60lb' | '40lb' | '25kg' | '40kg';

export interface ConcreteCalculatorInput {
  unit: 'imperial' | 'metric';
  length: number;           // feet or meters
  width: number;            // feet or meters
  thickness: number;        // inches or centimeters
  wastePercent?: number;    // default 10%
  selectedBagSize?: ConcreteBagSize;
}

export interface ConcreteCalculatorResult {
  volumeCuFt: number;
  volumeCuYards: number;
  volumeCuMeters: number;
  wastePercent: number;
  volumeWithWasteCuYards: number;
  volumeWithWasteCuMeters: number;
  volumeWithWasteCuFt: number;
  bags80lb: number;
  bags60lb: number;
  bags40lb: number;
  bags25kg: number;
  selectedBagCount: number;
  selectedBagName: string;
  readyMixTruckLoads?: number;
  recommendReadyMix: boolean;
}

export function calculateConcrete(input: ConcreteCalculatorInput): ConcreteCalculatorResult {
  const isMetric = input.unit === 'metric';
  const wastePercent = input.wastePercent !== undefined ? input.wastePercent : DEFAULT_CONCRETE_WASTE_PERCENT;

  let volumeCuFt = 0;
  let volumeCuMeters = 0;

  if (isMetric) {
    // Length in m, width in m, thickness in cm
    const thicknessM = input.thickness / 100;
    volumeCuMeters = input.length * input.width * thicknessM;
    volumeCuFt = volumeCuMeters * 35.3147;
  } else {
    // Length in ft, width in ft, thickness in inches
    const thicknessFt = input.thickness / 12;
    volumeCuFt = input.length * input.width * thicknessFt;
    volumeCuMeters = volumeCuFt * 0.0283168;
  }

  const volumeCuYards = volumeCuFt / CUBIC_FEET_PER_CUBIC_YARD;

  const wasteMultiplier = 1 + wastePercent / 100;
  const volumeWithWasteCuFt = volumeCuFt * wasteMultiplier;
  const volumeWithWasteCuYards = volumeCuYards * wasteMultiplier;
  const volumeWithWasteCuMeters = volumeCuMeters * wasteMultiplier;

  // Bag calculations
  const bags80lb = Math.ceil(volumeWithWasteCuFt / YIELD_80LB_BAG_CUFT);
  const bags60lb = Math.ceil(volumeWithWasteCuFt / YIELD_60LB_BAG_CUFT);
  const bags40lb = Math.ceil(volumeWithWasteCuFt / YIELD_40LB_BAG_CUFT);
  const bags25kg = Math.ceil(volumeWithWasteCuMeters / YIELD_25KG_BAG_CUM);
  const bags40kg = Math.ceil(volumeWithWasteCuMeters / YIELD_40KG_BAG_CUM);

  const bagSize = input.selectedBagSize || (isMetric ? '25kg' : '80lb');
  let selectedBagCount = bags80lb;
  let selectedBagName = '80 lb (36.3 kg) Bags';

  switch (bagSize) {
    case '60lb':
      selectedBagCount = bags60lb;
      selectedBagName = '60 lb (27.2 kg) Bags';
      break;
    case '40lb':
      selectedBagCount = bags40lb;
      selectedBagName = '40 lb (18.1 kg) Bags';
      break;
    case '25kg':
      selectedBagCount = bags25kg;
      selectedBagName = '25 kg Pre-Mix Bags';
      break;
    case '40kg':
      selectedBagCount = bags40kg;
      selectedBagName = '40 kg Pre-Mix Bags';
      break;
    case '80lb':
    default:
      selectedBagCount = bags80lb;
      selectedBagName = '80 lb (36.3 kg) Bags';
      break;
  }

  const recommendReadyMix = volumeWithWasteCuYards >= 1.0;
  let readyMixTruckLoads: number | undefined;
  if (recommendReadyMix) {
    readyMixTruckLoads = Math.round((volumeWithWasteCuYards / STANDARD_TRUCK_LOAD_CUYD) * 10) / 10;
    if (readyMixTruckLoads < 0.1) readyMixTruckLoads = 0.1;
  }

  return {
    volumeCuFt: Math.round(volumeCuFt * 100) / 100,
    volumeCuYards: Math.round(volumeCuYards * 100) / 100,
    volumeCuMeters: Math.round(volumeCuMeters * 100) / 100,
    wastePercent,
    volumeWithWasteCuFt: Math.round(volumeWithWasteCuFt * 100) / 100,
    volumeWithWasteCuYards: Math.round(volumeWithWasteCuYards * 100) / 100,
    volumeWithWasteCuMeters: Math.round(volumeWithWasteCuMeters * 100) / 100,
    bags80lb,
    bags60lb,
    bags40lb,
    bags25kg,
    selectedBagCount,
    selectedBagName,
    readyMixTruckLoads,
    recommendReadyMix,
  };
}
