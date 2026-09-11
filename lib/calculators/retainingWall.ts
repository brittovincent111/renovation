/**
 * Retaining Wall Block Calculator Pure Engine
 */
import { UnitSystem } from '../types';

export interface RetainingWallCalculatorInput {
  unit: UnitSystem;
  wallLength: number; // ft or meters
  wallHeight: number; // ft or meters (exposed height)
  blockSize?: '4x12' | '6x16' | '8x18';
  buriedCourses?: number; // default 1 buried base course for stability
  includeCaps?: boolean;  // top cap blocks
  wastePercent?: number;  // default 5-10%
}

export interface RetainingWallCalculatorResult {
  wallLengthFt: number;
  wallHeightFt: number;
  totalCourses: number;
  exposedCourses: number;
  buriedCourses: number;
  blocksPerCourse: number;
  totalBlocksNeeded: number;
  capBlocksNeeded: number;
  drainageGravelCuYds: number;
  blockSizeLabel: string;
  structuralWarning?: string;
}

export function calculateRetainingWall(input: RetainingWallCalculatorInput): RetainingWallCalculatorResult {
  const isMetric = input.unit === 'metric';
  const waste = input.wastePercent ?? 8;
  const buriedCourses = input.buriedCourses ?? 1;
  const includeCaps = input.includeCaps ?? true;

  const lengthFt = isMetric ? input.wallLength * 3.28084 : input.wallLength;
  const heightFt = isMetric ? input.wallHeight * 3.28084 : input.wallHeight;

  let blockH_in = 4;
  let blockL_in = 12;
  let label = '4"H × 12"L (Standard Garden Block)';

  if (input.blockSize === '6x16') {
    blockH_in = 6;
    blockL_in = 16;
    label = '6"H × 16"L (Medium Wall Block)';
  } else if (input.blockSize === '8x18') {
    blockH_in = 8;
    blockL_in = 18;
    label = '8"H × 18"L (Commercial Heavy Block)';
  }

  // Exposed courses
  const exposedCourses = Math.ceil((heightFt * 12) / blockH_in);
  const totalCourses = exposedCourses + buriedCourses;

  // Blocks per course
  const blocksPerCourse = Math.ceil((lengthFt * 12) / blockL_in);
  const rawTotalBlocks = blocksPerCourse * totalCourses;
  const totalBlocksNeeded = Math.ceil(rawTotalBlocks * (1 + waste / 100));

  // Caps: 1 course across top
  const capBlocksNeeded = includeCaps ? Math.ceil(blocksPerCourse * 1.05) : 0;

  // Drainage Gravel: 12" wide chimney behind wall for drainage
  // Volume = length * height * 1ft depth / 27
  const drainageGravelCuYds = Math.round(((lengthFt * heightFt * 1) / 27) * 10) / 10;

  let structuralWarning: string | undefined;
  if (heightFt > 4) {
    structuralWarning =
      'Walls taller than 4 feet (1.2m) typically require an engineered design with geogrid soil reinforcement and local building permits.';
  }

  return {
    wallLengthFt: Math.round(lengthFt * 10) / 10,
    wallHeightFt: Math.round(heightFt * 10) / 10,
    totalCourses,
    exposedCourses,
    buriedCourses,
    blocksPerCourse,
    totalBlocksNeeded,
    capBlocksNeeded,
    drainageGravelCuYds,
    blockSizeLabel: label,
    structuralWarning,
  };
}
