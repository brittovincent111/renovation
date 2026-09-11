/**
 * Paver & Patio Base Calculator Pure Engine
 */
import { UnitSystem } from '../types';

export interface PaverCalculatorInput {
  unit: UnitSystem;
  patioLength: number; // ft or meters
  patioWidth: number;  // ft or meters
  paverSize?: '12x12' | '6x9' | '4x8' | '16x16' | 'custom';
  customPaverL?: number; // inches
  customPaverW?: number; // inches
  layoutPattern?: 'running-bond' | 'herringbone' | 'basketweave';
  wastePercent?: number; // default 10%
  sandBaseDepthInches?: number; // default 1 in
  gravelBaseDepthInches?: number; // default 4 in
}

export interface PaverCalculatorResult {
  patioAreaSqFt: number;
  patioAreaSqM: number;
  paversNeeded: number;
  rawPavers: number;
  wastePercent: number;
  beddingSandCuYds: number;
  beddingSandTons: number;
  gravelBaseCuYds: number;
  gravelBaseTons: number;
  edgeRestraintLinearFt: number;
  paverSizeLabel: string;
}

export function calculatePaver(input: PaverCalculatorInput): PaverCalculatorResult {
  const isMetric = input.unit === 'metric';
  const pattern = input.layoutPattern ?? 'running-bond';
  const waste = input.wastePercent ?? (pattern === 'herringbone' ? 15 : 10);
  const sandDepth = input.sandBaseDepthInches ?? 1;
  const gravelDepth = input.gravelBaseDepthInches ?? 4;

  const lengthFt = isMetric ? input.patioLength * 3.28084 : input.patioLength;
  const widthFt = isMetric ? input.patioWidth * 3.28084 : input.patioWidth;

  const areaSqFt = lengthFt * widthFt;
  const areaSqM = areaSqFt / 10.7639;

  let paverL_in = 12;
  let paverW_in = 12;
  let label = '12" × 12"';

  if (input.paverSize === '6x9') {
    paverL_in = 9;
    paverW_in = 6;
    label = '6" × 9"';
  } else if (input.paverSize === '4x8') {
    paverL_in = 8;
    paverW_in = 4;
    label = '4" × 8" (Brick Style)';
  } else if (input.paverSize === '16x16') {
    paverL_in = 16;
    paverW_in = 16;
    label = '16" × 16" Large Format';
  } else if (input.paverSize === 'custom' && input.customPaverL && input.customPaverW) {
    paverL_in = input.customPaverL;
    paverW_in = input.customPaverW;
    label = `${paverL_in}" × ${paverW_in}" Custom`;
  }

  const paverAreaSqFt = (paverL_in * paverW_in) / 144;
  const rawPavers = areaSqFt / Math.max(0.01, paverAreaSqFt);
  const paversNeeded = Math.ceil(rawPavers * (1 + waste / 100));

  // Bedding Sand (1" compacted depth): Area * (depth / 12) / 27 cu yds
  const sandCuFt = areaSqFt * (sandDepth / 12);
  const beddingSandCuYds = Math.round((sandCuFt / 27) * 100) / 100;
  // Sand density ~1.35 tons per cu yd
  const beddingSandTons = Math.round(beddingSandCuYds * 1.35 * 10) / 10;

  // Crushed gravel base (4" compacted depth): Area * (depth / 12) / 27 cu yds
  const gravelCuFt = areaSqFt * (gravelDepth / 12);
  const gravelBaseCuYds = Math.round((gravelCuFt / 27) * 100) / 100;
  // Compacted crushed stone ~1.4 tons per cu yd
  const gravelBaseTons = Math.round(gravelBaseCuYds * 1.4 * 10) / 10;

  // Edge restraints along perimeter
  const edgeRestraintLinearFt = Math.ceil(2 * (lengthFt + widthFt));

  return {
    patioAreaSqFt: Math.round(areaSqFt * 10) / 10,
    patioAreaSqM: Math.round(areaSqM * 10) / 10,
    paversNeeded,
    rawPavers: Math.ceil(rawPavers),
    wastePercent: waste,
    beddingSandCuYds,
    beddingSandTons,
    gravelBaseCuYds,
    gravelBaseTons,
    edgeRestraintLinearFt,
    paverSizeLabel: label,
  };
}
