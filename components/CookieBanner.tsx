'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('buildcalc_cookie_consent');
      if (!consent) {
        // Small delay for smooth entry
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore in strict privacy mode
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('buildcalc_cookie_consent', 'accepted');
    } catch {}
    setVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('buildcalc_cookie_consent', 'declined');
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      id="cookie-consent-banner"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 p-5 rounded-3xl border border-charcoal-200 bg-white/95 shadow-2xl backdrop-blur-md transition-all print:hidden"
      role="dialog"
      aria-live="polite"
    >
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-terracotta-50 text-terracotta shrink-0 border border-terracotta-200/50">
          <Cookie className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-[#263238]">
            Cookie & Privacy Notice
          </h4>
          <p className="mt-1 text-xs text-charcoal-500 leading-relaxed">
            We use cookies and client analytics to optimize your calculator experience and support our free tools. Read our{' '}
            <Link
              href="/privacy-policy"
              className="text-terracotta underline font-medium hover:text-terracotta-700"
            >
              Privacy Policy
            </Link>
            .
          </p>
          <div className="mt-3.5 flex items-center gap-2.5">
            <button
              type="button"
              id="cookie-accept-button"
              onClick={handleAccept}
              className="px-3.5 py-1.5 rounded-xl bg-terracotta hover:bg-terracotta-600 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Accept All
            </button>
            <button
              type="button"
              id="cookie-decline-button"
              onClick={handleDecline}
              className="px-3.5 py-1.5 rounded-xl border border-charcoal-200 bg-warm-50 hover:bg-warm-100 text-xs font-medium text-[#263238] transition-colors cursor-pointer"
            >
              Necessary Only
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDecline}
          className="p-1 rounded-lg text-charcoal-400 hover:text-[#263238] transition-colors cursor-pointer"
          aria-label="Dismiss cookie notice"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
