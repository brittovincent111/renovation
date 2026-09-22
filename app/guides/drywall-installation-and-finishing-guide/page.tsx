import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { AdSlot } from '@/components/AdSlot';
import { GuideByline } from '@/components/GuideByline';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import { getGuide } from '@/lib/guidesData';
import { SITE_URL } from '@/lib/siteIdentity';
import { ChevronRight, Calculator, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: 'https://renovationcalculator.online/guides/drywall-installation-and-finishing-guide' },
  title: 'Drywall Installation & Finishing Estimating Guide (Hanging to Level 5)',
  description:
    'Comprehensive step-by-step drywall hanging and finishing guide. Sheet selection (1/2" vs 5/8" Type X), screw layout spacing, joint taping, mudding coats, and GA-214 Level 5 finish standards.',
  openGraph: {
    title: 'Drywall Installation & Finishing Estimating Guide (Hanging to Level 5)',
    description: 'Comprehensive step-by-step drywall hanging and finishing guide. Sheet selection (1/2" vs 5/8" Type X), screw layout spacing, joint taping, mudding coats, and GA-214 Level 5 finish standards.',
    url: 'https://renovationcalculator.online/guides/drywall-installation-and-finishing-guide',
    type: 'article',
    siteName: 'RenovationCalculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drywall Installation & Finishing Estimating Guide (Hanging to Level 5)',
    description: 'Comprehensive step-by-step drywall hanging and finishing guide. Sheet selection (1/2" vs 5/8" Type X), screw layout spacing, joint taping, mudding coats, and GA-214 Level 5 finish standards.',
  },
};

