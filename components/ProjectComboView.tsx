'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ProjectComboConfig } from '@/lib/projectsData';
import { useRegion } from '@/lib/regionContext';
import { AdSlot } from './AdSlot';
import { JsonLd } from './JsonLd';
import {
  ChevronRight,
  Printer,
  Sparkles,
  Copy,
  Check,
  ChevronDown,
  HelpCircle,
  Layers,
  FolderKanban,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';

import { PROJECT_COMBOS } from '@/lib/projectsData';

interface ProjectComboViewProps {
  slug: string;
}

export function ProjectComboView({ slug }: ProjectComboViewProps) {
  const project = PROJECT_COMBOS[slug] || PROJECT_COMBOS['bathroom-renovation-cost'];
  const { region, unit, setUnit } = useRegion();

  const [length, setLength] = useState<number>(project.defaultDimensions.length);
  const [width, setWidth] = useState<number>(project.defaultDimensions.width);
  const [height, setHeight] = useState<number>(project.defaultDimensions.height);
  const [quality, setQuality] = useState<'budget' | 'standard' | 'premium'>('standard');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  const isMetric = unit === 'metric';

  const result = useMemo(() => {
    return project.calculate({ length, width, height, quality }, unit);
  }, [project, length, width, height, quality, unit]);

  const handleCopyBOM = async () => {
    try {
      const lines = [
        `=== ${project.title} — Bill of Materials ===`,
        `Dimensions: ${length} × ${width}${height > 0 ? ` × ${height}` : ''} (${unit === 'imperial' ? 'ft' : 'm'})`,
        `Surface Area: ${result.roomAreaSqFt} sq ft (${result.roomAreaSqM} m²)`,
        `Quality Tier: ${quality.toUpperCase()}`,
        `Estimated Material Cost: $${result.totalCostMin.toLocaleString()} – $${result.totalCostMax.toLocaleString()}`,
        '',
        '--- Items Breakdown ---',
        ...result.bom.map(
          (b) => `• [${b.category}] ${b.material}: ${b.quantity} ${b.unit} (${b.estimatedCostRange}) - ${b.details || ''}`
        ),
        '',
        'Generated with RenovationCalculator (https://renovationcalculator.org)',
      ];
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  };

  const currentUrl = `https://buildcalc.io/projects/${project.slug}`;

  return (
    <div className="min-h-screen bg-white text-[#263238] pb-20">
      <JsonLd
        name={project.title}
        description={project.description}
        url={currentUrl}
        faqs={project.faqs}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-charcoal-500 print:hidden">
          <Link href="/" className="hover:text-terracotta transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-charcoal-400" />
          <Link href="/projects" className="hover:text-terracotta transition-colors">
            Projects
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-charcoal-400" />
          <span className="font-semibold text-[#263238]">{project.shortTitle}</span>
        </nav>

        {/* Page Header */}
        <div className="pb-8 border-b border-charcoal-100">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-terracotta-700 bg-terracotta-50 border border-terracotta-200/50 mb-3">
            <FolderKanban className="w-3.5 h-3.5 text-terracotta" />
            <span>Guided Multi-Calculator Workflow</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#263238]">
            {project.title}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-charcoal-600 max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Top Ad Slot */}
        <AdSlot position="top" />

        {/* Two-Column Layout */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Dimensions & Options Form */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-3xl border border-charcoal-200 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-charcoal-100">
                <h2 className="text-lg font-bold text-[#263238]">
                  Step 1: Enter Project Dimensions
                </h2>
                <span className="text-xs text-charcoal-400 font-medium">Shared across all tools</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="proj-length" className="block text-xs font-bold uppercase tracking-wider text-[#263238] mb-1.5">
                    Length ({isMetric ? 'm' : 'ft'})
                  </label>
                  <input
                    type="number"
                    id="proj-length"
                    min={1}
                    step={0.5}
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value) || 1)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal-200 bg-warm-50 text-sm font-bold text-[#263238] focus:outline-hidden focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                  />
                </div>

                <div>
                  <label htmlFor="proj-width" className="block text-xs font-bold uppercase tracking-wider text-[#263238] mb-1.5">
                    Width ({isMetric ? 'm' : 'ft'})
                  </label>
                  <input
                    type="number"
                    id="proj-width"
                    min={1}
                    step={0.5}
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value) || 1)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal-200 bg-warm-50 text-sm font-bold text-[#263238] focus:outline-hidden focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                  />
                </div>

                {project.defaultDimensions.height > 0 && (
                  <div>
                    <label htmlFor="proj-height" className="block text-xs font-bold uppercase tracking-wider text-[#263238] mb-1.5">
                      Height ({isMetric ? 'm' : 'ft'})
                    </label>
                    <input
                      type="number"
                      id="proj-height"
                      min={6}
                      step={0.5}
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value) || 8)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal-200 bg-warm-50 text-sm font-bold text-[#263238] focus:outline-hidden focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                    />
                  </div>
                )}
              </div>

              {/* Material Quality Selection */}
              <div className="mt-6 pt-6 border-t border-charcoal-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#263238] mb-2">
                  Step 2: Select Material Finish Grade
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'budget', label: 'Budget DIY', desc: 'Standard value finishes' },
                    { id: 'standard', label: 'Mid-Grade', desc: 'Popular quality materials' },
                    { id: 'premium', label: 'Luxury Finish', desc: 'High-end designer tier' },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setQuality(tier.id as any)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        quality === tier.id
                          ? 'border-terracotta bg-terracotta-50 text-terracotta-900 font-semibold shadow-xs'
                          : 'border-charcoal-200 bg-warm-50 hover:bg-warm-100 text-[#263238]'
                      }`}
                    >
                      <span className="block text-xs font-bold">{tier.label}</span>
                      <span className="block text-[10px] text-charcoal-500 mt-0.5 leading-tight">
                        {tier.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Connected Tools Card */}
            <div className="rounded-3xl border border-charcoal-200 bg-white p-6 shadow-xs">
              <h3 className="text-sm font-bold text-[#263238] mb-3">
                Calculators Flowing Into This Project:
              </h3>
              <div className="space-y-2">
                {project.subCalculators.map((sub, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-2 px-3.5 rounded-xl bg-warm-50 border border-charcoal-100">
                    <span className="font-semibold text-[#263238]">✓ {sub} Calculator</span>
                    <span className="text-[10px] text-terracotta font-bold uppercase tracking-wider">Cascaded</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Combined Bill of Materials & Total Cost */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-6">
            <div
              id="result-card-container"
              className="rounded-3xl border border-terracotta/30 bg-gradient-to-b from-warm-50 to-white p-6 md:p-8 backdrop-blur-md shadow-xl shadow-charcoal-900/5"
            >
              <div className="flex items-center justify-between border-b border-charcoal-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-terracotta-50 text-terracotta">
                    <FileSpreadsheet className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                    Consolidated Bill of Materials
                  </span>
                </div>

                <div className="flex items-center gap-2 print:hidden">
                  <button
                    type="button"
                    onClick={handleCopyBOM}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-charcoal-200 bg-white px-3 py-1.5 text-xs font-medium text-[#263238] shadow-xs hover:border-charcoal-300 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-terracotta" /> : <Copy className="h-3.5 w-3.5 text-charcoal-400" />}
                    <span>{copied ? 'Copied!' : 'Copy BOM'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-terracotta hover:bg-terracotta-600 text-white px-3.5 py-1.5 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>Print / PDF</span>
                  </button>
                </div>
              </div>

              {/* Primary Cost Metric */}
              <div className="my-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-500">
                  Estimated Total Material Cost ({quality.toUpperCase()})
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#263238]">
                    ${result.totalCostMin.toLocaleString()} – ${result.totalCostMax.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-charcoal-500 mt-1">
                  Covers {result.roomAreaSqFt} sq ft ({result.roomAreaSqM} m²) project footprint
                </p>
              </div>

              {/* Itemized Materials Table */}
              <div className="mt-6 space-y-2.5 max-h-96 overflow-y-auto pr-1">
                {result.bom.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white border border-charcoal-100 flex items-start justify-between gap-3 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta bg-terracotta-50 px-1.5 py-0.5 rounded border border-terracotta-200/50">
                          {item.category}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-[#263238]">
                          {item.material}
                        </h4>
                      </div>
                      {item.details && (
                        <p className="text-[11px] text-charcoal-500 mt-1">
                          {item.details}
                        </p>
                      )}
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs sm:text-sm font-extrabold text-[#263238] block">
                        {item.quantity} {item.unit}
                      </span>
                      <span className="text-[11px] font-semibold text-terracotta">
                        {item.estimatedCostRange}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Disclaimer */}
              <div className="mt-6 flex items-start gap-2 text-xs text-charcoal-500 bg-warm-50 p-3.5 rounded-xl border border-charcoal-100">
                <AlertCircle className="w-4 h-4 text-charcoal-400 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  Material estimates only — does not include demolition, permits, contractor labor, or specialty tools. Local building code and freight delivery charges vary.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Post-Result Ad Slot */}
        <AdSlot position="post-result" />

        {/* Project FAQ Section */}
        <section className="mt-12 pt-8 border-t border-charcoal-100">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="p-2 rounded-xl bg-terracotta-50 text-terracotta">
              <HelpCircle className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-[#263238]">
              {project.shortTitle} Remodel FAQs
            </h2>
          </div>

          <div className="space-y-3">
            {project.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-charcoal-200 bg-white overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-[#263238] hover:text-terracotta transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-charcoal-400 shrink-0 ml-4 transition-transform ${isOpen ? 'rotate-180 text-terracotta' : ''}`} />
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

        {/* Bottom Ad Slot */}
        <AdSlot position="bottom" />
      </div>
    </div>
  );
}
