/**
 * Driveway & Pathway Gravel Calculator Pure Engine
 */
import { UnitSystem } from '../types';

export interface GravelCalculatorInput {
  unit: UnitSystem;
  areaLength: number; // ft or meters
  areaWidth: number;  // ft or meters
  depthInches: number; // default 4-6 in for driveway, 2-3 in for pathway
  gravelType?: 'crushed-stone' | 'pea-gravel' | 'river-rock' | 'drainage-rock';
  compactionBufferPercent?: number; // default 10-15% compaction settlement
}

export interface GravelCalculatorResult {
  surfaceAreaSqFt: number;
  surfaceAreaSqM: number;
  depthInches: number;
  cubicYardsNeeded: number;
  cubicMetersNeeded: number;
  tonsNeeded: number;
  metricTonnesNeeded: number;
  bags50lb: number;
  compactionPercent: number;
}

export function calculateGravel(input: GravelCalculatorInput): GravelCalculatorResult {
  const isMetric = input.unit === 'metric';
  const compaction = input.compactionBufferPercent ?? 12;
  const depthInches = input.depthInches > 0 ? input.depthInches : 4;

  const lengthFt = isMetric ? input.areaLength * 3.28084 : input.areaLength;
  const widthFt = isMetric ? input.areaWidth * 3.28084 : input.areaWidth;

  const areaSqFt = lengthFt * widthFt;
  const areaSqM = areaSqFt / 10.7639;

  // Volume in cubic feet: Area * (depthInches / 12)
  const rawCuFt = areaSqFt * (depthInches / 12);
  const cuFtWithCompaction = rawCuFt * (1 + compaction / 100);

  const cubicYards = cuFtWithCompaction / 27;
  const cubicMeters = cubicYards * 0.764555;

  // Standard crushed stone density: ~2,800 lbs/cu yd = 1.4 tons per cu yd
  let densityTonsPerCuYd = 1.4;
  if (input.gravelType === 'pea-gravel') densityTonsPerCuYd = 1.35;
  if (input.gravelType === 'river-rock') densityTonsPerCuYd = 1.3;

  const tons = cubicYards * densityTonsPerCuYd;
  const metricTonnes = tons * 0.907185;

  // 50lb bags: (tons * 2000) / 50
  const bags50lb = Math.ceil((tons * 2000) / 50);

  return {
    surfaceAreaSqFt: Math.round(areaSqFt * 10) / 10,
    surfaceAreaSqM: Math.round(areaSqM * 10) / 10,
    depthInches,
    cubicYardsNeeded: Math.round(cubicYards * 100) / 100,
    cubicMetersNeeded: Math.round(cubicMeters * 100) / 100,
    tonsNeeded: Math.round(tons * 10) / 10,
    metricTonnesNeeded: Math.round(metricTonnes * 10) / 10,
    bags50lb,
    compactionPercent: compaction,
  };
}
