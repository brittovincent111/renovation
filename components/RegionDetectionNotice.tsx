'use client';

import React from 'react';
import { useRegion } from '@/lib/regionContext';
import { X, Globe } from 'lucide-react';

interface RegionDetectionNoticeProps {
  className?: string;
}

/**
 * RegionDetectionNotice
 *
 * Unobtrusive, dismissible inline badge informing first-time visitors of their auto-detected region.
 * - Sits adjacent to the region selector
 * - Non-modal, zero interaction blocking
 * - Dismissible via (x) button or automatically when user manually chooses a region
 * - Persistently suppressed in localStorage once dismissed or overridden
 */
export function RegionDetectionNotice({ className = '' }: RegionDetectionNoticeProps) {
  const { region, showDetectedNotice, dismissDetectedNotice } = useRegion();

  if (!showDetectedNotice) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-terracotta-200/80 bg-warm-50 text-xs text-[#263238] shadow-2xs animate-fadeIn ${className}`}
    >
      <Globe className="w-3.5 h-3.5 text-terracotta shrink-0" />
      <span>
        Showing results for <strong>{region.flag} {region.name}</strong> — change if needed
      </span>
      <button
        type="button"
        onClick={dismissDetectedNotice}
        aria-label="Dismiss region notice"
        className="ml-1 text-charcoal-400 hover:text-charcoal-700 hover:bg-warm-100 p-0.5 rounded-md transition-colors cursor-pointer"
        title="Dismiss notice"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
