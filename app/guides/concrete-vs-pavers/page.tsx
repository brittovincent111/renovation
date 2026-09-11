import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { AdSlot } from '@/components/AdSlot';
import { ChevronRight, Calculator, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Concrete vs Pavers: Which Is Cheaper for Patios & Driveways? | RenovationCalculator',
  description:
    'An objective comparison of poured concrete vs interlocking pavers. Cost per square foot, durability, crack resistance, maintenance, and DIY difficulty for patios and driveways.',
};

export default function ConcreteVsPaversGuide() {
  return (
    <article className="min-h-screen bg-white text-[#263238] pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-charcoal-400">
          <Link href="/" className="hover:text-terracotta">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/guides" className="hover:text-terracotta">Guides</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-[#263238]">Concrete vs Pavers</span>
        </nav>

        {/* Title */}
        <header className="mb-10 pb-8 border-b border-charcoal-200">
          <span className="text-xs font-bold uppercase tracking-wider text-terracotta bg-terracotta-50 border border-terracotta-200/50 px-3 py-1 rounded-full">
            Hardscape Material Comparison
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-[#263238] leading-tight">
            Concrete vs Pavers: Which Is Cheaper for Patios & Driveways?
          </h1>
          <div className="mt-4 flex items-center gap-4 text-xs text-charcoal-400 font-medium">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 7 min read</span>
            <span>•</span>
            <span>Hardscape Cost & Longevity Analysis</span>
          </div>
        </header>

        {/* Quick Tools Box */}
        <div className="my-8 p-6 rounded-3xl border border-terracotta/30 bg-warm-50">
          <h2 className="text-sm font-bold text-[#263238] mb-2 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-terracotta" />
            <span>Calculate Materials for Both Options</span>
          </h2>
          <p className="text-xs text-charcoal-600 mb-4">
            Compare material yields and prices between concrete slab and interlocking pavers:
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/calculators/concrete-slab-calculator"
              className="px-3 py-1.5 rounded-xl bg-white border border-charcoal-200 text-xs font-semibold text-terracotta hover:border-terracotta hover:bg-terracotta-50 shadow-xs transition-colors"
            >
              Concrete Slab Calculator →
            </Link>
            <Link
              href="/calculators/paver-calculator"
              className="px-3 py-1.5 rounded-xl bg-white border border-charcoal-200 text-xs font-semibold text-terracotta hover:border-terracotta hover:bg-terracotta-50 shadow-xs transition-colors"
            >
              Paver Calculator →
            </Link>
            <Link
              href="/projects/backyard-patio-cost"
              className="px-3 py-1.5 rounded-xl bg-white border border-charcoal-200 text-xs font-semibold text-terracotta hover:border-terracotta hover:bg-terracotta-50 shadow-xs transition-colors"
            >
              Backyard Patio Project Combo →
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8 text-sm sm:text-base text-charcoal-700 leading-relaxed">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#263238] mb-3">
              Direct Cost Comparison (Per Square Foot)
            </h2>
            <p>
              When deciding between poured concrete and interlocking pavers for a patio or driveway, initial purchase price is only part of the equation. Maintenance, repair difficulty, and frost longevity must also be considered:
            </p>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border border-charcoal-200 rounded-2xl overflow-hidden">
                <thead className="bg-warm-100 text-[#263238] font-bold">
                  <tr>
                    <th className="p-3.5">Surface Option</th>
                    <th className="p-3.5">DIY Materials Only</th>
                    <th className="p-3.5">Installed (Contractor)</th>
                    <th className="p-3.5">Lifespan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-100 bg-white">
                  <tr>
                    <td className="p-3.5 font-semibold text-[#263238]">Poured Plain Concrete (4&quot;)</td>
                    <td className="p-3.5">$2.50 – $4.00 / sq ft</td>
                    <td className="p-3.5">$7.00 – $12.00 / sq ft</td>
                    <td className="p-3.5">25–30 Years</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-[#263238]">Stamped / Colored Concrete</td>
                    <td className="p-3.5">$4.50 – $7.00 / sq ft</td>
                    <td className="p-3.5">$14.00 – $22.00 / sq ft</td>
                    <td className="p-3.5">25–30 Years</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-[#263238]">Concrete Interlocking Pavers</td>
                    <td className="p-3.5">$4.00 – $8.50 / sq ft</td>
                    <td className="p-3.5">$15.00 – $28.00 / sq ft</td>
                    <td className="p-3.5">40–50+ Years</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-[#263238]">Natural Stone / Travertine Pavers</td>
                    <td className="p-3.5">$8.00 – $16.00 / sq ft</td>
                    <td className="p-3.5">$22.00 – $40.00 / sq ft</td>
                    <td className="p-3.5">50+ Years</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <AdSlot position="guide-inline" />

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#263238] mb-3">
              The Cracking Problem: Freeze-Thaw Climate Reality
            </h2>
            <p>
              There is an old contractor adage: <em>&quot;There are two types of concrete: concrete that has cracked, and concrete that hasn&apos;t cracked yet.&quot;</em>
            </p>
            <p className="mt-3">
              In cold climates where soil freezes and heaves in the winter, rigid poured concrete slabs inevitably develop hairline or structural cracks along control joints. Once a poured slab cracks, repairing it seamlessly is nearly impossible without visible patch scars.
            </p>
            <p className="mt-3">
              <strong>Interlocking pavers are a flexible pavement system.</strong> Because individual pavers sit on an uncompacted sand bed with polymeric sand joints, they flex slightly with seasonal ground movement without cracking. If underground tree roots or plumbing work requires access, pavers can be unzipped, the subgrade repaired, and the exact same pavers re-laid without visual traces.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#263238] mb-3">
              DIY Difficulty: Concrete Pour vs. Paver Laying
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-5 rounded-2xl border border-charcoal-200 bg-white shadow-xs">
                <h3 className="font-bold text-[#263238] mb-2">Poured Concrete: Fast But Forgiving</h3>
                <p className="text-charcoal-600">
                  Pouring concrete has a strict time limit. Once the ready-mix truck begins discharging, you have about 60 to 90 minutes to screed, bull float, edge, and broom-finish the slab before it hardens. If you make a mistake, you cannot easily undo it.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-charcoal-200 bg-white shadow-xs">
                <h3 className="font-bold text-[#263238] mb-2">Pavers: Laborious But Patient</h3>
                <p className="text-charcoal-600">
                  Pavers require moving heavy tonnage of gravel base and sand, but there is zero time pressure. You can excavate on Saturday, compact gravel on Sunday, and lay pavers in sections over several weekends without compromising quality.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 pt-8 border-t border-charcoal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-charcoal-400">Planning your backyard patio?</p>
            <p className="text-base font-bold text-[#263238]">Estimate pavers, sand & gravel in one flow</p>
          </div>
          <Link
            href="/projects/backyard-patio-cost"
            className="px-5 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-600 text-white text-xs font-bold shadow-xs transition-colors text-center cursor-pointer"
          >
            Backyard Patio Combo →
          </Link>
        </div>
      </div>
    </article>
  );
}
