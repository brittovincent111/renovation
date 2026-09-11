/**
 * Tile Calculator Pure Calculation Engine
 *
 * Industry rule-of-thumb constants:
 */
export const DEFAULT_STRAIGHT_WASTE_PERCENT = 10;   // 10% standard waste for straight grid lay
export const DEFAULT_DIAGONAL_WASTE_PERCENT = 15;   // 15% waste for diagonal or 45-degree lay
export const DEFAULT_HERRINGBONE_WASTE_PERCENT = 20;// 20% waste for herringbone or complex mosaic patterns
export const SQIN_PER_SQFT = 144;                   // Square inches in one square foot
export const SQCM_PER_SQM = 10000;                  // Square centimeters in one square meter

export interface TileCalculatorInput {
  unit: 'imperial' | 'metric';
  // Imperial: feet; Metric: meters
  roomLength: number;
  roomWidth: number;
  // Additional irregular areas (optional)
  additionalAreas?: Array<{ length: number; width: number }>;
  // Imperial: inches; Metric: centimeters
  tileLength: number;
  tileWidth: number;
  layoutPattern: 'straight' | 'diagonal' | 'herringbone';
  customWastePercent?: number;
  tilesPerBox?: number;
  pricePerSqUnit?: number;
}

export interface TileCalculatorResult {
  totalAreaSqFt: number;
  totalAreaSqM: number;
  tileAreaSqFt: number;
  tileAreaSqM: number;
  wastePercent: number;
  areaWithWasteSqFt: number;
  areaWithWasteSqM: number;
  rawTilesNeeded: number;
  tilesNeeded: number;
  boxesNeeded?: number;
  estimatedCost?: number;
}

export function calculateTile(input: TileCalculatorInput): TileCalculatorResult {
  const isMetric = input.unit === 'metric';

  // Calculate base room area
  let baseArea = input.roomLength * input.roomWidth;
  if (input.additionalAreas && input.additionalAreas.length > 0) {
    for (const area of input.additionalAreas) {
      if (area.length > 0 && area.width > 0) {
        baseArea += area.length * area.width;
      }
    }
  }

  const totalAreaSqM = isMetric ? baseArea : baseArea / 10.7639;
  const totalAreaSqFt = isMetric ? baseArea * 10.7639 : baseArea;

  // Determine waste percentage
  let wastePercent = DEFAULT_STRAIGHT_WASTE_PERCENT;
  if (input.layoutPattern === 'diagonal') wastePercent = DEFAULT_DIAGONAL_WASTE_PERCENT;
  if (input.layoutPattern === 'herringbone') wastePercent = DEFAULT_HERRINGBONE_WASTE_PERCENT;
  if (input.customWastePercent !== undefined && input.customWastePercent >= 0) {
    wastePercent = input.customWastePercent;
  }

  // Calculate individual tile area
  let tileAreaSqFt = 0;
  let tileAreaSqM = 0;

  if (isMetric) {
    // Metric: tile dimensions in cm
    const tileSqCm = input.tileLength * input.tileWidth;
    tileAreaSqM = tileSqCm / SQCM_PER_SQM;
    tileAreaSqFt = tileAreaSqM * 10.7639;
  } else {
    // Imperial: tile dimensions in inches
    const tileSqIn = input.tileLength * input.tileWidth;
    tileAreaSqFt = tileSqIn / SQIN_PER_SQFT;
    tileAreaSqM = tileAreaSqFt / 10.7639;
  }

  // Avoid division by zero
  const safeTileAreaSqFt = tileAreaSqFt > 0 ? tileAreaSqFt : 1;
  const rawTiles = totalAreaSqFt / safeTileAreaSqFt;
  const tilesNeeded = Math.ceil(rawTiles * (1 + wastePercent / 100));

  const areaWithWasteSqFt = totalAreaSqFt * (1 + wastePercent / 100);
  const areaWithWasteSqM = totalAreaSqM * (1 + wastePercent / 100);

  let boxesNeeded: number | undefined;
  if (input.tilesPerBox && input.tilesPerBox > 0) {
    boxesNeeded = Math.ceil(tilesNeeded / input.tilesPerBox);
  }

  let estimatedCost: number | undefined;
  if (input.pricePerSqUnit && input.pricePerSqUnit > 0) {
    const costArea = isMetric ? areaWithWasteSqM : areaWithWasteSqFt;
    estimatedCost = Math.round(costArea * input.pricePerSqUnit * 100) / 100;
  }

  return {
    totalAreaSqFt: Math.round(totalAreaSqFt * 100) / 100,
    totalAreaSqM: Math.round(totalAreaSqM * 100) / 100,
    tileAreaSqFt: Math.round(tileAreaSqFt * 1000) / 1000,
    tileAreaSqM: Math.round(tileAreaSqM * 1000) / 1000,
    wastePercent,
    areaWithWasteSqFt: Math.round(areaWithWasteSqFt * 100) / 100,
    areaWithWasteSqM: Math.round(areaWithWasteSqM * 100) / 100,
    rawTilesNeeded: Math.ceil(rawTiles),
    tilesNeeded,
    boxesNeeded,
    estimatedCost,
  };
}
