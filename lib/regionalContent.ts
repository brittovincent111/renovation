import { FAQItem } from './types';

/**
 * Region-specific explanation and FAQ content for /calculators/[slug]/[region].
 *
 * Without this, regional variants rendered the parent calculator's config
 * verbatim, publishing identical body copy and identical FAQPage schema at
 * three URLs per calculator. Each entry below is written against that market's
 * own product sizes, standards and trade conventions.
 */
export interface RegionalContent {
  formulaHighlight?: string;
  howItIsCalculated: string[];
  faqs: FAQItem[];
}

export const REGIONAL_CONTENT: Record<string, RegionalContent> = {
  'tile-calculator:uk': {
    howItIsCalculated: [
      'Areas are worked in square metres and tiles counted from metric formats — 600×600mm and 300×600mm dominate UK floors, while 200×100mm metro remains the standard wall tile.',
      'UK adhesive is sold in 20kg bags rather than 50lb, covering roughly 4-5m² at a 6mm notch, and grout in 5kg and 10kg tubs.',
      'BS 5385 requires a minimum 2mm joint for pressed ceramic wall tiles and 3mm for floors, which is why UK joints are tighter than the 1/8" American default.',
    ],
    faqs: [
      { question: 'How many tiles per square metre?', answer: 'Roughly 2.8 tiles per m² at 600×600mm, 5.6 at 300×600mm, and 50 at 200×100mm metro. Most UK merchants price by the square metre rather than per tile, so order in m² and let the merchant convert to boxes.' },
      { question: 'How much wastage should I allow?', answer: '10% for a straight lay on a square room, 15% for diagonal or herringbone, and 15% minimum for any room with bay windows or alcoves. Order all boxes from one batch — shade variation between batches is as much an issue in the UK as anywhere.' },
      { question: 'Do I need a decoupling membrane over UK floors?', answer: 'Strongly advised over timber floors, which are far more common in UK housing stock than slab. Suspended timber moves seasonally, and a decoupling matting such as Ditra or Dural absorbs that movement rather than transmitting it into the tile bed.' },
      { question: 'What adhesive should I use in a UK bathroom?', answer: 'A flexible C2 cementitious adhesive to BS EN 12004 for floors and wet walls. Ready-mixed tub adhesive is only suitable for dry walls with small ceramic tiles and should never be used in a shower enclosure or on porcelain.' },
      { question: 'Is underfloor heating a factor?', answer: 'Yes, and it is increasingly common in UK renovations. Use a flexible S1 or S2 adhesive and a flexible grout, and allow the screed to complete its commissioning heating cycle before tiling or the bed will crack.' },
    ],
  },
  'tile-calculator:india': {
    howItIsCalculated: [
      'Indian tiling is specified in feet and inches in the trade but purchased in square feet, so areas are shown in both — 2×2 ft (600×600mm) vitrified tile is the dominant floor format.',
      'Traditional Indian floor tiling uses a thick cement mortar bed (1:4 cement to sand, 25-40mm) rather than thin-set adhesive, which changes material requirements substantially.',
      'Cement is sold in 50kg bags nationwide, and river or M-sand by the brass (100 cu ft), so bedding material is estimated against those units.',
    ],
    faqs: [
      { question: 'How many 2x2 tiles for 100 square feet?', answer: 'Twenty-five tiles, since each 2×2 ft tile covers 4 sq ft — plus wastage. Order 27-28 to allow for cutting and breakage. Most dealers sell vitrified tile in boxes of four.' },
      { question: 'Should I use cement mortar or tile adhesive?', answer: 'Cement mortar bedding remains standard and is what most Indian masons are trained on. Adhesive costs more per square foot but is faster, thinner, and far more reliable for large-format vitrified tile over 2×2 ft, where a mortar bed frequently leaves hollow spots.' },
      { question: 'What is the difference between vitrified and ceramic tile?', answer: 'Vitrified tile is fired at higher temperature, absorbs under 0.5% water and is much harder — it suits Indian floors, wet areas and heavy traffic. Ceramic absorbs more and is better kept to walls and low-traffic interiors.' },
      { question: 'How much cement and sand for a tile bed?', answer: 'A 1:4 cement-sand bed at 30mm needs roughly one 50kg cement bag per 35-40 sq ft, with sand at about 4-5 times the cement by volume. Add a little extra for the slush coat under each tile.' },
      { question: 'How do I plan for monsoon humidity?', answer: 'Allow a longer cure before grouting — a mortar bed laid in high humidity can take several extra days. Ensure the screed has fallen towards floor traps in bathrooms and balconies, because standing water is the main cause of tile failure in Indian wet areas.' },
    ],
  },

  'paint-calculator:uk': {
    howItIsCalculated: [
      'Paint is calculated in litres against metric coverage: UK emulsion typically covers 12-14m² per litre per coat on a sealed surface, less on fresh plaster.',
      'Tins are sold in 2.5L and 5L, so the result rounds to those sizes rather than to US gallons and quarts.',
      'New UK plaster needs a mist coat — emulsion thinned roughly 30% with water — which is counted as an additional part-coat because the plaster drinks it.',
    ],
    faqs: [
      { question: 'How much paint do I need for a room in litres?', answer: 'A typical 4×4m room with 2.4m ceilings has about 38m² of wall. At 13m² per litre per coat, two coats need roughly 6 litres — one 5L tin plus a 2.5L, or two 5L tins if you want spare for touching up.' },
      { question: 'What is a mist coat and do I need one?', answer: 'Emulsion thinned with about 30% water, applied to bare plaster so it seals rather than sits on the surface. Skip it and the topcoat can peel away in sheets when you later remove tape or fill a nail hole. Never use vinyl silk as a mist coat.' },
      { question: 'How long between coats?', answer: 'Two to four hours for contract and vinyl matt emulsion in normal conditions. UK winter rooms are often cold and damp, which extends that considerably — if the surface is cool to the touch, wait longer.' },
      { question: 'Matt, eggshell or silk?', answer: 'Matt for ceilings and walls where you want to hide imperfection. Vinyl silk wipes clean but reveals every flaw in the plaster. Eggshell for woodwork and for bathrooms and kitchens where moisture resistance matters more than a flat finish.' },
      { question: 'Do I need to paint over dark colours differently?', answer: 'Yes — use a dedicated primer or an extra coat. Covering a strong colour with white emulsion regularly takes three or four coats, and it is cheaper to prime once than to apply two additional finish coats.' },
    ],
  },
  'paint-calculator:india': {
    howItIsCalculated: [
      'Paint is calculated in litres, with coverage stated per litre per coat — Indian emulsion typically covers 10-12m² (110-130 sq ft) per litre depending on surface porosity.',
      'Indian walls are usually cement plaster finished with wall putty rather than gypsum plaster, and putty consumption is estimated separately because it materially affects paint coverage.',
      'Tins are sold in 1L, 4L, 10L and 20L, so quantities round to those sizes rather than to gallons.',
    ],
    faqs: [
      { question: 'How much paint for a 10x12 room?', answer: 'A 10×12 ft room with 10 ft ceilings has roughly 440 sq ft of wall. At about 120 sq ft per litre per coat, two coats need approximately 7-8 litres — one 10L tin covers it with some spare.' },
      { question: 'Do I need wall putty before painting?', answer: 'On cement plaster, yes. Two coats of white cement putty give a smooth, less porous surface, which both improves the finish and cuts paint consumption noticeably. Skipping putty on rough plaster can increase paint use by 30% or more.' },
      { question: 'Distemper, emulsion or enamel?', answer: 'Acrylic distemper is the budget interior option but does not wash well. Acrylic emulsion is the standard interior choice and is washable. Enamel is for metal and wood joinery. Exterior walls need a dedicated exterior emulsion that resists monsoon exposure and UV.' },
      { question: 'When should I paint — before or after monsoon?', answer: 'After. Painting during or just before monsoon traps moisture in the plaster, causing peeling, efflorescence and fungal growth. October to March gives the most reliable drying conditions across most of the country.' },
      { question: 'How do I deal with dampness and efflorescence?', answer: 'Find and fix the source of water first — paint will not hold over active damp. Remove the white salt deposit dry, allow the wall to dry fully, apply a damp-proof primer, and only then paint. Painting over efflorescence simply pushes the problem a few months out.' },
    ],
  },

  'concrete-calculator:uk': {
    howItIsCalculated: [
      'Volumes are calculated in cubic metres, the unit UK ready-mix is ordered and priced in, with a minimum practical delivery of around 3m³ for a full load.',
      'UK bagged concrete comes in 20kg and 25kg bags rather than 60lb and 80lb — roughly 20 bags of 25kg make 0.25m³, which is why bagging anything above about half a cubic metre stops making sense.',
      'Mixes follow BS 8500 designations: C20/25 for general domestic slabs and footings, C25/30 for driveways and anything carrying vehicles.',
    ],
    faqs: [
      { question: 'How many 25kg bags of concrete in a cubic metre?', answer: 'Roughly 90-100 bags of 25kg mixed concrete per cubic metre. Above about 0.5m³ ready-mix is cheaper, far faster and gives a more consistent mix — mixing 100 bags by hand is a full day for two people.' },
      { question: 'What concrete grade do I need in the UK?', answer: 'C20/25 for garden slabs, shed bases and strip footings. C25/30 for driveways and any slab carrying a vehicle. C30/37 for heavy-duty or structural work. Your ready-mix supplier will ask for the BS 8500 designation.' },
      { question: 'How thick should a UK shed base or patio be?', answer: '100mm over 100mm of compacted MOT Type 1 sub-base for a shed or patio. A driveway needs 150mm of concrete over 150mm of sub-base, reinforced with A142 or A193 mesh.' },
      { question: 'Can I pour concrete in UK winter?', answer: 'Not below 5°C and falling. Concrete gains strength very slowly in cold, and frost on green concrete destroys the surface. If you must pour in winter, use a cold-weather admixture, cover with insulating blankets, and allow substantially longer before loading.' },
      { question: 'Do I need a DPM under a UK slab?', answer: 'For any slab inside a building or supporting a habitable structure, yes — 1200 gauge polythene damp-proof membrane lapped and taped, dressed up to meet the DPC. UK ground is rarely dry enough to omit it.' },
    ],
  },
  'concrete-calculator:india': {
    howItIsCalculated: [
      'Volumes are shown in cubic metres and cubic feet, since Indian sites commonly specify in feet while cement is purchased by the 50kg bag and aggregate by the brass (100 cu ft).',
      'Nominal mixes follow IS 456: M15 (1:2:4) for levelling and PCC, M20 (1:1.5:3) for most residential slabs and footings, M25 for columns and heavier structural work.',
      'Cement consumption is derived from the mix ratio — M20 needs roughly 8 bags of 50kg cement per cubic metre, before any wastage allowance.',
    ],
    faqs: [
      { question: 'How many cement bags per cubic metre of M20 concrete?', answer: 'About 8 bags of 50kg for M20 (1:1.5:3), along with roughly 0.42m³ of sand and 0.84m³ of coarse aggregate. M25 needs around 11 bags per cubic metre. Add 3-5% for wastage on site.' },
      { question: 'What is the difference between M20 and M25?', answer: 'The number is the characteristic compressive strength in N/mm² at 28 days. M20 suits most residential slabs, beams and footings. M25 and above is used for columns, larger spans, and wherever a structural engineer specifies it. Do not substitute downward to save cement.' },
      { question: 'How much water should I add?', answer: 'Target a water-cement ratio of 0.45-0.50 for M20. Excess water is the single biggest cause of weak concrete on Indian sites — it improves workability but sharply reduces strength. Use a plasticiser rather than more water if the mix is stiff.' },
      { question: 'How long should concrete be cured?', answer: 'Minimum 7 days of continuous wet curing, and 14 days is much better in Indian heat. Ponding, wet hessian, or curing compound all work. Concrete that dries out in the first week never reaches its design strength, whatever the mix.' },
      { question: 'Can I pour during monsoon?', answer: 'Avoid it. Rain falling on fresh concrete alters the water-cement ratio at the surface and leaves a weak, dusty finish. If a pour cannot be postponed, cover the placed concrete immediately and never place during active rainfall.' },
    ],
  },

  'flooring-calculator:uk': {
    howItIsCalculated: [
      'Areas are calculated in square metres, and UK flooring is sold by the pack with coverage printed in m² — typically 1.8-2.5m² per laminate pack.',
      'UK homes frequently have suspended timber floors rather than slab, so the calculator assumes an underlay requirement across the full floor area.',
      'An expansion gap of 10-12mm at every wall is standard UK practice for floating floors and is why skirting or beading is fitted after the floor, not before.',
    ],
    faqs: [
      { question: 'How many packs of laminate do I need?', answer: 'Divide your room area in m² by the pack coverage printed on the label, then add 10%. A 20m² room with 2.2m² packs needs 10 packs including wastage. Buy all packs from one batch number.' },
      { question: 'Do I need underlay?', answer: 'Yes for any floating floor. It evens out minor subfloor irregularity, reduces impact noise — which matters a great deal in UK flats, where lease terms often specify an acoustic rating — and provides a moisture barrier over concrete.' },
      { question: 'What expansion gap does a UK floating floor need?', answer: '10-12mm at every wall and every fixed object, including pipes and door frames. Laminate and engineered board expand with seasonal humidity change, and a floor fitted tight to the wall will buckle and peak at the joints.' },
      { question: 'Can I lay flooring over floorboards?', answer: 'Yes, provided they are sound and level. Screw down any loose boards first, then overlay with 6mm plywood or hardboard if the boards are cupped or uneven. Laying straight onto uneven Victorian boards will telegraph every ridge through the new floor.' },
      { question: 'What about underfloor heating?', answer: 'Check the board is rated for it and keep the surface temperature below 27°C. Engineered board handles UFH far better than solid timber, which moves too much. Use a low-tog underlay, or the heating output is wasted under the insulation.' },
    ],
  },
  'flooring-calculator:india': {
    howItIsCalculated: [
      'Areas are shown in square feet and square metres, since Indian flooring is quoted per square foot but tiles and boards are manufactured in metric sizes.',
      'Vitrified tile and marble remain the dominant Indian flooring, laid on a cement mortar bed, so the calculator reports bedding material alongside the finish material.',
      'Laminate and engineered wood are growing in Indian metros but need particular attention to humidity, so an expansion allowance is included.',
    ],
    faqs: [
      { question: 'How much flooring for 1000 square feet?', answer: 'Add 8-10% for wastage, so about 1,080-1,100 sq ft of material. For 2×2 ft vitrified tile that is roughly 275 tiles, usually sold in boxes of four. Cutting around corners and columns raises wastage on irregular layouts.' },
      { question: 'Vitrified tile, marble or laminate?', answer: 'Vitrified tile is the practical default — durable, low maintenance and suited to Indian conditions. Marble is premium and needs periodic polishing. Laminate is affordable and quick but vulnerable to standing water, so avoid it in kitchens, bathrooms and ground floors prone to damp.' },
      { question: 'What is the cost per square foot?', answer: 'Vitrified tile typically runs ₹40-120 per sq ft for material, plus ₹25-40 for labour and bedding. Marble starts around ₹150 and rises steeply. Laminate runs ₹70-200 depending on AC rating. Prices vary considerably by city.' },
      { question: 'How do I handle humidity with wooden flooring?', answer: 'Acclimatise the boards in the room for at least 72 hours before laying, keep a 10-12mm expansion gap at every wall, and avoid laminate entirely in coastal cities unless the space is consistently air-conditioned. Monsoon humidity swings are what destroy poorly fitted wood floors.' },
      { question: 'Should flooring go before or after painting?', answer: 'Complete wall putty and the first coat of paint before flooring, then the final coat after — this is standard Indian site sequencing. It avoids dust from wall preparation settling into a fresh mortar bed and protects the new floor from paint spatter.' },
    ],
  },
};

export function getRegionalContent(slug: string, region: string): RegionalContent | undefined {
  return REGIONAL_CONTENT[`${slug}:${region}`];
}
