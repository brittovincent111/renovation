import { FAQItem } from './types';

/**
 * Editorial copy for the /projects/[slug] estimators.
 *
 * The project pages were the thinnest on the site: a calculator, a bill of
 * materials and three FAQs, measuring 274-330 unique words once sitewide
 * navigation was discounted. A bill of materials tells you what to buy but
 * nothing about sequence, what actually moves the budget, or where these jobs
 * go wrong — which is the part a reader cannot get from the calculator itself.
 *
 * Kept separate from projectsData.ts so calculation logic and prose stay apart.
 */
export interface ProjectEditorial {
  /** Two or three paragraphs setting up the job. */
  overview: string[];
  /** What actually moves the number, in rough order of impact. */
  costDrivers: Array<{ factor: string; detail: string }>;
  /** Correct order of operations. */
  sequence: Array<{ phase: string; detail: string }>;
  /** Expensive mistakes, written from what actually goes wrong. */
  pitfalls: Array<{ mistake: string; detail: string }>;
  /** Appended to the config's own FAQs. */
  extraFaqs?: FAQItem[];
}

export const PROJECT_EDITORIAL: Record<string, ProjectEditorial> = {
  'bathroom-renovation-cost': {
    overview: [
      'A bathroom is the most expensive room per square foot in a house, and the reason is density. A 40 sq ft floor carries plumbing supply and waste, electrical, ventilation, waterproofing, tile, glass and cabinetry — trades that in a bedroom would be spread across ten times the area. Doubling the room size does not double the cost, and halving it does not halve it.',
      'That density is also why bathroom budgets overrun more often than any other room. The fixed costs — moving a waste pipe, upgrading a circuit, forming a shower fall — barely move with room size, so a small bathroom carries them on a small area. Expect the per-square-foot figure for a compact bathroom to look alarming next to a kitchen, and judge the job on total cost instead.',
      'The estimate below covers materials: floor and wall tile, mortar and grout, moisture-resistant board, and paint. It deliberately excludes demolition, plumbing and electrical labour, fixtures and glass, which vary far too much by specification and region to estimate from dimensions alone.',
    ],
    costDrivers: [
      { factor: 'Whether plumbing moves', detail: 'Keeping the toilet, basin and shower in their existing positions is the single largest saving available. Relocating a soil stack or moving a toilet more than a few feet can add several thousand on its own, because it means opening the floor and often the ceiling below.' },
      { factor: 'Tile format and layout', detail: 'Large-format tile needs a flatter substrate and more skilled setting; mosaic needs far more labour per square foot. A herringbone or diagonal lay adds 15-20% waste and a meaningful labour premium over a straight grid.' },
      { factor: 'Shower construction', detail: 'A prefabricated acrylic base is a fraction of the cost of a tiled, sloped, waterproofed tray. The waterproofing system beneath a tiled shower is not the place to economise.' },
      { factor: 'Ventilation', detail: 'An extractor ducted to outside air is not optional in a room generating this much moisture. Venting into a loft void causes condensation damage that costs far more than the fan.' },
    ],
    sequence: [
      { phase: '1. Strip out and make safe', detail: 'Isolate water and power before demolition. Cap pipework rather than leaving it open.' },
      { phase: '2. First-fix plumbing and electrical', detail: 'All pipe and cable runs completed while walls and floor are open. This is the last moment changing the layout is cheap.' },
      { phase: '3. Substrate and waterproofing', detail: 'Backer board or moisture-resistant board, then the tanking system across the wet zone. Allow full cure before tiling.' },
      { phase: '4. Tiling', detail: 'Floor first if you can work backwards out of the room, walls first if the floor tile needs to tuck under. Dry-lay the first two rows either way.' },
      { phase: '5. Grouting and sealing', detail: 'Grout after the adhesive has fully cured, not the same day. Silicone every internal corner rather than grouting it.' },
      { phase: '6. Second fix and decoration', detail: 'Fixtures, glass, paint, trim. Paint before fitting the vanity and you will thank yourself.' },
    ],
    pitfalls: [
      { mistake: 'Tiling over an unsuitable floor', detail: 'Suspended timber floors deflect. Tile does not. Without a decoupling membrane or a sufficiently stiffened floor, the grout cracks within a season and the tile follows.' },
      { mistake: 'Buying tile from mixed batches', detail: 'Shade varies noticeably between production batches. Order the full quantity plus waste in one go and check the batch numbers on every box before the delivery driver leaves.' },
      { mistake: 'Skipping the fall on a wet-room floor', detail: 'Water finds level. A shower floor without a consistent fall to the drain leaves standing water, which fails the grout and eventually the waterproofing.' },
      { mistake: 'Grouting internal corners', detail: 'Corners move. Rigid grout in a corner cracks and lets water behind the tile. Every wall-to-wall and wall-to-floor junction takes flexible sealant.' },
    ],
    extraFaqs: [
      { question: 'Should I tile the floor or the walls first?', answer: 'Either works, and the deciding factor is the bottom row. If you tile walls first, the wall tile must stop a tile-thickness plus adhesive above the finished floor so the floor tile slides under — get that wrong and you are left with a visible gap. Tiling the floor first removes that risk but means protecting the finished floor while you work above it. Most tilers do walls first in a shower enclosure and floors first elsewhere.' },
      { question: 'How long should a bathroom renovation take?', answer: 'Two to three weeks for a straightforward refit keeping the existing layout, and four to six weeks where plumbing moves or structural work is involved. The unavoidable delays are cure times: waterproofing, adhesive and grout each need their stated cure before the next trade starts, and rushing them is the most common cause of early failure.' },
      { question: 'Do I need planning permission or building control?', answer: 'Replacing fittings in the same positions generally does not, but adding a bathroom where there was none, altering drainage, or any notifiable electrical work in a wet zone usually does. Requirements differ by jurisdiction — check with your local building control before work starts, not after.' },
    ],
  },

  'kitchen-renovation-cost': {
    overview: [
      'Kitchen budgets are dominated by two lines that have nothing to do with floor area: cabinetry and worktop. Together they routinely account for half to two-thirds of the total. Everything the calculator below estimates — flooring, backsplash tile, paint, hardware — competes for the remaining third.',
      'That matters for how you plan. Adding a few square feet to a kitchen adds relatively little; upgrading from flat-pack carcasses to bespoke joinery, or from laminate to stone worktop, can move the total by a factor of two in a room of identical size. Decide the cabinetry and worktop specification first, then size the rest of the budget around what is left.',
      'The estimator covers materials you buy by area and count. It does not price cabinetry, appliances or worktop, all of which are specification-led and best quoted directly.',
    ],
    costDrivers: [
      { factor: 'Cabinetry specification', detail: 'Flat-pack, rigid-built stock, semi-custom and bespoke sit at roughly 1x, 1.5x, 2.5x and 4x the same linear metre. Door and drawer count matters more than run length — drawers cost considerably more than doors.' },
      { factor: 'Worktop material', detail: 'Laminate, solid surface, engineered quartz and natural stone span an order of magnitude. Quartz and stone also require template and professional fit, which is a separate visit after cabinets are installed.' },
      { factor: 'Whether services move', detail: 'Keeping the sink and hob in place avoids new waste runs, gas work and extract routing. Islands are expensive precisely because they usually require all three brought to the middle of the room.' },
      { factor: 'Electrical capacity', detail: 'Older properties frequently need additional circuits for modern appliance loads. This is usually discovered mid-job and is rarely in the original budget.' },
    ],
    sequence: [
      { phase: '1. Design and measure', detail: 'Final layout locked before anything is ordered. Cabinet lead times run six to twelve weeks and a layout change after ordering is expensive.' },
      { phase: '2. Strip out', detail: 'Old units, worktop and flooring removed. Services capped, not left live.' },
      { phase: '3. First fix', detail: 'Plumbing, gas, electrical and extract routed to their final positions while walls are open.' },
      { phase: '4. Walls, ceiling and flooring', detail: 'Plastering and decoration of ceilings and upper walls done before cabinets go in. Hard flooring usually runs under the units so appliances can be pulled out later.' },
      { phase: '5. Cabinet installation', detail: 'Carcasses levelled and fixed, then templated for worktop. Expect a gap of one to two weeks here waiting on a stone worktop.' },
      { phase: '6. Worktop, splashback, second fix', detail: 'Worktop fitted, sink and hob cut in, backsplash tiled to the finished worktop, then appliances, handles and final decoration.' },
    ],
    pitfalls: [
      { mistake: 'Tiling the splashback before the worktop is in', detail: 'The backsplash must sit on the finished worktop surface. Tiling to a pencil line and hoping the worktop lands on it produces a gap that silicone cannot rescue.' },
      { mistake: 'Ignoring appliance clearances', detail: 'Integrated appliance doors, dishwasher hoses and fridge hinge swings all need specific clearances. A cabinet run that fits the wall but not the door swing is a rebuild.' },
      { mistake: 'Flooring only where you can see it', detail: 'Stopping the floor at the cabinet line saves a small amount of material and creates a permanent trap: no appliance can be pulled out for service without catching on the lip.' },
      { mistake: 'Underestimating lead times', detail: 'Cabinets, stone worktop and some appliances all have multi-week leads that do not overlap. Sequencing these badly leaves a household without a kitchen far longer than the work itself requires.' },
    ],
    extraFaqs: [
      { question: 'Should flooring go under the kitchen cabinets?', answer: 'Run hard flooring under the full footprint of appliances and under the toe-kick line at minimum. Full-coverage is the safer choice: it lets appliances slide out for service, avoids a height step if you ever change the layout, and costs relatively little extra. The common exception is expensive engineered board under permanent full-height cabinetry, where stopping at the carcass line is defensible.' },
      { question: 'How much backsplash tile do I need?', answer: 'Measure the run length of worktop against a wall and multiply by the height to the underside of the wall units, typically 18 to 24 inches. Deduct window openings but not sockets. Add 10% for a straight lay and 15% for a brick or herringbone pattern — mosaic sheets need less because they cut cleanly between tesserae.' },
      { question: 'Can I keep my existing cabinets and just reface them?', answer: 'If the carcasses are square, solid and the layout still works, replacing doors, drawer fronts and handles gives most of the visual change for a fraction of the cost and a fraction of the disruption. It is not worth doing over chipboard carcasses that have swollen from water damage, or where the layout itself is the problem.' },
    ],
  },

  'deck-building-cost': {
    overview: [
      'A deck is a structure, not a surface. The visible boards are typically a third of the material cost; the rest is in the posts, footings, beams, joists and fasteners holding them up, plus the railing, which is often the single most expensive linear element in the whole job.',
      'Because it is a structure, span is what governs the design. Joist size, spacing and beam dimensions all follow from how far the framing has to reach, and those are set by code and by species — not by preference. Get the span table right before pricing anything.',
      'The estimator below covers decking, framing, footings and fasteners by quantity. Local code will dictate footing depth, ledger attachment and railing height, and those requirements vary enough between jurisdictions that they must be checked locally before building.',
    ],
    costDrivers: [
      { factor: 'Decking material', detail: 'Pressure-treated softwood, cedar, and composite span roughly 1x to 3x per square foot. Composite costs more upfront and much less over twenty years, since it is never sanded, stained or sealed.' },
      { factor: 'Height above grade', detail: 'A deck more than a step or two off the ground needs guardrail, deeper posts, often stairs with their own footings, and in most jurisdictions an inspection. Ground-level decks avoid nearly all of it.' },
      { factor: 'Railing', detail: 'Railing is priced per linear foot and is frequently the most expensive component after decking. Cable, glass and metal systems can exceed the cost of the deck surface itself.' },
      { factor: 'Footing depth and soil', detail: 'Footings must reach below the local frost line. In cold climates that can mean four feet of excavation per post, which changes both material volume and labour substantially.' },
    ],
    sequence: [
      { phase: '1. Check code and permits', detail: 'Span tables, footing depth, guardrail height and ledger attachment are all code-governed. Most jurisdictions require a permit for anything above a low platform.' },
      { phase: '2. Set out and excavate footings', detail: 'Square the layout by diagonal measurement before digging. Footings below frost line, bearing on undisturbed soil.' },
      { phase: '3. Posts and ledger', detail: 'Ledger flashed and bolted — never nailed — to the structure. Flashing here is what stops water tracking into the rim joist and rotting the house.' },
      { phase: '4. Beams and joists', detail: 'Framing to the span table, joists crowned up, hangers fully nailed with the correct fasteners rather than whatever is in the pouch.' },
      { phase: '5. Decking', detail: 'Boards laid with the manufacturer-specified gap for drainage and expansion. Composite in particular moves with temperature and needs its stated gapping.' },
      { phase: '6. Railing, stairs and finish', detail: 'Guardrail to code height, stair rise and run consistent within tolerance, then seal or stain if the material requires it.' },
    ],
    pitfalls: [
      { mistake: 'Nailing the ledger instead of bolting it', detail: 'Ledger failure is the leading cause of deck collapse. The ledger carries half the deck load into the building and must be through-bolted or lagged per code, and flashed above.' },
      { mistake: 'Footings above the frost line', detail: 'Shallow footings heave every winter. A deck that lifts and drops seasonally tears its own connections apart and pulls away from the house.' },
      { mistake: 'Wrong fasteners for treated lumber', detail: 'Modern treatment chemistry corrodes standard galvanised and plain steel rapidly. Hot-dip galvanised or stainless is not optional, and mixing metals accelerates the problem.' },
      { mistake: 'No gap between boards', detail: 'Boards laid tight trap water and debris, which is how a deck surface rots from the top. Follow the manufacturer gap, and remember treated lumber shrinks as it dries while composite expands in heat.' },
    ],
    extraFaqs: [
      { question: 'How far apart should deck joists be?', answer: 'Sixteen inches on centre is the common default for most decking, but it is not universal: many composite boards require twelve inches on centre, and any diagonal board layout needs the spacing reduced because the effective span between bearings increases. Always take the spacing from the decking manufacturer and the span from the code table for your joist species and size.' },
      { question: 'How much should I add for waste on decking?', answer: 'Ten percent on a simple rectangle, and fifteen on anything with angles, a diagonal lay, or picture-frame borders. Deck boards come in fixed lengths, so also check that your deck width divides sensibly into available board lengths — a 13 ft deck built from 16 ft boards wastes three feet on every run.' },
      { question: 'Do I need a permit to build a deck?', answer: 'In most jurisdictions, yes, once the deck exceeds a certain height above grade or is attached to the house. Attachment is the usual trigger, because the ledger connection is a structural interface with the building. Building without a required permit commonly surfaces at resale, when it must be opened up for retrospective inspection.' },
    ],
  },

  'basement-finishing-cost': {
    overview: [
      'Finishing a basement is the cheapest square footage you will ever add to a house, because the structure, roof and foundation already exist. It is also the one renovation most likely to be destroyed by a problem that has nothing to do with the finishes: water.',
      'Every basement project divides cleanly into two phases. The first is making the space dry, warm and code-compliant — drainage, damp management, insulation, egress, ceiling height. The second is the finishing the calculator below estimates: framing, board, flooring and paint. Spending on the second before resolving the first is the most expensive mistake available in this project.',
      'Before pricing any of it, confirm two things: that the space meets minimum ceiling height for habitable rooms in your jurisdiction, and that any bedroom has a compliant egress window. Both are hard requirements that can stop a project outright.',
    ],
    costDrivers: [
      { factor: 'Moisture remediation', detail: 'Interior drainage, sump installation or exterior tanking can cost as much as the entire finishing package. This has to be established before budgeting, because it is not optional and it is not cosmetic.' },
      { factor: 'Ceiling height', detail: 'Most codes require a minimum clear height for habitable space. Where ducts, beams or pipes intrude, the options are rerouting services or underpinning — both expensive enough to change whether the project is worth doing.' },
      { factor: 'Egress requirements', detail: 'A basement bedroom needs a compliant egress window or door. Cutting an opening in a foundation wall and forming a window well is a structural job, not a glazing one.' },
      { factor: 'Bathroom addition', detail: 'A basement bathroom below the main drain line needs a pump or macerator and its own venting. This routinely doubles the plumbing line of a basement budget.' },
    ],
    sequence: [
      { phase: '1. Diagnose and fix water', detail: 'Find the source of any damp — grading, gutters, hydrostatic pressure — and resolve it. Run the space through a wet season if you can before closing anything in.' },
      { phase: '2. Confirm code compliance', detail: 'Ceiling height, egress, smoke and CO detection, and stair geometry checked against local requirements before design is finalised.' },
      { phase: '3. Insulate and frame', detail: 'Rigid insulation against the foundation wall, then framing held off the concrete. Fibreglass directly against a basement wall is a mould problem waiting for humidity.' },
      { phase: '4. First fix services', detail: 'Electrical, plumbing and any HVAC extension, inspected before boarding.' },
      { phase: '5. Board and finish', detail: 'Moisture-resistant board at low level, taping and jointing, then priming.' },
      { phase: '6. Flooring and final fix', detail: 'Flooring rated for below-grade use over an appropriate moisture barrier, then trim, doors and decoration.' },
    ],
    pitfalls: [
      { mistake: 'Finishing over an unresolved damp problem', detail: 'Studwork, insulation and board over a wall that still takes water produces hidden mould within a year or two. The fix is demolition of everything just installed.' },
      { mistake: 'Solid hardwood below grade', detail: 'Below-grade slabs pass moisture vapour continuously. Solid timber cups and gaps. Engineered board, luxury vinyl plank or tile over a proper vapour barrier are the below-grade options.' },
      { mistake: 'Framing tight to the foundation wall', detail: 'Timber in direct contact with concrete wicks moisture. Hold the frame off the wall with rigid insulation between, and use treated timber for any bottom plate on the slab.' },
      { mistake: 'Burying services with no access', detail: 'Cleanouts, shut-off valves, junction boxes and the main stack all need to stay accessible. Boarding over them creates a demolition job the first time something needs attention.' },
    ],
    extraFaqs: [
      { question: 'What flooring works best in a basement?', answer: 'Luxury vinyl plank, tile and engineered board rated for below-grade installation. All three tolerate the vapour that passes continuously through a slab. Avoid solid hardwood and avoid laminate with a fibreboard core, both of which swell irreversibly. Whatever you choose, test the slab for moisture first — most manufacturers void the warranty above a stated reading.' },
      { question: 'Do I need a vapour barrier in a basement?', answer: 'Almost always, though the correct assembly depends on climate. The common approach is rigid foam board sealed directly against the foundation wall, which keeps the concrete surface above the dew point and removes the condensing surface entirely. What you must not do is create two vapour barriers with an air gap between them, which traps moisture rather than excluding it.' },
      { question: 'How much ceiling height do I need?', answer: 'Most codes require around seven feet of clear height for habitable basement space, with limited allowances for ducts and beams over part of the area. Measure to the lowest obstruction, not to the joists, and check your specific local requirement before committing — this is the single most common reason a basement project turns out not to be viable.' },
    ],
  },

  'backyard-patio-cost': {
    overview: [
      'A paver patio is almost entirely a groundwork job. The pavers themselves are the visible part and roughly half the material cost; the base beneath them is what determines whether the patio is still flat in ten years.',
      'The base is not optional depth. A compacted aggregate sub-base spreads load and, critically, drains. Water that cannot escape beneath a patio freezes, expands and lifts the surface — which is why patios built straight onto soil or sand fail in the first hard winter almost everywhere that has one.',
      'The estimator below covers pavers, aggregate base, bedding sand, jointing sand and edge restraint. Excavation volume is the line most commonly underestimated: you are removing not just the paver depth but the full base depth beneath it.',
    ],
    costDrivers: [
      { factor: 'Base depth', detail: 'Four to six inches of compacted aggregate for foot traffic, eight to twelve for anything a vehicle crosses, and more again on clay soils. This drives both the aggregate volume and the excavation and disposal cost.' },
      { factor: 'Paver type', detail: 'Standard concrete pavers, large-format slabs, permeable systems and natural stone span a wide price range. Large-format slabs also need a flatter, more carefully screeded bed to avoid rocking.' },
      { factor: 'Excavation and disposal', detail: 'Spoil removal is routinely forgotten. A 300 sq ft patio at eight inches of total excavation generates roughly seven cubic yards of spoil that has to go somewhere.' },
      { factor: 'Pattern and cuts', detail: 'Running bond is efficient. Herringbone at 45 degrees is stronger under load but adds cutting at every edge, raising both waste and labour.' },
    ],
    sequence: [
      { phase: '1. Set out, check falls and services', detail: 'Mark the area, establish a fall of roughly one inch in four to eight feet away from the building, and check for buried services before digging.' },
      { phase: '2. Excavate', detail: 'Dig to paver thickness plus bedding plus full base depth. Cut the excavation wider than the finished patio so the edge restraint has something to bear on.' },
      { phase: '3. Sub-base', detail: 'Aggregate placed and compacted in lifts of no more than four inches. Compacting the full depth in one pass leaves the bottom loose, and it will settle.' },
      { phase: '4. Bedding layer', detail: 'One inch of coarse bedding sand, screeded level and left uncompacted. Screed to the fall, not to level.' },
      { phase: '5. Lay pavers and cut edges', detail: 'Work from a straight edge, keep joints consistent, and lay full pavers across the field before cutting the perimeter.' },
      { phase: '6. Edge restraint and jointing', detail: 'Restraint fixed around the full perimeter, then jointing sand swept in and vibrated, topping up until joints stay full.' },
    ],
    pitfalls: [
      { mistake: 'Skimping on base depth', detail: 'This is the failure mode for paver patios. An under-built base settles unevenly, and the only repair is lifting every paver and starting again.' },
      { mistake: 'Compacting in one deep lift', detail: 'A plate compactor only densifies the top few inches. Aggregate placed twelve inches deep and compacted once is loose at the bottom and will settle under load.' },
      { mistake: 'No edge restraint', detail: 'Without restraint the perimeter pavers migrate outward, joints open across the whole field, and the pattern unravels from the edges inward.' },
      { mistake: 'Laying level instead of to a fall', detail: 'A patio needs a consistent fall away from the building. Laid dead level, it ponds, and against a wall it drives water at the damp course.' },
    ],
    extraFaqs: [
      { question: 'How deep should the base be under pavers?', answer: 'Four to six inches of compacted aggregate for a pedestrian patio on well-draining soil, eight inches or more on clay or anywhere with a hard frost, and ten to twelve inches for a driveway carrying vehicles. Add one inch of bedding sand on top of that. When in doubt, go deeper: the base is the only part you cannot improve later without lifting everything.' },
      { question: 'Do I need polymeric jointing sand?', answer: 'It is worth the premium in most situations. Polymeric sand sets firm when wetted, which resists washout in heavy rain, suppresses weeds in the joints and discourages ants from undermining the bedding. It must be installed dry, swept fully into the joints and watered exactly as the manufacturer states — a poorly activated installation leaves a haze on the paver surface that is unpleasant to remove.' },
      { question: 'How much fall does a patio need?', answer: 'Roughly one inch of drop per four to eight feet of run, always directed away from the building. That is enough to shed water without being perceptible underfoot or destabilising furniture. Where a patio adjoins a house, the finished surface must also sit well below the damp course or the wall will take water.' },
    ],
  },

  'house-renovation-cost': {
    overview: [
      'Whole-house renovation is the one project where a per-square-foot figure is genuinely useful, because at this scale the fixed costs average out across enough area to behave predictably. The figure varies enormously by specification, but within a given specification it holds reasonably well.',
      'What breaks the estimate is scope that is invisible at the planning stage. Rewiring, replumbing, structural repair, damp remediation and asbestos are all discovered rather than designed, and they are all expensive. On a property over about forty years old, a contingency below fifteen percent of the total is optimistic; twenty is more realistic.',
      'The estimator below covers finishes across the whole floor area: flooring, wall preparation and board, paint and trim. It excludes kitchens, bathrooms, services replacement and structural work, all of which are priced as their own packages — the dedicated kitchen and bathroom estimators handle those.',
    ],
    costDrivers: [
      { factor: 'Property age and condition', detail: 'Age determines how much of the budget disappears into work nobody sees. Older properties carry a materially higher probability of rewiring, replumbing, damp and structural repair.' },
      { factor: 'Specification level', detail: 'The same floor area finished to landlord, owner-occupier and high specification can differ by a factor of three. Decide the level once and apply it consistently — mixed specification reads as unfinished rather than selective.' },
      { factor: 'Whether the layout changes', detail: 'Moving non-structural partitions is inexpensive. Removing anything load-bearing brings in structural calculations, steelwork and building control, and changes the programme substantially.' },
      { factor: 'Occupied or empty', detail: 'Renovating around a household costs more and takes longer: work is sequenced into zones, dust protection is constant, and trades cannot overlap freely. An empty property lets trades work in parallel.' },
    ],
    sequence: [
      { phase: '1. Survey and scope', detail: 'Understand the structure, services and damp position before designing. This is where contingency gets sized honestly.' },
      { phase: '2. Strip out and structural work', detail: 'Demolition, opening up, and any structural alterations with their calculations and approvals in place.' },
      { phase: '3. First fix services', detail: 'Electrical, plumbing and heating routed throughout while walls and floors are open. The last cheap moment to change anything.' },
      { phase: '4. Plaster and dry lining', detail: 'Boarding, plastering, and the drying time that follows — which is real and cannot be compressed without consequences for the decoration.' },
      { phase: '5. Second fix and joinery', detail: 'Doors, skirting, architrave, kitchen and bathroom installation, sockets, switches and radiators.' },
      { phase: '6. Decoration and flooring', detail: 'Paint, then flooring last so it is not carrying traffic and dropped tools for the rest of the programme.' },
    ],
    pitfalls: [
      { mistake: 'No contingency', detail: 'On an older property, unforeseen work is not a risk to be managed but a near-certainty to be budgeted. A project with no contingency stops partway through, which is the most expensive place to stop.' },
      { mistake: 'Decorating before services are complete', detail: 'Chasing a cable through a finished wall means replastering and repainting the room. Every service run must be final before plaster.' },
      { mistake: 'Flooring too early', detail: 'Flooring laid before second fix and decoration spends the rest of the programme being covered, walked on and damaged. It goes in last.' },
      { mistake: 'Ignoring drying times', detail: 'Fresh plaster needs to dry before it takes a mist coat, and screed before it takes flooring. Sealing either in early traps moisture and the finish fails months later, long after the trade has left.' },
    ],
    extraFaqs: [
      { question: 'What order should a whole-house renovation follow?', answer: 'Broadly: structural work, then first-fix services, then plastering, then second fix and joinery, then decoration, then flooring. The principle is to work from the things that require opening walls towards the things that get damaged by traffic. Two rules cover most sequencing questions — anything buried in a wall goes in before plaster, and anything easily damaged goes in last.' },
      { question: 'How much contingency should I hold back?', answer: 'Ten percent on a property built in the last twenty years where the services are sound, and fifteen to twenty percent on anything older or anything you have not opened up. Hold it genuinely in reserve rather than spending it on specification upgrades early, because the work it covers — rewiring, damp, structural repair — is not optional once discovered.' },
      { question: 'Is it cheaper to renovate room by room or all at once?', answer: 'All at once is cheaper per square foot and considerably faster. Trades work in parallel, materials are ordered in bulk, and setup and access costs are paid once rather than repeatedly. Room by room costs more overall but spreads the spend and lets you stay in the property, which for many households is the deciding factor regardless of cost.' },
    ],
  },
};

export function getProjectEditorial(slug: string): ProjectEditorial | undefined {
  return PROJECT_EDITORIAL[slug];
}
