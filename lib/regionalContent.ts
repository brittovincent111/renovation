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
  'false-ceiling-calculator:uk': {
    howItIsCalculated: [
      'Areas are calculated in square metres, using British standard 2400×1200mm (8×4 ft) or 1800×900mm plasterboard sheets (12.5mm standard or 15mm acoustic/fire rated).',
      'Suspended MF ceiling systems calculate MF7 primary support channels at 900-1200mm centres and MF5 ceiling sections at 400-450mm centres, suspended from structural soffit with angle hangers.',
      'Perimeter MF6A channel lengths match room perimeter plus 10% overlap, with drywall screws spaced at 200mm centres along joists or steel framework.',
    ],
    faqs: [
      { question: 'How much does a false ceiling cost per m² in the UK?', answer: 'A domestic plasterboard suspended ceiling typically costs £40 to £85 per m² fully installed including framing, boarding, tape-and-jointing or skim coat plaster. Commercial 600×600mm grid ceilings run £30 to £60 per m².' },
      { question: 'What is the difference between an MF ceiling and a drop grid ceiling?', answer: 'An MF (Metal Furring) ceiling uses concealed steel framework clad in taped plasterboard for a seamless, solid ceiling like a traditional room. A grid ceiling uses exposed T-bars and drop-in mineral fibre tiles (common in offices, basements, and commercial spaces) allowing easy access to overhead wiring and plumbing.' },
      { question: 'What board thickness should I use for UK ceilings?', answer: 'Standard residential ceilings use 12.5mm plasterboard. For noise reduction between flats (Part E building regulations) or extra fire resistance, 15mm sound-insulating (e.g. British Gypsum SoundBloc) or FireLine boards are specified.' },
      { question: 'How much height does a suspended ceiling lose?', answer: 'A standard domestic MF system needs a minimum drop of 75mm to 100mm below the lowest joist or beam. Allow 150mm if you plan to install recessed downlights, ducting, or acoustic insulation quilt.' },
      { question: 'How many screws per plasterboard sheet?', answer: 'Plan for roughly 25 to 30 drywall screws per 2400×1200mm sheet, spaced at 150mm to 200mm centres along the furring channels. Never countersink screws so deeply that they rupture the paper face.' },
    ],
  },
  'false-ceiling-calculator:india': {
    howItIsCalculated: [
      'Calculations use standard Indian sheet sizes: 6×4 ft (24 sq ft) or 8×4 ft (32 sq ft) Gypsum boards (Saint-Gobain Gyproc / USG Boral 12.5mm).',
      'Galvanized iron (GI) framework is estimated based on standard Indian site practice: perimeter channels along walls, intermediate main channels at 3-4 ft spacing, and ceiling sections at 16 or 24 inches centres with soffit cleats.',
      'Cove lighting perimeter is calculated for peripheral drop designs, estimating LED profile channels and drywall joint compound with fiberglass mesh tape.',
    ],
    faqs: [
      { question: 'What is the false ceiling cost per square foot in India in 2026?', answer: 'Gypsum board false ceiling (Saint-Gobain Gyproc) costs ₹90 to ₹135 per sq ft including materials, GI framing, and labour. POP (Plaster of Paris) false ceiling runs ₹110 to ₹160 per sq ft. Painting and LED cove profile adds ₹25 to ₹45 per sq ft extra.' },
      { question: 'Gypsum board vs POP false ceiling: Which is better for Indian apartments?', answer: 'Gypsum board is pre-fabricated, faster to install, creates minimal site dust, and has high crack resistance. POP gives greater flexibility for intricate curved designs and carved moldings, but takes 3-4 times longer to dry and creates significant site mess.' },
      { question: 'How much does false ceiling cost for a 2BHK flat in India?', answer: 'A typical 2BHK flat covering 550 to 750 sq ft of ceiling area (living room + 2 bedrooms) costs between ₹55,000 and ₹95,000 for standard Gypsum ceiling with basic cove lighting. Premium multi-level designer ceilings with veneer rafters cost ₹1.10 to ₹1.60 Lakh.' },
      { question: 'How many 6x4 ft Gypsum sheets are needed for a 10x12 ft room?', answer: 'A 10×12 ft bedroom has 120 sq ft of ceiling. Each 6×4 ft sheet covers 24 sq ft. You need 5 full sheets plus 1 extra sheet (6 sheets total) to cover cutting waste, corner steps, and cove borders.' },
      { question: 'Does a false ceiling reduce room temperature and fan height?', answer: 'Yes. A false ceiling creates an air gap with the RCC slab that insulates top-floor apartments, cutting heat by 3°C to 5°C. However, it lowers ceiling height by 5 to 7 inches. In rooms with ceiling heights below 9.5 ft, opt for perimeter cove drops rather than full-room drops to maintain ceiling fan clearance.' },
    ],
  },

  'tile-calculator:australia': {
    howItIsCalculated: [
      'Areas are worked in square metres against the formats Australian merchants stock — 600×600mm and 300×600mm dominate floors, with 600×1200mm large-format increasingly common in new builds.',
      'Adhesive is sold in 20kg bags covering roughly 4-5m² at a 6mm notch, and grout in 5kg and 15kg buckets rather than the American 25lb bag.',
      'AS 3958 governs ceramic tile installation and requires movement joints at roughly 4.5m centres internally, and at every internal corner — a requirement most DIY layouts miss entirely.',
    ],
    faqs: [
      { question: 'How many tiles per square metre in Australia?', answer: 'About 2.8 at 600×600mm, 5.6 at 300×600mm and 1.4 at 600×1200mm. Merchants price by the square metre, so order in m² and let them convert to full boxes — part boxes are rarely sold.' },
      { question: 'Do I need waterproofing under bathroom tiles?', answer: 'Yes, and it is mandatory. AS 3740 requires a waterproof membrane to the full shower enclosure, 150mm up walls elsewhere in the wet area, and across the whole floor in a bathroom above ground level. In most states the membrane must be installed by a licensed waterproofer and certified.' },
      { question: 'What wastage should I allow?', answer: '10% for a straight lay in a square room, 15% for diagonal or herringbone, and 15% minimum around a curved shower base or a room with multiple doorways. Order all boxes from one batch — shade variation between production runs is significant.' },
      { question: 'Can I tile over an existing floor?', answer: 'Over sound ceramic tile on a concrete slab, yes, with a suitable primer. Never over vinyl, cork or particleboard without an appropriate sheeting overlay — and remember tiling over an existing floor raises the finished height, which matters at door thresholds and shower falls.' },
      { question: 'What about slab movement in new builds?', answer: 'A new concrete slab keeps shrinking for months. AS 3958 recommends waiting at least 28 days before tiling, and longer where possible. Tiling a green slab is the most common cause of drummy tiles and cracked grout lines in Australian new builds.' },
    ],
  },

  'paint-calculator:australia': {
    howItIsCalculated: [
      'Paint is calculated in litres against metric coverage — Australian interior acrylic typically covers 14-16m² per litre per coat on a sealed surface, less on new plasterboard.',
      'Tins are sold in 1L, 4L, 10L and 15L, so results round to those sizes rather than to US gallons and quarts.',
      'New plasterboard needs a dedicated sealer-undercoat rather than a thinned topcoat, because the paper face and the set joints absorb at very different rates and will otherwise flash through the finish.',
    ],
    faqs: [
      { question: 'How much paint for an average Australian room?', answer: 'A 4×4m room with 2.4m ceilings has about 38m² of wall. At 15m² per litre per coat, two coats need roughly 5 litres — one 4L tin plus a 1L, or a single 10L if you are painting several rooms in the same colour.' },
      { question: 'Do I need to seal new plasterboard?', answer: 'Yes. Use a purpose-made sealer-undercoat. The paper face of the sheet and the set compound over the joints absorb very differently, and painting straight onto them leaves the joints visibly flashing through even after two topcoats.' },
      { question: 'How does Australian heat affect painting?', answer: 'Considerably. Do not paint in direct sun or above about 35°C — the film skins over before it can level, leaving lap marks and roller texture. Follow the shade around the house, and start early in summer rather than working through the afternoon.' },
      { question: 'What sheen level should I use?', answer: 'Flat or matt for ceilings, low-sheen for most walls, and semi-gloss or gloss for trim, doors and wet areas. Low-sheen is the Australian default for living areas because it wipes clean without highlighting every imperfection the way a full gloss does.' },
      { question: 'Is exterior paint different here?', answer: 'Yes, and it matters. Australian UV exposure is among the highest in the world, so use a 100% acrylic exterior grade with a stated UV rating. Cheaper exterior paints chalk and fade noticeably within three or four summers, particularly on north and west elevations.' },
    ],
  },

  'concrete-calculator:australia': {
    howItIsCalculated: [
      'Volumes are calculated in cubic metres, the unit Australian ready-mix is ordered in, with most suppliers setting a minimum charge around 0.2-0.5m³ and a full load at roughly 6m³.',
      'Bagged concrete comes in 20kg bags — about 108 bags make one cubic metre, which is why anything above roughly half a cubic metre is better ordered as ready-mix.',
      'Mixes follow AS 1379 strength grades: N20 for paths and shed slabs, N25 for driveways, N32 and above for structural and suspended work.',
    ],
    faqs: [
      { question: 'How many 20kg bags of concrete in a cubic metre?', answer: 'Roughly 108. Above about 0.5m³ ready-mix is cheaper, far faster and far more consistent — mixing 108 bags by hand is a punishing day for two people and the mix will vary batch to batch.' },
      { question: 'What concrete grade do I need?', answer: 'N20 for garden paths and shed slabs, N25 for a domestic driveway, N32 for structural footings or anything a slab-on-ground engineer specifies. Your ready-mix supplier will ask for the AS 1379 grade, plus slump and aggregate size.' },
      { question: 'How thick should an Australian shed slab be?', answer: '100mm over 100mm of compacted road base for a garden shed or path, with SL72 mesh. A driveway wants 100-125mm over 100mm of base with SL82 mesh. Check your council — some require an engineered slab design for larger structures.' },
      { question: 'Can I pour concrete in the middle of summer?', answer: 'With care. Above 30°C concrete stiffens fast and can lose surface water before you finish it, leaving plastic shrinkage cracks. Pour early morning, dampen the base and formwork first, and have enough hands to place and finish without a gap.' },
      { question: 'Do I need a vapour barrier under the slab?', answer: 'Under any slab inside a building, yes — 0.2mm polythene to AS 2870, lapped and taped, and continuous under the whole slab. It also matters for termite management detailing, which is separately regulated in most of Australia.' },
    ],
  },

  'flooring-calculator:australia': {
    howItIsCalculated: [
      'Areas are calculated in square metres, and Australian flooring is sold by the pack with coverage printed in m² — typically 1.8-2.5m² per laminate or hybrid pack.',
      'Hybrid flooring and engineered timber dominate the Australian market over solid timber, largely because they handle the humidity swing between a Queensland summer and a Melbourne winter far better.',
      'An expansion gap of 10-12mm at every wall is required for floating floors, and skirting or scotia is fitted afterwards to cover it.',
    ],
    faqs: [
      { question: 'How many packs of flooring do I need?', answer: 'Divide your room area in m² by the pack coverage on the label and add 10%. A 20m² room with 2.2m² packs needs 10 packs including wastage. Keep one full pack sealed for future repairs — batch colour varies.' },
      { question: 'Hybrid, laminate or engineered timber?', answer: 'Hybrid is waterproof and the safest choice for Australian kitchens, laundries and wet-prone areas. Laminate is cheaper but swells if water sits on a joint. Engineered timber gives a real timber wear layer and handles humidity far better than solid boards.' },
      { question: 'Does Australian humidity affect timber floors?', answer: 'Substantially, and it is the main reason engineered board outsells solid here. Acclimatise boards in the room for at least 72 hours before laying, and never lay solid timber in a coastal Queensland home without climate control — seasonal cupping is close to guaranteed.' },
      { question: 'Can I lay flooring over an existing slab?', answer: 'Yes, provided the slab is flat within 3mm over 2m and dry. Concrete must be moisture-tested — a slab that reads high will destroy the adhesive or trap moisture under a floating floor. Older slabs without a vapour barrier almost always need a moisture membrane.' },
      { question: 'Do I need underlay?', answer: 'For any floating floor, yes. It evens out minor slab irregularity, cuts impact noise — which matters in strata where by-laws often specify a minimum acoustic rating — and adds a moisture barrier over concrete. Many hybrid planks ship with a pad pre-attached; check before buying it twice.' },
    ],
  },

  'false-ceiling-calculator:australia': {
    howItIsCalculated: [
      'Areas are worked in square metres against Australian plasterboard sizes — 2400×1200mm and 3600×1200mm sheets in 10mm standard or 13mm for ceilings at wider batten spacing.',
      'Australian ceilings are typically fixed to timber or steel battens at 450mm centres rather than a suspended grid, except in commercial fit-outs where a 1200×600mm grid tile system is standard.',
      'Cornice is calculated separately: 90mm cove cornice is the Australian domestic default, sold in 4.2m and 5.4m lengths.',
    ],
    faqs: [
      { question: 'What thickness plasterboard for an Australian ceiling?', answer: '10mm is standard for ceilings on battens at 450mm centres. Move to 13mm where battens are at 600mm centres, or where the sheet runs across the batten direction — 10mm at 600mm centres will sag visibly over time.' },
      { question: 'Do I need ceiling battens?', answer: 'Almost always. Fixing plasterboard directly to the underside of ceiling joists rarely gives a flat plane, because joists crown and twist. Battens at 450mm centres let you pack and level the whole ceiling before a single sheet goes up.' },
      { question: 'How much cornice do I need?', answer: 'Measure the room perimeter and add 10-15% for mitres — every internal and external corner consumes length in the cut, and a mitred cornice joint is unforgiving of a short piece. 90mm cove is the domestic standard; 55mm reads better in a low-ceilinged room.' },
      { question: 'What about insulation and downlights?', answer: 'AS/NZS 3000 and the downlight manufacturer set minimum clearances between insulation and fittings. Modern IC-rated LED downlights can be covered by insulation; older halogen fittings cannot and need a physical barrier. This is a genuine fire risk, not a formality.' },
      { question: 'Does a false ceiling need access panels?', answer: 'If it conceals plumbing, ducted air conditioning or electrical junctions, yes — and your inspector will look for them. Plan access hatches before sheeting rather than cutting them in afterwards, which almost always lands the hatch somewhere visible.' },
    ],
  },

  'brick-calculator:uk': {
    howItIsCalculated: [
      'UK bricks are a single standard size — 215×102.5×65mm — which with a 10mm mortar joint gives a 225×75mm module and works out at 60 bricks per square metre of half-brick (single skin) wall.',
      'Most UK housing is cavity wall: two skins with a 50-100mm cavity, wall ties at 900mm horizontal and 450mm vertical centres, so a cavity wall needs double the brick count plus ties.',
      'Mortar is specified by designation under BS EN 1996 rather than by American type letters — designation (iii) for general above-ground work, (ii) where exposure is severe or below DPC.',
    ],
    faqs: [
      { question: 'How many bricks per square metre?', answer: '60 for a half-brick single skin wall, 120 for a one-brick or cavity wall counting both skins. UK brick size is standardised, so unlike the US you do not need to check the module before ordering.' },
      { question: 'What mortar mix should I use?', answer: 'Designation (iii), roughly 1:1:6 cement:lime:sand, for general above-ground brickwork. Designation (ii) at 1:0.5:4 below DPC or in severe exposure. Lime matters — it lets the mortar flex and self-heal, which a straight cement mix will not.' },
      { question: 'Do I need wall ties?', answer: 'In any cavity wall, yes. Stainless steel ties at 900mm horizontally and 450mm vertically, closer at reveals and movement joints. Ties should slope slightly towards the outer leaf so water runs outward rather than tracking inward.' },
      { question: 'What about the DPC?', answer: 'A damp proof course is required at least 150mm above finished ground level, and it must be continuous and linked to the floor DPM. UK ground is wet enough that rising damp is a real and common failure, not a theoretical one.' },
      { question: 'How many bricks can a bricklayer lay in a day?', answer: 'An experienced UK bricklayer lays 500-600 facing bricks a day on straight runs, dropping sharply around openings, corners and detailing. Two-person gangs with a labourer are standard on domestic work.' },
    ],
  },
  'brick-calculator:india': {
    howItIsCalculated: [
      'The Indian standard brick is 190×90×90mm under IS 1077, though the traditional country brick at roughly 230×110×70mm remains far more common on site — the calculator assumes 230mm unless you change it.',
      'Walls are described by thickness in inches: a 4.5-inch (half brick) partition and a 9-inch (full brick) load-bearing wall, which take roughly 55 and 110 bricks per square metre respectively with a 10mm joint.',
      'Mortar is cement-sand without lime, typically 1:6 for 9-inch walls and 1:4 for 4.5-inch partitions, with cement in 50kg bags and sand purchased by the brass (100 cu ft).',
    ],
    faqs: [
      { question: 'How many bricks for a 10x10 ft wall?', answer: 'A 10×10 ft 9-inch wall needs roughly 1,000-1,100 country bricks including wastage. A 4.5-inch partition of the same area needs about 500-550. Always order 5-10% extra — breakage in transit and handling is significant with country brick.' },
      { question: 'What is the difference between 4.5 inch and 9 inch walls?', answer: 'A 4.5-inch wall is a single brick on edge and is non-load-bearing — it is for internal partitions only. A 9-inch wall is a full brick width and can carry load. Using a 4.5-inch wall where a 9-inch is required is a common and serious site shortcut.' },
      { question: 'How much cement and sand for brickwork?', answer: 'A 1:6 mortar for 9-inch walls needs roughly 1.2-1.4 bags of 50kg cement per 100 sq ft of wall, with sand at about six times the cement by volume. Add extra for the bed and the vertical perpend joints.' },
      { question: 'Should bricks be soaked before laying?', answer: 'Yes, and it is critical in India. Country bricks are highly absorbent and will suck water out of the mortar before it can hydrate, leaving a weak joint. Soak them thoroughly for several hours — until the bubbles stop — and lay them damp but surface-dry.' },
      { question: 'AAC block or clay brick?', answer: 'AAC blocks are lighter, faster to lay, give better thermal performance and reduce dead load on the structure, which matters in multi-storey work. Clay brick is cheaper per unit, better understood by most masons, and stronger in compression. AAC is taking share in urban construction for good reasons.' },
    ],
  },
  'brick-calculator:australia': {
    howItIsCalculated: [
      'The Australian standard brick is 230×110×76mm, which with a 10mm joint gives a 240×86mm module and about 48-50 bricks per square metre of single skin.',
      'Brick veneer over a timber or steel frame is the dominant Australian construction method, so the brickwork is a single non-structural skin tied back to the frame rather than a loadbearing double wythe.',
      'AS 3700 requires articulation joints at roughly 6m centres in clay brickwork to accommodate long-term expansion — clay bricks grow after firing, which is the opposite of concrete block behaviour.',
    ],
    faqs: [
      { question: 'How many bricks per square metre in Australia?', answer: 'About 48-50 for a single skin at the standard 230×110×76mm size with a 10mm joint. Double-skin cavity work doubles that. Merchants sell by the pack, typically 500 or so per pack, so round to whole packs.' },
      { question: 'What is brick veneer?', answer: 'A single non-structural brick skin tied to a load-bearing timber or steel frame behind, with a cavity between. It is the standard Australian house wall. The bricks carry no building load — they are a weather skin and a finish, which is why articulation and tie spacing matter so much.' },
      { question: 'Why do I need articulation joints?', answer: 'Clay bricks expand over years as they reabsorb moisture after firing. Without vertical articulation joints at roughly 6m centres and at changes of height, that expansion cracks the wall — usually diagonally from a window corner. This is the most common brickwork defect in Australian housing.' },
      { question: 'What mortar do I use?', answer: 'M3 mortar, roughly 1:1:6 cement:lime:sand, for general above-ground work. M4 in severe marine exposure or below DPC. Do not omit the lime — a straight cement mortar is too rigid and transfers movement straight into the bricks.' },
      { question: 'Does bushfire rating affect brickwork?', answer: 'Brick itself performs well, but the detailing is regulated. Under AS 3959, higher BAL ratings require weep holes to be screened or sized to exclude embers, and the cavity and eaves detailing to be sealed. Check your BAL assessment before finalising the wall build-up.' },
    ],
  },

  'roofing-calculator:uk': {
    howItIsCalculated: [
      'UK roofs are tiled or slated, not shingled. Coverage is calculated in tiles per square metre at the chosen gauge — roughly 9.7/m² for concrete interlocking tiles, 16-18/m² for plain tiles, and by slate size for natural slate.',
      'Battens and a breathable underlay membrane are counted separately, since UK roofs are always battened rather than laid on a continuous deck.',
      'BS 5534 sets minimum pitches by covering: about 22.5° for most interlocking concrete tiles, 35° for plain tiles and 25° for natural slate — below which the covering will not shed water reliably regardless of underlay.',
    ],
    faqs: [
      { question: 'How many roof tiles per square metre?', answer: 'About 9.7 for standard concrete interlocking tiles at maximum gauge, and 16-18 for plain tiles which are double-lapped. Natural slate depends on size and lap. Always work from the manufacturer’s gauge table rather than a generic figure.' },
      { question: 'What pitch do I need?', answer: 'BS 5534 minimums: roughly 22.5° for interlocking concrete tiles, 35° for plain tiles, 25° for natural slate. Below those you need a different covering entirely — a single-ply membrane or standing seam metal, not tiles with extra underlay.' },
      { question: 'Do I need a breathable membrane?', answer: 'Modern UK practice is a breathable underlay, which allows the roof space to dry without separate high-level ventilation in many cases. Older bitumen felt requires ventilation at eaves and ridge. Mixing the two approaches is how condensation problems start.' },
      { question: 'Are tiles mechanically fixed?', answer: 'Since the 2014 revision of BS 5534, yes — every tile must be mechanically fixed, and mortar alone is no longer accepted for ridge and hip tiles. Dry ridge and dry verge systems are now the norm on new and re-roofed work.' },
      { question: 'Do I need planning permission or building regs?', answer: 'A like-for-like re-roof is usually permitted development, but Building Regulations still apply if you replace more than 25% of the roof area — which typically triggers an insulation upgrade to current Part L standards. Check with building control before stripping.' },
    ],
  },
  'roofing-calculator:india': {
    howItIsCalculated: [
      'Most Indian houses have a flat RCC slab roof rather than a pitched covering, so the calculator estimates waterproofing and protective screed over the slab area alongside any sloped-roof material.',
      'Where a pitched roof is used, Mangalore clay tiles (about 15 tiles per square metre) and profiled metal sheet are the dominant coverings, laid on a timber or steel purlin frame.',
      'Monsoon intensity drives the design: Indian roofs need far greater drainage capacity than temperate ones, so rainwater outlet sizing and slope to the outlets are estimated as part of the job.',
    ],
    faqs: [
      { question: 'How do I waterproof an RCC roof slab?', answer: 'The common systems are APP-modified bitumen membrane torched onto a primed slab, liquid-applied acrylic or PU coating, or a brickbat coba screed. Whichever you choose, the slope to the outlets matters more than the product — water that ponds will find a way through any membrane eventually.' },
      { question: 'How many Mangalore tiles per square metre?', answer: 'Roughly 15 per square metre, or about 1.4 per square foot, depending on the manufacturer’s lap. Order 8-10% extra — clay tiles break in transit and during laying, and matching a discontinued profile later is difficult.' },
      { question: 'What slope does a flat roof need?', answer: 'A minimum 1 in 100 fall towards the rainwater outlets, and 1 in 80 is better given Indian rainfall intensity. Achieve it with a screed laid to falls, not by relying on the slab itself — a structural slab is cast level and will hold water in the middle.' },
      { question: 'How do I stop heat gain through the roof?', answer: 'A top-floor RCC slab under Indian sun is the single largest heat load in the house. Options in rough order of effectiveness: a reflective cool-roof coating, broken china or brickbat coba, an insulated overdeck, or a shaded pergola. All of them also extend the waterproofing life.' },
      { question: 'When should waterproofing be done?', answer: 'Well before monsoon — ideally in the dry season with several clear weeks, since membranes and coatings need a genuinely dry substrate to bond. Waterproofing applied to damp concrete in a humid week is the most common reason it fails within a year.' },
    ],
  },
  'roofing-calculator:australia': {
    howItIsCalculated: [
      'Australian roofs are predominantly sheet metal — Colorbond or Zincalume corrugated and trapezoidal profiles — or concrete tile. Sheet is estimated in linear metres of run and total square metres, tile in tiles per square metre.',
      'Metal sheet can go to much lower pitches than tile: roughly 5° for corrugated and as low as 2° for some trapezoidal profiles, against about 15-20° minimum for concrete tile under AS 4046.',
      'Fixing density is a structural matter, not a finish detail. AS 1562 and the wind region classification determine screw spacing, and cyclonic regions C and D require substantially more fixings plus cyclone washers.',
    ],
    faqs: [
      { question: 'Colorbond or concrete tile?', answer: 'Sheet metal is lighter, faster to install, goes to lower pitches, handles bushfire exposure better and sheds heavy rain fast. Tile is quieter in rain, holds heat differently and suits some architectural styles. Metal now dominates new Australian residential roofing for good reasons.' },
      { question: 'What roof pitch do I need?', answer: 'About 5° minimum for corrugated sheet, 2-3° for some trapezoidal profiles with sealed laps, and 15-20° for concrete tile. Below the minimum for your profile, capillary action draws water back up the lap regardless of how well it is screwed down.' },
      { question: 'Does my wind region change the fixings?', answer: 'Significantly. Regions C and D — most of coastal Queensland, the NT and northern WA — require cyclone-rated fixings, tighter screw spacing and additional battens and tie-downs under AS 1562 and AS 4055. Using region A detailing in a cyclone region is both non-compliant and genuinely dangerous.' },
      { question: 'What about bushfire requirements?', answer: 'AS 3959 governs construction in bushfire-prone areas. Higher BAL ratings require non-combustible roofing, ember-proof sealing at ridges, valleys and eaves, and gutter guard. A BAL assessment should come before roof material selection, not after.' },
      { question: 'Can I collect rainwater from this roof?', answer: 'Yes, and it is common practice. Colorbond and Zincalume are both suitable for potable collection. Avoid lead flashings on a drinking-water roof, keep the first-flush diverter in the system, and check your council’s tank rebate — several still offer one.' },
    ],
  },

  'insulation-calculator:uk': {
    howItIsCalculated: [
      'UK insulation is specified by U-value — the rate heat passes through the whole build-up — not by R-value alone, because Building Regulations Part L sets maximum U-values for each element rather than a minimum product rating.',
      'Loft insulation is measured in millimetres of mineral wool: 270mm is the current recommended depth, usually 100mm between joists and 170mm laid across them to break the thermal bridge.',
      'Rolls are sold by square metre coverage per pack, so the calculator converts area to packs at the chosen thickness rather than to American batt counts.',
    ],
    faqs: [
      { question: 'How thick should loft insulation be?', answer: '270mm of mineral wool is the current recommendation. Lay the first 100mm between the joists and the remaining 170mm at right angles across them — insulating only between joists leaves the timber as a continuous cold bridge and loses a surprising amount of the benefit.' },
      { question: 'What is a U-value and why does it matter here?', answer: 'It is watts lost per square metre per degree of temperature difference — lower is better, the inverse of R-value. Part L sets maximum U-values by element (roughly 0.16 for a new roof, 0.18 for walls), and building control checks the calculated build-up, not the product label.' },
      { question: 'Can I insulate a cavity wall myself?', answer: 'No. Cavity wall insulation is blown in by an installer through drilled holes and needs a suitability survey first. Filling a cavity on an exposed or already-damp wall can bridge it and cause penetrating damp — one of the most common retrofit failures in UK housing.' },
      { question: 'Should I insulate between or over the rafters?', answer: 'Between and under the rafters with PIR board for a warm roof in a loft conversion, which keeps the structure warm and dry. Insulating only at ceiling level is cheaper but leaves the loft cold, which is fine for storage and wrong for a habitable room.' },
      { question: 'Do I need a vapour control layer?', answer: 'On any warm-roof or internal wall insulation build-up, yes, on the warm side of the insulation. UK interiors are humid and the dew point sits inside the construction — without a VCL that moisture condenses in the insulation and rots the timber behind it.' },
    ],
  },
  'insulation-calculator:india': {
    howItIsCalculated: [
      'Indian insulation is about keeping heat out, not in, so the calculator prioritises roof and west-facing wall area — the surfaces taking direct sun load — rather than the whole envelope.',
      'The dominant products are extruded and expanded polystyrene board over the RCC slab, reflective aluminium foil under the roof, and increasingly rock wool where acoustic performance also matters.',
      'Board is sold by the square metre or by the sheet in 25mm, 50mm and 75mm thicknesses, so area converts to sheets at the chosen thickness.',
    ],
    faqs: [
      { question: 'Is insulation actually worth it in India?', answer: 'On a top-floor roof slab, very much so. An uninsulated RCC slab under direct sun can push ceiling surface temperatures well above 40°C and is the single biggest driver of air-conditioning load. Roof insulation typically pays back faster than any other building fabric measure here.' },
      { question: 'Where should I insulate first?', answer: 'The roof, then west and south-west facing walls, then east walls. Floor and north-wall insulation give almost nothing in most Indian climates. Spending the budget on the roof alone is usually better than spreading it thinly across the whole envelope.' },
      { question: 'Over-deck or under-deck insulation?', answer: 'Over-deck — insulation above the slab, under the waterproofing and screed — performs better because it keeps the thermal mass of the slab on the cool side. Under-deck false ceilings are easier to retrofit but let the slab itself heat up and radiate into the room all evening.' },
      { question: 'What about reflective foil?', answer: 'Aluminium foil works by reflecting radiant heat and needs an air gap facing the radiant source to do anything at all. Sandwiched tight between materials it is close to useless. It is a cheap addition to a proper insulation layer, not a replacement for one.' },
      { question: 'Does insulation help during monsoon?', answer: 'Indirectly. It does not stop water, but it raises internal surface temperatures and reduces condensation on ceilings in humid weather. The waterproofing layer is what keeps water out — never rely on insulation for that, and never install it over a slab that is not already watertight.' },
    ],
  },
  'insulation-calculator:australia': {
    howItIsCalculated: [
      'Australia uses R-values like the US, but the targets are set by climate zone under the NCC — ceiling insulation ranges from about R2.5 in tropical Darwin to R6.0 or R7.0 in alpine zones.',
      'Batts are sold by pack coverage in square metres, sized to fit 450mm and 600mm frame centres, so the calculator converts area to packs at the chosen R-value.',
      'Reflective foil sarking is counted separately from bulk insulation, because in hot northern zones the radiant barrier does more work than added thickness.',
    ],
    faqs: [
      { question: 'What R-value do I need in Australia?', answer: 'It depends on climate zone: roughly R2.5-R4.1 ceilings in tropical and subtropical zones, R5.0-R6.0 in temperate Melbourne and Sydney, and R6.0-R7.0 in alpine areas. Walls are typically R2.0-R2.7. Your NCC climate zone sets the minimum.' },
      { question: 'Do I insulate for heat or cold?', answer: 'Both, and which dominates changes the strategy. In Brisbane and north, keeping summer heat out matters most, so reflective sarking and roof ventilation carry real weight. In Melbourne, Canberra and Tasmania, retaining winter heat dominates and bulk insulation thickness matters more.' },
      { question: 'Can insulation touch downlights?', answer: 'Only if the fitting is IC-rated. Older halogen downlights need a clearance barrier and have caused house fires where insulation was laid over them. If you are insulating an older ceiling, replace non-IC fittings at the same time — it is cheaper than doing the ceiling twice.' },
      { question: 'What about bushfire areas?', answer: 'AS 3959 restricts materials in higher BAL zones and, more importantly, requires ember-proof sealing at eaves, vents and roof penetrations. Insulation must not block required roof ventilation, and sarking in bushfire areas needs to meet a flammability index limit.' },
      { question: 'Do I need a vapour barrier?', answer: 'Less often than in colder climates, and getting it wrong can trap moisture. In hot humid zones the vapour drive is inward, the opposite of the northern hemisphere, so a barrier on the internal face can cause the problem it is meant to prevent. Follow the NCC condensation provisions for your zone.' },
    ],
  },

  'plumbing-pipe-calculator:uk': {
    howItIsCalculated: [
      'UK pipe is sized in millimetres by outside diameter: 15mm to most fixtures, 22mm for main runs and bath fills, 28mm for larger mains, and 10mm microbore on some heating circuits.',
      'The calculator estimates against typical UK domestic layouts, where a combi boiler feeds hot directly at mains pressure rather than from a stored cylinder and gravity-fed tank.',
      'Sizing follows the loading unit method in BS 8558 and BS EN 806 rather than the American WSFU tables, though the underlying probability logic is the same.',
    ],
    faqs: [
      { question: 'What size pipe do I need in a UK house?', answer: '22mm for the incoming main and primary runs, dropping to 15mm for individual fixtures. A bath fill wants 22mm to fill in reasonable time. 10mm microbore appears on some heating systems but is easily blocked and is generally avoided in new work.' },
      { question: 'Copper, plastic push-fit or PEX?', answer: 'Copper is durable, rigid and required within certain distances of a boiler. Push-fit plastic is far faster, tolerates freezing better and is now widely accepted, but needs pipe inserts at every joint and proper support. Most modern UK installs mix both.' },
      { question: 'Does a combi boiler change the sizing?', answer: 'Yes, significantly. A combi delivers hot water at mains pressure and flow, so your incoming main becomes the constraint — if it is an old 15mm lead or iron supply, no amount of internal 22mm pipework will fix poor flow. Check the mains flow rate in litres per minute before specifying a combi.' },
      { question: 'What are the Water Regulations requirements?', answer: 'Fittings must be WRAS-approved or equivalent, and backflow prevention is mandatory on outside taps and any connection where contamination is possible. Notifiable work must be reported to your water undertaker. These are legal requirements, not guidance.' },
      { question: 'How do I stop pipes freezing?', answer: 'Insulate everything in lofts, garages and against external walls, and keep pipes on the warm side of insulation wherever possible. A loft pipe above the insulation line will freeze in a UK cold snap — burst pipes in unheated lofts are one of the most common winter insurance claims.' },
    ],
  },
  'plumbing-pipe-calculator:india': {
    howItIsCalculated: [
      'Indian domestic plumbing is predominantly CPVC for hot and UPVC or PVC for cold and drainage, sized in inches — 1/2 inch to fixtures, 3/4 inch and 1 inch on risers and mains.',
      'Most Indian buildings run on an overhead tank with gravity feed, so available head in metres — not mains pressure — is the governing variable, and the calculator reflects that.',
      'Sizing follows the National Building Code and IS 1172 fixture-unit conventions, with an allowance for the intermittent municipal supply most Indian homes plan around.',
    ],
    faqs: [
      { question: 'CPVC, UPVC or PPR?', answer: 'CPVC for hot water lines, UPVC for cold water and drainage. PPR is used in some commercial and high-rise work and is fusion-welded rather than solvent-cemented. Never use UPVC for hot water — it softens and sags well below the temperature a geyser delivers.' },
      { question: 'What pipe size do I need for an overhead tank?', answer: '1 inch from the tank on the main down-take, 3/4 inch on branch risers and 1/2 inch to individual fixtures. With gravity feed the tank height matters as much as the diameter — roughly 0.1 bar per metre of head, so a tank only 3m above the fixture gives very little pressure.' },
      { question: 'Why is my shower pressure so low?', answer: 'Usually insufficient head rather than pipe size. A tank 3m above a shower gives about 0.3 bar, which will not drive a rain shower or most mixer valves. Either raise the tank, or fit a pressure pump — increasing pipe diameter alone will not create pressure that is not there.' },
      { question: 'How do I plan for intermittent municipal supply?', answer: 'Design around storage: an underground sump fed during supply hours, a pump to the overhead tank, and gravity distribution from there. Size the overhead tank for at least a day of consumption — roughly 135 litres per person per day is the usual planning figure.' },
      { question: 'Should pipes be concealed in walls?', answer: 'Concealed CPVC in wall chases is standard Indian practice and looks far better, but leaves no access. Pressure-test the full installation and photograph every run before plastering — tracing a concealed leak later means breaking finished wall and tile.' },
    ],
  },
  'plumbing-pipe-calculator:australia': {
    howItIsCalculated: [
      'Australian pipe is sized in millimetres by nominal diameter: 20mm to most fixtures, 25mm on main runs, and 32mm or larger on longer mains or higher fixture counts.',
      'Sizing follows AS/NZS 3500.1, which uses a loading unit method comparable to the American WSFU approach but with Australian fixture ratings and probable simultaneous demand curves.',
      'Every fitting and pipe must carry WaterMark certification to be legal in an Australian installation, and most plumbing work must be carried out and certified by a licensed plumber.',
    ],
    faqs: [
      { question: 'What size water pipe for an Australian house?', answer: '20mm to fixtures and 25mm for the main run covers most homes. Go to 32mm where the run from the meter is long, where there are several bathrooms, or where street pressure is marginal. Your plumber sizes this against AS/NZS 3500.1 and local water authority pressure data.' },
      { question: 'Copper or PEX?', answer: 'PEX dominates new Australian residential work — faster, fewer joints, tolerates ground movement and freezing better. Copper is still used for exposed work, near hot water units, and where a plumber prefers it. Both are WaterMark certified and compliant.' },
      { question: 'Do I need a tempering valve?', answer: 'Yes. AS/NZS 3500.4 requires water delivered to bathroom and ensuite outlets to be limited to 50°C in new residential work, and 45°C in facilities for young children and the elderly. The tempering valve is a legal requirement, not an optional safety extra.' },
      { question: 'Can I do my own plumbing in Australia?', answer: 'Almost never. Water supply and drainage work is licensed in every state, and unlicensed work is illegal, uninsurable and will fail at sale. Replacing a tap washer or a showerhead is generally fine; anything involving pipework is not.' },
      { question: 'What about rainwater tank connections?', answer: 'Connecting a tank to internal plumbing requires backflow prevention to protect the mains, and in most states a licensed plumber and council notification. Many councils offer rebates for compliant installs, so check before you pay for the work.' },
    ],
  },

  'drywall-calculator:uk': {
    howItIsCalculated: [
      'UK plasterboard is 1200mm wide in 2400mm and 2700mm lengths, in 9.5mm and 12.5mm thicknesses — not the 4×8 and 4×12 foot sheets the American figures assume.',
      'The standard UK finish is a 2-3mm skim coat of finish plaster over the whole board, taped at joints — not the taped-and-jointed-only system used across North America.',
      'Fixings are drywall screws to timber at 300mm centres, or dot-and-dab adhesive dabs direct to masonry, which is how most UK walls are actually lined.',
    ],
    faqs: [
      { question: 'What size is UK plasterboard?', answer: '1200×2400mm is standard, with 1200×2700mm used for taller rooms. Thickness is 9.5mm for most walls and 12.5mm where greater strength, acoustic or fire performance is needed. Ceilings normally take 12.5mm at 400mm joist centres.' },
      { question: 'What is dot and dab?', answer: 'Fixing boards to masonry with adhesive dabs rather than battens — the standard UK method for lining solid walls. It is fast and needs no framing, but leaves a void that can bridge damp on an external wall, so it is not appropriate everywhere.' },
      { question: 'Do I need to skim or can I just tape?', answer: 'UK practice is a full skim coat, which gives a harder, flatter finish ready for paint. Tape-and-joint is accepted and faster, but the results depend heavily on the finisher and it is less common on domestic work here. Skim is what most UK decorators expect to paint onto.' },
      { question: 'Which board for a bathroom?', answer: 'Moisture-resistant board — green-faced — throughout a bathroom, and cement board or a tanked system behind tiles in a shower. Standard board behind shower tiling will eventually fail, whatever the grout and sealant look like from the outside.' },
      { question: 'How heavy is a sheet?', answer: 'A 1200×2400mm sheet of 12.5mm board is about 22kg. Manageable for one person on a wall, genuinely difficult overhead — hire a board lifter for ceilings rather than attempting it with a prop and optimism.' },
    ],
  },
  'drywall-calculator:india': {
    howItIsCalculated: [
      'Drywall is far less common in Indian construction than brick-and-plaster, so this estimate assumes gypsum board partitions on a GI stud frame — typically office fit-outs, apartment partitioning and false ceilings rather than whole-house walls.',
      'Boards are sold as 1220×2440mm (4×8 ft) sheets in 12.5mm thickness, with GI studs and channels at 600mm centres.',
      'Quantities are shown in square feet as well as square metres, since Indian contractors quote partition work per square foot.',
    ],
    faqs: [
      { question: 'Is drywall used in Indian homes?', answer: 'Rarely for external or structural walls, which are almost always brick or block with cement plaster. Gypsum partitions are common in offices, in apartment interiors for non-load-bearing divisions, and very widely for false ceilings. For a whole-house build, brick remains the default.' },
      { question: 'Gypsum partition or brick wall?', answer: 'Gypsum is far lighter, much faster, and creates no wet mess — valuable in an occupied flat or a high-rise where dead load matters. Brick gives better sound insulation, takes wall-hung loads without special fixings, and is what most Indian buyers expect. Cost per square foot is broadly comparable once framing is included.' },
      { question: 'How is sound handled in a gypsum partition?', answer: 'Double-boarding each face, glass wool infill in the cavity, and staggered studs all help substantially. A single-board partition with an empty cavity transmits conversation clearly and is the usual source of complaints about gypsum walls in Indian apartments.' },
      { question: 'Does humidity affect gypsum board?', answer: 'Yes. Use moisture-resistant board in kitchens, bathrooms and anywhere on a coastal ground floor. Standard board in a humid unventilated room will sag and grow mould at the joints, particularly through monsoon.' },
      { question: 'What does gypsum partition cost per square foot?', answer: 'Roughly ₹110-180 per sq ft for a single-board partition on a GI frame including labour, rising to ₹200-280 for double-boarded and insulated acoustic partitions. Prices vary considerably by city and by brand of board.' },
    ],
  },
  'drywall-calculator:australia': {
    howItIsCalculated: [
      'Australian plasterboard is 1200mm wide in 2400, 2700, 3000 and 3600mm lengths, in 10mm for walls and 13mm for ceilings at wider batten spacing.',
      'Sheets are normally fixed horizontally to timber or steel studs at 450mm or 600mm centres, glued with stud adhesive and screwed only at the edges — the adhesive carries most of the load.',
      'Set joints are taped and topped with three coats, then the whole wall is sanded to a Level 4 finish before painting; a full skim is unusual in Australian domestic work.',
    ],
    faqs: [
      { question: 'What thickness plasterboard for Australian walls?', answer: '10mm is standard for walls at 450 or 600mm stud centres, and 13mm for ceilings — particularly where battens are at 600mm, where 10mm will sag between them over time. 13mm is also used where acoustic or fire performance is specified.' },
      { question: 'Why glue as well as screw?', answer: 'Australian practice uses stud adhesive down each stud with screws only near the sheet edges. The glue does the structural work and the reduced screw count means far fewer fastener heads to set and sand — and fewer nail pops later as the frame dries out.' },
      { question: 'What board do I use in a wet area?', answer: 'Water-resistant board throughout the bathroom, and a compliant waterproofing membrane over it in the shower under AS 3740. Board alone is not waterproofing, no matter which grade it is — the membrane is a separate, certified layer.' },
      { question: 'Do I need fire-rated board?', answer: 'For garage walls and ceilings shared with habitable space, for walls between attached dwellings, and wherever the NCC specifies an FRL. Fire-rated systems are tested as complete assemblies, so substituting a different board or fixing pattern voids the rating.' },
      { question: 'What is a Level 4 finish?', answer: 'The Australian domestic standard: taped joints with three coats of compound, sanded, ready for standard paint. Level 5 adds a full skim and is needed for gloss paint or walls in strong raking light, where Level 4 joints will otherwise show.' },
    ],
  },

  'wallpaper-calculator:uk': {
    howItIsCalculated: [
      'UK wallpaper rolls are a European standard 10.05m long by 530mm wide, which gives four drops per roll at typical 2.4m ceiling heights — quite different from the American 20.5 inch by 33 foot roll.',
      'Rolls are sold singly here rather than as the American double roll, so the calculator returns the number you actually buy.',
      'Pattern repeat is measured in centimetres and deducted from usable roll length, since each drop must be cut to height plus one full repeat.',
    ],
    faqs: [
      { question: 'How many rolls of wallpaper do I need?', answer: 'A standard 10.05m roll gives four 2.4m drops with a plain paper, fewer with a large repeat. A typical 4×4m room with 2.4m ceilings needs about 5-6 rolls plain, or 7-8 with a 50cm+ repeat. Always buy one spare roll from the same batch.' },
      { question: 'What is the difference between paste-the-wall and paste-the-paper?', answer: 'Paste-the-wall papers have a non-woven backing, do not expand when wet, need no soaking time and strip off dry later. They are considerably easier to hang and are now the default for most UK ranges. Traditional paste-the-paper needs booking time and stretches as it wets.' },
      { question: 'Do I need to line the walls first?', answer: 'On anything uneven, previously painted in a dark colour, or newly plastered, yes. Lining paper hung horizontally gives a stable, uniform surface and stops the wall colour showing through. It is an extra day that usually shows in the finished result.' },
      { question: 'How do I handle a chimney breast?', answer: 'Centre the pattern on the chimney breast and work outward in both directions, since it is the focal point of the room. Working from a corner instead almost always leaves a mismatched or badly cut pattern right where the eye goes first.' },
      { question: 'Can I paper over artex?', answer: 'Not directly. Textured coatings need skimming or lining with a heavy lining paper first. Note that artex applied before the mid-1980s may contain asbestos — have it tested before sanding or scraping anything.' },
    ],
  },
  'wallpaper-calculator:india': {
    howItIsCalculated: [
      'Wallpaper in India is usually sold by the roll covering roughly 50-57 sq ft — importers quote coverage per roll rather than a standard length, so the calculator works from coverage rather than assuming a roll size.',
      'Most Indian wallpaper is vinyl or non-woven imported from Korea, China and Europe, and is hung on cement-plaster walls finished with wall putty rather than on plasterboard.',
      'Wall preparation is estimated alongside, because an unputtied cement plaster wall will show through and will not release the paper cleanly later.',
    ],
    faqs: [
      { question: 'How many rolls for a 10x12 room?', answer: 'A 10×12 ft room with 10 ft ceilings has about 440 sq ft of wall. At roughly 50 sq ft usable per roll after pattern matching, that is 9-10 rolls. Most Indian dealers sell a 16.5 ft × 3.5 ft roll covering around 57 sq ft, so confirm coverage before ordering.' },
      { question: 'Will wallpaper survive Indian humidity?', answer: 'Vinyl-coated papers do well; paper-backed ones struggle in coastal cities and through monsoon. The bigger risk is the wall behind — any rising or penetrating damp will lift the paper within a season. Fix the damp source first, or you will do the room twice.' },
      { question: 'Do I need wall putty before wallpaper?', answer: 'Yes, on cement plaster. Two coats of white cement putty give a smooth, low-absorbency surface. Hanging straight onto rough plaster shows every undulation through the paper and makes future removal destructive to the wall.' },
      { question: 'Wallpaper or paint for Indian walls?', answer: 'Paint is cheaper, easier to touch up and copes better with damp. Wallpaper gives texture and pattern that paint cannot, and a good vinyl will last 8-10 years indoors. Many Indian homes use wallpaper on a single feature wall and paint elsewhere, which is a sensible compromise.' },
      { question: 'What does wallpaper installation cost?', answer: 'Material runs roughly ₹1,200-4,000 per roll depending on origin and design, with installation at ₹300-600 per roll. Wall putty preparation, if needed, adds ₹20-35 per sq ft. Imported European brands sit well above that range.' },
    ],
  },
  'wallpaper-calculator:australia': {
    howItIsCalculated: [
      'Australian wallpaper follows the European standard roll — 10.05m by 530mm — which gives four drops at a typical 2.4m ceiling height, and rolls are sold singly rather than as double rolls.',
      'Non-woven paste-the-wall papers dominate the Australian market, so the calculator assumes no soaking or expansion allowance.',
      'Pattern repeat is deducted from usable roll length in centimetres, since each drop is cut to ceiling height plus one repeat.',
    ],
    faqs: [
      { question: 'How many rolls will I need?', answer: 'A 10.05m roll gives four 2.4m drops with a plain paper. A typical 4×4m room needs 5-6 rolls plain, 7-8 with a large repeat. Order all rolls in one batch — Australian stockists often import in small runs and a matching batch may not be available later.' },
      { question: 'Does wallpaper work in Australian humidity?', answer: 'In Melbourne, Adelaide and Canberra, easily. In Brisbane, Darwin and coastal Queensland, use vinyl or non-woven rather than paper-backed, ensure the room ventilates, and avoid unconditioned rooms entirely. Mould behind wallpaper is a genuine problem in the tropical north.' },
      { question: 'Can I wallpaper over plasterboard?', answer: 'Yes, provided the board is sealed first with a wallpaper size or a sealer-undercoat. Hanging directly onto unsealed plasterboard bonds the paper to the paper face, and removing it later will tear the board surface off with it.' },
      { question: 'What about feature walls?', answer: 'A single papered wall behind a bed or sofa is the common Australian approach and uses a fraction of the material. Choose the wall without windows or doors — a feature wall interrupted by openings loses most of the visual effect and wastes far more paper.' },
      { question: 'Do I need to prepare the walls?', answer: 'Fill and sand any defects, wash off dust, and seal. Wallpaper conceals far less than people expect — a wall that looks acceptable under flat paint will telegraph every dent and joint through a smooth vinyl paper, especially in raking afternoon light.' },
    ],
  },

  'fence-calculator:uk': {
    howItIsCalculated: [
      'UK fencing is sold as pre-made panels, almost always 1.83m (6ft) wide, in heights from 0.9m to 1.83m — so the calculator works in panels and posts rather than in individual pickets.',
      'Posts are 100×100mm timber or concrete, set at 1.83m centres to suit the panel width, with concrete spurs commonly used to repair rather than replace rotted timber posts.',
      'Postcrete or a 1:6 ballast mix is estimated at roughly one to two bags per post depending on post size and hole depth.',
    ],
    faqs: [
      { question: 'How many fence panels do I need?', answer: 'Divide the run by 1.83m and round up, then add one post — a 20m fence needs 11 panels and 12 posts. Gravel boards beneath each panel are standard UK practice and keep the panel out of ground contact, which is what usually rots it first.' },
      { question: 'How deep should fence posts be?', answer: 'At least 600mm for a 1.8m fence, and deeper on exposed or windy sites. A tall close-board fence is effectively a sail — post depth and concrete volume are what keep it standing through a UK winter gale.' },
      { question: 'How high can I build a fence without permission?', answer: 'Generally 2m, dropping to 1m where the fence adjoins a highway used by vehicles. Listed buildings and conservation areas have tighter rules. Exceeding the limit needs planning permission, and neighbours do complain.' },
      { question: 'Which side of the fence is mine?', answer: 'There is no universal rule, despite the common belief about posts facing your neighbour. Check the title plan and any T-marks on it, which indicate responsibility for a boundary. Get this right before spending money on a fence that may not be yours.' },
      { question: 'Timber or concrete posts?', answer: 'Concrete posts outlast timber by decades and let you slot panels in without fixings, which makes replacing a storm-damaged panel trivial. Timber looks better and costs less initially. If you have already replaced rotted timber posts once, go concrete.' },
    ],
  },
  'fence-calculator:india': {
    howItIsCalculated: [
      'Indian boundary treatment is usually a masonry compound wall rather than a fence, so this estimate covers both — brick or block wall lengths, and lighter chain-link or MS grill fencing for plots and farm boundaries.',
      'Compound walls are typically 9-inch brickwork on a strip footing with RCC columns at 3m centres and a coping course, so cement, sand, brick and steel are estimated together.',
      'Chain-link runs are calculated against MS angle or GI pipe posts at 3m centres, set in a 1:3:6 concrete footing.',
    ],
    faqs: [
      { question: 'What does a compound wall cost per running foot?', answer: 'A 6ft high 9-inch brick compound wall with RCC columns runs roughly ₹700-1,200 per running foot including foundation, plaster and paint, varying widely by city and soil conditions. Chain-link fencing on MS posts is a fraction of that at ₹150-300 per running foot.' },
      { question: 'How deep should the foundation be?', answer: 'A strip footing at least 2-3 ft deep on firm soil, deeper on black cotton soil which swells and shrinks dramatically with moisture. Black cotton soil is the main reason compound walls crack and lean across much of central and western India.' },
      { question: 'Do I need RCC columns in a compound wall?', answer: 'Above about 5ft, yes. Columns at roughly 3m centres tied into the foundation stop the wall behaving as one long unreinforced panel. Plain brickwork at 6ft with no columns will crack at the first ground movement.' },
      { question: 'What about local permissions?', answer: 'Most municipal corporations regulate compound wall height and require the wall to sit within your own plot line, set back from the road. Building even slightly onto a road reservation invites demolition notices. Check your sanctioned plan before laying the footing.' },
      { question: 'Chain-link or brick wall?', answer: 'Chain-link is far cheaper, quick, and appropriate for farm plots and large land parcels. A brick compound wall gives privacy and security and is the expectation for an urban residential plot. Many owners fence first with chain-link to establish the boundary, then build the wall later.' },
    ],
  },
  'fence-calculator:australia': {
    howItIsCalculated: [
      'Australian fencing is dominated by Colorbond steel panels and treated pine paling. Colorbond comes in 2.4m bays with posts at 2.4m centres; paling fences use 2.4m rails with 1.8m pales fixed individually.',
      'Timber in ground contact must be H4 treated — H3 is for above-ground use only, and using H3 in the ground is the single most common cause of premature fence failure here.',
      'Post holes are estimated at 300mm diameter by 600mm deep for a 1.8m fence, with rapid-set concrete at roughly two 20kg bags per post.',
    ],
    faqs: [
      { question: 'Colorbond or timber paling?', answer: 'Colorbond needs no maintenance, will not rot or warp, and lasts decades — it now dominates new Australian fencing. Treated pine paling costs less initially, suits some streetscapes, and can be stained. Over a 20-year horizon Colorbond usually costs less in total.' },
      { question: 'What treatment level does the timber need?', answer: 'H4 for anything in ground contact — posts, and any rail within 150mm of soil. H3 is only rated for above-ground exposure. Putting H3 posts in the ground is the most common shortcut and it typically fails within five to seven years.' },
      { question: 'Who pays for a boundary fence?', answer: 'In every Australian state, adjoining owners generally share the cost of a dividing fence of a sufficient standard. The process is set by state fencing legislation and usually starts with a written Fencing Notice. Build first and ask later and you may well carry the whole cost.' },
      { question: 'How deep should posts go?', answer: '600mm for a 1.8m fence in normal soil, deeper in sand or reactive clay, and deeper again in higher wind regions. In cyclonic regions the fence is treated as a wind-loaded structure and needs engineered footings.' },
      { question: 'Do I need council approval?', answer: 'Usually not for a standard dividing fence up to 1.8m, but front boundary fences, pool fences and anything on a corner allotment are separately regulated. Pool fencing in particular is strictly enforced across every state and is not a DIY-and-hope proposition.' },
    ],
  },

  'gravel-calculator:uk': {
    howItIsCalculated: [
      'UK aggregate is sold by the bulk bag — nominally one tonne, roughly 0.6-0.7 cubic metres — or loose by the tonne, so the calculator converts volume to both.',
      'Depths are worked in millimetres: 50mm for a decorative bed, 100mm for a footpath and 150-200mm of MOT Type 1 sub-base under a driveway.',
      'MOT Type 1 is the standard UK sub-base specification and is what a driveway needs beneath the decorative layer — decorative gravel laid straight onto soil will sink within a season.',
    ],
    faqs: [
      { question: 'How many bulk bags do I need?', answer: 'A nominal one-tonne bulk bag covers roughly 10-12m² at 50mm depth. A 40m² decorative area at 50mm needs about 3-4 bags. Merchants vary in what they actually put in a bag, so check the stated volume rather than assuming a full tonne.' },
      { question: 'What gravel size should I use?', answer: '10mm for footpaths and decorative beds, 20mm for driveways where larger stone resists rutting better. Below 10mm the stone migrates and tracks indoors on shoes; above 20mm it is uncomfortable to walk on and hard to rake level.' },
      { question: 'Do I need a sub-base?', answer: 'For a driveway, absolutely — 150-200mm of compacted MOT Type 1. For a decorative bed, a membrane over firm soil is usually enough. The single most common UK driveway failure is decorative gravel laid without any sub-base, which ruts within months.' },
      { question: 'Will I need planning permission?', answer: 'Possibly. Since 2008, a new or replacement front driveway over 5m² must use permeable materials or drain to a soakaway within the property, or you need planning permission. Loose gravel is inherently permeable, which is one reason it remains popular.' },
      { question: 'How do I stop gravel migrating?', answer: 'Edge restraints on every side and a gravel stabilisation grid under the surface layer. Without both, gravel spreads into borders and off the drive, and you top it up every year. A grid also makes the surface far easier to walk and wheel on.' },
    ],
  },
  'gravel-calculator:india': {
    howItIsCalculated: [
      'Indian aggregate is bought by the brass — 100 cubic feet, about 2.83 cubic metres — or by the tipper load, so volume is converted to brass as well as to cubic metres.',
      'Sizes are described in millimetres: 10mm and 20mm coarse aggregate for concrete, 40mm and larger for soling beneath foundations and floors.',
      'Because the same material is used both for concreting and for hardcore, the calculator reports volume rather than assuming a decorative application.',
    ],
    faqs: [
      { question: 'How much is one brass of aggregate?', answer: 'One brass is 100 cubic feet, roughly 2.83 cubic metres, and weighs about 4.5-4.8 tonnes for 20mm crushed stone. Most suppliers quote and deliver in brass, and a standard tipper carries two to three brass.' },
      { question: 'What aggregate size for concrete?', answer: '20mm graded aggregate for general RCC work such as slabs, beams and columns. 10mm where reinforcement is congested or the section is thin. 40mm and above is for soling and mass concrete, not for reinforced sections.' },
      { question: 'What is soling and do I need it?', answer: 'A layer of large stone, typically 40-63mm, laid and compacted beneath a foundation or floor slab to spread load and break capillary rise from the soil. It is standard practice in Indian construction and skipping it on soft or black cotton soil causes settlement.' },
      { question: 'River sand or M-sand?', answer: 'River sand is being restricted or banned in many states on environmental grounds, and manufactured sand (M-sand) is now the practical default. M-sand is more angular, needs slightly more water for the same workability, and produces comparable or better strength when properly graded.' },
      { question: 'How do I check aggregate quality on delivery?', answer: 'Look for angular, clean stone with minimal dust and no clay coating. Wash a handful — if the water runs muddy, the silt content is too high and it will weaken your concrete. Excess fines is the most common quality issue with tipper-delivered aggregate.' },
    ],
  },
  'gravel-calculator:australia': {
    howItIsCalculated: [
      'Australian aggregate is sold by the cubic metre for bulk delivery, or in 20kg bags for small jobs, so volume converts to both.',
      'Depths are worked in millimetres: 50mm for decorative beds, 75-100mm for paths, and 100-150mm of compacted road base beneath a driveway.',
      'Road base — not decorative gravel — is the correct sub-base material, and is specified separately from the surface layer.',
    ],
    faqs: [
      { question: 'How much gravel do I need per square metre?', answer: 'About 0.05m³ per square metre at 50mm depth, so a 40m² area needs roughly 2m³. One cubic metre of crushed rock weighs around 1.5 tonnes, which matters for trailer limits — most box trailers should not carry more than half a cubic metre.' },
      { question: 'What is road base and do I need it?', answer: 'A graded crushed rock with fines that compacts to a hard, stable layer. Any driveway needs 100-150mm of compacted road base beneath the surface. Decorative pebble laid straight onto soil will rut and disappear into the ground within a season.' },
      { question: 'What size gravel for a driveway?', answer: '10-20mm crushed rock over a road base layer. Avoid rounded river pebble on a driveway — it does not interlock and simply displaces under tyres, particularly where cars turn. Angular crushed rock locks together and stays put.' },
      { question: 'How do I stop weeds coming through?', answer: 'A heavy-duty woven geotextile beneath the gravel, not the light landscape fabric sold in rolls at hardware stores. Even then, windblown seed will germinate in the gravel itself over time, so expect occasional spot treatment regardless.' },
      { question: 'Do I need council approval for a gravel driveway?', answer: 'For a new crossover onto the road, yes, in every council — the crossover is council property and must be built to their specification. Re-surfacing an existing driveway within your boundary generally does not need approval, but check permeability rules if your council has stormwater controls.' },
    ],
  },
};


export function getRegionalContent(slug: string, region: string): RegionalContent | undefined {
  return REGIONAL_CONTENT[`${slug}:${region}`];
}

/** True only when genuinely region-specific copy exists for this combination. */
export function hasRegionalContent(slug: string, region: string): boolean {
  return Boolean(REGIONAL_CONTENT[`${slug}:${region}`]);
}
