/**
 * Deck Railing & Baluster Spacing Calculator Pure Engine
 */
import { UnitSystem } from '../types';

export interface DeckRailingCalculatorInput {
  unit: UnitSystem;
  railingLengthFeet: number; // total linear feet of perimeter requiring railing
  postSpacingFeet?: number;   // default 6 ft or 8 ft (standard IRC max 6ft or 8ft between posts)
  balusterWidthInches?: number; // default 1.5 in (standard 2x2 wood or square aluminum baluster)
  maxBalusterGapInches?: number; // default 4 in (Strict IRC 4" sphere building code rule)
  stairsRailingLengthFeet?: number;
}

export interface DeckRailingCalculatorResult {
  totalRailingLinearFt: number;
  totalRailingLinearM: number;
  railPostsNeeded: number; // 4x4 posts
  topRailsNeeded: number;  // 2x4 x 8ft boards
  bottomRailsNeeded: number;
  balustersNeeded: number; // vertical pickets
  exactBalusterSpacingInches: number; // calculated distance between pickets (< 4")
  codeComplianceNote: string;
}

export function calculateDeckRailing(input: DeckRailingCalculatorInput): DeckRailingCalculatorResult {
  const isMetric = input.unit === 'metric';
  const postSpacing = input.postSpacingFeet ?? 6;
  const balusterWidth = input.balusterWidthInches ?? 1.5;
  const maxGap = input.maxBalusterGapInches ?? 4.0;
  const stairsLength = input.stairsRailingLengthFeet ?? 0;

  const lengthFt = isMetric ? input.railingLengthFeet * 3.28084 : input.railingLengthFeet;
  const totalLengthFt = lengthFt + (isMetric ? stairsLength * 3.28084 : stairsLength);

  // Number of sections
  const sections = Math.ceil(totalLengthFt / postSpacing);
  // Posts: 1 at each section boundary + 1 end post
  const railPostsNeeded = sections + 1;

  // Each section has 1 top rail + 1 bottom rail
  const rails8ftNeeded = Math.ceil(totalLengthFt / 8);

  // Baluster count per section:
  // IRC building code mandates a 4-inch sphere cannot pass through any opening
  // Section clear width in inches (subtracting 3.5" post at each end)
  const sectionWidthInches = (postSpacing * 12) - 3.5;
  // (Balusters * balusterWidth) + ((Balusters + 1) * gap) = sectionWidth
  // Balusters * (balusterWidth + gap) + gap = sectionWidth
  // Balusters = ceil((sectionWidth - maxGap) / (balusterWidth + maxGap))
  const balustersPerSection = Math.ceil((sectionWidthInches - maxGap) / (balusterWidth + maxGap));
  const exactGap = (sectionWidthInches - (balustersPerSection * balusterWidth)) / (balustersPerSection + 1);

  const totalBalustersNeeded = balustersPerSection * sections;

  return {
    totalRailingLinearFt: Math.round(totalLengthFt * 10) / 10,
    totalRailingLinearM: Math.round((totalLengthFt * 0.3048) * 10) / 10,
    railPostsNeeded,
    topRailsNeeded: rails8ftNeeded,
    bottomRailsNeeded: rails8ftNeeded,
    balustersNeeded: totalBalustersNeeded,
    exactBalusterSpacingInches: Math.round(exactGap * 100) / 100,
    codeComplianceNote:
      'IRC Section R312: Guardrails must be at least 36" high for residential decks (>30" above grade) and balusters spaced so a 4" sphere cannot pass through.',
  };
}
