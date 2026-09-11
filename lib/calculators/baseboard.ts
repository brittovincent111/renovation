/**
 * Baseboard & Trim Calculator Pure Engine
 */
import { UnitSystem } from '../types';

export interface BaseboardCalculatorInput {
  unit: UnitSystem;
  roomLength: number;
  roomWidth: number;
  doors?: number;
  doorWidthInches?: number; // default 36 in (3 ft)
  wastePercent?: number;    // default 10-15%
  calkingNeeded?: boolean;
}

export interface BaseboardCalculatorResult {
  roomPerimeterFt: number;
  roomPerimeterM: number;
  doorDeductionsFt: number;
  netLinearFt: number;
  netLinearM: number;
  linearFtWithWaste: number;
  boards8ft: number;
  boards12ft: number;
  boards16ft: number;
  wastePercent: number;
  finishNailsNeeded: number;
  caulkTubesNeeded: number;
}

export function calculateBaseboard(input: BaseboardCalculatorInput): BaseboardCalculatorResult {
  const isMetric = input.unit === 'metric';
  const waste = input.wastePercent ?? 12;
  const doors = input.doors ?? 1;
  const doorWidthFt = (input.doorWidthInches ?? 36) / 12;

  const lengthFt = isMetric ? input.roomLength * 3.28084 : input.roomLength;
  const widthFt = isMetric ? input.roomWidth * 3.28084 : input.roomWidth;

  const perimeterFt = 2 * (lengthFt + widthFt);
  const deductionsFt = doors * doorWidthFt;
  const netLinearFt = Math.max(0, perimeterFt - deductionsFt);

  const linearFtWithWaste = netLinearFt * (1 + waste / 100);

  // Board counts
  const boards8ft = Math.ceil(linearFtWithWaste / 8);
  const boards12ft = Math.ceil(linearFtWithWaste / 12);
  const boards16ft = Math.ceil(linearFtWithWaste / 16);

  // Nails: 2 15-gauge finish nails every 16 inches into wall studs
  const studsAlongBaseboard = Math.ceil((netLinearFt * 12) / 16);
  const finishNailsNeeded = studsAlongBaseboard * 2;

  // Painter's caulk: 1 tube (10.1 oz) runs approximately 30-35 linear feet
  const caulkTubesNeeded = Math.ceil(linearFtWithWaste / 30);

  return {
    roomPerimeterFt: Math.round(perimeterFt * 10) / 10,
    roomPerimeterM: Math.round((perimeterFt * 0.3048) * 10) / 10,
    doorDeductionsFt: Math.round(deductionsFt * 10) / 10,
    netLinearFt: Math.round(netLinearFt * 10) / 10,
    netLinearM: Math.round((netLinearFt * 0.3048) * 10) / 10,
    linearFtWithWaste: Math.round(linearFtWithWaste * 10) / 10,
    boards8ft,
    boards12ft,
    boards16ft,
    wastePercent: waste,
    finishNailsNeeded,
    caulkTubesNeeded,
  };
}
