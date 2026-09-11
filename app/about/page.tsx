import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Calculator, ShieldCheck, Zap, Users, Cpu, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About RenovationCalculator — Transparent Construction & Renovation Estimating',
  description:
    'Learn about RenovationCalculator, our mission to provide 100% free, client-side, zero-tracking construction material calculators for homeowners and trade professionals.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-[#263238]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-terracotta-700 bg-terracotta-50 border border-terracotta-200/50 mb-3">
          Our Story & Mission
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#263238]">
          Built for Precision. <br className="hidden sm:block" />
          <span className="text-terracotta">Zero Guesswork.</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-charcoal-600 leading-relaxed">
          RenovationCalculator was created to solve a persistent frustration for DIYers, general contractors, and architects: clumsy material estimators riddled with paywalls, invasive tracking, and outdated formulas.
        </p>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="p-6 rounded-3xl border border-charcoal-200 bg-white shadow-xs">
          <div className="p-3 w-12 h-12 rounded-2xl bg-terracotta-50 text-terracotta mb-4 flex items-center justify-center border border-terracotta-200/50">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-[#263238] mb-2">
            100% Client-Side Speed
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
            All calculations happen instantly right in your browser. We never send your room dimensions or floor plans to a remote server. No latency, zero loading spinners.
          </p>
        </div>

        <div className="p-6 rounded-3xl border border-charcoal-200 bg-white shadow-xs">
          <div className="p-3 w-12 h-12 rounded-2xl bg-terracotta-50 text-terracotta mb-4 flex items-center justify-center border border-terracotta-200/50">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-[#263238] mb-2">
            Industry Standard Formulas
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
            Our math accounts for real-world realities: tile cut-waste buffers, drywall screw density, shingle pitch multipliers, and concrete compaction factors.
          </p>
        </div>

        <div className="p-6 rounded-3xl border border-charcoal-200 bg-white shadow-xs">
          <div className="p-3 w-12 h-12 rounded-2xl bg-terracotta-50 text-terracotta mb-4 flex items-center justify-center border border-terracotta-200/50">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-[#263238] mb-2">
            Completely Free & Open
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
            No mandatory registration, no subscription walls, no lead-gen forms selling your phone number to sales reps. Just fast, dependable calculations.
          </p>
        </div>
      </div>

      {/* Engineering Standards */}
      <div className="rounded-3xl border border-charcoal-200 bg-white p-8 sm:p-12 mb-16">
        <h2 className="text-2xl font-bold text-[#263238] mb-4">
          How We Verify Our Mathematical Models
        </h2>
        <div className="space-y-4 text-sm text-charcoal-600 leading-relaxed">
          <p>
            Every single calculator in the RenovationCalculator suite is written as a pure, deterministic mathematical function. We benchmark our algorithms against verified architectural specifications, ASTM international building standards, and recognized trade guidelines (such as the Tile Council of North America and National Roofing Contractors Association).
          </p>
          <p>
            Whether calculating cubic yardage for a foundation pour, stud spacing on 16-inch centers, or voltage drop across 10-gauge Romex wire, our calculations ensure you order enough material to complete the job without paying for excessive leftover scrap.
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-charcoal-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-charcoal-400 uppercase tracking-wider">Ready to begin your project?</p>
            <p className="text-base font-bold text-[#263238]">Explore our comprehensive suite of 40+ calculators</p>
          </div>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-600 text-white text-sm font-bold shadow-xs transition-colors"
          >
            Browse All Calculators
          </Link>
        </div>
      </div>
    </div>
  );
}
