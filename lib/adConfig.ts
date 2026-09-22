/**
 * Google AdSense Slot Configuration & Feature Flags
 *
 * Central configuration to control ad unit visibility across the site.
 * New slots strictly default to `false` until reviewed and approved manually.
 * Slots set to `false` render nothing (`null`) and introduce zero DOM or layout impact.
 */

export type AdSlotKey =
  // --- Existing Core Slots (Active) ---
  | 'calculator-top'
  | 'calculator-post-result'
  | 'calculator-content'
  | 'calculator-post-explanation'
  | 'calculator-bottom'
  | 'project-top'
  | 'project-post-result'
  | 'project-bottom'
  | 'homepage-content'
  | 'guide-tile-inline-1'
  | 'guide-cost-inline-1'
  | 'guide-pavers-inline-1'

  // --- Proposed New Candidate Slots (Default to FALSE until manual approval) ---
  | 'guide-tile-inline-2'
  | 'homepage-bottom'
  | 'guides-index-bottom';

export interface AdSlotMeta {
  enabled: boolean;
  location: string;
  description: string;
}

export const adConfig: Record<AdSlotKey, AdSlotMeta> = {
  // Existing core slots (active)
  'calculator-top': {
    enabled: true,
    location: 'Calculators: Above interactive form',
    description: 'Header ad separated from input controls',
  },
  'calculator-post-result': {
    enabled: true,
    location: 'Calculators: Below 2-column form & sticky result',
    description: 'Post-calculation break before formula explanation',
  },
  'calculator-post-explanation': {
    enabled: false,
    location: 'Calculators: Between the formula explanation and related tools',
    description: 'Mid-page break at a content boundary (disabled to maintain compliance with ad density limits)',
  },
  'calculator-content': {
    enabled: false,
    location: 'Calculators: Below RelatedCalculators',
    description: 'Break between related calculators and FAQ (disabled to prioritize editorial content)',
  },
  'calculator-bottom': {
    enabled: true,
    location: 'Calculators: Pre-footer after FAQ',
    description: 'Bottom page terminal ad',
  },
  'project-top': {
    enabled: true,
    location: 'Projects: Above project workflow',
    description: 'Header banner below title',
  },
  'project-post-result': {
    enabled: true,
    location: 'Projects: Below combined BOM card',
    description: 'Break between BOM and project FAQs',
  },
  'project-bottom': {
    enabled: true,
    location: 'Projects: Pre-footer after FAQ',
    description: 'Bottom page terminal ad',
  },
  'homepage-content': {
    enabled: true,
    location: 'Homepage: Below 40+ Calculators Grid',
    description: 'Break between tools grid and installation guides',
  },
  'guide-tile-inline-1': {
    enabled: true,
    location: 'Tile Guide: Between Step 1 and Step 2',
    description: 'Break between subfloor prep and uncoupling membrane',
  },
  'guide-cost-inline-1': {
    enabled: true,
    location: 'Cost Guide: Between Overview and Breakdown',
    description: 'Break after national averages table',
  },
  'guide-pavers-inline-1': {
    enabled: true,
    location: 'Pavers Guide: Between Comparison and Cracking',
    description: 'Break after comparison table',
  },

  // --- NEW PROPOSED SLOTS (default to false per Rule 5) ---
  'guide-tile-inline-2': {
    enabled: false,
    location: 'Tile Guide: Between Step 3 (Dry-Lay) and Step 4 (Mortar)',
    description: 'Separates layout planning from physical mortar mixing',
  },
  'homepage-bottom': {
    enabled: false,
    location: 'Homepage: Pre-footer below Step-by-Step Installation Guides',
    description: 'Terminal ad unit before global footer on homepage',
  },
  'guides-index-bottom': {
    enabled: false,
    location: 'Guides Directory: Below Guides Grid pre-footer',
    description: 'Terminal ad unit at the base of the guides directory',
  },
};

/**
 * Check if a given slot key is enabled in adConfig.
 * If slotKey is undefined, default to true for backward compatibility.
 */
export function isAdSlotEnabled(slotKey?: AdSlotKey): boolean {
  if (!slotKey) return true;
  return Boolean(adConfig[slotKey]?.enabled);
}
