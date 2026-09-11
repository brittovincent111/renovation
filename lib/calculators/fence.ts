/**
 * Fence Material Calculator Pure Calculation Engine
 *
 * Industry rule-of-thumb constants:
 */
export const DEFAULT_POST_SPACING_FEET = 8;          // Standard 8 ft between posts
export const DEFAULT_POST_SPACING_METERS = 2.4;
export const DEFAULT_PICKET_WIDTH_INCHES = 6;        // Standard 6-inch nominal dog-ear picket (~5.5 in actual)
export const DEFAULT_GATE_WIDTH_FEET = 4;            // Standard 4 ft walk gate
export const CONCRETE_BAGS_PER_POST = 1.5;           // Approx 1.5 (50-60 lb) fast-setting concrete bags per post hole

export type FenceType = 'privacy-panel' | 'picket' | 'split-rail';

export interface FenceCalculatorInput {
  unit: 'imperial' | 'metric';
  totalLength: number;       // feet or meters
  fenceHeight: number;       // feet or meters (e.g. 4ft, 6ft, 8ft)
  fenceType: FenceType;
  postSpacing?: number;      // feet or meters (default 8ft / 2.4m)
  picketWidthInches?: number;// default 6 inches (or cm)
  picketSpacingInches?: number; // gap between pickets (e.g. 0 for privacy, 2 for picket)
  gateCount?: number;        // default 1
  gateWidth?: number;        // feet or meters (default 4ft)
}

export interface FenceCalculatorResult {
  totalLengthFt: number;
  totalLengthM: number;
  netLengthFt: number;
  netLengthM: number;
  sectionsCount: number;
  postsNeeded: number;
  gatePostsIncluded: number;
  panelsNeeded?: number;
  picketsNeeded?: number;
  railsNeeded: number;
  railsPerSection: number;
  concreteBagsNeeded: number;
  fastenersScrewsApprox: number;
}

export function calculateFence(input: FenceCalculatorInput): FenceCalculatorResult {
  const isMetric = input.unit === 'metric';

  const lenFt = isMetric ? input.totalLength * 3.28084 : input.totalLength;
  const heightFt = isMetric ? input.fenceHeight * 3.28084 : input.fenceHeight;
  const spacingFt = input.postSpacing
    ? (isMetric ? input.postSpacing * 3.28084 : input.postSpacing)
    : DEFAULT_POST_SPACING_FEET;

  const gateCount = input.gateCount !== undefined ? input.gateCount : 0;
  const gateWidthFt = input.gateWidth
    ? (isMetric ? input.gateWidth * 3.28084 : input.gateWidth)
    : DEFAULT_GATE_WIDTH_FEET;

  const totalGateSpanFt = gateCount * gateWidthFt;
  const netLengthFt = Math.max(0, lenFt - totalGateSpanFt);

  // Structural post calculation
  const lineSections = Math.ceil(lenFt / (spacingFt || 8));
  // Standard run needs (sections + 1) line posts, plus 2 dedicated gate latch/hinge posts per gate
  const gatePosts = gateCount * 2;
  const postsNeeded = lineSections + 1 + (gateCount > 0 ? gateCount : 0);

  // Rails: 2 rails for fences up to 4.5 ft, 3 rails for 6ft, 4 rails for 8ft
  let railsPerSection = 2;
  if (heightFt > 6.5) {
    railsPerSection = 4;
  } else if (heightFt > 4.5) {
    railsPerSection = 3;
  }
  const railsNeeded = lineSections * railsPerSection;

  let panelsNeeded: number | undefined;
  let picketsNeeded: number | undefined;

  if (input.fenceType === 'privacy-panel') {
    panelsNeeded = Math.ceil(netLengthFt / (spacingFt || 8));
  } else {
    // Picket calculation
    const picketWidthIn = input.picketWidthInches || DEFAULT_PICKET_WIDTH_INCHES;
    const gapIn = input.picketSpacingInches || 0;
    const effectivePicketPitchIn = picketWidthIn + gapIn;
    picketsNeeded = Math.ceil((netLengthFt * 12) / (effectivePicketPitchIn || 6));
  }

  const concreteBagsNeeded = Math.ceil(postsNeeded * CONCRETE_BAGS_PER_POST);
  // Approx 6 screws per picket or 12 screws per panel bracket
  const fastenersScrewsApprox = picketsNeeded ? picketsNeeded * 6 : (panelsNeeded || 0) * 16;

  return {
    totalLengthFt: Math.round(lenFt * 10) / 10,
    totalLengthM: Math.round((lenFt / 3.28084) * 10) / 10,
    netLengthFt: Math.round(netLengthFt * 10) / 10,
    netLengthM: Math.round((netLengthFt / 3.28084) * 10) / 10,
    sectionsCount: lineSections,
    postsNeeded,
    gatePostsIncluded: gatePosts,
    panelsNeeded,
    picketsNeeded,
    railsNeeded,
    railsPerSection,
    concreteBagsNeeded,
    fastenersScrewsApprox,
  };
}
