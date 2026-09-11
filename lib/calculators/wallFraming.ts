/**
 * Wall Framing & Stud Calculator Pure Engine
 */
import { UnitSystem } from '../types';

export interface WallFramingCalculatorInput {
  unit: UnitSystem;
  wallLength: number;   // ft or meters
  wallHeight?: number;  // ft or meters (standard 8ft, 9ft, 10ft)
  studSpacing?: 16 | 24;// 16" OC or 24" OC
  doors?: number;
  windows?: number;
  corners?: number;     // extra studs for 3-stud corners (default 2)
  wastePercent?: number;// default 10%
}

export interface WallFramingCalculatorResult {
  wallLengthFt: number;
  wallLengthM: number;
  studSpacingInches: number;
  commonStuds: number;
  openingStuds: number;
  cornerStuds: number;
  totalStudsNeeded: number;
  plateLinearFt: number;
  plateBoardsNeeded: number; // 2x4 x 12ft boards for top and bottom plates
  framingNailsLbs: number;
}

export function calculateWallFraming(input: WallFramingCalculatorInput): WallFramingCalculatorResult {
  const isMetric = input.unit === 'metric';
  const spacing = input.studSpacing ?? 16;
  const doors = input.doors ?? 0;
  const windows = input.windows ?? 0;
  const corners = input.corners ?? 2;
  const waste = input.wastePercent ?? 10;

  const lengthFt = isMetric ? input.wallLength * 3.28084 : input.wallLength;
  const lengthIn = lengthFt * 12;

  // Base rule: 1 stud every spacing inches + 1 for the end
  const baseStuds = Math.ceil(lengthIn / spacing) + 1;

  // Each door or window opening requires king studs + jack/trimmer studs (2 extra studs minimum per opening)
  const openingStuds = (doors + windows) * 2;

  // Each framed corner requires 2 extra studs for drywall nailer / 3-stud corner
  const cornerStuds = corners * 2;

  const rawTotalStuds = baseStuds + openingStuds + cornerStuds;
  const totalStudsNeeded = Math.ceil(rawTotalStuds * (1 + waste / 100));

  // Plates: 1 bottom sole plate + 2 top plates = 3 rows of horizontal lumber
  const plateLinearFt = Math.round(lengthFt * 3);
  // Using 12-foot 2x4s for plates
  const plateBoardsNeeded = Math.ceil(plateLinearFt / 12);

  // 16d framing nails: ~0.5 lbs per 10 studs (approx 6 nails per stud connection)
  const framingNailsLbs = Math.max(1, Math.ceil(totalStudsNeeded * 0.08));

  return {
    wallLengthFt: Math.round(lengthFt * 10) / 10,
    wallLengthM: Math.round((lengthFt * 0.3048) * 10) / 10,
    studSpacingInches: spacing,
    commonStuds: baseStuds,
    openingStuds,
    cornerStuds,
    totalStudsNeeded,
    plateLinearFt,
    plateBoardsNeeded,
    framingNailsLbs,
  };
}
