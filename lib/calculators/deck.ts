/**
 * Deck Board Calculator Pure Calculation Engine
 *
 * Industry rule-of-thumb constants:
 */
export const DEFAULT_DECK_BOARD_WIDTH_INCHES = 5.5; // Actual width of nominal 5/4x6 or 2x6 deck boards
export const DEFAULT_BOARD_GAP_INCHES = 0.25;       // Standard 1/4" expansion gap between deck boards
export const DEFAULT_DECK_WASTE_PERCENT = 10;       // Standard 10% waste allowance
export const SCREWS_PER_100_SQFT = 350;             // Approx 350 screws or hidden fasteners per 100 sq ft (assuming 16" joist spacing)

export type DeckBoardLength = 8 | 10 | 12 | 16 | 20;

export interface DeckCalculatorInput {
  unit: 'imperial' | 'metric';
  deckLength: number;        // feet or meters (along the board run)
  deckWidth: number;         // feet or meters (across the board run)
  boardWidthInches?: number; // default 5.5 inches
  gapInches?: number;        // default 0.25 inches
  selectedBoardLength: DeckBoardLength;
  wastePercent?: number;     // default 10%
  pricePerBoard?: number;
}

export interface DeckCalculatorResult {
  deckAreaSqFt: number;
  deckAreaSqM: number;
  boardsPerRow: number;
  wastePercent: number;
  totalLinearFtNeeded: number;
  totalLinearMNeeded: number;
  selectedBoardLengthFt: number;
  boardsNeeded: number;
  screwsNeededApprox: number;
  joistsEstimateCount: number; // assuming standard 16" on-center spacing
  estimatedCost?: number;
}

export function calculateDeck(input: DeckCalculatorInput): DeckCalculatorResult {
  const isMetric = input.unit === 'metric';

  const lenFt = isMetric ? input.deckLength * 3.28084 : input.deckLength;
  const widFt = isMetric ? input.deckWidth * 3.28084 : input.deckWidth;

  const deckAreaSqFt = lenFt * widFt;
  const deckAreaSqM = deckAreaSqFt / 10.7639;

  const boardWidthIn = input.boardWidthInches || DEFAULT_DECK_BOARD_WIDTH_INCHES;
  const gapIn = input.gapInches !== undefined ? input.gapInches : DEFAULT_BOARD_GAP_INCHES;
  const effectiveBoardPitchIn = boardWidthIn + gapIn;

  // Number of rows running the length of the deck
  const boardsPerRow = Math.ceil((widFt * 12) / (effectiveBoardPitchIn || 5.75));

  const wastePercent = input.wastePercent !== undefined ? input.wastePercent : DEFAULT_DECK_WASTE_PERCENT;
  const wasteMultiplier = 1 + wastePercent / 100;

  // Linear footage
  const rawLinearFt = boardsPerRow * lenFt;
  const totalLinearFtNeeded = Math.ceil(rawLinearFt * wasteMultiplier);
  const totalLinearMNeeded = Math.ceil((totalLinearFtNeeded / 3.28084) * 10) / 10;

  // Board count for chosen stock length
  const boardStockLen = input.selectedBoardLength || 12;
  const boardsNeeded = Math.ceil(totalLinearFtNeeded / boardStockLen);

  // Fasteners estimate
  const screwsNeededApprox = Math.ceil((deckAreaSqFt / 100) * SCREWS_PER_100_SQFT);

  // Estimated joists count (16" on-center spacing across length)
  const joistsEstimateCount = Math.ceil((lenFt * 12) / 16) + 1;

  let estimatedCost: number | undefined;
  if (input.pricePerBoard && input.pricePerBoard > 0) {
    estimatedCost = Math.round(boardsNeeded * input.pricePerBoard * 100) / 100;
  }

  return {
    deckAreaSqFt: Math.round(deckAreaSqFt * 100) / 100,
    deckAreaSqM: Math.round(deckAreaSqM * 100) / 100,
    boardsPerRow,
    wastePercent,
    totalLinearFtNeeded,
    totalLinearMNeeded,
    selectedBoardLengthFt: boardStockLen,
    boardsNeeded: Math.max(1, boardsNeeded),
    screwsNeededApprox,
    joistsEstimateCount,
    estimatedCost,
  };
}
