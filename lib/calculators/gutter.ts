/**
 * Gutter & Downspout Calculator Pure Engine
 */
import { UnitSystem } from '../types';

export interface GutterCalculatorInput {
  unit: UnitSystem;
  gutterRunLength: number; // total linear feet of fascia
  downspoutSpacing?: number; // default 35-40 ft
  gutterSize?: '5-inch' | '6-inch';
  sections?: number; // number of straight gutter runs (for end caps)
  insideCorners?: number;
  outsideCorners?: number;
}

export interface GutterCalculatorResult {
  linearFeetNeeded: number;
  linearMetersNeeded: number;
  downspoutsNeeded: number;
  endCapsNeeded: number; // 2 per straight run
  gutterHangersNeeded: number; // 1 every 24 inches
  insideCorners: number;
  outsideCorners: number;
  gutterSections10ft: number;
  gutterSections20ft: number;
}

export function calculateGutter(input: GutterCalculatorInput): GutterCalculatorResult {
  const isMetric = input.unit === 'metric';
  const spacingFt = input.downspoutSpacing ?? 35;
  const straightRuns = input.sections ?? 2;
  const insideCorners = input.insideCorners ?? 0;
  const outsideCorners = input.outsideCorners ?? 0;

  const lengthFt = isMetric ? input.gutterRunLength * 3.28084 : input.gutterRunLength;
  const lengthM = lengthFt * 0.3048;

  // Downspouts: 1 per 35-40 ft rule of thumb, minimum 1 per continuous run
  const downspoutsNeeded = Math.max(straightRuns, Math.ceil(lengthFt / spacingFt));

  // End caps: 2 per straight open run
  const endCapsNeeded = straightRuns * 2;

  // Hangers: 1 every 24 inches (2 feet) along all gutters
  const gutterHangersNeeded = Math.ceil(lengthFt / 2) + straightRuns;

  // Sections
  const gutterSections10ft = Math.ceil(lengthFt / 10);
  const gutterSections20ft = Math.ceil(lengthFt / 20);

  return {
    linearFeetNeeded: Math.round(lengthFt * 10) / 10,
    linearMetersNeeded: Math.round(lengthM * 10) / 10,
    downspoutsNeeded,
    endCapsNeeded,
    gutterHangersNeeded,
    insideCorners,
    outsideCorners,
    gutterSections10ft,
    gutterSections20ft,
  };
}
