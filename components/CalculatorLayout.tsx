'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { UnitSystem, FAQItem, CalculationResult } from '@/lib/types';
import { UnitToggle } from './UnitToggle';
import { ResultCard } from './ResultCard';
import { AdSlot } from './AdSlot';
import { RelatedCalculators } from './RelatedCalculators';
import { JsonLd } from './JsonLd';
import { useRegion, REGIONS, RegionCode } from '@/lib/regionContext';
import { ChevronRight, HelpCircle, BookOpen, ChevronDown, CheckCircle2 } from 'lucide-react';

export interface CalculatorLayoutProps {
  slug: string;
  name: string;
  category: string;
  description: string;
  unit: UnitSystem;
  onUnitChange: (unit: UnitSystem) => void;
  result: CalculationResult;
  howItIsCalculated: string[];
  formulaHighlight?: string;
  faqs: FAQItem[];
  children: React.ReactNode; // The input form
}

/**
 * CalculatorLayout Component
 *
 * Implements strict, user-first page hierarchy (§1 of spec):
 * HEADER -> BREADCRUMB -> TITLE & DESCRIPTION + REGION/UNITS -> TOP AD -> CALCULATOR ->
 * RESULT -> POST-RESULT AD -> CALCULATION EXPLANATION -> RELATED CALCULATORS ->
 * CONTENT AD -> FAQ -> BOTTOM AD -> FOOTER.
 */
export function CalculatorLayout({
  slug,
  name,
  category,
  description,
  unit,
  onUnitChange,
  result,
  howItIsCalculated,
  formulaHighlight,
  faqs,
  children,
}: CalculatorLayoutProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const { region, setRegionCode } = useRegion();

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const currentUrl = `https://renovationcalculator.online/calculators/${slug}`;

  return (
    <div className="min-h-screen bg-white text-[#263238]">
      {/* Schema.org JSON-LD structured data */}
      <JsonLd
        name={name}
        description={description}
        url={currentUrl}
        faqs={faqs}
      />

      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 py-4 sm:py-8 md:py-10">
        {/* 1. BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="mb-3 sm:mb-4 flex items-center gap-1.5 text-xs text-charcoal-500 print:hidden overflow-x-auto whitespace-nowrap py-1">
          <Link href="/" className="hover:text-terracotta transition-colors shrink-0">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-charcoal-400 shrink-0" />
          <span className="text-charcoal-400 shrink-0">{category}</span>
          <ChevronRight className="h-3 w-3 text-charcoal-400 shrink-0" />
          <span className="font-semibold text-[#263238] truncate">{name}</span>
        </nav>

        {/* 2. COMPACT HERO / TITLE AREA (§3) */}
        <div className="pb-5 sm:pb-6 border-b border-charcoal-100">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-terracotta-700 bg-terracotta-50 border border-terracotta-200/50 mb-2">
            {category}
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#263238] leading-tight">
            {name}
          </h1>
          <p className="mt-2 text-xs sm:text-base text-charcoal-600 max-w-3xl leading-relaxed">
            {description}
          </p>

          {/* Compact Region & Unit controls directly below description */}
          <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3 print:hidden">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-charcoal-200 bg-warm-50 text-xs shadow-2xs">
              <span className="text-charcoal-500 font-medium">Region:</span>
              <select
                aria-label="Select Region"
                value={region.code}
                onChange={(e) => setRegionCode(e.target.value as RegionCode)}
                className="bg-transparent font-semibold text-[#263238] focus:outline-hidden cursor-pointer"
              >
                {Object.values(REGIONS).map((reg) => (
                  <option key={reg.code} value={reg.code} className="bg-white text-[#263238]">
                    {reg.flag} {reg.name} ({reg.currencySymbol})
                  </option>
                ))}
              </select>
            </div>

            <UnitToggle unit={unit} onChange={onUnitChange} />
          </div>
        </div>

        {/* 3. TOP AD SLOT (§4) */}
        {/* Strictly separated from calculator form with reserved height to eliminate CLS */}
        <AdSlot position="top" />

        {/* 4. PRIMARY CALCULATOR & RESULT (§5) */}
        {/* Desktop: Inputs Left, Result Right. Mobile: Inputs -> Calculate -> Result */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Controls + Calculate Button */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-charcoal-200 p-4 sm:p-8 shadow-xs">
            <div className="mb-5 pb-3 border-b border-charcoal-100 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#263238]">
                  Input Parameters
                </h2>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  Enter dimensions and specifications to estimate materials.
                </p>
              </div>
              <span className="text-[10px] font-bold text-terracotta bg-terracotta-50 border border-terracotta-200/50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Instant
              </span>
            </div>
            {children}
          </div>

          {/* Right Column: Your Result (Sticky on desktop, below form on mobile) */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-6">
            <ResultCard title={name} result={result} />
          </div>
        </div>

        {/* 5. POST-RESULT AD SLOT (§8) */}
        {/* Positioned cleanly after the completed calculation interaction */}
        <AdSlot position="post-result" />

        {/* 6. CALCULATION EXPLANATION (§9) */}
        <section className="mt-8 pt-8 border-t border-charcoal-100">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="p-2 rounded-xl bg-terracotta-50 text-terracotta">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#263238]">
                How The Calculation Works
              </h2>
              <p className="text-xs text-charcoal-500 mt-0.5">
                Formulas, material coverage assumptions, waste buffers, and rounding standards.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-charcoal-200 bg-white p-6 sm:p-8 space-y-4 text-sm text-charcoal-600 leading-relaxed">
            {howItIsCalculated.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}

            {formulaHighlight && (
              <div className="mt-4 p-4 rounded-xl bg-warm-50 border border-charcoal-100 font-mono text-xs text-[#263238] overflow-x-auto">
                <span className="text-terracotta font-bold">Standard Formula: </span>
                {formulaHighlight}
              </div>
            )}
          </div>
        </section>

        {/* 7. SECONDARY CONTENT / RELATED CALCULATORS (§11) */}
        <RelatedCalculators currentSlug={slug} />

        {/* 8. CONTENT AD SLOT (§10 & §12) */}
        {/* Contextual placement between related tools and FAQ */}
        <AdSlot position="content" />

        {/* 9. FREQUENTLY ASKED QUESTIONS (§13) */}
        <section className="mt-8">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="p-2 rounded-xl bg-terracotta-50 text-terracotta">
              <HelpCircle className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#263238]">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-charcoal-500 mt-0.5">
                Practical installation guidance and purchasing tips for {name.toLowerCase()}.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-charcoal-200 bg-white overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-[#263238] hover:text-terracotta transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-charcoal-400 shrink-0 ml-4 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-terracotta' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-charcoal-600 leading-relaxed border-t border-charcoal-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 10. BOTTOM AD SLOT (§12) */}
        <AdSlot position="bottom" />
      </div>
    </div>
  );
}
