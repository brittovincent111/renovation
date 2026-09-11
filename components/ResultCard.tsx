'use client';

import React, { useState } from 'react';
import { CalculationResult } from '@/lib/types';
import { Copy, Check, Printer, CheckCircle2, AlertCircle } from 'lucide-react';

interface ResultCardProps {
  title: string;
  result: CalculationResult;
  className?: string;
}

/**
 * ResultCard Component
 *
 * Authoritative, high-clarity SaaS result summary.
 * Strictly adheres to ad placement rules: NO advertisements inside this card.
 */
export function ResultCard({ title, result, className = '' }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const summaryLines = [
        `--- ${title} Summary ---`,
        `Main Result: ${result.primaryValue} ${result.primaryUnit} (${result.primaryLabel})`,
        '',
        'Breakdown:',
        ...result.details.map((d) => `• ${d.label}: ${d.value}${d.unit ? ` ${d.unit}` : ''}`),
        '',
        result.disclaimer ? `Note: ${result.disclaimer}` : 'Calculated with RenovationCalculator Suite',
      ];

      await navigator.clipboard.writeText(summaryLines.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="result-card-container"
      className={`rounded-2xl border-2 border-terracotta/30 bg-white p-6 md:p-7 shadow-lg shadow-charcoal-900/5 ${className}`}
    >
      {/* Header with YOUR RESULT & Utility Actions */}
      <div className="flex items-center justify-between border-b border-charcoal-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-terracotta-50 text-terracotta-700 border border-terracotta-200">
            <CheckCircle2 className="h-3 w-3 text-terracotta" />
            <span>Your Result</span>
          </span>
        </div>

        <div className="flex items-center gap-2 print:hidden">
          <button
            type="button"
            id="copy-result-button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-charcoal-200 bg-warm-50 px-2.5 py-1.5 text-xs font-semibold text-[#263238] hover:bg-warm-100 transition-all cursor-pointer"
            title="Copy calculation summary to clipboard"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-terracotta" />
                <span className="text-terracotta">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-charcoal-400" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            type="button"
            id="print-result-button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-lg border border-charcoal-200 bg-warm-50 px-2.5 py-1.5 text-xs font-semibold text-[#263238] hover:bg-warm-100 transition-all cursor-pointer"
            title="Print or save as PDF"
          >
            <Printer className="h-3.5 w-3.5 text-charcoal-400" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Primary Big Metric (§7) */}
      <div className="py-6 border-b border-charcoal-100">
        <p className="text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-1">
          {result.primaryLabel}
        </p>
        <div className="flex items-baseline gap-2.5">
          <span className="text-5xl sm:text-6xl font-black tracking-tight text-[#263238] tabular-nums">
            {result.primaryValue}
          </span>
          <span className="text-xl sm:text-2xl font-bold text-terracotta">
            {result.primaryUnit}
          </span>
        </div>
      </div>

      {/* Secondary Metrics Breakdown Grid */}
      {result.details && result.details.length > 0 && (
        <div className="pt-4 space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400">
            Calculation Breakdown
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {result.details.map((item, index) => (
              <div
                key={index}
                className={`p-3 rounded-xl border transition-all ${
                  item.highlight
                    ? 'bg-terracotta-50/70 border-terracotta-200'
                    : 'bg-warm-50/70 border-charcoal-100'
                }`}
              >
                <p className="text-[11px] font-medium text-charcoal-500 truncate">
                  {item.label}
                </p>
                <p
                  className={`mt-0.5 text-base font-bold tabular-nums ${
                    item.highlight
                      ? 'text-terracotta-800'
                      : 'text-[#263238]'
                  }`}
                >
                  {item.value}
                  {item.unit && (
                    <span className="text-xs font-normal text-charcoal-400 ml-1">
                      {item.unit}
                    </span>
                  )}
                </p>
                {item.subtext && (
                  <p className="text-[10px] text-charcoal-400 mt-0.5">
                    {item.subtext}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Practical Disclaimer Footer */}
      <div className="mt-5 flex items-start gap-2 text-xs text-charcoal-500 bg-warm-50 p-3 rounded-xl border border-charcoal-100">
        <AlertCircle className="w-3.5 h-3.5 text-charcoal-400 shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          {result.disclaimer ||
            'Material estimates include recommended trade waste buffer. Always confirm dimensions on site prior to ordering.'}
        </p>
      </div>
    </div>
  );
}
