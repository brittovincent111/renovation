/**
 * French Drain & Drainage Trench Calculator Pure Engine
 */
import { UnitSystem } from '../types';

export interface FrenchDrainCalculatorInput {
  unit: UnitSystem;
  trenchLengthFeet: number; // linear feet of trench
  trenchWidthInches?: number; // default 12 in
  trenchDepthInches?: number; // default 18 in
  pipeDiameterInches?: 4 | 6; // default 4 in perforated corrugated or PVC
}

export interface FrenchDrainCalculatorResult {
  trenchLengthFt: number;
  trenchLengthM: number;
  excavationVolumeCuYds: number;
  gravelVolumeCuYds: number; // 3/4" washed drainage gravel
  gravelTons: number;
  perforatedPipeFt: number;
  geotextileFabricSqFt: number; // non-woven filter fabric to line trench
  geotextileRollWidthFt: number;
}

export function calculateFrenchDrain(input: FrenchDrainCalculatorInput): FrenchDrainCalculatorResult {
  const isMetric = input.unit === 'metric';
  const widthIn = input.trenchWidthInches ?? 12;
  const depthIn = input.trenchDepthInches ?? 18;
  const pipeDia = input.pipeDiameterInches ?? 4;

  const lengthFt = isMetric ? input.trenchLengthFeet * 3.28084 : input.trenchLengthFeet;

  // Total excavation volume in cubic yards: (L * (W/12) * (D/12)) / 27
  const trenchCuFt = lengthFt * (widthIn / 12) * (depthIn / 12);
  const excavationCuYds = Math.round((trenchCuFt / 27) * 10) / 10;

  // Pipe volume deduction: pi * r^2 * L
  const pipeRadiusFt = (pipeDia / 2) / 12;
  const pipeCuFt = Math.PI * Math.pow(pipeRadiusFt, 2) * lengthFt;

  // Gravel volume: trench volume minus pipe volume plus 10% compaction
  const netGravelCuFt = (trenchCuFt - pipeCuFt) * 1.1;
  const gravelCuYds = Math.round((netGravelCuFt / 27) * 10) / 10;
  // Washed stone density: ~1.35 tons per cu yd
  const gravelTons = Math.round(gravelCuYds * 1.35 * 10) / 10;

  // Filter fabric wrap:
  // Perimeter of trench cross-section = 2*depth + width + overlap (12")
  const fabricWidthFt = ((2 * depthIn + widthIn + 12) / 12);
  const geotextileFabricSqFt = Math.ceil(fabricWidthFt * lengthFt * 1.1);

  return {
    trenchLengthFt: Math.round(lengthFt * 10) / 10,
    trenchLengthM: Math.round((lengthFt * 0.3048) * 10) / 10,
    excavationVolumeCuYds: excavationCuYds,
    gravelVolumeCuYds: gravelCuYds,
    gravelTons,
    perforatedPipeFt: Math.ceil(lengthFt * 1.05),
    geotextileFabricSqFt,
    geotextileRollWidthFt: Math.ceil(fabricWidthFt),
  };
}
