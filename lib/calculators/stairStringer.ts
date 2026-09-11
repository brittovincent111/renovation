/**
 * Stair Stringer & Step Calculator Pure Engine
 */
import { UnitSystem } from '../types';

export interface StairStringerCalculatorInput {
  unit: UnitSystem;
  totalRiseInches: number; // floor to floor total vertical height in inches (or cm if metric)
  desiredRiserHeightInches?: number; // default 7.5 in (19 cm)
  treadDepthInches?: number; // default 10.5 in (26.7 cm)
  stairWidthInches?: number; // default 36 in (91 cm)
  numStringers?: number; // default 3 for residential (every 16" OC for 36" wide stairs)
}

export interface StairStringerCalculatorResult {
  totalRiseInches: number;
  totalRiseCm: number;
  numberOfSteps: number; // total risers
  numberOfTreads: number; // risers - 1
  actualRiserHeightInches: number;
  actualRiserHeightCm: number;
  treadDepthInches: number;
  totalRunInches: number;
  totalRunFeet: number;
  stringerLengthInches: number;
  stringerBoardLengthFt: number; // 2x12 lumber board length needed (e.g. 10ft, 12ft, 14ft)
  stairAngleDegrees: number;
  stringersCount: number;
  disclaimer: string;
}

export function calculateStairStringer(input: StairStringerCalculatorInput): StairStringerCalculatorResult {
  const isMetric = input.unit === 'metric';
  const riseIn = isMetric ? input.totalRiseInches / 2.54 : input.totalRiseInches;
  const desiredRiserIn = input.desiredRiserHeightInches
    ? (isMetric ? input.desiredRiserHeightInches / 2.54 : input.desiredRiserHeightInches)
    : 7.5;
  const treadIn = input.treadDepthInches
    ? (isMetric ? input.treadDepthInches / 2.54 : input.treadDepthInches)
    : 10.5;

  // Number of steps (risers) = round(totalRise / targetRiser)
  const numberOfSteps = Math.max(1, Math.round(riseIn / desiredRiserIn));
  const actualRiserIn = riseIn / numberOfSteps;
  const numberOfTreads = numberOfSteps - 1;

  // Total horizontal run = (risers - 1) * tread depth
  const totalRunIn = numberOfTreads * treadIn;
  const totalRunFt = Math.round((totalRunIn / 12) * 10) / 10;

  // Stringer hypotenuse = sqrt(totalRise^2 + totalRun^2)
  const stringerLengthIn = Math.sqrt(Math.pow(riseIn, 2) + Math.pow(totalRunIn, 2));
  // Add 12 inches for plumb cuts and bottom level foot
  const stringerBoardFt = Math.ceil((stringerLengthIn + 12) / 12);

  // Stair incline angle: arctan(rise / run)
  const stairAngleRad = Math.atan(riseIn / Math.max(1, totalRunIn));
  const stairAngleDeg = Math.round((stairAngleRad * (180 / Math.PI)) * 10) / 10;

  const stairWidth = input.stairWidthInches ?? (isMetric ? 36 : 36);
  // IRC Code: Stringer spacing <= 16" OC. 36" stair needs 3 stringers, 48" needs 4.
  const stringersCount = input.numStringers ?? (stairWidth > 36 ? 4 : 3);

  return {
    totalRiseInches: Math.round(riseIn * 100) / 100,
    totalRiseCm: Math.round(riseIn * 2.54 * 10) / 10,
    numberOfSteps,
    numberOfTreads,
    actualRiserHeightInches: Math.round(actualRiserIn * 100) / 100,
    actualRiserHeightCm: Math.round(actualRiserIn * 2.54 * 10) / 10,
    treadDepthInches: treadIn,
    totalRunInches: Math.round(totalRunIn * 10) / 10,
    totalRunFeet: totalRunFt,
    stringerLengthInches: Math.round(stringerLengthIn * 10) / 10,
    stringerBoardLengthFt: Math.max(8, stringerBoardFt),
    stairAngleDegrees: stairAngleDeg,
    stringersCount,
    disclaimer:
      'Planning estimate only. Local building codes (IRC Section R311.7) mandate strict maximum riser heights (usually 7-3/4") and minimum tread depths (usually 10"). Always verify before cutting stringers.',
  };
}
