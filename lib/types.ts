export type UnitSystem = 'imperial' | 'metric';

export type CalculatorCategory =
  | 'Flooring & Tiling'
  | 'Painting & Walls'
  | 'Concrete & Masonry'
  | 'Landscaping'
  | 'Structures'
  | 'Electrical & Trades'
  | 'Mechanical & Roof';

export interface CalculatorMeta {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: CalculatorCategory;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  iconName: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ResultItem {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
  subtext?: string;
}

export interface CalculationResult {
  primaryValue: string | number;
  primaryUnit: string;
  primaryLabel: string;
  details: ResultItem[];
  notes?: string[];
  disclaimer?: string;
}
