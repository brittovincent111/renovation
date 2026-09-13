import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { AdSlot } from '@/components/AdSlot';
import { ChevronRight, Calculator, DollarSign, Clock, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: 'https://renovationcalculator.online/guides/how-much-does-a-bathroom-renovation-cost' },
  title: 'How Much Does a Bathroom Renovation Cost in 2026? (Real Cost Breakdown) | RenovationCalculator',
  description:
    'Comprehensive 2026 cost breakdown for bathroom renovations. Compare budget DIY ($4,000–$8,000), mid-range ($12,000–$22,000), and luxury custom ($30,000+) material and labor expenses.',
};

export default function BathroomRenovationCostGuide() {
  return (
    <article className="min-h-screen bg-white text-[#263238] pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-charcoal-400">
          <Link href="/" className="hover:text-terracotta">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/guides" className="hover:text-terracotta">Guides</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-[#263238]">Bathroom Renovation Cost</span>
        </nav>

        {/* Title */}
        <header className="mb-10 pb-8 border-b border-charcoal-200">
          <span className="text-xs font-bold uppercase tracking-wider text-terracotta bg-terracotta-50 border border-terracotta-200/50 px-3 py-1 rounded-full">
            2026 Renovation Cost Guide
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-[#263238] leading-tight">
            How Much Does a Bathroom Renovation Cost in 2026?
          </h1>
          <div className="mt-4 flex items-center gap-4 text-xs text-charcoal-400 font-medium">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 10 min read</span>
            <span>•</span>
            <span>Real Contractor & DIY Budget Benchmarks</span>
          </div>
        </header>

        {/* Quick Tools Box */}
        <div className="my-8 p-6 rounded-3xl border border-terracotta/30 bg-warm-50">
          <h2 className="text-sm font-bold text-[#263238] mb-2 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-terracotta" />
            <span>Interactive Estimator for This Project</span>
          </h2>
          <p className="text-xs text-charcoal-600 mb-4">
            Calculate your exact materials and cost range using our lifted-state project combo:
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/projects/bathroom-renovation-cost"
              className="px-3 py-1.5 rounded-xl bg-white border border-charcoal-200 text-xs font-semibold text-terracotta hover:border-terracotta hover:bg-terracotta-50 shadow-xs transition-colors"
            >
              Bathroom Remodel Combo Estimator →
            </Link>
            <Link
              href="/calculators/paint-calculator"
              className="px-3 py-1.5 rounded-xl bg-white border border-charcoal-200 text-xs font-semibold text-terracotta hover:border-terracotta hover:bg-terracotta-50 shadow-xs transition-colors"
            >
              Paint Calculator →
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8 text-sm sm:text-base text-charcoal-700 leading-relaxed">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#263238] mb-3">
              National Average Cost Overview
            </h2>
            <p>
              In 2026, the national average cost to remodel a standard full bathroom (approx 40 to 75 square feet) is <strong>$12,500 to $19,500</strong>. However, costs diverge wildly depending on whether you keep the existing plumbing layout or hire licensed trades to relocate supply lines and vent stacks.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl border border-charcoal-200 bg-white shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-400">Budget / DIY Refresh</span>
                <p className="text-2xl font-black text-[#263238] mt-1">$3,500 – $7,500</p>
                <p className="text-xs text-charcoal-500 mt-2">Prefab vanity, ceramic floor tile, keeping existing tub, fresh paint, DIY installation.</p>
              </div>

              <div className="p-5 rounded-2xl border border-terracotta/40 bg-warm-50 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-terracotta">Mid-Range Remodel</span>
                <p className="text-2xl font-black text-[#263238] mt-1">$12,000 – $22,000</p>
                <p className="text-xs text-charcoal-600 mt-2">Tiled walk-in shower, quartz vanity, porcelain floor tile, new exhaust fan, contractor labor.</p>
              </div>

              <div className="p-5 rounded-2xl border border-charcoal-200 bg-white shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-400">Custom Luxury Remodel</span>
                <p className="text-2xl font-black text-[#263238] mt-1">$30,000 – $60,000+</p>
                <p className="text-xs text-charcoal-500 mt-2">Plumbing layout relocation, custom double vanity, radiant heated floors, frameless glass, designer fixtures.</p>
              </div>
            </div>
          </section>

          <AdSlot position="guide-inline" />

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#263238] mb-3">
              Where the Money Goes: Cost Breakdown by Category
            </h2>
            <p>
              When working with a general contractor, approximately 50% to 60% of the total budget goes to specialized trade labor (licensed plumbing, electrical, tiling, waterproofing, drywall finishing), with the remaining 40% to 50% covering fixtures and raw materials:
            </p>

            <ul className="list-disc pl-5 mt-3 space-y-2 text-xs sm:text-sm">
              <li><strong>Plumbing Labor & Fixtures (25% - 30%):</strong> Rough-in plumbing, shower valves, toilet, and faucet installation. Moving a toilet or shower drain adds $1,500 to $3,500 alone.</li>
              <li><strong>Tile & Waterproofing (20% - 25%):</strong> Floor tile, shower pan curb, niche framing, waterproof membrane, thinset, and grout.</li>
              <li><strong>Vanity, Countertop & Sink (15% - 20%):</strong> Free-standing vs custom floating vanity with quartz or marble top.</li>
              <li><strong>Electrical & Ventilation (8% - 12%):</strong> GFCI circuits, vanity sconces, quiet exhaust fan (minimum 80-110 CFM) vented through roof or soffit.</li>
              <li><strong>Demolition, Disposal & Drywall (10%):</strong> Dumpster rental, haul-away, mold-resistant greenboard drywall installation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#263238] mb-3">
              Where to Save vs. Where to Splurge
            </h2>
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-terracotta-50/60 border border-terracotta/30">
                <h3 className="font-bold text-[#263238] mb-1">Where to Splurge:</h3>
                <p>
                  <strong>1. Shower Waterproofing System:</strong> Never compromise on waterproofing (Schluter Kerdi or liquid membranes like RedGard). A leak behind tile causes thousands of dollars in hidden subfloor structural rot.
                </p>
                <p className="mt-1.5">
                  <strong>2. Shower Mixing Valve:</strong> Buy a high-grade brass valve from reputable brands (Moen, Kohler, Delta) where replacement cartridges are universally available 10 years later.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-warm-50 border border-charcoal-200">
                <h3 className="font-bold text-[#263238] mb-1">Where to Save:</h3>
                <p>
                  <strong>1. Keep the Existing Footprint:</strong> Leaving the toilet, shower, and sink in their original locations avoids expensive drain relocation in floor joists or concrete slabs.
                </p>
                <p className="mt-1.5">
                  <strong>2. Subway Tile:</strong> Classic 3x6 or 4x12 white glazed ceramic subway tile costs as little as $1.50 to $3.00 per square foot while delivering a timeless design.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 pt-8 border-t border-charcoal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-charcoal-400">Calculate your exact remodel budget</p>
            <p className="text-base font-bold text-[#263238]">Bathroom Renovation Project Combo</p>
          </div>
          <Link
            href="/projects/bathroom-renovation-cost"
            className="px-5 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-600 text-white text-xs font-bold shadow-xs transition-colors text-center cursor-pointer"
          >
            Open Estimator →
          </Link>
        </div>
      </div>
    </article>
  );
}
