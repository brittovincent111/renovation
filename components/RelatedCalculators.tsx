import React from 'react';
import Link from 'next/link';
import { getRelatedCalculators } from '@/lib/calculatorList';
import {
  ArrowRight,
  Grid,
  Paintbrush,
  Layers,
  LayoutGrid,
  Sparkles,
  FileText,
  Square,
  Home,
  Shield,
  Trees,
  Fence as FenceIcon,
  Hammer,
  Wrench,
  Flame,
  Lightbulb,
} from 'lucide-react';

interface RelatedCalculatorsProps {
  currentSlug: string;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Grid: <Grid className="w-5 h-5" />,
  Paintbrush: <Paintbrush className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  LayoutGrid: <LayoutGrid className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Square: <Square className="w-5 h-5" />,
  Home: <Home className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Trees: <Trees className="w-5 h-5" />,
  Fence: <FenceIcon className="w-5 h-5" />,
  Hammer: <Hammer className="w-5 h-5" />,
  Wrench: <Wrench className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
  Lightbulb: <Lightbulb className="w-5 h-5" />,
};

export function RelatedCalculators({ currentSlug }: RelatedCalculatorsProps) {
  const related = getRelatedCalculators(currentSlug, 6);

  return (
    <section className="my-14 pt-10 border-t border-charcoal-100">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#263238]">
            You May Also Need
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Common complementary tools used alongside this calculator for complete project estimation.
          </p>
        </div>
        <Link
          href="/"
          className="text-xs font-semibold text-terracotta hover:text-terracotta-700 flex items-center gap-1"
        >
          View all tools
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((item) => (
          <Link
            key={item.slug}
            href={`/calculators/${item.slug}`}
            className="group relative flex flex-col justify-between p-5 rounded-2xl border border-charcoal-200 bg-white hover:border-terracotta/60 hover:shadow-md hover:shadow-terracotta/5 transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2.5 rounded-xl bg-warm-50 text-terracotta group-hover:bg-terracotta-50 transition-colors">
                  {ICON_MAP[item.iconName] || <Grid className="w-5 h-5" />}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-charcoal-500 bg-warm-50 px-2 py-0.5 rounded-full border border-charcoal-100">
                  {item.category}
                </span>
              </div>
              <h3 className="text-base font-semibold text-[#263238] group-hover:text-terracotta transition-colors">
                {item.name}
              </h3>
              <p className="text-xs text-charcoal-500 mt-1.5 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-charcoal-100 flex items-center justify-between text-xs font-semibold text-terracotta">
              <span>Open calculator</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
