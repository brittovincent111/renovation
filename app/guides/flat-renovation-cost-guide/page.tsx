import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { AdSlot } from '@/components/AdSlot';
import { GuideByline } from '@/components/GuideByline';
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from '@/components/JsonLd';
import { getGuide } from '@/lib/guidesData';
import { SITE_URL } from '@/lib/siteIdentity';
import { ChevronRight, Calculator, CheckCircle2, IndianRupee, Layers, Home, Sparkles, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: 'https://renovationcalculator.online/guides/flat-renovation-cost-guide' },
  title: 'Flat Renovation Cost: 1BHK, 2BHK & 3BHK Cost Per Sq Ft Guide (2026)',
  description:
    'Complete guide to flat renovation costs in 2026. Detailed 1BHK, 2BHK, and 3BHK renovation costs per square foot in India, modular kitchen prices, bathroom renovation costs, and false ceiling rates.',
  keywords: [
    'flat renovation cost',
    '2bhk renovation cost',
    'kitchen renovation cost india',
    'bathroom renovation cost india',
    'renovation costs per square foot',
    'house renovation cost calculator',
    'false ceiling cost calculator',
    'house painting cost calculator',
    'home renovation loan calculator',
  ],
  openGraph: {
    title: 'Flat Renovation Cost: 1BHK, 2BHK & 3BHK Cost Per Sq Ft Guide (2026)',
    description: 'Complete guide to flat renovation costs in 2026. Detailed 1BHK, 2BHK, and 3BHK renovation costs per square foot in India, modular kitchen prices, bathroom renovation costs, and false ceiling rates.',
    url: 'https://renovationcalculator.online/guides/flat-renovation-cost-guide',
    type: 'article',
    siteName: 'RenovationCalculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flat Renovation Cost: 1BHK, 2BHK & 3BHK Cost Per Sq Ft Guide (2026)',
    description: 'Complete guide to flat renovation costs in 2026. Detailed 1BHK, 2BHK, and 3BHK renovation costs per square foot in India, modular kitchen prices, bathroom renovation costs, and false ceiling rates.',
  },
};

const FAQ_DATA = [
  {
    question: 'How much does a 2BHK flat renovation cost in India?',
    answer:
      'In 2026, a standard 2BHK flat renovation in India (800 to 1,000 sq ft) typically costs between ₹5.5 Lakh and ₹10.5 Lakh. A basic refresh (painting, minor civil touch-ups, budget modular kitchen) costs ₹3.5 Lakh to ₹5 Lakh, while a complete turn-key remodel with premium modular woodwork, false ceiling, vitrified flooring, and two luxury bathrooms costs ₹11 Lakh to ₹18 Lakh.',
  },
  {
    question: 'What is the average flat renovation cost per square foot in India?',
    answer:
      'Renovation costs per square foot in India range from ₹700 to ₹1,100 for basic/budget remodels, ₹1,200 to ₹2,000 for standard semi-custom finishes, and ₹2,200 to ₹3,500+ for luxury architect-designed interiors. Metro cities like Mumbai, Bangalore, Delhi NCR, and Hyderabad typically run 15% to 25% higher due to labor and logistics.',
  },
  {
    question: 'How much does modular kitchen renovation cost in India?',
    answer:
      'A modular kitchen renovation costs ₹1.2 Lakh to ₹2.5 Lakh for standard BWP marine plywood with laminate shutters and basic wire baskets. Premium acrylic or PU lacquer kitchens with soft-close tandem boxes (Hettich/Hafele), quartz countertops, and built-in chimney/hob range from ₹2.8 Lakh to ₹5.5 Lakh.',
  },
  {
    question: 'How much does a bathroom renovation cost in India?',
    answer:
      'Renovating an apartment bathroom in India costs between ₹45,000 and ₹95,000 per bathroom for standard sanitaryware (Jaquar, Hindware), anti-skid ceramic tiles, and surface waterproofing. A complete overhaul with concealed wall-hung WC cisterns, diverters, Grohe/Kohler brassware, multi-coat polymer waterproofing, and large-format vitrified wall tiles ranges from ₹1.1 Lakh to ₹2.2 Lakh per bathroom.',
  },
  {
    question: 'How long does a 2BHK flat renovation take in India?',
    answer:
      'A full 2BHK renovation typically takes 45 to 75 working days. Modular carpentry and false ceiling work consume 3 to 4 weeks, wet civil and bathroom waterproofing takes 2 weeks, and final painting, electrical fixtures, and deep cleaning require 1 to 2 weeks.',
  },
];

