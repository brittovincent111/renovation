/**
 * Siding Calculator Pure Engine
 */
import { UnitSystem } from '../types';

export interface SidingCalculatorInput {
  unit: UnitSystem;
  wallLength: number; // total exterior wall perimeter in ft or meters
  wallHeight: number; // average exterior wall height in ft or meters
  doors?: number;     // deductions
  windows?: number;   // deductions
  wastePercent?: number; // default 10-15%
  sidingType?: 'vinyl-lap' | 'fiber-cement' | 'wood-lap' | 'board-and-batten';
}

export interface SidingCalculatorResult {
  grossWallAreaSqFt: number;
  netWallAreaSqFt: number;
  netWallAreaSqM: number;
  sidingSquaresNeeded: number; // 1 square = 100 sq ft
  sidingPanelsNeeded: number;  // standard 12ft lap siding panels (approx 0.5 sq per 10 panels)
  starterStripLinearFt: number;
  jChannelLinearFt: number;
  outsideCornerPosts: number;
  insideCornerPosts: number;
  wastePercent: number;
}

export function calculateSiding(input: SidingCalculatorInput): SidingCalculatorResult {
  const isMetric = input.unit === 'metric';
  const waste = input.wastePercent ?? 12;
  const doors = input.doors ?? 2;
  const windows = input.windows ?? 6;

  const lengthFt = isMetric ? input.wallLength * 3.28084 : input.wallLength;
  const heightFt = isMetric ? input.wallHeight * 3.28084 : input.wallHeight;

  const grossAreaSqFt = lengthFt * heightFt;
  const deductionsSqFt = doors * 21 + windows * 15;
  const netAreaSqFt = Math.max(0, grossAreaSqFt - deductionsSqFt);
  const netAreaSqM = netAreaSqFt / 10.7639;

  // Siding is ordered by "Square" (1 square = 100 square feet)
  const areaWithWaste = netAreaSqFt * (1 + waste / 100);
  const sidingSquares = Math.ceil((areaWithWaste / 100) * 10) / 10;

  // Standard vinyl lap panel: 12ft long by 8in exposure = 8 sq ft per panel
  // 1 square (100 sq ft) ~= 13-14 panels
  const sidingPanelsNeeded = Math.ceil(areaWithWaste / 7.5);

  // Starter strip: runs along bottom perimeter
  const starterStripLinearFt = Math.ceil(lengthFt * 1.05);

  // J-Channel: around all doors and windows + under eaves
  // Door: 2*(7)+3 = 17ft; Window: 2*(3)+2*(4) = 14ft
  const jChannelLinearFt = Math.ceil((doors * 17 + windows * 14) * 1.1);

  return {
    grossWallAreaSqFt: Math.round(grossAreaSqFt),
    netWallAreaSqFt: Math.round(netAreaSqFt),
    netWallAreaSqM: Math.round(netAreaSqM * 10) / 10,
    sidingSquaresNeeded: sidingSquares,
    sidingPanelsNeeded,
    starterStripLinearFt,
    jChannelLinearFt,
    outsideCornerPosts: 4,
    insideCornerPosts: 2,
    wastePercent: waste,
  };
}
