/**
 * Electrical Wire Gauge & Voltage Drop Calculator Pure Engine
 */
import { UnitSystem } from '../types';

export interface WireGaugeCalculatorInput {
  unit: UnitSystem;
  circuitAmps: number; // e.g. 15A, 20A, 30A, 50A
  oneWayDistanceFeet: number; // one-way distance to load
  circuitVoltage: 120 | 240;
  allowableVoltageDropPercent?: number; // standard 3% (NEC recommended)
  conductorMaterial?: 'copper' | 'aluminum';
}

export interface WireGaugeCalculatorResult {
  recommendedGauge: string; // e.g. 12 AWG, 10 AWG, 8 AWG
  voltageDropVolts: number;
  actualDropPercent: number;
  circuitAmps: number;
  circuitVoltage: number;
  oneWayDistanceFt: number;
  circuitBreakerSize: number;
  isExceedingDropLimit: boolean;
  necRuleNote: string;
}

// Copper wire resistance (Ohms per 1,000 ft at 75°C)
const COPPER_RESISTANCE_PER_1000FT: Record<string, number> = {
  '14 AWG': 3.07,
  '12 AWG': 1.93,
  '10 AWG': 1.21,
  '8 AWG': 0.764,
  '6 AWG': 0.491,
  '4 AWG': 0.308,
  '2 AWG': 0.194,
  '1/0 AWG': 0.122,
};

// Standard ampacity at 60°C/75°C (NEC Table 310.16)
const COPPER_MAX_AMPS: Record<string, number> = {
  '14 AWG': 15,
  '12 AWG': 20,
  '10 AWG': 30,
  '8 AWG': 40,
  '6 AWG': 55,
  '4 AWG': 70,
  '2 AWG': 95,
  '1/0 AWG': 125,
};

export function calculateWireGauge(input: WireGaugeCalculatorInput): WireGaugeCalculatorResult {
  const isMetric = input.unit === 'metric';
  const distanceFt = isMetric ? input.oneWayDistanceFeet * 3.28084 : input.oneWayDistanceFeet;
  const amps = input.circuitAmps > 0 ? input.circuitAmps : 15;
  const voltage = input.circuitVoltage || 120;
  const maxDropPercent = input.allowableVoltageDropPercent || 3;

  const gauges = ['14 AWG', '12 AWG', '10 AWG', '8 AWG', '6 AWG', '4 AWG', '2 AWG', '1/0 AWG'];

  let chosenGauge = '14 AWG';
  let bestDropVolts = 0;
  let bestDropPercent = 0;

  for (const gauge of gauges) {
    const maxAmps = COPPER_MAX_AMPS[gauge] || 15;
    if (amps > maxAmps) {
      continue; // wire too small for breaker current
    }

    const resPer1000 = COPPER_RESISTANCE_PER_1000FT[gauge] || 3.07;
    // Voltage drop formula: VD = 2 * Distance * Current * Resistance / 1000
    const dropVolts = (2 * distanceFt * amps * resPer1000) / 1000;
    const dropPercent = (dropVolts / voltage) * 100;

    chosenGauge = gauge;
    bestDropVolts = dropVolts;
    bestDropPercent = dropPercent;

    if (dropPercent <= maxDropPercent) {
      break; // found compliant gauge
    }
  }

  return {
    recommendedGauge: chosenGauge,
    voltageDropVolts: Math.round(bestDropVolts * 100) / 100,
    actualDropPercent: Math.round(bestDropPercent * 100) / 100,
    circuitAmps: amps,
    circuitVoltage: voltage,
    oneWayDistanceFt: Math.round(distanceFt),
    circuitBreakerSize: amps <= 15 ? 15 : amps <= 20 ? 20 : amps <= 30 ? 30 : amps <= 50 ? 50 : 60,
    isExceedingDropLimit: bestDropPercent > maxDropPercent,
    necRuleNote:
      'NEC Article 210.19(A) Informational Note No. 4 recommends that voltage drop should not exceed 3% on branch circuits for optimal equipment efficiency.',
  };
}
