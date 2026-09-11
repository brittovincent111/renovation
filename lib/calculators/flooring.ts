/**
 * Flooring Cost Calculator Pure Calculation Engine
 *
 * Industry rule-of-thumb constants:
 */
export const DEFAULT_LAMINATE_WASTE_PERCENT = 10;
export const DEFAULT_VINYL_WASTE_PERCENT = 10;
export const DEFAULT_HARDWOOD_WASTE_PERCENT = 15;
export const DEFAULT_TILE_WASTE_PERCENT = 12;

export type FlooringMaterial = 'hardwood' | 'laminate' | 'vinyl' | 'tile';

export interface FlooringCalculatorInput {
  unit: 'imperial' | 'metric';
  roomLength: number;
  roomWidth: number;
  materialType: FlooringMaterial;
  customWastePercent?: number;
  pricePerUnit?: number;     // price per sq ft or per sq m
  sqUnitsPerBox?: number;    // coverage per box in sq ft or sq m
}

export interface FlooringCalculatorResult {
  roomAreaSqFt: number;
  roomAreaSqM: number;
  wastePercent: number;
  materialNeededSqFt: number;
  materialNeededSqM: number;
  boxesNeeded?: number;
  estimatedCost?: number;
  materialName: string;
}

export function getDefaultFlooringWaste(material: FlooringMaterial): number {
  switch (material) {
    case 'hardwood':
      return DEFAULT_HARDWOOD_WASTE_PERCENT;
    case 'tile':
      return DEFAULT_TILE_WASTE_PERCENT;
    case 'laminate':
      return DEFAULT_LAMINATE_WASTE_PERCENT;
    case 'vinyl':
    default:
      return DEFAULT_VINYL_WASTE_PERCENT;
  }
}

export function getFlooringMaterialName(material: FlooringMaterial): string {
  switch (material) {
    case 'hardwood':
      return 'Solid / Engineered Hardwood';
    case 'laminate':
      return 'Laminate Flooring';
    case 'vinyl':
      return 'Luxury Vinyl Plank (LVP)';
    case 'tile':
      return 'Ceramic or Porcelain Tile';
  }
}

export function calculateFlooring(input: FlooringCalculatorInput): FlooringCalculatorResult {
  const isMetric = input.unit === 'metric';
  const baseArea = input.roomLength * input.roomWidth;

  const roomAreaSqM = isMetric ? baseArea : baseArea / 10.7639;
  const roomAreaSqFt = isMetric ? baseArea * 10.7639 : baseArea;

  const wastePercent =
    input.customWastePercent !== undefined && input.customWastePercent >= 0
      ? input.customWastePercent
      : getDefaultFlooringWaste(input.materialType);

  const multiplier = 1 + wastePercent / 100;
  const materialNeededSqFt = roomAreaSqFt * multiplier;
  const materialNeededSqM = roomAreaSqM * multiplier;

  let boxesNeeded: number | undefined;
  if (input.sqUnitsPerBox && input.sqUnitsPerBox > 0) {
    const areaForBoxes = isMetric ? materialNeededSqM : materialNeededSqFt;
    boxesNeeded = Math.ceil(areaForBoxes / input.sqUnitsPerBox);
  }

  let estimatedCost: number | undefined;
  if (input.pricePerUnit && input.pricePerUnit > 0) {
    const areaForCost = isMetric ? materialNeededSqM : materialNeededSqFt;
    estimatedCost = Math.round(areaForCost * input.pricePerUnit * 100) / 100;
  }

  return {
    roomAreaSqFt: Math.round(roomAreaSqFt * 100) / 100,
    roomAreaSqM: Math.round(roomAreaSqM * 100) / 100,
    wastePercent,
    materialNeededSqFt: Math.round(materialNeededSqFt * 100) / 100,
    materialNeededSqM: Math.round(materialNeededSqM * 100) / 100,
    boxesNeeded,
    estimatedCost,
    materialName: getFlooringMaterialName(input.materialType),
  };
}
