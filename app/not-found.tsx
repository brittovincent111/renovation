import React from 'react';
import Link from 'next/link';
import { Compass, Home, Calculator } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 text-[#263238]">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex p-4 rounded-3xl bg-warm-100 border border-charcoal-200 text-terracotta mb-6 shadow-xs">
          <Compass className="w-10 h-10" />
        </div>
        <span className="block text-xs font-bold uppercase tracking-wider text-terracotta mb-2">404 Error</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#263238] tracking-tight">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm text-charcoal-600 leading-relaxed">
          The calculator or remodeling guide you are looking for might have moved or is temporarily unavailable.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-600 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-charcoal-200 bg-white hover:bg-warm-100 text-xs font-semibold text-[#263238] transition-colors cursor-pointer"
          >
            <Calculator className="w-4 h-4 text-terracotta" />
            <span>Browse Combo Estimators</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
