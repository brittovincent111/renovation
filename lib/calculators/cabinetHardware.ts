/**
 * Cabinet Hardware & Drawer Pull Spacing Calculator Pure Engine
 */
import { UnitSystem } from '../types';

export interface CabinetHardwareCalculatorInput {
  unit: UnitSystem;
  drawerWidthInches: number; // e.g. 18", 24", 30", 36"
  hardwareType?: 'single-knob' | 'single-pull' | 'double-pulls';
  pullCenterToCenterInches?: number; // e.g. 3" (76mm), 3.75" (96mm), 5" (128mm), 6.3" (160mm)
  totalDrawers?: number;
  totalDoors?: number;
}

export interface CabinetHardwareCalculatorResult {
  drawerWidthInches: number;
  hardwareType: string;
  pullCenterToCenterInches: number;
  holePositionFromLeftInches: number;
  holePositionFromRightInches: number;
  distanceBetweenHolesInches: number;
  ruleOfThirdsPlacementInches: number;
  totalHardwarePieces: number;
  screwsNeeded: number;
}

export function calculateCabinetHardware(input: CabinetHardwareCalculatorInput): CabinetHardwareCalculatorResult {
  const isMetric = input.unit === 'metric';
  const widthIn = isMetric ? input.drawerWidthInches / 25.4 : input.drawerWidthInches;
  const pullC2C = input.pullCenterToCenterInches
    ? (isMetric ? input.pullCenterToCenterInches / 25.4 : input.pullCenterToCenterInches)
    : 5; // standard 128mm (5.04 in)
  const drawers = input.totalDrawers ?? 6;
  const doors = input.totalDoors ?? 12;

  // Decision rule: Drawers 24" or wider often use 2 pulls or one extra-wide pull
  let type = input.hardwareType ?? (widthIn >= 27 ? 'double-pulls' : 'single-pull');

  let holeFromLeft = 0;
  let holeFromRight = 0;
  let distanceBetweenHoles = pullC2C;

  if (type === 'single-knob') {
    // Exact center
    holeFromLeft = widthIn / 2;
    holeFromRight = widthIn / 2;
    distanceBetweenHoles = 0;
  } else if (type === 'single-pull') {
    // Centered pull: Left hole = (Width - C2C) / 2
    holeFromLeft = (widthIn - pullC2C) / 2;
    holeFromRight = holeFromLeft;
  } else {
    // Double pulls: divide drawer width into thirds or quarters
    // Standard rule: Place center of each pull at 1/4 and 3/4 points of drawer width
    const leftCenter = widthIn * 0.25;
    holeFromLeft = leftCenter - pullC2C / 2;
    holeFromRight = holeFromLeft;
  }

  // Rule of thirds reference
  const ruleOfThirdsPlacement = widthIn / 3;

  // Total hardware count
  const pullsPerDrawer = type === 'double-pulls' ? 2 : 1;
  const totalDrawerPulls = drawers * pullsPerDrawer;
  const totalDoorHardware = doors; // 1 knob/pull per door
  const totalPieces = totalDrawerPulls + totalDoorHardware;

  // Screws: knobs take 1 screw, pulls take 2 screws
  const screwsNeeded = (type === 'single-knob' ? drawers : drawers * pullsPerDrawer * 2) + doors;

  return {
    drawerWidthInches: Math.round(widthIn * 10) / 10,
    hardwareType: type === 'double-pulls' ? 'Dual Pulls (Rule of Fourths)' : type === 'single-pull' ? 'Centered Pull' : 'Single Center Knob',
    pullCenterToCenterInches: Math.round(pullC2C * 100) / 100,
    holePositionFromLeftInches: Math.round(holeFromLeft * 100) / 100,
    holePositionFromRightInches: Math.round(holeFromRight * 100) / 100,
    distanceBetweenHolesInches: Math.round(distanceBetweenHoles * 100) / 100,
    ruleOfThirdsPlacementInches: Math.round(ruleOfThirdsPlacement * 100) / 100,
    totalHardwarePieces: totalPieces,
    screwsNeeded,
  };
}
