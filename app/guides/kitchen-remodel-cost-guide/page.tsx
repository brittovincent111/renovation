import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { AdSlot } from '@/components/AdSlot';
import { GuideByline } from '@/components/GuideByline';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import { getGuide } from '@/lib/guidesData';
import { SITE_URL } from '@/lib/siteIdentity';
import { ChevronRight, Calculator, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: 'https://renovationcalculator.online/guides/kitchen-remodel-cost-guide' },
  title: 'How Much Does a Kitchen Remodel Cost in 2026? (Complete Breakdown)',
  description:
    'Comprehensive 2026 kitchen remodel cost guide. Detailed breakdown of cabinetry, quartz countertops, plumbing, electrical, flooring, and labor for minor, mid-range, and luxury projects.',
  openGraph: {
    title: 'How Much Does a Kitchen Remodel Cost in 2026? (Complete Breakdown)',
    description: 'Comprehensive 2026 kitchen remodel cost guide. Detailed breakdown of cabinetry, quartz countertops, plumbing, electrical, flooring, and labor for minor, mid-range, and luxury projects.',
    url: 'https://renovationcalculator.online/guides/kitchen-remodel-cost-guide',
    type: 'article',
    siteName: 'RenovationCalculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much Does a Kitchen Remodel Cost in 2026? (Complete Breakdown)',
    description: 'Comprehensive 2026 kitchen remodel cost guide. Detailed breakdown of cabinetry, quartz countertops, plumbing, electrical, flooring, and labor for minor, mid-range, and luxury projects.',
  },
};

