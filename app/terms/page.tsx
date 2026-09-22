import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: 'https://renovationcalculator.online/terms' },
  title: 'Terms of Service & Construction Estimating Disclaimer',
  description:
    'Terms of service, building code compliance notice, and construction material estimation disclaimers for RenovationCalculator users.',
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-[#263238]">
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-charcoal-200">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-terracotta-700 bg-terracotta-50 border border-terracotta-200/50 mb-3">
          Legal Agreement & Disclaimers
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#263238]">
          Terms of Service &amp; Estimation Disclaimer
        </h1>
        <p className="mt-2 text-sm text-charcoal-500">
          Last revised: September 2026 • RenovationCalculator Suite
        </p>
      </div>

      {/* Prominent Building Code Alert */}
      <div className="mb-10 p-6 rounded-3xl border border-amber-200 bg-amber-50/60 flex items-start gap-4 text-xs sm:text-sm text-amber-950 leading-relaxed">
        <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h2 className="font-bold text-sm sm:text-base text-amber-900 mb-1">
            Important Notice for Homeowners, DIY Builders, and Trade Contractors
          </h2>
          <p>
            All calculations, formulas, coverage multipliers, and cost estimates provided by RenovationCalculator are mathematical approximations intended strictly for preliminary planning, comparative analysis, and material budgeting. They do not constitute formal engineering advice, architectural blueprints, or certified structural calculations.
          </p>
        </div>
      </div>

      <div className="prose prose-slate max-w-none text-sm text-charcoal-700 leading-relaxed space-y-8">
        {/* Section 1 */}
        <section>
          <h2 className="text-xl font-bold text-[#263238] mb-3">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing, browsing, or using RenovationCalculator (accessible at{' '}
            <Link href="/" className="text-terracotta font-semibold hover:underline">
              https://renovationcalculator.online
            </Link>
            ), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, along with our{' '}
            <Link href="/privacy-policy" className="text-terracotta font-semibold hover:underline">
              Privacy Policy
            </Link>
            . If you do not agree with any part of these terms, you must discontinue use of the site immediately.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-xl font-bold text-[#263238] mb-3">
            2. Construction Estimation Disclaimer &amp; Waste Variance
          </h2>
          <p>
            Construction and remodeling projects inherently involve physical variances. While our algorithms reflect industry standards (including ASTM standards, Tile Council of North America specifications, and the International Residential Code), actual material requirements and labor costs will vary based on:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-1.5 text-charcoal-600">
            <li>Substrate irregularities, wall out-of-plumb deviations, and unlevel floor deflection.</li>
            <li>Installer cutting technique, complex tile patterns (such as herringbone or 45° diagonal layouts), and room alcove geometries.</li>
            <li>Manufacturer caliber tolerances, nominal packaging variations, and batch dye-lot discrepancies.</li>
            <li>Regional pricing fluctuations, local sales taxes, shipping surcharges, and minimum contractor dispatch fees.</li>
          </ul>
          <p className="mt-3">
            Users are strongly advised to physically verify all dimensions on site, order recommended contingency waste buffers, and consult with certified trade professionals or material suppliers before placing irrevocable purchase orders.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-xl font-bold text-[#263238] mb-3">
            3. Safety, Permitting &amp; Code Compliance
          </h2>
          <p>
            RenovationCalculator does not verify whether your project conforms to local zoning laws, municipal building permits, structural load requirements, or regional safety codes (such as National Electrical Code [NEC], International Building Code [IBC], or local seismic regulations).
          </p>
          <p className="mt-2">
            You are solely responsible for obtaining any necessary municipal building permits, arranging code inspections, and ensuring that all structural framing, load-bearing modifications, electrical wiring, and gas or plumbing alterations are executed in accordance with local laws by qualified, licensed, and insured professionals.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-xl font-bold text-[#263238] mb-3">
            4. 100% Client-Side Processing &amp; Intellectual Property
          </h2>
          <p>
            All calculator mathematical scripts and interface engines are executed directly in your browser client-side. The proprietary algorithms, responsive interface design, written guide tutorials, graphics, and compilation of calculators are the intellectual property of RenovationCalculator and protected by international copyright laws.
          </p>
          <p className="mt-2">
            You may use the calculators freely for personal, educational, and professional estimating purposes. Automated scraping, bulk extraction of algorithms, or unauthorized mirroring of our tools for commercial re-distribution without written permission is strictly prohibited.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-xl font-bold text-[#263238] mb-3">
            5. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by applicable law, RenovationCalculator and its operators, contributors, and authors shall not be liable for any direct, indirect, incidental, consequential, special, or exemplary damages resulting from:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-1.5 text-charcoal-600">
            <li>Material shortages or excess material purchases resulting from estimates generated by our tools.</li>
            <li>Structural failures, physical injuries, or property damage sustained during DIY construction or renovation activities.</li>
            <li>Cost overruns, contractor dispute settlements, or construction scheduling delays.</li>
            <li>Any inaccuracies, typos, or omissions within our written installation guides or calculation formulas.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-xl font-bold text-[#263238] mb-3">
            6. Advertising &amp; Third-Party Links
          </h2>
          <p>
            RenovationCalculator displays contextually relevant advertising via Google AdSense and may provide references to external trade publications or third-party resources. We do not endorse, guarantee, or assume responsibility for products, materials, or services advertised by third-party sponsors or linked websites.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-xl font-bold text-[#263238] mb-3">
            7. Updates &amp; Inquiries
          </h2>
          <p>
            We periodically update our formulas, building standard references, and terms. Continued use of the platform constitutes acceptance of revised terms.
          </p>
          <p className="mt-2">
            For legal inquiries, formula review suggestions, or technical questions, contact our editorial team at{' '}
            <a href="mailto:support@renovationcalculator.online" className="text-terracotta font-semibold hover:underline">
              support@renovationcalculator.online
            </a>{' '}
            or visit our{' '}
            <Link href="/contact" className="text-terracotta font-semibold hover:underline">
              Contact Page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
