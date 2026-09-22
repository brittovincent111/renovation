import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { BookOpen, ArrowRight, Clock, Calculator, ShieldCheck } from 'lucide-react';
import { AdSlot } from '@/components/AdSlot';
import { GUIDES } from '@/lib/guidesData';

export const metadata: Metadata = {
  alternates: { canonical: 'https://renovationcalculator.online/guides' },
  title: 'DIY Renovation Guides & Trade Insights',
  description:
    'Comprehensive step-by-step DIY installation and home remodeling guides. Learn how to tile bathroom floors, estimate renovation budgets, and compare concrete vs pavers.',
};


export default function GuidesDirectoryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-[#263238]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-terracotta bg-terracotta-50 mb-4 border border-terracotta-200/60">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Practical Home Renovation Knowledge</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#263238]">
          DIY Renovation Guides
        </h1>
        <p className="mt-4 text-base sm:text-lg text-charcoal-600 leading-relaxed">
          In-depth technical tutorials written for homeowners, trade students, and ambitious DIY builders. Each guide includes integrated material calculators to plan your project with zero waste.
        </p>
      </div>

      {/* Grid of Guides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {GUIDES.map((guide) => (
          <div
            key={guide.slug}
            className="flex flex-col justify-between p-7 rounded-3xl border border-charcoal-200 bg-white shadow-xs hover:border-terracotta/60 hover:shadow-xl transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3 text-xs text-charcoal-400">
                <span className="font-bold uppercase tracking-wider text-terracotta bg-terracotta-50 border border-terracotta-200/50 px-2.5 py-0.5 rounded-md">
                  {guide.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {guide.readTime}
                </span>
              </div>

              <h2 className="text-lg font-bold text-[#263238] mt-3 mb-2 leading-snug">
                {guide.title}
              </h2>

              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed mb-6">
                {guide.description}
              </p>

              {/* Linked calculators */}
              <div className="pt-4 border-t border-charcoal-100 mb-6">
                <p className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400 mb-2 flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-terracotta" />
                  <span>Calculators Used:</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {guide.linkedCalculators.map((calc) => (
                    <Link
                      key={calc.slug}
                      href={calc.slug.startsWith('projects/') ? `/${calc.slug}` : `/calculators/${calc.slug}`}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-warm-100 text-[#263238] hover:text-terracotta hover:bg-warm-200 transition-colors"
                    >
                      {calc.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href={`/guides/${guide.slug}`}
              className="inline-flex items-center justify-between w-full px-4 py-3 rounded-2xl bg-terracotta hover:bg-terracotta-600 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <span>Read Step-by-Step Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>

      {/* Terminal Directory Ad Slot (defaults to false in adConfig) */}
      <AdSlot position="bottom" slotKey="guides-index-bottom" />
    </div>
  );
}
