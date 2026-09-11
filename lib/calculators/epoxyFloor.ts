/**
 * Epoxy & Garage Floor Coating Calculator Pure Engine
 */
import { UnitSystem } from '../types';

export interface EpoxyFloorCalculatorInput {
  unit: UnitSystem;
  floorArea: number; // sq ft or sq meters
  garagePreset?: 'custom' | '1-car' | '2-car' | '3-car';
  coats?: number; // default 2 coats (color base coat + clear topcoat)
  decorativeFlakes?: boolean; // color vinyl flake broadcast
  flakeDensity?: 'light' | 'medium' | 'heavy'; // lbs per sq ft
  antiSlipAdditive?: boolean;
}

export interface EpoxyFloorCalculatorResult {
  floorAreaSqFt: number;
  floorAreaSqM: number;
  totalEpoxyGallons: number;
  epoxyKitsNeeded: number; // typical 2.5-gallon garage floor kit covers ~400-500 sq ft (1 coat)
  clearTopcoatGallons: number;
  flakeLbsNeeded: number;
  antiSlipPacksNeeded: number;
  concreteEtchCleanerLbs: number;
  coats: number;
}

export function calculateEpoxyFloor(input: EpoxyFloorCalculatorInput): EpoxyFloorCalculatorResult {
  const isMetric = input.unit === 'metric';
  let areaSqFt = isMetric ? input.floorArea * 10.7639 : input.floorArea;

  if (input.garagePreset === '1-car') areaSqFt = 240;
  if (input.garagePreset === '2-car') areaSqFt = 480;
  if (input.garagePreset === '3-car') areaSqFt = 720;

  const areaSqM = areaSqFt / 10.7639;
  const coats = input.coats ?? 2;

  // Epoxy coverage: Standard 100% solids epoxy yields approx 200-250 sq ft per gallon per coat.
  // Standard water-based DIY kit yields approx 200 sq ft / gallon.
  const coverageSqFtPerGal = 220;
  const gallonsPerCoat = areaSqFt / coverageSqFtPerGal;
  const totalEpoxyGallons = Math.ceil(gallonsPerCoat * coats * 10) / 10;

  // Standard retail garage epoxy kit (approx 2.5 gal mixed volume covers ~450 sq ft 1 coat)
  const epoxyKitsNeeded = Math.max(1, Math.ceil((areaSqFt * (coats > 1 ? 1.8 : 1)) / 450));

  // Clear protective topcoat (1 coat)
  const clearTopcoatGallons = Math.ceil(gallonsPerCoat);

  // Decorative vinyl flakes:
  // Light: 0.015 lbs/sq ft (~1 lb per 70 sq ft)
  // Medium: 0.035 lbs/sq ft (~1 lb per 30 sq ft)
  // Heavy / Full broadcast: 0.12 lbs/sq ft
  let flakeRate = 0.025;
  if (input.flakeDensity === 'light') flakeRate = 0.015;
  if (input.flakeDensity === 'heavy') flakeRate = 0.10;

  const flakeLbsNeeded = input.decorativeFlakes !== false
    ? Math.max(1, Math.ceil(areaSqFt * flakeRate))
    : 0;

  // Anti-slip aluminum oxide / shark-grip pack: 1 pack per gallon of topcoat
  const antiSlipPacksNeeded = input.antiSlipAdditive ? clearTopcoatGallons : 0;

  // Concrete acid etch / cleaner: 1 lb per 200 sq ft
  const concreteEtchCleanerLbs = Math.ceil(areaSqFt / 200);

  return {
    floorAreaSqFt: Math.round(areaSqFt),
    floorAreaSqM: Math.round(areaSqM * 10) / 10,
    totalEpoxyGallons: Math.max(1, Math.ceil(totalEpoxyGallons)),
    epoxyKitsNeeded,
    clearTopcoatGallons: Math.max(1, clearTopcoatGallons),
    flakeLbsNeeded,
    antiSlipPacksNeeded,
    concreteEtchCleanerLbs,
    coats,
  };
}
