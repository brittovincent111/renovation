/**
 * Attic Ventilation & Ridge/Soffit Vent Pure Engine
 */
import { UnitSystem } from '../types';

export interface AtticVentilationCalculatorInput {
  unit: UnitSystem;
  atticLengthFeet: number;
  atticWidthFeet: number;
  ventilationCodeRule?: '1:300' | '1:150'; // 1:300 is standard with balanced intake/exhaust and vapor barrier
  ridgeVentLinearFtPerPiece?: number; // default 4 ft piece
}

export interface AtticVentilationCalculatorResult {
  atticFloorAreaSqFt: number;
  atticFloorAreaSqM: number;
  totalNetFreeAreaSqIn: number;
  intakeSoffitNfaSqIn: number;  // 50% lower intake at eaves
  exhaustRidgeNfaSqIn: number;  // 50% upper exhaust at ridge
  ridgeVentLinearFtNeeded: number; // assuming standard 18 sq in NFA per linear foot of ridge vent
  soffitVentsNeeded: number;       // standard 16"x8" undereave vent (approx 50 sq in NFA each)
  codeRuleApplied: string;
}

export function calculateAtticVentilation(input: AtticVentilationCalculatorInput): AtticVentilationCalculatorResult {
  const isMetric = input.unit === 'metric';
  const rule = input.ventilationCodeRule ?? '1:300';

  const lengthFt = isMetric ? input.atticLengthFeet * 3.28084 : input.atticLengthFeet;
  const widthFt = isMetric ? input.atticWidthFeet * 3.28084 : input.atticWidthFeet;

  const areaSqFt = lengthFt * widthFt;
  const areaSqM = areaSqFt / 10.7639;

  // IRC Section R806 Rule:
  // 1:300 rule: 1 sq ft of Net Free Vent Area (NFVA) per 300 sq ft of attic floor space
  // 1:150 rule: 1 sq ft NFVA per 150 sq ft of space (used when no vapor barrier is present)
  const ratio = rule === '1:150' ? 150 : 300;
  const totalNfaSqFt = areaSqFt / ratio;
  const totalNfaSqIn = totalNfaSqFt * 144;

  // Balanced system: 50% intake at soffits/eaves, 50% exhaust at peak/ridge
  const intakeNfaSqIn = totalNfaSqIn / 2;
  const exhaustNfaSqIn = totalNfaSqIn / 2;

  // Continuous ridge vent provides ~18 square inches of NFA per linear foot
  const ridgeVentLinearFt = Math.ceil(exhaustNfaSqIn / 18);

  // Standard 16" x 8" rectangular soffit vent grille yields ~50 sq in NFA
  const soffitVentsNeeded = Math.ceil(intakeNfaSqIn / 50);

  return {
    atticFloorAreaSqFt: Math.round(areaSqFt),
    atticFloorAreaSqM: Math.round(areaSqM * 10) / 10,
    totalNetFreeAreaSqIn: Math.round(totalNfaSqIn * 10) / 10,
    intakeSoffitNfaSqIn: Math.round(intakeNfaSqIn * 10) / 10,
    exhaustRidgeNfaSqIn: Math.round(exhaustNfaSqIn * 10) / 10,
    ridgeVentLinearFtNeeded: ridgeVentLinearFt,
    soffitVentsNeeded,
    codeRuleApplied: rule === '1:300' ? 'IRC 1/300 Balanced Ventilation Standard' : 'IRC 1/150 Unbalanced Standard',
  };
}
