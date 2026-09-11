/**
 * Shed Roof & Lean-To Rafter Calculator Pure Engine
 */
import { UnitSystem } from '../types';

export interface ShedRoofCalculatorInput {
  unit: UnitSystem;
  shedWidthFeet: number;  // span direction across slope
  shedLengthFeet: number; // along the ridge/fascia
  roofPitch?: '2/12' | '3/12' | '4/12' | '6/12' | '8/12';
  overhangInches?: number; // e.g. 12 in eaves/rake
  rafterSpacingInches?: 16 | 24; // 16" or 24" OC
}

export interface ShedRoofCalculatorResult {
  rafterLengthInches: number;
  rafterBoardLengthFeet: number; // 2x4 or 2x6 board length (e.g. 10ft, 12ft, 14ft)
  totalRaftersNeeded: number;
  roofSlopeAngleDegrees: number;
  totalRoofAreaSqFt: number;
  totalRoofAreaSqM: number;
  plywoodSheathingSheets4x8: number;
  roofSquaresNeeded: number; // 100 sq ft per square
  fasciaLinearFeet: number;
}

export function calculateShedRoof(input: ShedRoofCalculatorInput): ShedRoofCalculatorResult {
  const isMetric = input.unit === 'metric';
  const pitch = input.roofPitch ?? '4/12';
  const overhang = input.overhangInches ?? 12;
  const spacing = input.rafterSpacingInches ?? 24;

  const widthFt = isMetric ? input.shedWidthFeet * 3.28084 : input.shedWidthFeet;
  const lengthFt = isMetric ? input.shedLengthFeet * 3.28084 : input.shedLengthFeet;

  // Pitch rise per 12" run
  const risePerFoot = parseInt(pitch.split('/')[0], 10);
  const slopeRatio = risePerFoot / 12;

  // Horizontal run = span width + overhang at high and low side
  const totalRunFt = widthFt + (2 * overhang) / 12;
  const totalRunIn = totalRunFt * 12;

  // Total rise = run * slopeRatio
  const totalRiseIn = totalRunFt * risePerFoot;

  // Hypotenuse rafter length: sqrt(run^2 + rise^2)
  const rafterLengthIn = Math.sqrt(Math.pow(totalRunIn, 2) + Math.pow(totalRiseIn, 2));
  const rafterBoardFt = Math.ceil(rafterLengthIn / 12);

  // Slope angle in degrees: arctan(rise / 12)
  const slopeAngleDeg = Math.round(Math.atan(slopeRatio) * (180 / Math.PI) * 10) / 10;

  // Number of rafters along shed length: ceil(length_in / spacing) + 1
  const lengthWithOverhangFt = lengthFt + (2 * overhang) / 12;
  const totalRafters = Math.ceil((lengthWithOverhangFt * 12) / spacing) + 1;

  // Total roof area = (rafter length in ft) * (length with overhang in ft)
  const rafterLengthFt = rafterLengthIn / 12;
  const totalAreaSqFt = rafterLengthFt * lengthWithOverhangFt;
  const totalAreaSqM = totalAreaSqFt / 10.7639;

  // 4x8 plywood roof sheathing (32 sq ft per sheet with 10% waste)
  const plywoodSheets = Math.ceil((totalAreaSqFt * 1.1) / 32);

  // Roofing squares (100 sq ft)
  const roofSquares = Math.round((totalAreaSqFt / 100) * 10) / 10;

  // Fascia trim linear feet: 2 * rafter length + 2 * shed length
  const fasciaFt = Math.ceil(2 * rafterLengthFt + 2 * lengthWithOverhangFt);

  return {
    rafterLengthInches: Math.round(rafterLengthIn * 10) / 10,
    rafterBoardLengthFeet: Math.max(8, rafterBoardFt),
    totalRaftersNeeded: totalRafters,
    roofSlopeAngleDegrees: slopeAngleDeg,
    totalRoofAreaSqFt: Math.round(totalAreaSqFt * 10) / 10,
    totalRoofAreaSqM: Math.round(totalAreaSqM * 10) / 10,
    plywoodSheathingSheets4x8: plywoodSheets,
    roofSquaresNeeded: roofSquares,
    fasciaLinearFeet: fasciaFt,
  };
}
