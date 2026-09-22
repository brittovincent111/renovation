import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { AdSlot } from '@/components/AdSlot';
import { GuideByline } from '@/components/GuideByline';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import { getGuide } from '@/lib/guidesData';
import { SITE_URL } from '@/lib/siteIdentity';
import { ChevronRight, Calculator, CheckCircle2, AlertTriangle, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: 'https://renovationcalculator.online/guides/how-to-tile-a-bathroom-floor' },
  title: 'How to Tile a Bathroom Floor (Step-by-Step DIY Guide)',
  description:
    'Complete step-by-step guide to tiling a bathroom floor. Subfloor preparation, cement backer board, waterproofing membrane, thinset mortar selection, tile laying, and stain-resistant grouting.',
  openGraph: {
    title: 'How to Tile a Bathroom Floor (Step-by-Step DIY Guide)',
    description: 'Complete step-by-step guide to tiling a bathroom floor. Subfloor preparation, cement backer board, waterproofing membrane, thinset mortar selection, tile laying, and stain-resistant grouting.',
    url: 'https://renovationcalculator.online/guides/how-to-tile-a-bathroom-floor',
    type: 'article',
    siteName: 'RenovationCalculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Tile a Bathroom Floor (Step-by-Step DIY Guide)',
    description: 'Complete step-by-step guide to tiling a bathroom floor. Subfloor preparation, cement backer board, waterproofing membrane, thinset mortar selection, tile laying, and stain-resistant grouting.',
  },
};

