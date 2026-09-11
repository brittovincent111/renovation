'use client';

import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export type AdPosition =
  | 'top'
  | 'post-result'
  | 'content'
  | 'sidebar'
  | 'bottom'
  | 'below-result' // Backwards compatibility alias for post-result
  | 'in-related' // Backwards compatibility alias for content
  | 'guide-inline'; // Backwards compatibility alias for content

export interface AdSlotProps {
  position: AdPosition;
  className?: string;
}

/**
 * AdSlot Component
 *
 * Implements strict monetization architecture:
 * - Fully isolated outside calculator interactive flows
 * - Fixed reserved min-heights to eliminate Cumulative Layout Shift (CLS)
 * - Clear, subtle, non-deceptive "Advertisement" labeling
 * - Hidden on print and PDF export via `print:hidden`
 * - Dynamically loads AdSense slots from environment variables
 */
export function AdSlot({ position, className = '' }: AdSlotProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  // Resolve slot ID per position
  const slotId = (() => {
    switch (position) {
      case 'top':
        return process.env.NEXT_PUBLIC_AD_SLOT_TOP || process.env.NEXT_PUBLIC_AD_SLOT_BELOW_RESULT;
      case 'post-result':
      case 'below-result':
        return process.env.NEXT_PUBLIC_AD_SLOT_BELOW_RESULT;
      case 'content':
      case 'in-related':
        return process.env.NEXT_PUBLIC_AD_SLOT_RELATED;
      case 'guide-inline':
        return process.env.NEXT_PUBLIC_AD_SLOT_GUIDE || process.env.NEXT_PUBLIC_AD_SLOT_RELATED;
      case 'sidebar':
        return process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR || process.env.NEXT_PUBLIC_AD_SLOT_RELATED;
      case 'bottom':
        return process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM || process.env.NEXT_PUBLIC_AD_SLOT_RELATED;
      default:
        return undefined;
    }
  })();

  // Exact min-height reservations per standard IAB formats to eliminate CLS
  const heightClass = (() => {
    switch (position) {
      case 'top':
        // Top banner: compact on mobile (50-90px) so calculator stays above fold, 90-100px on desktop
        return 'min-h-[90px] sm:min-h-[100px]';
      case 'sidebar':
        return 'min-h-[250px] lg:min-h-[600px]';
      case 'post-result':
      case 'below-result':
        return 'min-h-[250px] md:min-h-[280px]';
      case 'content':
      case 'in-related':
      case 'guide-inline':
      case 'bottom':
      default:
        return 'min-h-[250px]';
    }
  })();

  const isLive = Boolean(
    clientId &&
    slotId &&
    !clientId.includes('XXXXXXXXXXXXXXXX') &&
    !slotId.includes('1234567890')
  );

  useEffect(() => {
    if (isLive && !pushedRef.current && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      } catch (e) {
        console.error('AdSense display error', e);
      }
    }
  }, [isLive]);

  // If live credentials exist, render live Google Ad unit
  if (isLive) {
    return (
      <aside
        data-ad-position={position}
        aria-label="Advertisement"
        className={`ad-slot-wrapper print:hidden w-full my-6 overflow-hidden rounded-2xl border border-charcoal-200/70 bg-warm-50/40 p-2 flex flex-col items-center justify-center transition-all ${heightClass} ${className}`}
      >
        <span className="text-[10px] font-semibold uppercase tracking-widest text-charcoal-400 mb-1 select-none">
          Advertisement
        </span>
        <div className="w-full flex items-center justify-center overflow-hidden">
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', textAlign: 'center' }}
            data-ad-client={clientId}
            data-ad-slot={slotId}
            data-ad-format={position === 'sidebar' ? 'vertical' : 'auto'}
            data-full-width-responsive="true"
          />
        </div>
      </aside>
    );
  }

  // Pre-approval / local dev placeholder (prevents CLS with subtle, non-deceptive styling)
  return (
    <aside
      data-ad-position={position}
      aria-label="Advertisement slot"
      className={`ad-slot-wrapper print:hidden w-full my-6 overflow-hidden rounded-2xl border border-dashed border-charcoal-200 bg-warm-50/50 p-4 flex flex-col items-center justify-center text-center transition-all ${heightClass} ${className}`}
    >
      <div className="flex flex-col items-center justify-center max-w-sm">
        <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal-400 bg-charcoal-100/70 px-2 py-0.5 rounded select-none">
          Advertisement
        </span>
        <p className="mt-2 text-xs text-charcoal-400 font-medium">
          Reserved sponsor placement • Active upon AdSense connection
        </p>
      </div>
    </aside>
  );
}
