import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Calculator,
  ShieldCheck,
  Zap,
  Users,
  Cpu,
  Award,
  BookCheck,
  Scale,
  Compass,
  FileCheck2,
} from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: 'https://renovationcalculator.online/about' },
  // The root layout template appends " | RenovationCalculator", so repeating the
  // brand here produced "About RenovationCalculator ... | RenovationCalculator".
  title: 'About Us — Engineering Standards & Estimating Methodology',
  description:
    'Learn about RenovationCalculator, our editorial standards, engineering benchmarks (ASTM, TCNA, IRC, IS 456, BS 5385), and our commitment to 100% free, client-side construction estimators.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-[#263238]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-terracotta-700 bg-terracotta-50 border border-terracotta-200/50 mb-3">
          Our Mission &amp; Engineering Standards
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#263238]">
          Built for Precision. <br className="hidden sm:block" />
          <span className="text-terracotta">Zero Guesswork.</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-charcoal-600 leading-relaxed">
          RenovationCalculator was founded to solve a persistent frustration for DIYers, general contractors, and quantity estimators: clumsy material calculators riddled with paywalls, intrusive tracking, and outdated formulas that ignore real-world job-site waste.
        </p>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="p-6 rounded-3xl border border-charcoal-200 bg-white shadow-xs">
          <div className="p-3 w-12 h-12 rounded-2xl bg-terracotta-50 text-terracotta mb-4 flex items-center justify-center border border-terracotta-200/50">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-[#263238] mb-2">
            100% Client-Side Computation
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
            Every calculation runs instantly inside your browser using pure JavaScript. We never transmit your room dimensions, project budgets, or floor plans to a remote server. Zero latency, zero data mining.
          </p>
        </div>

        <div className="p-6 rounded-3xl border border-charcoal-200 bg-white shadow-xs">
          <div className="p-3 w-12 h-12 rounded-2xl bg-terracotta-50 text-terracotta mb-4 flex items-center justify-center border border-terracotta-200/50">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-[#263238] mb-2">
            Code-Referenced Trade Formulas
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
            Our algorithms account for real-world realities: tile cut-waste buffers, drywall screw density, shingle pitch multipliers, subfloor deflection ratios, and concrete compaction factors.
          </p>
        </div>

        <div className="p-6 rounded-3xl border border-charcoal-200 bg-white shadow-xs">
          <div className="p-3 w-12 h-12 rounded-2xl bg-terracotta-50 text-terracotta mb-4 flex items-center justify-center border border-terracotta-200/50">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-[#263238] mb-2">
            Completely Free &amp; Open Access
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
            No mandatory registration, no subscription walls, and no lead-generation forms selling your contact details to third-party contractor networks. Transparent tools for every builder.
          </p>
        </div>
      </div>

      {/* Editorial Standards & Technical Methodology (E-E-A-T) */}
      <section className="rounded-3xl border border-charcoal-200 bg-white p-8 sm:p-12 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-2xl bg-terracotta-50 text-terracotta border border-terracotta-200/50">
            <BookCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#263238]">
              Technical Methodology &amp; Engineering References
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500">
              How our formulas are researched, validated, and benchmarked against building codes
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-charcoal-600 leading-relaxed">
          <p>
            Estimating construction materials is not simply basic geometry. A pure square-footage calculation inevitably leads to job-site shortages because it neglects cut geometry, substrate deflection, overlap seams, and fastener spacing.
          </p>
          <p>
            To ensure our estimators provide dependable quantities for real-world projects, our algorithms are benchmarked against internationally recognized trade standards:
          </p>
        </div>

        {/* Standards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          <div className="p-4 rounded-2xl bg-warm-50 border border-charcoal-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-terracotta mb-1">
              Tile &amp; Stone Installation
            </h3>
            <p className="text-xs text-charcoal-700">
              <strong>TCNA Handbook:</strong> Floor deflection criteria (L/360 ceramic, L/720 stone), mortar trowel notch coverage, and 10%–20% pattern waste allowances.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-warm-50 border border-charcoal-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-terracotta mb-1">
              Structural Framing &amp; Drywall
            </h3>
            <p className="text-xs text-charcoal-700">
              <strong>IRC &amp; ASTM C840:</strong> Stud layout on 16&quot; and 24&quot; on-center spacing, 12&quot; screw intervals for drywall ceiling/wall panels, and corner framing multipliers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-warm-50 border border-charcoal-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-terracotta mb-1">
              Concrete &amp; Masonry
            </h3>
            <p className="text-xs text-charcoal-700">
              <strong>ASTM C94 &amp; IS 456:</strong> Standard 1:2:4 and 1:1.5:3 concrete mix compaction (52%–54% dry volume expansion) and 8% spillage/formwork contingency.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-warm-50 border border-charcoal-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-terracotta mb-1">
              Regional Building Standards
            </h3>
            <p className="text-xs text-charcoal-700">
              <strong>BS 5385 &amp; AS 3700:</strong> Brick metric standards (215x102.5x65mm in UK), AS 3959 BAL bushfire roof considerations in Australia, and regional standard unit toggles.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-charcoal-100 text-sm text-charcoal-600 leading-relaxed space-y-3">
          <h3 className="font-bold text-[#263238]">Our Algorithmic Verification Process:</h3>
          <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm">
            <li>
              <strong>Trade Formula Research:</strong> Mathematical models are formulated based on manufacturer technical data sheets (TDS) and trade association handbooks.
            </li>
            <li>
              <strong>Contingency Multiplier Calibration:</strong> Nominal waste buffers (e.g., 10% for straight tile, 15% for diagonal, 20% for herringbone) are coded as clear, adjustable input parameters.
            </li>
            <li>
              <strong>Deterministic Unit Testing:</strong> Every calculator engine is verified with automated test suites cross-checking metric and imperial conversions.
            </li>
            <li>
              <strong>Editorial Review &amp; User Feedback:</strong> We actively review contractor submissions and code changes via our direct editorial contact channel.
            </li>
          </ol>
        </div>
      </section>

      {/* The methodology detail lives on its own page; this points readers there
          rather than duplicating it, and gives the claims above somewhere to be
          checked against. */}
      <div className="rounded-3xl border border-terracotta/30 bg-warm-50 p-6 sm:p-8 mb-16 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#263238]">
            Read the full editorial and methodology policy
          </h2>
          <p className="mt-1 text-sm text-charcoal-600 max-w-2xl leading-relaxed">
            Which standard sits behind each calculator, how waste factors are chosen, what
            our cost figures can and cannot tell you, how often they are revisited, and how
            to report an error.
          </p>
        </div>
        <Link
          href="/editorial-policy"
          className="shrink-0 px-5 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-600 text-white text-sm font-bold shadow-xs transition-colors text-center"
        >
          Editorial policy →
        </Link>
      </div>

      {/* Editorial & Technical Team */}
      <div className="rounded-3xl border border-charcoal-200 bg-white p-8 sm:p-12 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-2xl bg-terracotta-50 text-terracotta border border-terracotta-200/50">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#263238]">
              Editorial Review &amp; Maintenance Panel
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500">
              Dedicated to accuracy, ongoing curation, and transparent calculations
            </p>
          </div>
        </div>

        <div className="text-sm text-charcoal-600 leading-relaxed space-y-4">
          <p>
            RenovationCalculator is maintained by a specialized team of software engineers, architectural estimators, and construction technology enthusiasts. We believe that homeowners and tradespeople deserve accessible, professional-grade math without being gated behind paywalls or marketing funnels.
          </p>
          <p>
            If you represent a trade body, manufacturer, or contracting firm with suggested improvements for regional standard sizes or code updates, please visit our{' '}
            <Link href="/contact" className="text-terracotta font-semibold hover:underline">
              Contact Page
            </Link>{' '}
            or review our{' '}
            <Link href="/terms" className="text-terracotta font-semibold hover:underline">
              Terms of Service &amp; Estimation Disclaimer
            </Link>
            .
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
