import React from 'react';
import Link from 'next/link';
import {
  ALL_CALCULATORS,
  FOOTER_FEATURED_SLUGS,
  FOOTER_INDIA_SLUGS,
  getCalculatorsBySlugs,
} from '@/lib/calculatorList';
import { BrandLogo } from './BrandLogo';
import { ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-charcoal-100 bg-[#FFFCF9] mt-20 print:hidden text-charcoal-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        {/* Brand & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <BrandLogo size="md" showTagline={true} />
            <p className="mt-4 text-xs leading-relaxed max-w-sm text-charcoal-600">
              Free, instant, client-side construction and home renovation material calculators.
              Accurately estimate tiles, concrete, paint, flooring, lumber, drywall, and landscaping materials with zero server cost.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#263238] bg-white p-3 rounded-2xl border border-charcoal-100 max-w-sm shadow-2xs">
              <ShieldCheck className="w-4 h-4 shrink-0 text-terracotta" />
              <span>100% Client-Side • No Account Required</span>
            </div>
          </div>

          {/* Featured calculators only.
              Linking all 45 here made every calculator link sitewide
              boilerplate; the full index lives on the homepage. */}
          <div className="md:col-span-2 grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#263238] mb-3">
                Popular Calculators
              </h4>
              <ul className="space-y-2 text-xs">
                {getCalculatorsBySlugs(FOOTER_FEATURED_SLUGS).map((calc) => (
                  <li key={calc.slug}>
                    <Link
                      href={`/calculators/${calc.slug}`}
                      className="text-charcoal-600 hover:text-terracotta transition-colors"
                    >
                      {calc.shortName}
                    </Link>
                  </li>
                ))}
                <li className="pt-1">
                  <Link
                    href="/#calculators"
                    className="font-semibold text-terracotta hover:text-terracotta-700 transition-colors"
                  >
                    Browse all {ALL_CALCULATORS.length} calculators →
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#263238] mb-3">
                India Cost Tools
              </h4>
              <ul className="space-y-2 text-xs">
                {getCalculatorsBySlugs(FOOTER_INDIA_SLUGS).map((calc) => (
                  <li key={calc.slug}>
                    <Link
                      href={`/calculators/${calc.slug}`}
                      className="text-charcoal-600 hover:text-terracotta transition-colors"
                    >
                      {calc.shortName}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/guides/flat-renovation-cost-guide"
                    className="text-charcoal-600 hover:text-terracotta transition-colors"
                  >
                    Flat Renovation Cost (1/2/3 BHK)
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Resources & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#263238] mb-3">
              Resources & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/projects" className="text-charcoal-600 hover:text-terracotta transition-colors">
                  Project Combo Estimators
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-charcoal-600 hover:text-terracotta transition-colors">
                  DIY Renovation Guides
                </Link>
              </li>
              <li>
                <Link href="/guides/flat-renovation-cost-guide" className="text-charcoal-600 hover:text-terracotta transition-colors">
                  Flat Renovation Cost Guide
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-charcoal-600 hover:text-terracotta transition-colors">
                  About RenovationCalculator
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="text-charcoal-600 hover:text-terracotta transition-colors">
                  Editorial &amp; Methodology Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-charcoal-600 hover:text-terracotta transition-colors">
                  Privacy Policy & Cookies
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-charcoal-600 hover:text-terracotta transition-colors">
                  Terms of Service & Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-charcoal-600 hover:text-terracotta transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Disclaimer from Spec Section 8 */}
        <div className="mt-12 pt-6 border-t border-charcoal-100 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-[11px] text-charcoal-400 italic">
            Estimates only — actual material needs vary by product, installation method, and site conditions. Always verify with your supplier or licensed contractor before purchasing.
          </p>
          <p className="text-[11px] text-charcoal-400 shrink-0">
            &copy; {new Date().getFullYear()} RenovationCalculator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