export default function KitchenRemodelCostGuidePage() {
  // Single registry entry drives the byline, the Article schema and the sitemap,
  // so a guide's dates can no longer disagree between them.
  const guide = getGuide('kitchen-remodel-cost-guide')!;
  const url = `${SITE_URL}/guides/kitchen-remodel-cost-guide`;

  return (
    <article className="min-h-screen bg-white text-[#263238] pb-20">
      <ArticleJsonLd
        headline={guide.title}
        description={guide.description}
        url={url}
        datePublished={guide.datePublished}
        dateModified={guide.dateModified}
        authorId={guide.authorId}
        section={guide.category}
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Guides', path: '/guides' },
          { name: guide.title },
        ]}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-charcoal-400">
          <Link href="/" className="hover:text-terracotta">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/guides" className="hover:text-terracotta">Guides</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-[#263238]">Kitchen Remodel Cost</span>
        </nav>

        {/* Header */}
        <header className="mb-10 pb-8 border-b border-charcoal-200">
          <span className="text-xs font-bold uppercase tracking-wider text-terracotta bg-terracotta-50 border border-terracotta-200/50 px-3 py-1 rounded-full">
            Cost &amp; Budgeting Guide
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-[#263238] leading-tight">
            How Much Does a Kitchen Remodel Cost in 2026? (Complete Breakdown)
          </h1>
          <GuideByline guide={guide} />
        </header>

        {/* Integrated Quick Tools Box */}
        <div className="my-8 p-6 rounded-3xl border border-terracotta/30 bg-warm-50">
          <h2 className="text-sm font-bold text-[#263238] mb-2 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-terracotta" />
            <span>Interactive Estimators for Kitchen Projects</span>
          </h2>
          <p className="text-xs text-charcoal-600 mb-4">
            Model materials, waste buffers, and total costs simultaneously using our free tools:
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/projects/kitchen-renovation-cost"
              className="px-3 py-1.5 rounded-xl bg-white border border-charcoal-200 text-xs font-semibold text-terracotta hover:border-terracotta hover:bg-terracotta-50 shadow-xs transition-colors"
            >
              Kitchen Project Combo BOM →
            </Link>
            <Link
              href="/calculators/tile-calculator"
              className="px-3 py-1.5 rounded-xl bg-white border border-charcoal-200 text-xs font-semibold text-terracotta hover:border-terracotta hover:bg-terracotta-50 shadow-xs transition-colors"
            >
              Backsplash Tile Calculator →
            </Link>
            <Link
              href="/calculators/paint-calculator"
              className="px-3 py-1.5 rounded-xl bg-white border border-charcoal-200 text-xs font-semibold text-terracotta hover:border-terracotta hover:bg-terracotta-50 shadow-xs transition-colors"
            >
              Cabinet &amp; Wall Paint Calculator →
            </Link>
            <Link
              href="/calculators/flooring-calculator"
              className="px-3 py-1.5 rounded-xl bg-white border border-charcoal-200 text-xs font-semibold text-terracotta hover:border-terracotta hover:bg-terracotta-50 shadow-xs transition-colors"
            >
              Kitchen Flooring Estimator →
            </Link>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm sm:text-base text-charcoal-700 leading-relaxed">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#263238] mb-3">
              Overview: Average Kitchen Remodeling Tiers
            </h2>
            <p>
              A full kitchen renovation is historically one of the most rewarding home improvement investments, recovering between <strong>65% and 82%</strong> of its cost at resale. In 2026, the national average spend across all residential kitchen renovations is <strong>$28,500</strong>, but project scale drives dramatic differences in overall expenditure.
            </p>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse rounded-2xl overflow-hidden border border-charcoal-200">
                <thead className="bg-warm-100 text-[#263238] font-bold">
                  <tr>
                    <th className="p-3.5 border-b border-charcoal-200">Remodel Tier</th>
                    <th className="p-3.5 border-b border-charcoal-200">Typical Budget Range</th>
                    <th className="p-3.5 border-b border-charcoal-200">Scope of Work Included</th>
                    <th className="p-3.5 border-b border-charcoal-200">Labor Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-100 bg-white">
                  <tr>
                    <td className="p-3.5 font-bold text-terracotta">Minor / Cosmetic</td>
                    <td className="p-3.5 font-mono">$12,000 – $22,000</td>
                    <td className="p-3.5">Cabinet refacing or repainting, butcher-block or entry-level quartz countertops, tile backsplash, hardware replacement, retaining existing layout.</td>
                    <td className="p-3.5 font-medium">15% – 25% (High DIY potential)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-terracotta">Mid-Range Overhaul</td>
                    <td className="p-3.5 font-mono">$28,000 – $58,000</td>
                    <td className="p-3.5">Semi-custom shaker cabinets, engineered quartz counters, undermount sink, new energy-star appliances, luxury vinyl plank or porcelain floor, updated lighting circuits.</td>
                    <td className="p-3.5 font-medium">30% – 40% (Trade subcontractors)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-terracotta">High-End Custom</td>
                    <td className="p-3.5 font-mono">$75,000 – $135,000+</td>
                    <td className="p-3.5">Custom solid wood cabinetry, commercial-grade ranges, natural quartzite slabs, structural wall removal, plumbing relocation, integrated architectural lighting.</td>
                    <td className="p-3.5 font-medium">40% – 50% (General contractor managed)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Ad Slot Inline */}
          <AdSlot position="guide-inline" slotKey="guide-cost-inline-1" />

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#263238] mb-3">
              Where the Budget Goes: Percentage Breakdown
            </h2>
            <p>
              According to the National Kitchen and Bath Association (NKBA), kitchen renovation budgets follow a reliable distribution pattern. Understanding these ratios prevents homeowners from overspending on appliances while exhausting the funds needed for fundamental carpentry and electrical infrastructure:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-warm-50 border border-charcoal-200">
                <span className="font-bold text-terracotta text-lg">29% – 32%</span>
                <h3 className="font-bold text-[#263238] mt-1">Cabinetry &amp; Hardware</h3>
                <p className="text-charcoal-600 mt-1">The single largest line item. Includes stock RTA (Ready-to-Assemble), semi-custom plywood boxes, soft-close drawer slides, and architectural pulls.</p>
              </div>

              <div className="p-4 rounded-2xl bg-warm-50 border border-charcoal-200">
                <span className="font-bold text-terracotta text-lg">18% – 22%</span>
                <h3 className="font-bold text-[#263238] mt-1">Installation &amp; Carpentry Labor</h3>
                <p className="text-charcoal-600 mt-1">Rough framing, cabinet leveling, finish trim, window modifications, and demo. Skilled trades charge $45 to $110 per hour depending on region.</p>
              </div>

              <div className="p-4 rounded-2xl bg-warm-50 border border-charcoal-200">
                <span className="font-bold text-terracotta text-lg">12% – 15%</span>
                <h3 className="font-bold text-[#263238] mt-1">Countertops &amp; Fabrication</h3>
                <p className="text-charcoal-600 mt-1">Quartz, granite, marble, or quartzite slabs. Includes digital laser templating, edge profile routing, sink cutouts, and installation.</p>
              </div>

              <div className="p-4 rounded-2xl bg-warm-50 border border-charcoal-200">
                <span className="font-bold text-terracotta text-lg">12% – 14%</span>
                <h3 className="font-bold text-[#263238] mt-1">Appliances &amp; Ventilation</h3>
                <p className="text-charcoal-600 mt-1">Refrigerator, induction or gas range, dishwasher, microwave drawer, and ducted range hood with exterior damper venting.</p>
              </div>

              <div className="p-4 rounded-2xl bg-warm-50 border border-charcoal-200">
                <span className="font-bold text-terracotta text-lg">9% – 11%</span>
                <h3 className="font-bold text-[#263238] mt-1">Rough Plumbing &amp; Electrical</h3>
                <p className="text-charcoal-600 mt-1">Dedicated 20-amp small appliance branch circuits (NEC requirement), AFCI/GFCI breakers, PEX water lines, disposal wiring, and drain traps.</p>
              </div>

              <div className="p-4 rounded-2xl bg-warm-50 border border-charcoal-200">
                <span className="font-bold text-terracotta text-lg">8% – 10%</span>
                <h3 className="font-bold text-[#263238] mt-1">Flooring, Backsplash &amp; Paint</h3>
                <p className="text-charcoal-600 mt-1">Underlayment, tile mortar, grout, porcelain tiles or luxury vinyl plank, wall primer, and washable scrubbable satin/eggshell paint.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#263238] mb-3">
              Four Hidden Costs That Surprise Homeowners
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl border border-charcoal-200 bg-white">
                <h3 className="font-bold text-[#263238]">1. Subfloor Deflection &amp; Leveling Compound</h3>
                <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                  Older subfloors frequently exhibit dips and crowns. If installing large-format tile or engineered quartz counters, unlevel cabinetry will stress seams. Self-leveling underlayment and plywood sistering can add $600–$1,800 in prep materials.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-charcoal-200 bg-white">
                <h3 className="font-bold text-[#263238]">2. Electrical Panel Upgrades</h3>
                <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                  Modern induction ranges and speed ovens require dedicated 40-amp or 50-amp 240V circuits. If your main panel is a legacy 100-amp service, upgrading to 200 amps typically costs between $1,800 and $3,500.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-charcoal-200 bg-white">
                <h3 className="font-bold text-[#263238]">3. Relocating Plumbing Stacks &amp; Drains</h3>
                <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                  Moving a kitchen sink across the room or into an island requires coring joists, running new vent stacks, and maintaining proper 1/4&quot; per foot drainage slope. Moving wet walls adds $1,500–$4,000 to labor charges.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-charcoal-200 bg-white">
                <h3 className="font-bold text-[#263238]">4. Material Waste Contingency Buffer</h3>
                <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                  Never order exact square footage. Backsplash herringbone layouts require a 15%–20% cut-waste buffer; flooring requires 10%; countertop fabricators need slab margins for seam grain matching.
                </p>
              </div>
            </div>
          </section>

          <section className="pt-6 border-t border-charcoal-200">
            <h2 className="text-xl sm:text-2xl font-bold text-[#263238] mb-3">
              How to Save 20% to 35% on Your Kitchen Remodel
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-charcoal-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Preserve the Footprint:</strong> Keeping sink, range, and refrigerator locations unchanged eliminates expensive plumbing and ducting reroutes.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>DIY Demolition:</strong> Safely tearing out old cabinets, tile backsplashes, and laminate floors saves $1,000–$2,500 in contractor demo labor fees.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Assemble RTA Cabinets:</strong> Flat-pack ready-to-assemble all-plywood shaker cabinets deliver custom strength at 40% of the cost of pre-built showroom boxes.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Pre-Calculate Materials:</strong> Use our dedicated <Link href="/projects/kitchen-renovation-cost" className="text-terracotta font-semibold hover:underline">Kitchen Project Estimator</Link> to buy precise quantities and avoid non-returnable surplus supplies.</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}
