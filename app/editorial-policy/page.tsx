import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ClipboardCheck,
  FlaskConical,
  RefreshCw,
  AlertTriangle,
  Mail,
  Scale,
  Library,
  GitPullRequestArrow,
} from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { ORGANIZATION, SITE_URL } from '@/lib/siteIdentity';

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/editorial-policy` },
  title: 'Editorial & Methodology Policy — How We Research, Calculate and Correct',
  description:
    'How RenovationCalculator sources its formulas, which published standards each calculator is benchmarked against, how waste factors are chosen, our cost-data limitations, update cadence, and how to report an error.',
};

const SOURCES = [
  {
    trade: 'Tile, stone and mortar',
    standards: 'TCNA Handbook, ANSI A108/A118, ASTM C627, BS 5385 (UK), IS 15622 (India)',
    drives: 'Deflection limits (L/360 ceramic, L/720 stone), trowel-notch coverage rates, 10–20% pattern waste bands, minimum joint widths.',
  },
  {
    trade: 'Concrete and masonry',
    standards: 'ACI 318 & ACI 330R, ASTM C94, BS 8500 (UK), IS 456 (India)',
    drives: 'Mix designations (C20/25, M20, 1:1.5:3), 52–54% dry-volume expansion for nominal mixes, slab thickness by load, spillage contingency.',
  },
  {
    trade: 'Drywall, framing and finishing',
    standards: 'ASTM C840, GA-214, IRC R702.3, IRC Chapter 6',
    drives: 'Stud spacing at 16" and 24" on-centre, 12" screw intervals, corner and opening framing multipliers, compound coverage per finish level.',
  },
  {
    trade: 'Roofing and exterior envelope',
    standards: 'NRCA Roofing Manual, ASTM D3462, IRC Chapter 9',
    drives: 'Pitch multipliers, starter and ridge course allowances, underlayment overlap, ventilation net-free-area ratios.',
  },
  {
    trade: 'Paint and coatings',
    standards: 'Manufacturer published spread rates (Dulux, Sherwin-Williams, Asian Paints), BS 6150',
    drives: 'Coverage per litre or gallon by substrate porosity, mist-coat allowance on new plaster, coat counts over strong colours.',
  },
];

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-[#263238]">
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Editorial & Methodology Policy' },
        ]}
      />

      <header className="mb-12 pb-8 border-b border-charcoal-200">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-terracotta-700 bg-terracotta-50 border border-terracotta-200/50">
          <ClipboardCheck className="w-3.5 h-3.5" />
          <span>Editorial Standards</span>
        </span>
        <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          How We Research, Calculate and Correct
        </h1>
        <p className="mt-4 text-base sm:text-lg text-charcoal-600 leading-relaxed">
          Every figure this site produces comes from a formula somebody has to be
          accountable for. This page sets out where those formulas come from, what
          they can and cannot tell you, how often they are revisited, and how to
          get an error fixed.
        </p>
      </header>

      <div className="space-y-12 text-sm sm:text-base text-charcoal-700 leading-relaxed">
        <section>
          <h2 className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold mb-4">
            <FlaskConical className="w-5 h-5 text-terracotta" />
            <span>Where the formulas come from</span>
          </h2>
          <p>
            No calculator on this site invents a coefficient. Each one is written as a
            pure, deterministic function whose constants are traceable to a published
            trade standard, a manufacturer&apos;s own technical datasheet, or a
            documented code requirement. Where a standard gives a range rather than a
            single number — waste allowance for a herringbone tile lay, for instance —
            we take the range and state it openly on the calculator page rather than
            silently picking the middle.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border border-charcoal-200 rounded-2xl overflow-hidden">
              <thead className="bg-warm-100 font-bold">
                <tr>
                  <th className="p-3.5">Trade area</th>
                  <th className="p-3.5">Primary references</th>
                  <th className="p-3.5">What it determines</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100 bg-white align-top">
                {SOURCES.map((s) => (
                  <tr key={s.trade}>
                    <td className="p-3.5 font-semibold">{s.trade}</td>
                    <td className="p-3.5 text-charcoal-600">{s.standards}</td>
                    <td className="p-3.5 text-charcoal-600">{s.drives}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold mb-4">
            <Scale className="w-5 h-5 text-terracotta" />
            <span>Why our numbers are higher than bare geometry</span>
          </h2>
          <p>
            Multiplying length by width tells you the area of a room. It does not tell
            you how much material to buy, and estimators who stop there run short on
            site. Three things sit between the two numbers:
          </p>
          <ul className="mt-4 space-y-3 list-disc pl-5">
            <li>
              <strong>Cut geometry.</strong> A perimeter cut wastes the offcut unless
              it happens to fit the opposite wall. Diagonal and herringbone layouts
              produce two angled offcuts per tile instead of one square one, which is
              why our waste band rises from 10% to 20% across those patterns rather
              than staying flat.
            </li>
            <li>
              <strong>Unit indivisibility.</strong> Flooring is sold by the carton,
              cement by the bag, timber by the length. We round up to the purchasable
              unit, never to the nearest, because a floor that is three planks short
              is a second trip and often a second dye lot.
            </li>
            <li>
              <strong>Substrate reality.</strong> Screw spacing, deflection limits and
              mortar coverage are set by code and by the substrate, not by the finish
              area. These are counted separately rather than folded into a single
              per-square-foot figure.
            </li>
          </ul>
          <p className="mt-4">
            Each calculator shows its own working under{' '}
            <em>How this is calculated</em> so you can check the assumption rather than
            trust the output.
          </p>
        </section>

        <section className="rounded-3xl border-2 border-amber-300/70 bg-amber-50/50 p-6 sm:p-8">
          <h2 className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>What these tools are not</span>
          </h2>
          <p>
            We would rather be useful than oversold, so the limits are worth stating
            plainly:
          </p>
          <ul className="mt-4 space-y-2.5 list-disc pl-5">
            <li>
              <strong>Cost ranges are indicative, not quotes.</strong> Material and
              labour prices move with region, season, supplier and specification. Use
              our ranges to sanity-check a quote you have been given, not to replace
              one.
            </li>
            <li>
              <strong>Nothing here is a structural calculation.</strong> Span tables,
              load paths, footing design and anything carrying a structure need a
              qualified engineer. Our outputs are material quantities.
            </li>
            <li>
              <strong>Local codes override us.</strong> Building control, HOA rules and
              regional amendments vary and change. Where a figure here disagrees with
              your local authority, your local authority is correct.
            </li>
            <li>
              <strong>Measure twice.</strong> Every output is only as good as the
              dimensions entered. We cannot see your bay window, your out-of-square
              wall, or your 1930s floor that falls 40mm across the room.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold mb-4">
            <RefreshCw className="w-5 h-5 text-terracotta" />
            <span>Review and update cadence</span>
          </h2>
          <ul className="space-y-3 list-disc pl-5">
            <li>
              <strong>Cost guides are re-costed at least twice a year</strong>, and
              sooner when a material moves sharply. The publication and last-updated
              dates on every guide are real, not refreshed automatically to look
              current.
            </li>
            <li>
              <strong>Formulas are re-checked when the underlying standard is
              revised.</strong> When a referenced standard is superseded, the
              calculator is updated and the change noted on the page.
            </li>
            <li>
              <strong>Reported errors are triaged within two business days</strong> and
              corrected in place, with the guide&apos;s <code>dateModified</code>{' '}
              advanced so readers can see it changed.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold mb-4">
            <Library className="w-5 h-5 text-terracotta" />
            <span>Regional content</span>
          </h2>
          <p>
            Building practice is not universal. A UK bathroom is tiled over suspended
            timber with a decoupling mat; an Indian one is tiled onto a 30mm cement
            mortar bed; an American one is usually over a slab or ply subfloor with
            thin-set. Where we publish regional guidance, it is written against that
            market&apos;s own product sizes, purchase units and standards — 20kg
            adhesive bags and BS 5385 for the UK, 50kg cement bags and IS 456 for
            India, AS/NZS references for Australia.
          </p>
          <p className="mt-4">
            Regional variants exist to serve readers who need those conventions, not to
            multiply pages. They are deliberately excluded from search indexing so that
            the primary calculator remains the single canonical answer for a given
            tool, and you can switch region on any calculator using the region selector
            without leaving the page.
          </p>
        </section>

        <section>
          <h2 className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold mb-4">
            <GitPullRequestArrow className="w-5 h-5 text-terracotta" />
            <span>Independence and funding</span>
          </h2>
          <p>
            The site is free to use and carries no registration wall, no lead-generation
            form and no sale of contact details to contractor networks. Calculations run
            entirely in your browser; dimensions and budgets you enter are never
            transmitted to a server. Running costs are covered by display advertising,
            which is kept out of the calculator input flow and clearly labelled.
          </p>
          <p className="mt-4">
            No manufacturer, merchant or contractor pays for placement, and no
            recommendation on this site is sold. Where a specific product is named it is
            because it is the standard reference in that trade, not because of a
            commercial arrangement.
          </p>
        </section>

        <section className="rounded-3xl border border-charcoal-200 bg-warm-50 p-6 sm:p-8">
          <h2 className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold mb-3">
            <Mail className="w-5 h-5 text-terracotta" />
            <span>Found an error? Tell us</span>
          </h2>
          <p>
            Corrections are welcome and taken seriously, particularly from trades who
            work to these standards daily. If a waste factor does not match what you see
            on site, a coverage rate is off, or a local code has moved, send the detail
            and we will check it against the source.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="px-4 py-2 rounded-xl bg-terracotta text-white text-sm font-bold hover:bg-terracotta-600 transition-colors"
            >
              Report a correction →
            </Link>
            <a
              href={`mailto:${ORGANIZATION.email}`}
              className="px-4 py-2 rounded-xl bg-white border border-charcoal-200 text-sm font-semibold text-terracotta hover:border-terracotta transition-colors"
            >
              {ORGANIZATION.email}
            </a>
          </div>
        </section>

        <section className="pt-8 border-t border-charcoal-200">
          <h2 className="text-lg font-bold mb-3">Related</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/about" className="text-terracotta font-semibold hover:underline">
              About &amp; engineering standards
            </Link>
            <span className="text-charcoal-300">•</span>
            <Link href="/terms" className="text-terracotta font-semibold hover:underline">
              Terms &amp; disclaimer
            </Link>
            <span className="text-charcoal-300">•</span>
            <Link href="/privacy-policy" className="text-terracotta font-semibold hover:underline">
              Privacy &amp; cookies
            </Link>
            <span className="text-charcoal-300">•</span>
            <Link href="/guides" className="text-terracotta font-semibold hover:underline">
              All guides
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