export default function FlatRenovationCostGuidePage() {
  // Was two hand-written schema literals with dates that had to be kept in sync
  // by hand; now driven by the same registry entry as the byline and sitemap.
  const guide = getGuide('flat-renovation-cost-guide')!;
  const url = `${SITE_URL}/guides/flat-renovation-cost-guide`;

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
      <FaqJsonLd faqs={FAQ_DATA} />
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
          <span className="font-semibold text-[#263238]">Flat Renovation Cost</span>
        </nav>

        {/* Title */}
        <header className="mb-10 pb-8 border-b border-charcoal-200">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-terracotta bg-terracotta-50 border border-terracotta-200/60 px-3 py-1 rounded-full mb-3">
            <IndianRupee className="w-3.5 h-3.5" />
            <span>2026 India Renovation Benchmark</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#263238] leading-tight">
            Flat Renovation Cost: 1BHK, 2BHK & 3BHK Cost Per Sq Ft Guide
          </h1>
          <GuideByline guide={guide} />
        </header>

        {/* Quick Tools Box */}
        <div className="my-8 p-6 rounded-3xl border border-terracotta/30 bg-warm-50 shadow-xs">
          <h2 className="text-sm font-bold text-[#263238] mb-2 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-terracotta" />
            <span>Instant Interactive Calculators for Your Apartment</span>
          </h2>
          <p className="text-xs text-charcoal-600 mb-4">
            Plan budgets, itemize materials, and calculate financing payments using our dedicated calculators:
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/projects/house-renovation-cost"
              className="px-3 py-1.5 rounded-xl bg-white border border-charcoal-200 text-xs font-semibold text-terracotta hover:border-terracotta hover:bg-terracotta-50 shadow-xs transition-colors"
            >
              Whole House / Flat Estimator →
            </Link>
            <Link
              href="/calculators/false-ceiling-calculator/india"
              className="px-3 py-1.5 rounded-xl bg-white border border-charcoal-200 text-xs font-semibold text-terracotta hover:border-terracotta hover:bg-terracotta-50 shadow-xs transition-colors"
            >
              False Ceiling Calculator (India) →
            </Link>
            <Link
              href="/calculators/home-renovation-loan-calculator"
              className="px-3 py-1.5 rounded-xl bg-white border border-charcoal-200 text-xs font-semibold text-terracotta hover:border-terracotta hover:bg-terracotta-50 shadow-xs transition-colors"
            >
              Renovation Loan & EMI Calculator →
            </Link>
            <Link
              href="/projects/kitchen-renovation-cost"
              className="px-3 py-1.5 rounded-xl bg-white border border-charcoal-200 text-xs font-semibold text-terracotta hover:border-terracotta hover:bg-terracotta-50 shadow-xs transition-colors"
            >
              Kitchen Remodel Combo →
            </Link>
            <Link
              href="/projects/bathroom-renovation-cost"
              className="px-3 py-1.5 rounded-xl bg-white border border-charcoal-200 text-xs font-semibold text-terracotta hover:border-terracotta hover:bg-terracotta-50 shadow-xs transition-colors"
            >
              Bathroom Remodel Combo →
            </Link>
            <Link
              href="/calculators/paint-calculator/india"
              className="px-3 py-1.5 rounded-xl bg-white border border-charcoal-200 text-xs font-semibold text-terracotta hover:border-terracotta hover:bg-terracotta-50 shadow-xs transition-colors"
            >
              Painting Calculator (India) →
            </Link>
            <Link
              href="/calculators/tile-calculator/india"
              className="px-3 py-1.5 rounded-xl bg-white border border-charcoal-200 text-xs font-semibold text-terracotta hover:border-terracotta hover:bg-terracotta-50 shadow-xs transition-colors"
            >
              Tile Installation Calculator (India) →
            </Link>
          </div>
        </div>

        {/* Article Body */}
        <div className="space-y-10 text-sm sm:text-base text-charcoal-700 leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#263238] mb-3">
              Renovation Costs Per Square Foot in India
            </h2>
            <p>
              When planning an apartment or flat renovation, estimating by <strong>renovation costs per square foot</strong> is the standard rule of thumb used by civil contractors, interior designers, and architects across Indian metros (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, and Pune).
            </p>
            <p className="mt-3">
              Depending on whether you choose standard modular factory fittings or premium custom veneer woodwork and Italian marble, renovation costs fall into three clear quality tiers:
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl border border-charcoal-200 bg-white shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500">Economy / Refresh</span>
                <p className="text-2xl font-black text-[#263238] mt-1">₹700 – ₹1,100 <span className="text-xs font-normal text-charcoal-500">/ sq ft</span></p>
                <p className="text-xs text-charcoal-600 mt-2">
                  Pre-laminated particle board, surface repainting with tractor emulsion, basic vitrified 2×2 floor overlay, existing sanitaryware retention.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-terracotta/40 bg-warm-50 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-terracotta">Standard / Semi-Custom</span>
                <p className="text-2xl font-black text-[#263238] mt-1">₹1,200 – ₹2,000 <span className="text-xs font-normal text-charcoal-500">/ sq ft</span></p>
                <p className="text-xs text-charcoal-600 mt-2">
                  BWR marine ply with 1mm laminate, Gypsum false ceiling with cove LED, new vitrified tiles (4×2 ft), Jaquar fittings, Asian Paints Royale.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-charcoal-200 bg-white shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500">Luxury / Turnkey</span>
                <p className="text-2xl font-black text-[#263238] mt-1">₹2,200 – ₹3,500+ <span className="text-xs font-normal text-charcoal-500">/ sq ft</span></p>
                <p className="text-xs text-charcoal-600 mt-2">
                  Acrylic/PU kitchen, Italian composite marble or wooden flooring, concealed Kohler/Grohe diverters, multi-zone smart automation, veneer panelling.
                </p>
              </div>
            </div>

            {/* Flat Size Comparison Table */}
            <div className="mt-8 overflow-x-auto rounded-2xl border border-charcoal-200">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-charcoal-50 border-b border-charcoal-200 text-[#263238] font-bold">
                  <tr>
                    <th className="p-3 sm:p-4">Apartment Type</th>
                    <th className="p-3 sm:p-4">Carpet Area</th>
                    <th className="p-3 sm:p-4">Economy (₹700–₹1.1K)</th>
                    <th className="p-3 sm:p-4">Standard (₹1.2K–₹2K)</th>
                    <th className="p-3 sm:p-4">Premium (₹2.2K–₹3.5K)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-200">
                  <tr className="hover:bg-warm-50/50">
                    <td className="p-3 sm:p-4 font-semibold text-[#263238]">1 BHK Flat</td>
                    <td className="p-3 sm:p-4 text-charcoal-600">400 – 550 sq ft</td>
                    <td className="p-3 sm:p-4">₹2.8 – ₹4.8 Lakh</td>
                    <td className="p-3 sm:p-4 font-medium text-terracotta">₹5.0 – ₹8.5 Lakh</td>
                    <td className="p-3 sm:p-4">₹9.0 – ₹15.0 Lakh</td>
                  </tr>
                  <tr className="hover:bg-warm-50/50 bg-warm-50/30">
                    <td className="p-3 sm:p-4 font-bold text-[#263238]">2 BHK Flat</td>
                    <td className="p-3 sm:p-4 text-charcoal-600">800 – 1,050 sq ft</td>
                    <td className="p-3 sm:p-4">₹5.6 – ₹9.0 Lakh</td>
                    <td className="p-3 sm:p-4 font-bold text-terracotta">₹10.0 – ₹16.5 Lakh</td>
                    <td className="p-3 sm:p-4">₹18.0 – ₹28.0 Lakh</td>
                  </tr>
                  <tr className="hover:bg-warm-50/50">
                    <td className="p-3 sm:p-4 font-semibold text-[#263238]">3 BHK Flat</td>
                    <td className="p-3 sm:p-4 text-charcoal-600">1,200 – 1,600 sq ft</td>
                    <td className="p-3 sm:p-4">₹8.5 – ₹14.5 Lakh</td>
                    <td className="p-3 sm:p-4 font-medium text-terracotta">₹15.0 – ₹25.0 Lakh</td>
                    <td className="p-3 sm:p-4">₹28.0 – ₹45.0 Lakh</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Ad Slot Inline */}
          <AdSlot position="guide-inline" slotKey="guide-cost-inline-1" />

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#263238] mb-3">
              2BHK Renovation Cost Breakdown (800–1,000 Sq Ft)
            </h2>
            <p>
              A 2BHK flat is the most common apartment format in urban India. When undertaking a comprehensive remodel, homeowners often wonder how their budget divides across civil work, carpentry, plumbing, and electricals.
            </p>
            <p className="mt-2">
              Here is a trade-by-trade breakdown for an 850 sq ft 2BHK flat renovated to standard-plus specifications:
            </p>

            <div className="mt-6 space-y-4">
              <div className="p-5 rounded-2xl border border-charcoal-200 bg-white shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-charcoal-100">
                  <span className="font-bold text-[#263238] text-base">1. Modular Kitchen Renovation</span>
                  <span className="text-terracotta font-extrabold text-sm sm:text-base">₹1,60,000 – ₹2,90,000</span>
                </div>
                <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
                  L-shaped or parallel layout (approx 65 sq ft counter length). Includes boiling water resistant (BWR IS:303) marine ply carcass, 1mm high-gloss anti-scratch laminate shutters, soft-close Blum/Hettich drawer channels, granite or quartz countertop, and stainless steel sink.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-charcoal-200 bg-white shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-charcoal-100">
                  <span className="font-bold text-[#263238] text-base">2. Two Bathroom Renovations (Master + Guest)</span>
                  <span className="text-terracotta font-extrabold text-sm sm:text-base">₹1,10,000 – ₹2,20,000</span>
                </div>
                <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
                  Includes complete floor and wall hacking, Dr. Fixit polymer membrane waterproofing (crucial for preventing slab leaks to downstairs flats), vitrified anti-skid floor and glazed wall tiles up to 7 ft lintel, CPVC internal plumbing, Jaquar diverters, and wall-hung commodes with concealed cisterns.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-charcoal-200 bg-white shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-charcoal-100">
                  <span className="font-bold text-[#263238] text-base">3. False Ceiling & Cove Lighting</span>
                  <span className="text-terracotta font-extrabold text-sm sm:text-base">₹60,000 – ₹1,10,000</span>
                </div>
                <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
                  Gypsum board false ceiling (Saint-Gobain Gyproc 12.5mm) across living room, dining, and 2 bedrooms (approx 600 sq ft covered area). Includes GI channel framework, LED cove profile lighting, and recessed COB spotlights.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-charcoal-200 bg-white shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-charcoal-100">
                  <span className="font-bold text-[#263238] text-base">4. Vitrified Tile Flooring</span>
                  <span className="text-terracotta font-extrabold text-sm sm:text-base">₹75,000 – ₹1,40,000</span>
                </div>
                <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
                  Laying 4×2 ft or 2×2 ft glazed vitrified tiles (Kajaria, Somany, Nitco) over existing floor using cement mortar bedding or polymer thinset adhesive. Includes skirting and epoxy grout in wet transitions.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-charcoal-200 bg-white shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-charcoal-100">
                  <span className="font-bold text-[#263238] text-base">5. Complete House Painting & Putty</span>
                  <span className="text-terracotta font-extrabold text-sm sm:text-base">₹45,000 – ₹80,000</span>
                </div>
                <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
                  Thorough scraping of old paint, 2 coats of Birla White / Asian Paints TruCare wall putty, 1 coat primer, and 2 coats of washable interior acrylic emulsion (Asian Paints Royale or Apcolite).
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-charcoal-200 bg-white shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-charcoal-100">
                  <span className="font-bold text-[#263238] text-base">6. Wardrobes, TV Unit & Storage Carpentry</span>
                  <span className="text-terracotta font-extrabold text-sm sm:text-base">₹1,40,000 – ₹2,60,000</span>
                </div>
                <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
                  Two floor-to-ceiling 3-door wardrobes with lofts (commercial MR ply with laminate), TV unit with back-paneling, and an entryway shoe cabinet.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-charcoal-200 bg-white shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-charcoal-100">
                  <span className="font-bold text-[#263238] text-base">7. Demolition, Electrical Rewiring & Cleaning</span>
                  <span className="text-terracotta font-extrabold text-sm sm:text-base">₹40,000 – ₹70,000</span>
                </div>
                <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
                  Hacking existing tiles, clearing debris per society guidelines, chased wall conduits for AC power points, modular switches (Legrand/Schneider), and post-construction chemical deep cleaning.
                </p>
              </div>
            </div>

            {/* Total Highlight */}
            <div className="mt-6 p-6 rounded-3xl bg-terracotta-50 border border-terracotta/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-terracotta">Total Standard 2BHK Investment</p>
                <p className="text-2xl sm:text-3xl font-black text-[#263238]">₹6.3 Lakh – ₹11.7 Lakh</p>
                <p className="text-xs text-charcoal-600 mt-1">Average turnkey cost: ~₹8.5 Lakh for full 850 sq ft flat</p>
              </div>
              <Link
                href="/projects/house-renovation-cost"
                className="px-5 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-600 text-white text-xs font-bold shadow-xs transition-colors text-center"
              >
                Customize Your 2BHK Plan →
              </Link>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#263238] mb-3">
              Kitchen Renovation Cost in India (Modular Kitchen Deep Dive)
            </h2>
            <p>
              Kitchens account for nearly 25% to 30% of an apartment remodel. In Indian cooking, heavy spices, oil vapor, and rigorous daily washing demand moisture-resistant and heat-tolerant construction:
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-warm-50 border border-charcoal-200">
                <h3 className="font-bold text-[#263238] text-sm mb-1.5">Carcass & Cabinet Base</h3>
                <p>
                  <strong>BWR / BWP Marine Plywood (IS:710):</strong> The gold standard for Indian kitchens. Resists boiling water, steam, and pests. Avoid particle board or standard MDF under the sink where plumbing leaks occur.
                </p>
                <p className="mt-1 text-charcoal-500 font-medium">Cost: ₹1,100 – ₹1,800 / sq ft of cabinet surface</p>
              </div>

              <div className="p-4 rounded-2xl bg-warm-50 border border-charcoal-200">
                <h3 className="font-bold text-[#263238] text-sm mb-1.5">Shutter Finish</h3>
                <p>
                  <strong>Acrylic vs 1mm High-Pressure Laminate:</strong> Laminate is budget-friendly, scratch-resistant, and durable. Acrylic provides a glass-like ultra-gloss modern finish but is vulnerable to scratches.
                </p>
                <p className="mt-1 text-charcoal-500 font-medium">Laminate: ₹180 – ₹350 / sq ft | Acrylic: ₹450 – ₹850 / sq ft</p>
              </div>

              <div className="p-4 rounded-2xl bg-warm-50 border border-charcoal-200">
                <h3 className="font-bold text-[#263238] text-sm mb-1.5">Countertop Selection</h3>
                <p>
                  <strong>Jet Black Granite vs Engineered Quartz:</strong> Jet black granite remains virtually indestructible against turmeric (haldi) and lemon juice stains. Quartz looks sleek and non-porous but requires heat trivets.
                </p>
                <p className="mt-1 text-charcoal-500 font-medium">Granite: ₹140 – ₹320 / sq ft | Quartz: ₹300 – ₹800 / sq ft</p>
              </div>

              <div className="p-4 rounded-2xl bg-warm-50 border border-charcoal-200">
                <h3 className="font-bold text-[#263238] text-sm mb-1.5">Hardware & Pullouts</h3>
                <p>
                  <strong>Soft-Close Tandem Boxes (Hettich / Hafele):</strong> SS wire baskets cost less upfront but rust over 5 years. Tandem boxes carry 30–50kg pots with smooth silent glides.
                </p>
                <p className="mt-1 text-charcoal-500 font-medium">₹3,500 – ₹6,500 per drawer set</p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#263238] mb-3">
              Bathroom Renovation Cost in India (Waterproofing & Fittings)
            </h2>
            <p>
              Bathroom leaks are the number one cause of conflict between apartment neighbors in Indian housing societies. Cutting corners on bathroom waterproofing leads to costly ceiling seepage lawsuits.
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-xs sm:text-sm">
              <li>
                <strong>Waterproofing Membrane (₹30 – ₹55 / sq ft):</strong> Apply 2 coats of polymer-modified cementitious slurry (such as Dr. Fixit Fastflex or Fosroc Brushbond) over the sunken slab, turning at least 1 foot up the brick wall. Always conduct a 48-hour water ponding test before laying tile bedding.
              </li>
              <li>
                <strong>CPVC Concealed Piping (₹12,000 – ₹25,000 / bath):</strong> Replace old galvanized iron (GI) pipes with SDR-11 CPVC pipes (Astral, Ashirvad) with brass transition fittings.
              </li>
              <li>
                <strong>Tiling & Grouting (₹40 – ₹90 / sq ft tile + ₹30 labor):</strong> Vitrified tiles on walls up to door height; matte anti-skid vitrified tiles for flooring. Use epoxy grout on the floor to prevent water permeation through grout lines.
              </li>
              <li>
                <strong>Sanitaryware & Brassware (₹25,000 – ₹70,000 / bath):</strong> Wall-mounted WC with concealed pneumatic flush tank (Geberit / Jaquar) makes cleaning effortless. Diverters and overhead rain showers add modern elegance.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#263238] mb-3">
              Financing Your Renovation: Personal Loan vs Home Improvement Loan
            </h2>
            <p>
              If you lack ready cash for a ₹6 to ₹12 Lakh apartment renovation, Indian banks offer two primary financing vehicles:
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-warm-50 border border-charcoal-200">
                <span className="font-bold text-[#263238] text-sm block mb-1">1. Home Renovation / Top-Up Loan</span>
                <p className="text-charcoal-600">
                  Secured against your existing property or home loan. Interest rates range between <strong>8.75% and 9.75%</strong> with repayment tenures up to 15 years. Lower EMI burden, and interest qualifies for tax deduction under Section 24(b) up to ₹30,000/year.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-warm-50 border border-charcoal-200">
                <span className="font-bold text-[#263238] text-sm block mb-1">2. Personal Renovation Loan</span>
                <p className="text-charcoal-600">
                  Unsecured financing disbursed in 24–48 hours with minimal paperwork. Interest rates are significantly higher at <strong>10.5% to 15.0%</strong> with short 3-to-5-year tenures, leading to substantially higher monthly EMIs.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/calculators/home-renovation-loan-calculator"
                className="inline-flex items-center gap-1 text-xs font-bold text-terracotta hover:underline"
              >
                Use our Home Renovation Loan Calculator to compare EMI and interest →
              </Link>
            </div>
          </section>

          {/* Section 6: FAQs */}
          <section className="pt-6 border-t border-charcoal-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#263238] mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-terracotta" />
              <span>Frequently Asked Questions</span>
            </h2>
            <div className="space-y-4">
              {FAQ_DATA.map((faq, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-warm-50/60 border border-charcoal-200">
                  <h3 className="font-bold text-sm sm:text-base text-[#263238] mb-2">{faq.question}</h3>
                  <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer CTA */}
        <div className="mt-14 pt-8 border-t border-charcoal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-charcoal-400">Calculate materials and budget</p>
            <p className="text-base font-bold text-[#263238]">Whole House Renovation Cost Calculator</p>
          </div>
          <Link
            href="/projects/house-renovation-cost"
            className="px-6 py-3 rounded-xl bg-terracotta hover:bg-terracotta-600 text-white text-xs font-bold shadow-xs transition-colors text-center cursor-pointer"
          >
            Launch Cost Estimator →
          </Link>
        </div>
      </div>
    </article>
  );
}