export default function DrywallGuidePage() {
  // Single registry entry drives the byline, the Article schema and the sitemap,
  // so a guide's dates can no longer disagree between them.
  const guide = getGuide('drywall-installation-and-finishing-guide')!;
  const url = `${SITE_URL}/guides/drywall-installation-and-finishing-guide`;

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
          <span className="font-semibold text-[#263238]">Drywall Installation &amp; Finishing</span>
        </nav>

        {/* Header */}
        <header className="mb-10 pb-8 border-b border-charcoal-200">
          <span className="text-xs font-bold uppercase tracking-wider text-terracotta bg-terracotta-50 border border-terracotta-200/50 px-3 py-1 rounded-full">
            Carpentry &amp; Drywall Engineering
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-[#263238] leading-tight">
            Drywall Installation &amp; Finishing: From Framing to Level 5 Smooth Walls
          </h1>
          <GuideByline guide={guide} />
        </header>

        {/* Integrated Quick Tools Box */}
        <div className="my-8 p-6 rounded-3xl border border-terracotta/30 bg-warm-50">
          <h2 className="text-sm font-bold text-[#263238] mb-2 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-terracotta" />
            <span>Essential Calculators for Drywall Projects</span>
          </h2>
          <p className="text-xs text-charcoal-600 mb-4">
            Accurately calculate sheet counts, screw boxes, joint tape rolls, and compound buckets:
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/calculators/drywall-calculator"
              className="px-3 py-1.5 rounded-xl bg-white border border-charcoal-200 text-xs font-semibold text-terracotta hover:border-terracotta hover:bg-terracotta-50 shadow-xs transition-colors"
            >
              Drywall Sheet &amp; Mud Calculator →
            </Link>
            <Link
              href="/calculators/paint-calculator"
              className="px-3 py-1.5 rounded-xl bg-white border border-charcoal-200 text-xs font-semibold text-terracotta hover:border-terracotta hover:bg-terracotta-50 shadow-xs transition-colors"
            >
              PVA Primer &amp; Paint Calculator →
            </Link>
            <Link
              href="/calculators/wall-framing-calculator"
              className="px-3 py-1.5 rounded-xl bg-white border border-charcoal-200 text-xs font-semibold text-terracotta hover:border-terracotta hover:bg-terracotta-50 shadow-xs transition-colors"
            >
              Stud Framing Estimator →
            </Link>
            <Link
              href="/calculators/baseboard-calculator"
              className="px-3 py-1.5 rounded-xl bg-white border border-charcoal-200 text-xs font-semibold text-terracotta hover:border-terracotta hover:bg-terracotta-50 shadow-xs transition-colors"
            >
              Trim &amp; Baseboard Calculator →
            </Link>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm sm:text-base text-charcoal-700 leading-relaxed">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#263238] mb-3">
              Step 1: Selecting the Correct Drywall Panels
            </h2>
            <p>
              Installing gypsum board (drywall/sheetrock) requires selecting the appropriate thickness and core chemistry for each specific architectural boundary under International Residential Code (IRC) Section R702:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-warm-50 border border-charcoal-200">
                <span className="font-bold text-terracotta uppercase tracking-wider text-xs">Standard Interior</span>
                <h3 className="font-bold text-[#263238] text-base mt-1">1/2-Inch Lightweight Board</h3>
                <p className="text-charcoal-600 mt-1">Standard residential panel for living rooms, bedrooms, and hallway walls and ceilings with 16-inch on-center framing. Weight: ~1.2 to 1.4 lbs per sq ft.</p>
              </div>

              <div className="p-4 rounded-2xl bg-warm-50 border border-charcoal-200">
                <span className="font-bold text-terracotta uppercase tracking-wider text-xs">Fire Separation</span>
                <h3 className="font-bold text-[#263238] text-base mt-1">5/8-Inch Type X (Fire-Rated)</h3>
                <p className="text-charcoal-600 mt-1">Glass-fiber reinforced core providing a 1-hour fire resistance rating. Mandated on garage-to-living-space party walls, boiler rooms, and multi-family ceiling assemblies.</p>
              </div>

              <div className="p-4 rounded-2xl bg-warm-50 border border-charcoal-200">
                <span className="font-bold text-terracotta uppercase tracking-wider text-xs">Wet &amp; Damp Areas</span>
                <h3 className="font-bold text-[#263238] text-base mt-1">Greenboard / Purple Moisture-Resistant</h3>
                <p className="text-charcoal-600 mt-1">Chemically treated water-repellent gypsum core for bathrooms, kitchens, and basements. Note: Do not use behind direct shower tile wet zones; use cement backer board there instead.</p>
              </div>

              <div className="p-4 rounded-2xl bg-warm-50 border border-charcoal-200">
                <span className="font-bold text-terracotta uppercase tracking-wider text-xs">Ceiling Sag Prevention</span>
                <h3 className="font-bold text-[#263238] text-base mt-1">1/2-Inch Sag-Resistant Ceiling Board</h3>
                <p className="text-charcoal-600 mt-1">Engineered with enhanced core density to span 24-inch on-center roof trusses without sagging under heavy blown-in fiberglass or cellulose attic insulation.</p>
              </div>
            </div>
          </section>

          {/* Ad Slot Inline */}
          <AdSlot position="guide-inline" slotKey="guide-cost-inline-1" />

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#263238] mb-3">
              Step 2: Pro Hanging Strategy: Horizontal vs Vertical
            </h2>
            <p>
              Professional drywall contractors almost always hang wall sheets <strong>horizontally</strong> (perpendicular to wall studs), rather than vertically. Here is why:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-xs sm:text-sm text-charcoal-600">
              <li>
                <strong>25% Fewer Seams:</strong> In an 8-foot high room, hanging two 12-foot sheets horizontally produces one continuous horizontal joint, whereas hanging vertically produces multiple floor-to-ceiling seams.
              </li>
              <li>
                <strong>Ergonomic Taping:</strong> A horizontal seam sits at waist level (48 inches from the floor), allowing comfortable, steady taping without excessive ladder work or floor crouching.
              </li>
              <li>
                <strong>Structural Bridging:</strong> Horizontal sheets tie multiple framing studs together, reducing wall waviness and joint cracking during seasonal wood movement.
              </li>
            </ul>

            <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Never place a seam on a door or window corner.</strong> The header framing over doorways naturally shifts under settling loads. Seams positioned on door jamb corners will crack within months. Always notch sheets in an &quot;L-shape&quot; around openings so joints sit at least 8 inches away from corners.
              </span>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#263238] mb-3">
              Step 3: Fastener Spacing &amp; Depth Standards (ASTM C840)
            </h2>
            <p>
              Use 1-1/4 inch Type W coarse-thread drywall screws for standard wood framing, or Type S fine-thread self-piercing screws for light-gauge steel studs. Fastener spacing rules:
            </p>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-left text-xs sm:text-sm border border-charcoal-200 rounded-xl overflow-hidden">
                <thead className="bg-warm-100 text-[#263238] font-bold">
                  <tr>
                    <th className="p-3 border-b border-charcoal-200">Application</th>
                    <th className="p-3 border-b border-charcoal-200">Field Spacing (Interior)</th>
                    <th className="p-3 border-b border-charcoal-200">Edge Spacing (Perimeter)</th>
                    <th className="p-3 border-b border-charcoal-200">Average Screws Per 4x8 Sheet</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-charcoal-100">
                  <tr>
                    <td className="p-3 font-semibold">Ceilings (16&quot; or 24&quot; O.C.)</td>
                    <td className="p-3 font-mono">12 inches max</td>
                    <td className="p-3 font-mono">7 to 8 inches</td>
                    <td className="p-3 font-bold text-terracotta">36 – 40 screws</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Walls (16&quot; O.C.)</td>
                    <td className="p-3 font-mono">16 inches max</td>
                    <td className="p-3 font-mono">8 inches</td>
                    <td className="p-3 font-bold text-terracotta">28 – 32 screws</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-charcoal-500">
              *Tip: Set your drywall drill dimpler chuck so screw heads sit 1/32&quot; recessed below the face paper without piercing the paper skin. Pierced paper destroys 70% of the screw&apos;s holding force.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#263238] mb-3">
              Step 4: GA-214 Levels of Finish: From Level 1 to Level 5
            </h2>
            <p>
              The Gypsum Association specification GA-214 classifies five distinct levels of drywall finish. Specifying the wrong level can result in visible seam flashing under architectural lighting:
            </p>

            <div className="space-y-3 mt-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-2xl bg-white border border-charcoal-200">
                <span className="font-bold text-terracotta text-xs uppercase tracking-wider">Level 1 — Fire-Tape</span>
                <p className="text-charcoal-600 mt-1">Joint tape embedded in compound, tool marks left. Used in attics, mechanical plenums, and building service shafts not open to view.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-charcoal-200">
                <span className="font-bold text-terracotta text-xs uppercase tracking-wider">Level 2 — Substrate Prep</span>
                <p className="text-charcoal-600 mt-1">Tape embedded, screw heads wiped with one coat. Acceptable substrate behind tile or wet-area backer board where appearance is completely concealed.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-charcoal-200">
                <span className="font-bold text-terracotta text-xs uppercase tracking-wider">Level 3 — Heavy Texture Base</span>
                <p className="text-charcoal-600 mt-1">Tape embedded plus one separate finish coat over joints and screw heads. Recommended only beneath heavy knockdown texture or heavy commercial wallcoverings.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-charcoal-200">
                <span className="font-bold text-terracotta text-xs uppercase tracking-wider">Level 4 — Standard Residential Paint Grade</span>
                <p className="text-charcoal-600 mt-1">Three distinct coats (embed, fill, finish), completely feathered 10–12 inches wide, sanded smooth. The universal standard for flat, eggshell, and satin residential paint.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-warm-50 border border-terracotta/40">
                <span className="font-bold text-terracotta text-xs uppercase tracking-wider">Level 5 — Architectural Skim Coat (Premium)</span>
                <p className="text-charcoal-700 mt-1">All Level 4 steps completed, plus a thin, uniform skim coat of joint compound rolled or sprayed across the entire wall surface. Mandatory for semi-gloss or gloss paints, dark colors, and walls receiving grazing natural light from adjacent floor-to-ceiling windows.</p>
              </div>
            </div>
          </section>

          <section className="pt-6 border-t border-charcoal-200">
            <h2 className="text-xl sm:text-2xl font-bold text-[#263238] mb-3">
              Estimating Formulas for Supplies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-warm-50 border border-charcoal-200 text-center">
                <h3 className="font-bold text-[#263238]">Joint Tape</h3>
                <p className="text-terracotta font-bold text-lg mt-1 font-mono">370 ft</p>
                <p className="text-charcoal-500 mt-1">per 1,000 sq ft of sheet area</p>
              </div>
              <div className="p-4 rounded-2xl bg-warm-50 border border-charcoal-200 text-center">
                <h3 className="font-bold text-[#263238]">Joint Compound</h3>
                <p className="text-terracotta font-bold text-lg mt-1 font-mono">1.2 – 1.4 gal</p>
                <p className="text-charcoal-500 mt-1">per 100 sq ft across 3 coats</p>
              </div>
              <div className="p-4 rounded-2xl bg-warm-50 border border-charcoal-200 text-center">
                <h3 className="font-bold text-[#263238]">Drywall Screws</h3>
                <p className="text-terracotta font-bold text-lg mt-1 font-mono">5.5 lbs (1,000 count)</p>
                <p className="text-charcoal-500 mt-1">per 1,000 sq ft of sheet area</p>
              </div>
            </div>
            <p className="mt-4 text-xs sm:text-sm text-charcoal-600">
              Calculate the exact quantities for your room using our automated{' '}
              <Link href="/calculators/drywall-calculator" className="text-terracotta font-semibold hover:underline">
                Drywall Material Estimator
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