export default function TileBathroomFloorGuide() {
  // Single registry entry drives the byline, the Article schema and the sitemap,
  // so a guide's dates can no longer disagree between them.
  const guide = getGuide('how-to-tile-a-bathroom-floor')!;
  const url = `${SITE_URL}/guides/how-to-tile-a-bathroom-floor`;

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
          <span className="font-semibold text-[#263238]">Tiling a Bathroom Floor</span>
        </nav>

        {/* Title & Metadata */}
        <header className="mb-10 pb-8 border-b border-charcoal-200">
          <span className="text-xs font-bold uppercase tracking-wider text-terracotta bg-terracotta-50 border border-terracotta-200/50 px-3 py-1 rounded-full">
            Technical DIY Guide
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-[#263238] leading-tight">
            How to Tile a Bathroom Floor: The Professional Step-by-Step Method
          </h1>
          <GuideByline guide={guide} />
        </header>

        {/* Integrated Quick Tools Box */}
        <div className="my-8 p-6 rounded-3xl border border-terracotta/30 bg-warm-50">
          <h2 className="text-sm font-bold text-[#263238] mb-2 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-terracotta" />
            <span>Essential Calculators for This Project</span>
          </h2>
          <p className="text-xs text-charcoal-600 mb-4">
            Before purchasing your tile, calculate your exact material and waste requirements:
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/calculators/tile-calculator"
              className="px-3 py-1.5 rounded-xl bg-white border border-charcoal-200 text-xs font-semibold text-terracotta hover:border-terracotta hover:bg-terracotta-50 shadow-xs transition-colors"
            >
              Tile Calculator →
            </Link>
            <Link
              href="/calculators/grout-calculator"
              className="px-3 py-1.5 rounded-xl bg-white border border-charcoal-200 text-xs font-semibold text-terracotta hover:border-terracotta hover:bg-terracotta-50 shadow-xs transition-colors"
            >
              Grout Calculator →
            </Link>
            <Link
              href="/calculators/tile-mortar-calculator"
              className="px-3 py-1.5 rounded-xl bg-white border border-charcoal-200 text-xs font-semibold text-terracotta hover:border-terracotta hover:bg-terracotta-50 shadow-xs transition-colors"
            >
              Thinset Mortar Calculator →
            </Link>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm sm:text-base text-charcoal-700 leading-relaxed">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#263238] mb-3">
              Step 1: Inspect and Prepare the Subfloor (L/360 Deflection)
            </h2>
            <p>
              The number one reason bathroom floor tiles crack or grout joints crumble within 18 months is subfloor deflection. Ceramic and porcelain tile have zero tensile flexibility; if your floor joists flex under foot traffic, the tile assembly will fail.
            </p>
            <p className="mt-3">
              Under Tile Council of North America (TCNA) standards, the subfloor must meet a minimum deflection rating of <strong>L/360</strong> for ceramic/porcelain tile, and <strong>L/720</strong> for natural stone (marble, travertine, granite).
            </p>
            <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Never tile directly over standard plywood or OSB subfloor.</strong> Wood expands and contracts with humidity swings, which breaks the bond between thinset mortar and wood fiber. Always install an uncoupling membrane (such as Schluter-DITRA) or 1/2&quot; cement backer board.
              </span>
            </div>
          </section>

          {/* Ad Slot Inline */}
          <AdSlot position="guide-inline" slotKey="guide-tile-inline-1" />

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#263238] mb-3">
              Step 2: Installing the Uncoupling Membrane or Backer Board
            </h2>
            <p>
              Modern tile installations favor dimpled polyethylene uncoupling membranes over heavy cement board. Uncoupling membranes neutralize shear stresses between the subfloor and tile while providing a 100% waterproof vapor barrier:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs sm:text-sm">
              <li>Spread modified thinset mortar over the plywood subfloor using a 1/4&quot; × 3/16&quot; V-notch trowel.</li>
              <li>Embed the membrane fleece side down, pressing firmly with a wooden float or roller to collapse the mortar ridges.</li>
              <li>Seal all membrane butt seams with waterproof sealing band (Kerdi-Band) to create a continuous watertight pan.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#263238] mb-3">
              Step 3: Dry-Laying and Finding the Room Center
            </h2>
            <p>
              Never start tiling from a corner. Walls in older bathrooms are rarely square. If you start tiling against an uneven baseboard, by the time you reach the opposite wall, cuts will be noticeably skewed:
            </p>
            <ol className="list-decimal pl-5 mt-2 space-y-1.5 text-xs sm:text-sm">
              <li>Measure the length and width of the room and snap two perpendicular chalk lines through the center point.</li>
              <li>Dry lay full tiles along both axes with tile spacers in place.</li>
              <li>Check your perimeter cuts. If your layout leaves slivers of tile narrower than 2 inches against the wall or vanity, shift your center line by half a tile to balance both sides.</li>
            </ol>
          </section>

          {/* Natural Content Break: Dry layout completed -> Transitioning to wet mortar application */}
          <AdSlot position="guide-inline" slotKey="guide-tile-inline-2" />

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#263238] mb-3">
              Step 4: Mortar Mixing and Troweling
            </h2>
            <p>
              Choose the correct trowel notch based on your tile dimensions:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs sm:text-sm">
              <li><strong>Tiles up to 8&quot;×8&quot;:</strong> 1/4&quot; × 1/4&quot; square notch trowel.</li>
              <li><strong>Tiles 8&quot;×8&quot; to 15&quot;×15&quot;:</strong> 1/4&quot; × 3/8&quot; square notch trowel.</li>
              <li><strong>Large-Format Tiles (12&quot;×24&quot; or larger):</strong> 1/2&quot; × 1/2&quot; square notch trowel plus flat-side back-buttering.</li>
            </ul>
            <p className="mt-3">
              Comb the mortar ridges in straight parallel lines (never swirls). Combing in straight lines allows trapped air to escape when you set and slide the tile down, achieving 85%+ mortar coverage.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#263238] mb-3">
              Step 5: Grouting and Caulking Expansion Joints
            </h2>
            <p>
              Allow the thinset mortar to cure for 24 hours before walking on tiles or grouting.
            </p>
            <p className="mt-3">
              Hold a rubber grout float at a 45-degree angle to the joints and force the grout firmly into the crevices. Wipe diagonally across the tiles with a damp, wrung-out sponge after 15-20 minutes when the grout feels thumbprint-hard.
            </p>
            <p className="mt-3">
              <strong>Crucial Detail:</strong> Never grout the corner where the floor tile meets the baseboard or bathtub. This plane transition requires 100% color-matched silicone caulk to accommodate movement without cracking.
            </p>
          </section>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 pt-8 border-t border-charcoal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-charcoal-400">Ready to calculate your bathroom materials?</p>
            <p className="text-base font-bold text-[#263238]">Use our Bathroom Renovation Project Combo</p>
          </div>
          <Link
            href="/projects/bathroom-renovation-cost"
            className="px-5 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-600 text-white text-xs font-bold shadow-xs transition-colors text-center cursor-pointer"
          >
            Open Bathroom Combo →
          </Link>
        </div>
      </div>
    </article>
  );
}
