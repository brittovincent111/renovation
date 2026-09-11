/**
 * Board Feet & Hardwood Lumber Cost Calculator Pure Engine
 */
import { UnitSystem } from '../types';

export interface BoardFeetCalculatorInput {
  unit: UnitSystem;
  thicknessInches: number; // e.g. 1" (4/4), 1.5", 2" (8/4)
  widthInches: number;     // e.g. 6"
  lengthFeet: number;      // e.g. 8 ft (or meters)
  quantity?: number;       // number of boards
  pricePerBoardFoot?: number; // e.g. $8.50/BF for Walnut
  wastePercent?: number;   // default 15-20% for rough hardwood
}

export interface BoardFeetCalculatorResult {
  singleBoardFeet: number;
  totalBoardFeet: number;
  boardFeetWithWaste: number;
  cubicMeters: number;
  quantity: number;
  wastePercent: number;
  estimatedCost?: number;
}

export function calculateBoardFeet(input: BoardFeetCalculatorInput): BoardFeetCalculatorResult {
  const isMetric = input.unit === 'metric';
  const qty = input.quantity && input.quantity > 0 ? input.quantity : 1;
  const waste = input.wastePercent ?? 15;

  const thicknessIn = isMetric ? input.thicknessInches / 25.4 : input.thicknessInches;
  const widthIn = isMetric ? input.widthInches / 25.4 : input.widthInches;
  const lengthFt = isMetric ? input.lengthFeet * 3.28084 : input.lengthFeet;

  // Formula: Board Feet = (Thickness in inches × Width in inches × Length in feet) / 12
  const singleBF = (thicknessIn * widthIn * lengthFt) / 12;
  const totalBF = singleBF * qty;
  const bfWithWaste = totalBF * (1 + waste / 100);

  // 1 Board Foot = 144 cubic inches = 0.00235974 cubic meters
  const cubicMeters = Math.round(totalBF * 0.00235974 * 1000) / 1000;

  let estimatedCost: number | undefined;
  if (input.pricePerBoardFoot && input.pricePerBoardFoot > 0) {
    estimatedCost = Math.round(bfWithWaste * input.pricePerBoardFoot * 100) / 100;
  }

  return {
    singleBoardFeet: Math.round(singleBF * 100) / 100,
    totalBoardFeet: Math.round(totalBF * 100) / 100,
    boardFeetWithWaste: Math.round(bfWithWaste * 100) / 100,
    cubicMeters,
    quantity: qty,
    wastePercent: waste,
    estimatedCost,
  };
}
