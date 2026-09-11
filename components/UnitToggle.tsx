'use client';

import React from 'react';
import { UnitSystem } from '@/lib/types';
import { Ruler } from 'lucide-react';

interface UnitToggleProps {
  unit: UnitSystem;
  onChange: (unit: UnitSystem) => void;
  className?: string;
}

export function UnitToggle({ unit, onChange, className = '' }: UnitToggleProps) {
  return (
    <div className={`inline-flex items-center gap-1.5 p-1 bg-warm-50 rounded-xl border border-charcoal-200 shadow-2xs ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-500 pl-2 pr-1 flex items-center gap-1 shrink-0">
        <Ruler className="w-3.5 h-3.5 text-terracotta" />
        <span className="hidden xs:inline">Units:</span>
      </span>
      <button
        type="button"
        id="unit-toggle-imperial"
        onClick={() => onChange('imperial')}
        className={`px-2.5 sm:px-3 py-1.5 text-xs rounded-lg transition-all duration-150 cursor-pointer ${
          unit === 'imperial'
            ? 'bg-white text-terracotta shadow-xs font-bold'
            : 'text-charcoal-600 hover:text-[#263238]'
        }`}
      >
        Imperial<span className="hidden sm:inline"> (ft/in)</span>
      </button>
      <button
        type="button"
        id="unit-toggle-metric"
        onClick={() => onChange('metric')}
        className={`px-2.5 sm:px-3 py-1.5 text-xs rounded-lg transition-all duration-150 cursor-pointer ${
          unit === 'metric'
            ? 'bg-white text-terracotta shadow-xs font-bold'
            : 'text-charcoal-600 hover:text-[#263238]'
        }`}
      >
        Metric<span className="hidden sm:inline"> (m/cm)</span>
      </button>
    </div>
  );
}
