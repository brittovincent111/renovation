/**
 * Brick & Mortar Wall Calculator Pure Engine
 */
import { UnitSystem } from '../types';

export interface BrickCalculatorInput {
  unit: UnitSystem;
  wallLengthFeet: number;
  wallHeightFeet: number;
  brickType?: 'modular' | 'standard' | 'queen' | 'king';
  wallThickness?: 'single-wythe' | 'double-wythe'; // single skin vs double structural
  doors?: number;
  windows?: number;
  wastePercent?: number; // default 5-10%
}

export interface BrickCalculatorResult {
  wallAreaSqFt: number;
  wallAreaSqM: number;
  totalBricksNeeded: number;
  rawBricks: number;
  mortarBagsNeeded: number; // standard 80lb bags of Type N or Type S mortar
  masonrySandCuYds: number;
  wastePercent: number;
  brickTypeLabel: string;
}

export function calculateBrick(input: BrickCalculatorInput): BrickCalculatorResult {
  const isMetric = input.unit === 'metric';
  const type = input.brickType ?? 'standard';
  const wythe = input.wallThickness ?? 'single-wythe';
  const doors = input.doors ?? 0;
  const windows = input.windows ?? 0;
  const waste = input.wastePercent ?? 8;

  const lengthFt = isMetric ? input.wallLengthFeet * 3.28084 : input.wallLengthFeet;
  const heightFt = isMetric ? input.wallHeightFeet * 3.28084 : input.wallHeightFeet;

  const grossAreaSqFt = lengthFt * heightFt;
  const deductionsSqFt = doors * 21 + windows * 15;
  const netAreaSqFt = Math.max(0, grossAreaSqFt - deductionsSqFt);
  const netAreaSqM = netAreaSqFt / 10.7639;

  // Brick rules of thumb (bricks per square foot with standard 3/8" mortar joint):
  // Modular (3-5/8" x 2-1/4" x 7-5/8"): ~6.86 bricks / sq ft
  // Standard (3-1/2" x 2-1/4" x 8"): ~6.55 bricks / sq ft
  // Queen (3" x 2-3/4" x 9-5/8"): ~5.5 bricks / sq ft
  // King (3" x 2-5/8" x 9-5/8"): ~4.8 bricks / sq ft
  let bricksPerSqFt = 6.55;
  let label = 'Standard Brick (3-1/2" × 2-1/4" × 8")';

  if (type === 'modular') {
    bricksPerSqFt = 6.86;
    label = 'Modular Brick (3-5/8" × 2-1/4" × 7-5/8")';
  } else if (type === 'queen') {
    bricksPerSqFt = 5.5;
    label = 'Queen Brick (3" × 2-3/4" × 9-5/8")';
  } else if (type === 'king') {
    bricksPerSqFt = 4.8;
    label = 'King Brick (3" × 2-5/8" × 9-5/8")';
  }

  const wytheMultiplier = wythe === 'double-wythe' ? 2 : 1;
  const rawBricks = netAreaSqFt * bricksPerSqFt * wytheMultiplier;
  const totalBricksNeeded = Math.ceil(rawBricks * (1 + waste / 100));

  // Mortar: Rule of thumb is ~7 to 8 standard 80lb bags of pre-mix mortar per 1,000 standard bricks
  // Or ~1 bag per 130 bricks
  const mortarBagsNeeded = Math.max(1, Math.ceil(totalBricksNeeded / 130));

  // Sand for masonry: ~1 cubic yard per 1,000 bricks if mixing site-batch mortar
  const masonrySandCuYds = Math.round((totalBricksNeeded / 1000) * 10) / 10;

  return {
    wallAreaSqFt: Math.round(netAreaSqFt * 10) / 10,
    wallAreaSqM: Math.round(netAreaSqM * 10) / 10,
    totalBricksNeeded,
    rawBricks: Math.ceil(rawBricks),
    mortarBagsNeeded,
    masonrySandCuYds,
    wastePercent: waste,
    brickTypeLabel: label,
  };
}
