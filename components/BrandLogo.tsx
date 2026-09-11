'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  linkToHome?: boolean;
  useFullImage?: boolean;
}

/**
 * BrandLogo Component
 *
 * Uses the official RenovationCalculator identity directly from the uploaded graphic:
 * - Icon: Cropped high-resolution image (/brand-icon.png)
 * - Wordmark: "Renovation" (#263238 Charcoal) + "Calculator" (#E76F51 Terracotta)
 * - Responsiveness: Stacks on narrow mobile (<640px) to prevent overlap, inline on desktop
 */
export function BrandLogo({
  size = 'md',
  showTagline = false,
  className = '',
  linkToHome = true,
  useFullImage = false,
}: BrandLogoProps) {
  const iconDimensions = {
    sm: { w: 32, h: 28 },
    md: { w: 38, h: 34 },
    lg: { w: 56, h: 50 },
  }[size];

  const fullImageDimensions = {
    sm: { w: 140, h: 85 },
    md: { w: 180, h: 109 },
    lg: { w: 240, h: 146 },
  }[size];

  const logoContent = useFullImage ? (
    <div className={`inline-flex items-center group ${className}`}>
      <Image
        src="/brand-logo.png"
        alt="RenovationCalculator"
        width={fullImageDimensions.w}
        height={fullImageDimensions.h}
        className="shrink-0 object-contain transition-transform duration-200 group-hover:scale-105"
        priority
      />
    </div>
  ) : (
    <div className={`inline-flex items-center gap-2 sm:gap-2.5 group ${className}`}>
      {/* Uploaded Brand Icon */}
      <div className="shrink-0 transition-transform duration-200 group-hover:scale-105">
        <Image
          src="/brand-icon.png"
          alt="RenovationCalculator Icon"
          width={iconDimensions.w}
          height={iconDimensions.h}
          className="shrink-0 object-contain drop-shadow-xs w-8 h-7 sm:w-10 sm:h-9"
          priority
        />
      </div>

      {/* Brand Text Stack: Compact stacked on mobile, inline on desktop */}
      <div className="flex flex-col justify-center">
        <div className="leading-none flex flex-col sm:flex-row sm:items-baseline">
          <span className="text-[#263238] text-sm sm:text-lg lg:text-xl font-black tracking-tight">
            Renovation
          </span>
          <span className="text-[#E76F51] text-xs sm:text-lg lg:text-xl font-black tracking-tight sm:ml-0.5">
            Calculator
          </span>
        </div>
        {showTagline && (
          <div className="mt-0.5 sm:mt-1 font-bold uppercase text-[#263238] flex items-center gap-1 text-[7px] sm:text-[9px] tracking-[0.18em] sm:tracking-[0.25em]">
            <span>PLAN</span>
            <span className="text-[#E76F51] text-[1.1em] leading-none">•</span>
            <span>ESTIMATE</span>
            <span className="text-[#E76F51] text-[1.1em] leading-none">•</span>
            <span>RENOVATE</span>
          </div>
        )}
      </div>
    </div>
  );

  if (!linkToHome) {
    return logoContent;
  }

  return (
    <Link href="/" aria-label="RenovationCalculator Home" className="shrink-0">
      {logoContent}
    </Link>
  );
}


