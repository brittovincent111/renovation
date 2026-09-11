/**
 * Plumbing Water Supply Pipe Sizing Pure Engine
 */
import { UnitSystem } from '../types';

export interface PlumbingPipeCalculatorInput {
  unit: UnitSystem;
  bathrooms?: number;      // full baths (toilet, sink, shower/tub)
  halfBaths?: number;      // half baths (toilet, sink)
  kitchenSinks?: number;
  dishwashers?: number;
  washingMachines?: number;
  outdoorHoseBibbs?: number;
  waterPressurePsi?: number; // default 50-60 PSI
  developedLengthFt?: number;// distance from meter/pump to farthest fixture (default 60 ft)
}

export interface PlumbingPipeCalculatorResult {
  totalFixtureUnits: number; // WSFU (Water Supply Fixture Units)
  recommendedMainPipeSize: string; // e.g. 3/4" or 1"
  recommendedBranchSize: string;   // e.g. 1/2" or 3/4"
  estimatedPeakGpm: number;        // Gallons Per Minute peak demand
  developedLengthFt: number;
  systemSummary: string;
}

export function calculatePlumbingPipe(input: PlumbingPipeCalculatorInput): PlumbingPipeCalculatorResult {
  const isMetric = input.unit === 'metric';
  const baths = input.bathrooms ?? 2;
  const halfBaths = input.halfBaths ?? 1;
  const kitchens = input.kitchenSinks ?? 1;
  const dishwashers = input.dishwashers ?? 1;
  const laundry = input.washingMachines ?? 1;
  const hoseBibbs = input.outdoorHoseBibbs ?? 2;
  const lengthFt = input.developedLengthFt ?? 60;

  // Uniform Plumbing Code (UPC) Water Supply Fixture Unit (WSFU) values:
  // Full bath group: 3.5 to 4.0 WSFU
  // Half bath: 2.0 WSFU
  // Kitchen sink: 1.5 WSFU
  // Dishwasher: 1.5 WSFU
  // Clothes washer: 2.0 WSFU
  // Hose bibb: 2.5 WSFU
  const totalWSFU =
    baths * 4.0 +
    halfBaths * 2.0 +
    kitchens * 1.5 +
    dishwashers * 1.5 +
    laundry * 2.0 +
    hoseBibbs * 2.5;

  // Hunter's Curve empirical conversion from WSFU to peak GPM (flush tank systems)
  let peakGpm = 5;
  if (totalWSFU <= 10) peakGpm = 8;
  else if (totalWSFU <= 20) peakGpm = 14;
  else if (totalWSFU <= 35) peakGpm = 22;
  else if (totalWSFU <= 50) peakGpm = 28;
  else peakGpm = 35;

  // Sizing criteria: Water velocity <= 8 ft/sec for cold water, <= 5 ft/sec for hot water
  let mainSize = '3/4" Copper / PEX (19mm)';
  if (totalWSFU > 25 || lengthFt > 80) {
    mainSize = '1" Copper / PEX (25mm)';
  }
  if (totalWSFU > 45 && lengthFt > 100) {
    mainSize = '1-1/4" Copper / PEX (32mm)';
  }

  const branchSize = totalWSFU > 10 ? '3/4" riser feeding 1/2" fixture branches' : '1/2" branches';

  return {
    totalFixtureUnits: Math.round(totalWSFU * 10) / 10,
    recommendedMainPipeSize: mainSize,
    recommendedBranchSize: branchSize,
    estimatedPeakGpm: peakGpm,
    developedLengthFt: lengthFt,
    systemSummary: `System accommodates ${totalWSFU} WSFU fixture load at ~${peakGpm} GPM peak flow rate across ${lengthFt}ft pipe run.`,
  };
}
