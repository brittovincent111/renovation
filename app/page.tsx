'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ALL_CALCULATORS, CATEGORIES } from '@/lib/calculatorList';
import { useRegion } from '@/lib/regionContext';
import { AdSlot } from '@/components/AdSlot';
import {
  Search,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Printer,
  FolderKanban,
  BookOpen,
  CheckCircle2,
  Grid,
  Paintbrush,
  Layers,
  LayoutGrid,
  FileText,
  Square,
  Home,
  Shield,
  Trees,
  Hammer,
  Wrench,
  Flame,
  Lightbulb,
  Check,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Grid: <Grid className="w-5 h-5" />,
  Paintbrush: <Paintbrush className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  LayoutGrid: <LayoutGrid className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Square: <Square className="w-5 h-5" />,
  Home: <Home className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Trees: <Trees className="w-5 h-5" />,
  Hammer: <Hammer className="w-5 h-5" />,
  Wrench: <Wrench className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
  Lightbulb: <Lightbulb className="w-5 h-5" />,
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { region } = useRegion();

  const filteredCalculators = useMemo(() => {
    return ALL_CALCULATORS.filter((calc) => {
      const matchesSearch =
        !searchQuery.trim() ||
        calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (calc.keywords && calc.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesCategory =
        selectedCategory === 'All' || calc.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-charcoal-100 bg-gradient-to-b from-warm-50 via-white to-white">
        <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-terracotta/5 blur-3xl" />
        <div className="pointer-events-none absolute top-20 right-0 h-96 w-96 rounded-full bg-terracotta/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-terracotta-700 bg-terracotta-50 mb-6 border border-terracotta-200">
            <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            <span>40+ Precision Construction & Renovation Estimators</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#263238] max-w-4xl mx-auto leading-tight sm:leading-none">
            Free Home Renovation <br />
            <span className="text-terracotta">
              Calculators
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
            Instant, client-side construction and material calculators for trade pros, homeowners, and DIYers. Estimate tile, concrete, paint, lumber, drywall, and complete room remodels with zero guesswork.
          </p>

          {/* Quick Search Input */}
          <div className="mt-10 max-w-2xl mx-auto">
            <div className="relative flex items-center shadow-lg shadow-charcoal-900/5 rounded-2xl bg-white border border-charcoal-200 p-2 focus-within:border-terracotta focus-within:ring-2 focus-within:ring-terracotta/20 transition-all">
              <Search className="w-5 h-5 text-charcoal-400 ml-3 shrink-0" />
              <input
                type="text"
                id="homepage-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search calculators (e.g., tile, concrete, paint, drywall, grout, wire gauge)..."
                className="w-full px-3 py-2 text-sm bg-transparent text-[#263238] placeholder-charcoal-400 focus:outline-hidden"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mr-2 text-xs text-charcoal-400 hover:text-charcoal-700 px-2 py-1 rounded-md"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Pills */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-charcoal-500">
              <span className="font-semibold text-charcoal-400">Popular:</span>
              {['Tile', 'Concrete', 'Paint', 'Drywall', 'Roofing', 'Flooring', 'Fence', 'Deck'].map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setSearchQuery(name)}
                  className="px-2.5 py-1 rounded-lg bg-warm-50 border border-charcoal-100 hover:bg-terracotta-50 hover:border-terracotta-200 hover:text-terracotta transition-colors"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 pt-8 border-t border-charcoal-100 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-charcoal-600">
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-terracotta" />
              <span>Instant Client-Side Speed</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-terracotta" />
              <span>No Account or Sign-Up</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Printer className="w-4 h-4 text-terracotta" />
              <span>Clean PDF & Print Export</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-terracotta" />
              <span>Industry-Standard Waste Rules</span>
            </div>
          </div>
        </div>
      </section>

      {/* Project Combo Pages Banner */}
      <section className="py-12 bg-[#263238] text-white relative overflow-hidden">
        <div className="pointer-events-none absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-terracotta/15 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-terracotta-300 bg-charcoal-800 px-3 py-1 rounded-full mb-3 border border-charcoal-700">
                <FolderKanban className="w-3.5 h-3.5 text-terracotta" />
                <span>Featured: Project Combo Flow</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Planning a Full Remodel?
              </h2>
              <p className="mt-3 text-charcoal-200 text-sm sm:text-base leading-relaxed">
                Don&apos;t recalculate dimensions 5 times. Our project combos take your room size once and calculate tiles, paint, drywall, fasteners, and subfloor simultaneously into one unified Bill of Materials.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects/bathroom-renovation-cost"
                className="px-5 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-600 text-white text-xs sm:text-sm font-bold shadow-md transition-colors"
              >
                Bathroom Remodel →
              </Link>
              <Link
                href="/projects/kitchen-renovation-cost"
                className="px-4 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-white text-xs sm:text-sm font-semibold border border-charcoal-700 transition-colors"
              >
                Kitchen Remodel
              </Link>
              <Link
                href="/projects"
                className="px-4 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-white text-xs sm:text-sm font-semibold border border-charcoal-700 transition-colors"
              >
                View All 5 Combos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Directory & Grid */}
      <section className="py-16 md:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Category Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#263238]">
              Calculator Directory
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
              Showing {filteredCalculators.length} of {ALL_CALCULATORS.length} available tools
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 max-w-full">
            {['All', ...CATEGORIES].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-terracotta text-white shadow-xs'
                    : 'bg-white text-charcoal-600 border border-charcoal-200 hover:bg-warm-50 hover:text-[#263238]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Calculators */}
        {filteredCalculators.length === 0 ? (
          <div className="py-16 text-center rounded-3xl border border-dashed border-charcoal-200 bg-warm-50/50">
            <p className="text-sm font-medium text-charcoal-500">
              No calculators found matching &quot;{searchQuery}&quot; in {selectedCategory}.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-terracotta text-white text-xs font-semibold hover:bg-terracotta-600"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCalculators.map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculators/${calc.slug}`}
                className="group relative flex flex-col justify-between p-6 rounded-3xl border border-charcoal-200/80 bg-white hover:border-terracotta/60 hover:shadow-xl hover:shadow-terracotta/5 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="p-3 rounded-2xl bg-warm-50 text-terracotta group-hover:bg-terracotta-50 group-hover:scale-105 transition-all">
                      {ICON_MAP[calc.iconName] || <Grid className="w-5 h-5" />}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500 bg-warm-50 px-2.5 py-1 rounded-full border border-charcoal-100">
                      {calc.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#263238] group-hover:text-terracotta transition-colors">
                    {calc.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-charcoal-500 line-clamp-2 leading-relaxed">
                    {calc.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-charcoal-100 flex items-center justify-between text-xs font-semibold text-terracotta">
                  <span>Calculate materials</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Non-intrusive Content Ad Unit (§26: One or two carefully placed ads) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
        <AdSlot position="content" />
      </div>

      {/* Featured Guides Section */}
      <section className="py-16 border-t border-charcoal-100 bg-[#FFFCF9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-terracotta" />
                <span className="text-xs font-bold uppercase tracking-wider text-terracotta-700">
                  DIY & Trade Insights
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#263238]">
                Step-by-Step Installation Guides
              </h2>
            </div>
            <Link
              href="/guides"
              className="text-xs font-semibold text-terracotta hover:underline flex items-center gap-1"
            >
              All Guides →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/guides/how-to-tile-a-bathroom-floor"
              className="p-6 rounded-3xl border border-charcoal-200 bg-white hover:border-terracotta/60 hover:shadow-lg transition-all"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta bg-terracotta-50 px-2 py-0.5 rounded border border-terracotta-200/50">
                Tiling Guide
              </span>
              <h3 className="mt-3 text-base font-bold text-[#263238]">
                How to Tile a Bathroom Floor (Step by Step)
              </h3>
              <p className="mt-2 text-xs text-charcoal-500 line-clamp-3 leading-relaxed">
                Complete walkthrough from subfloor preparation, membrane installation, thinset mortar selection, to laying and grouting tile without lippage.
              </p>
              <span className="mt-4 inline-block text-xs font-semibold text-terracotta">
                Read guide (8 min read) →
              </span>
            </Link>

            <Link
              href="/guides/how-much-does-a-bathroom-renovation-cost"
              className="p-6 rounded-3xl border border-charcoal-200 bg-white hover:border-terracotta/60 hover:shadow-lg transition-all"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta bg-terracotta-50 px-2 py-0.5 rounded border border-terracotta-200/50">
                Cost Breakdown
              </span>
              <h3 className="mt-3 text-base font-bold text-[#263238]">
                How Much Does a Bathroom Renovation Cost in 2026?
              </h3>
              <p className="mt-2 text-xs text-charcoal-500 line-clamp-3 leading-relaxed">
                Detailed cost breakdown across budget, mid-grade, and luxury renovations. Where to spend, where to save, and accurate material cost estimates.
              </p>
              <span className="mt-4 inline-block text-xs font-semibold text-terracotta">
                Read guide (10 min read) →
              </span>
            </Link>

            <Link
              href="/guides/concrete-vs-pavers"
              className="p-6 rounded-3xl border border-charcoal-200 bg-white hover:border-terracotta/60 hover:shadow-lg transition-all"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta bg-terracotta-50 px-2 py-0.5 rounded border border-terracotta-200/50">
                Comparison
              </span>
              <h3 className="mt-3 text-base font-bold text-[#263238]">
                Concrete vs Pavers: Which Is Cheaper for Patios & Driveways?
              </h3>
              <p className="mt-2 text-xs text-charcoal-500 line-clamp-3 leading-relaxed">
                An honest comparison of initial material costs, longevity, cracking risk, subbase labor, and maintenance for outdoor concrete slabs vs interlocking pavers.
              </p>
              <span className="mt-4 inline-block text-xs font-semibold text-terracotta">
                Read guide (7 min read) →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
