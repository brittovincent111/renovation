import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { PROJECT_COMBOS } from '@/lib/projectsData';
import { FolderKanban, ArrowRight, CheckCircle2, Sparkles, Printer, Layers } from 'lucide-react';
import { getCalculatorBySlug } from '@/lib/calculatorList';

export const metadata: Metadata = {
  alternates: { canonical: 'https://renovationcalculator.online/projects' },
  title: 'Project Combo Calculators — Full Renovation Material Estimators',
  description:
    'Plan full remodels with zero repetitive entry. Enter dimensions once to size all tiles, paint, drywall, flooring, and fasteners across bathroom, kitchen, deck, basement, and patio projects.',
};

export default function ProjectsDirectoryPage() {
  const projects = Object.values(PROJECT_COMBOS);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-[#263238]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-terracotta bg-terracotta-50 mb-4 border border-terracotta-200/60">
          <FolderKanban className="w-3.5 h-3.5" />
          <span>Full Remodel Workflows</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#263238]">
          Project Combo Estimators
        </h1>
        <p className="mt-4 text-base sm:text-lg text-charcoal-600 leading-relaxed">
          Traditional calculators force you to re-enter your room dimensions 4 or 5 times for tile, paint, baseboards, and drywall. Our project combo pages connect multiple calculators into one unified flow.
        </p>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {projects.map((proj) => (
          <div
            key={proj.slug}
            className="flex flex-col justify-between p-7 rounded-3xl border border-charcoal-200 bg-white shadow-xs hover:border-terracotta/60 hover:shadow-xl transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-3 rounded-2xl bg-terracotta-50 text-terracotta border border-terracotta-200/50">
                  <FolderKanban className="w-6 h-6" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400">
                  {proj.subCalculators.length} Tools Combined
                </span>
              </div>

              <h2 className="text-xl font-bold text-[#263238] mb-2">
                {proj.title}
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed mb-6">
                {proj.tagline}
              </p>

              {/* Sub-calculators tags */}
              <div className="mb-6 pt-4 border-t border-charcoal-100">
                <p className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400 mb-2">
                  Included Sub-Calculations:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {proj.linkedCalculators.map((calcSlug) => {
                    const calc = getCalculatorBySlug(calcSlug);
                    if (!calc) return null;
                    return (
                      <Link
                        key={calcSlug}
                        href={`/calculators/${calcSlug}`}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-warm-100 text-[#263238] hover:bg-terracotta hover:text-white transition-colors"
                      >
                        {calc.shortName}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <Link
              href={`/projects/${proj.slug}`}
              className="inline-flex items-center justify-between w-full px-4 py-3 rounded-2xl bg-terracotta hover:bg-terracotta-600 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <span>Launch Guided Remodel Flow</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>

      {/* Feature Value Props */}
      <div className="rounded-3xl border border-charcoal-200 bg-warm-50 p-8 sm:p-12">
        <h3 className="text-xl sm:text-2xl font-bold text-[#263238] mb-6">
          Why Project Combo Pages Are Better Than Single Calculators
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-charcoal-600">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#263238]">
              <Sparkles className="w-4 h-4 text-terracotta" />
              <span>Lifted State Architecture</span>
            </div>
            <p className="text-xs leading-relaxed text-charcoal-500">
              Type your room dimensions once. Updating length or ceiling height instantly updates all flooring, wall tile, drywall, and paint calculations simultaneously.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#263238]">
              <Printer className="w-4 h-4 text-terracotta" />
              <span>Unified Bill of Materials (BOM)</span>
            </div>
            <p className="text-xs leading-relaxed text-charcoal-500">
              Generate a clean, contractor-grade breakdown showing exact quantities of every material needed for the entire job, ready to print or take to your lumberyard.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#263238]">
              <Layers className="w-4 h-4 text-terracotta" />
              <span>Budget vs Premium Tiers</span>
            </div>
            <p className="text-xs leading-relaxed text-charcoal-500">
              Toggle between budget DIY materials, standard builder grade, and luxury finishes to see real-time cost variations before purchasing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
