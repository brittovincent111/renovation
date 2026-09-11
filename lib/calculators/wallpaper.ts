/**
 * Wallpaper Calculator Pure Calculation Engine
 *
 * Industry rule-of-thumb constants:
 */
export const DEFAULT_ROLL_WIDTH_INCHES = 20.5;      // Standard American/European roll width (~52 cm)
export const DEFAULT_ROLL_LENGTH_FEET = 33;         // Standard European single roll length (~10 m)
export const DEFAULT_ROLL_WIDTH_CM = 52;
export const DEFAULT_ROLL_LENGTH_M = 10;
export const DEFAULT_DOUBLE_ROLL_LENGTH_FEET = 56;  // Standard American double roll (~16.5 m)

export interface WallpaperCalculatorInput {
  unit: 'imperial' | 'metric';
  wallHeight: number;        // feet or meters
  totalWallLength: number;   // feet or meters
  rollWidth?: number;        // inches or cm (default 20.5in / 52cm)
  rollLength?: number;       // feet or meters (default 33ft / 10m)
  patternRepeat?: number;    // inches or cm (0 for non-repeating solid/texture)
  doorsCount?: number;
  windowsCount?: number;
  wastePercent?: number;     // optional additional contingency
}

export interface WallpaperCalculatorResult {
  totalWallAreaSqFt: number;
  totalWallAreaSqM: number;
  rollCoverageSqFt: number;
  rollCoverageSqM: number;
  stripsNeeded: number;
  stripsPerRoll: number;
  rollsNeeded: number;
  rollsNeededWithBuffer: number;
  patternRepeatApplied: number; // inches or cm
}

export function calculateWallpaper(input: WallpaperCalculatorInput): WallpaperCalculatorResult {
  const isMetric = input.unit === 'metric';

  const rollWidthIn = input.rollWidth && !isMetric ? input.rollWidth : (input.rollWidth && isMetric ? input.rollWidth * 0.393701 : DEFAULT_ROLL_WIDTH_INCHES);
  const rollWidthFt = rollWidthIn / 12;

  const rollLengthFt = input.rollLength && !isMetric ? input.rollLength : (input.rollLength && isMetric ? input.rollLength * 3.28084 : DEFAULT_ROLL_LENGTH_FEET);

  const patternRepeatIn = input.patternRepeat ? (isMetric ? input.patternRepeat * 0.393701 : input.patternRepeat) : 0;
  const patternRepeatFt = patternRepeatIn / 12;

  const wallHeightFt = isMetric ? input.wallHeight * 3.28084 : input.wallHeight;
  const wallLengthFt = isMetric ? input.totalWallLength * 3.28084 : input.totalWallLength;

  const totalWallAreaSqFt = wallHeightFt * wallLengthFt;
  const totalWallAreaSqM = totalWallAreaSqFt / 10.7639;

  // Pattern repeat effective cut length
  const effectiveCutLengthFt = wallHeightFt + patternRepeatFt;
  const stripsPerRoll = Math.max(1, Math.floor(rollLengthFt / (effectiveCutLengthFt || 1)));

  // Total strips needed across the wall perimeter
  const stripsNeeded = Math.ceil(wallLengthFt / rollWidthFt);

  // Exact rolls needed based on vertical drops
  const rawRollsNeeded = Math.ceil(stripsNeeded / stripsPerRoll);
  // Add 1 spare roll recommendation if more than 4 rolls to safeguard against miscuts/damage
  const rollsNeededWithBuffer = rawRollsNeeded > 3 ? rawRollsNeeded + 1 : rawRollsNeeded;

  const rollCoverageSqFt = rollWidthFt * rollLengthFt;
  const rollCoverageSqM = rollCoverageSqFt / 10.7639;

  return {
    totalWallAreaSqFt: Math.round(totalWallAreaSqFt * 100) / 100,
    totalWallAreaSqM: Math.round(totalWallAreaSqM * 100) / 100,
    rollCoverageSqFt: Math.round(rollCoverageSqFt * 100) / 100,
    rollCoverageSqM: Math.round(rollCoverageSqM * 100) / 100,
    stripsNeeded,
    stripsPerRoll,
    rollsNeeded: rawRollsNeeded,
    rollsNeededWithBuffer,
    patternRepeatApplied: input.patternRepeat || 0,
  };
}
