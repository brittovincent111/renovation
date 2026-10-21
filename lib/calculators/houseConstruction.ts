/**
 * House Construction Cost Calculator — India
 *
 * Pure, deterministic. Works in square feet and rupees because that is how
 * Indian residential construction is actually quoted, rather than converting
 * from an imperial-first model built for a different market.
 */
import {
  CITY_RATES,
  COST_BREAKDOWN,
  QualityTier,
  getCityRate,
} from '../indiaCityRates';

/**
 * Cost escalation per floor above ground.
 *
 * Upper floors cost marginally more per square foot than the ground floor:
 * material has to be lifted, and the structure below must be sized to carry
 * the additional load. 2% per floor is the common site rule of thumb and is
 * small enough not to distort a G+1 or G+2 estimate.
 */
export const UPPER_FLOOR_ESCALATION = 0.02;

/** Typical material : labour split for Indian residential construction. */
export const MATERIAL_SHARE = 0.62;

export interface HouseConstructionInput {
  /** Built-up area of a single floor, in square feet. */
  floorArea: number;
  /** Total floors including ground. G+1 = 2. */
  floors: number;
  citySlug: string;
  quality: QualityTier;
  /** Owner-set buffer. Defaults to 5%, on top of the 6% already in the breakdown. */
  contingencyPercent?: number;
}

export interface HouseConstructionResult {
  cityName: string;
  tier: 1 | 2;
  validated: boolean;
  totalBuiltUpSqFt: number;
  /** Effective blended rate after upper-floor escalation. */
  ratePerSqFtMin: number;
  ratePerSqFtMax: number;
  totalMin: number;
  totalMax: number;
  totalMid: number;
  contingencyAmount: number;
  materialCost: number;
  labourCost: number;
  breakdown: Array<{ head: string; share: number; amount: number; note: string }>;
}

export function calculateHouseConstruction(
  input: HouseConstructionInput,
): HouseConstructionResult {
  const city = getCityRate(input.citySlug) ?? CITY_RATES[0];
  const band = city.rates[input.quality];

  const floors = Math.max(1, Math.floor(input.floors) || 1);
  const floorArea = Math.max(0, input.floorArea) || 0;
  const totalBuiltUpSqFt = floorArea * floors;

  // Average escalation across all floors: ground floor carries none, each
  // floor above it carries UPPER_FLOOR_ESCALATION compounded linearly.
  const escalationSum = Array.from({ length: floors }, (_, i) => 1 + i * UPPER_FLOOR_ESCALATION)
    .reduce((a, b) => a + b, 0);
  const blendedFactor = floors > 0 ? escalationSum / floors : 1;

  const ratePerSqFtMin = Math.round(band.min * blendedFactor);
  const ratePerSqFtMax = Math.round(band.max * blendedFactor);

  const baseMin = totalBuiltUpSqFt * ratePerSqFtMin;
  const baseMax = totalBuiltUpSqFt * ratePerSqFtMax;

  const contingencyPct = input.contingencyPercent ?? 5;
  const contingencyAmount = Math.round(((baseMin + baseMax) / 2) * (contingencyPct / 100));

  const totalMin = Math.round(baseMin + contingencyAmount);
  const totalMax = Math.round(baseMax + contingencyAmount);
  const totalMid = Math.round((totalMin + totalMax) / 2);

  return {
    cityName: `${city.city}, ${city.state}`,
    tier: city.tier,
    validated: city.validated,
    totalBuiltUpSqFt: Math.round(totalBuiltUpSqFt),
    ratePerSqFtMin,
    ratePerSqFtMax,
    totalMin,
    totalMax,
    totalMid,
    contingencyAmount,
    materialCost: Math.round(totalMid * MATERIAL_SHARE),
    labourCost: Math.round(totalMid * (1 - MATERIAL_SHARE)),
    breakdown: COST_BREAKDOWN.map((b) => ({
      ...b,
      amount: Math.round(totalMid * b.share),
    })),
  };
}

/** Indian digit grouping — 12,34,567 rather than 1,234,567. */
export function formatINR(value: number): string {
  return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
}

/** Compact lakh/crore label, which is how Indians actually discuss these sums. */
export function formatLakhCrore(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
  return formatINR(value);
}
