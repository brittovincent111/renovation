import { UnitSystem, FAQItem } from './types';
import { calculateTile } from './calculators/tile';
import { calculatePaint } from './calculators/paint';
import { calculateDrywall } from './calculators/drywall';
import { calculateGrout } from './calculators/grout';
import { calculateFlooring } from './calculators/flooring';
import { calculateDeck } from './calculators/deck';
import { calculateWallFraming } from './calculators/wallFraming';
import { calculateInsulation } from './calculators/insulation';
import { calculatePaver } from './calculators/paver';
import { calculateGravel } from './calculators/gravel';

export interface ProjectBOMItem {
  category: string;
  material: string;
  quantity: string | number;
  unit: string;
  estimatedCostRange: string;
  details?: string;
}

export interface ProjectComboConfig {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  defaultDimensions: {
    length: number;
    width: number;
    height: number;
  };
  subCalculators: string[];
  faqs: FAQItem[];
  calculate: (dimensions: { length: number; width: number; height: number; quality: 'budget' | 'standard' | 'premium' }, unit: UnitSystem) => {
    bom: ProjectBOMItem[];
    totalCostMin: number;
    totalCostMax: number;
    roomAreaSqFt: number;
    roomAreaSqM: number;
  };
}

export const PROJECT_COMBOS: Record<string, ProjectComboConfig> = {
  'bathroom-renovation-cost': {
    slug: 'bathroom-renovation-cost',
    title: 'Full Bathroom Remodel Material & Cost Estimator',
    shortTitle: 'Bathroom Remodel',
    tagline: 'Combine floor tile, wall tile, grout, moisture-resistant drywall, and paint into a single unified estimate.',
    description: 'Calculate all major materials for a complete bathroom remodel. Enter your room dimensions once to automatically size floor tiles, shower/wall tiles, mold-resistant paint, greenboard drywall, and grout.',
    metaTitle: 'Bathroom Renovation Cost Calculator - Complete Material Estimator',
    metaDescription: 'Free bathroom remodel calculator. Enter room dimensions once to estimate floor & shower tiles, grout, moisture-resistant drywall, and paint in one bill of materials.',
    defaultDimensions: { length: 10, width: 8, height: 8.5 },
    subCalculators: ['Tile', 'Grout', 'Paint', 'Drywall'],
    faqs: [
      { question: 'How much does a full bathroom renovation cost on average in 2026?', answer: 'A standard 8x10 ft bathroom remodel typically costs between $7,500 to $18,000 for materials and DIY installation, or $15,000 to $30,000+ with professional general contractor labor.' },
      { question: 'What type of drywall should be used in a bathroom?', answer: 'Use moisture-resistant greenboard or cement backer board (like HardieBacker or Durock) in all wet areas and behind tile, and mold-resistant drywall on all remaining walls and ceiling.' },
      { question: 'How much extra tile is needed for bathroom layouts?', answer: 'We recommend at least 15% extra tile for bathrooms because vanity cutouts, shower drains, and toilet flanges generate higher scrap percentages than open floors.' },
    ],
    calculate: (dim, unit) => {
      const isMetric = unit === 'metric';
      const l = isMetric ? dim.length * 3.28084 : dim.length;
      const w = isMetric ? dim.width * 3.28084 : dim.width;
      const h = isMetric ? dim.height * 3.28084 : dim.height;

      const floorArea = l * w;
      const perimeter = 2 * (l + w);
      // Shower wet wall area: assume 3x5 alcove shower tiled to 7ft
      const showerWallArea = 2 * (3 * 7) + (5 * 7); // ~77 sq ft
      const paintWallArea = Math.max(0, (perimeter * h) - showerWallArea - 21); // deduct shower and door

      // 1. Floor tile
      const floorTileRes = calculateTile({
        unit: 'imperial',
        roomLength: l,
        roomWidth: w,
        tileLength: 12,
        tileWidth: 12,
        layoutPattern: 'straight',
      });

      // 2. Shower wall tile (e.g. 3x6 subway tile or 4x12)
      const showerTileRes = calculateTile({
        unit: 'imperial',
        roomLength: Math.sqrt(showerWallArea),
        roomWidth: Math.sqrt(showerWallArea),
        tileLength: 3,
        tileWidth: 6,
        layoutPattern: 'straight',
      });

      // 3. Grout for floor & shower
      const groutRes = calculateGrout({
        unit: 'imperial',
        tileArea: floorArea + showerWallArea,
        tileLength: 12,
        tileWidth: 12,
        lineWidth: 0.125,
      });

      // 4. Paint for dry walls & ceiling
      const paintRes = calculatePaint({
        unit: 'imperial',
        wallLength: perimeter,
        wallHeight: h,
        doorsCount: 1,
        windowsCount: 1,
        coats: 2,
        ceilingIncluded: true,
        ceilingWidth: w,
      });

      // Cost multipliers per quality grade
      const costMultiplier = dim.quality === 'budget' ? 0.75 : dim.quality === 'premium' ? 1.6 : 1.0;

      const bom: ProjectBOMItem[] = [
        { category: 'Flooring', material: '12"x12" Floor Tiles', quantity: floorTileRes.tilesNeeded, unit: 'tiles', estimatedCostRange: `$${Math.round(floorArea * 3.5 * costMultiplier)} – $${Math.round(floorArea * 9 * costMultiplier)}`, details: `${Math.round(floorArea)} sq ft with 10% waste` },
        { category: 'Shower Walls', material: 'Subway Wall Tile', quantity: showerTileRes.tilesNeeded, unit: 'tiles', estimatedCostRange: `$${Math.round(showerWallArea * 4 * costMultiplier)} – $${Math.round(showerWallArea * 12 * costMultiplier)}`, details: `~${showerWallArea} sq ft shower enclosure` },
        { category: 'Tiling Supplies', material: 'Polymer-Modified Grout', quantity: groutRes.bags25lb, unit: '25lb bags', estimatedCostRange: `$${groutRes.bags25lb * 25} – $${groutRes.bags25lb * 45}`, details: `${groutRes.groutWeightLbs} lbs total` },
        { category: 'Tiling Supplies', material: 'Thinset Mortar', quantity: Math.ceil((floorArea + showerWallArea) / 50), unit: '50lb bags', estimatedCostRange: `$${Math.ceil((floorArea + showerWallArea) / 50) * 20} – $${Math.ceil((floorArea + showerWallArea) / 50) * 35}`, details: 'For cement board and tile bonding' },
        { category: 'Walls & Ceiling', material: 'Mold & Moisture Paint', quantity: Math.max(1, paintRes.paintNeededGallons), unit: 'gallons', estimatedCostRange: `$${Math.max(1, paintRes.paintNeededGallons) * 55} – $${Math.max(1, paintRes.paintNeededGallons) * 85}`, details: 'Bath & spa antimicrobial finish' },
        { category: 'Substrate', material: '1/2" Cement Backer Board', quantity: Math.ceil(showerWallArea / 15), unit: '3x5 sheets', estimatedCostRange: `$${Math.ceil(showerWallArea / 15) * 14} – $${Math.ceil(showerWallArea / 15) * 20}`, details: 'Waterproof substrate for shower walls' },
      ];

      const totalCostMin = Math.round(bom.reduce((acc, item) => acc + parseInt(item.estimatedCostRange.replace(/[^0-9]/g, ' ').trim().split(/\s+/)[0], 10), 0) * 1.1);
      const totalCostMax = Math.round(bom.reduce((acc, item) => acc + parseInt(item.estimatedCostRange.replace(/[^0-9]/g, ' ').trim().split(/\s+/)[1], 10), 0) * 1.15);

      return {
        bom,
        totalCostMin,
        totalCostMax,
        roomAreaSqFt: Math.round(floorArea * 10) / 10,
        roomAreaSqM: Math.round((floorArea / 10.7639) * 10) / 10,
      };
    },
  },

  'kitchen-renovation-cost': {
    slug: 'kitchen-renovation-cost',
    title: 'Kitchen Renovation Material & Cost Estimator',
    shortTitle: 'Kitchen Remodel',
    tagline: 'Simultaneously calculate kitchen flooring, backsplash tile, cabinet hardware, and wall paint.',
    description: 'Accurately plan your kitchen renovation. Enter your kitchen dimensions to compute flooring box requirements, backsplash tile quantities, primer, washable wall paint, and hardware.',
    metaTitle: 'Kitchen Renovation Cost Calculator - Flooring, Backsplash & Paint',
    metaDescription: 'Free kitchen remodel calculator. Input room dimensions to calculate hardwood/tile flooring, backsplash tile, wall paint, and cabinet hardware in one bill of materials.',
    defaultDimensions: { length: 16, width: 12, height: 9 },
    subCalculators: ['Flooring', 'Tile (Backsplash)', 'Paint', 'Cabinet Hardware'],
    faqs: [
      { question: 'How much does a typical kitchen renovation cost?', answer: 'Minor DIY kitchen updates average $8,000 to $15,000. Full kitchen renovations with new cabinets, quartz countertops, and appliances range from $25,000 to $65,000+.' },
      { question: 'How much backsplash tile do I need for a kitchen?', answer: 'The average residential kitchen has between 30 to 45 square feet of backsplash area between countertops and upper cabinets.' },
    ],
    calculate: (dim, unit) => {
      const isMetric = unit === 'metric';
      const l = isMetric ? dim.length * 3.28084 : dim.length;
      const w = isMetric ? dim.width * 3.28084 : dim.width;
      const h = isMetric ? dim.height * 3.28084 : dim.height;

      const floorArea = l * w;
      const perimeter = 2 * (l + w);
      const backsplashSqFt = Math.round(perimeter * 1.5 * 0.6); // typical under-cabinet area

      const flooringRes = calculateFlooring({
        unit: 'imperial',
        roomLength: l,
        roomWidth: w,
        materialType: 'vinyl',
        sqUnitsPerBox: 20,
      });

      const paintRes = calculatePaint({
        unit: 'imperial',
        wallLength: perimeter,
        wallHeight: h,
        doorsCount: 2,
        windowsCount: 2,
        coats: 2,
      });

      const mult = dim.quality === 'budget' ? 0.75 : dim.quality === 'premium' ? 1.7 : 1.0;

      const bom: ProjectBOMItem[] = [
        { category: 'Flooring', material: 'Waterproof Luxury Vinyl Plank (LVP)', quantity: flooringRes.boxesNeeded ?? Math.ceil(floorArea / 20), unit: 'boxes', estimatedCostRange: `$${Math.round(floorArea * 3.2 * mult)} – $${Math.round(floorArea * 7.5 * mult)}`, details: `${Math.round(floorArea)} sq ft with 10% waste` },
        { category: 'Backsplash', material: 'Glazed Ceramic Backsplash Tile', quantity: Math.ceil(backsplashSqFt * 1.15), unit: 'sq ft', estimatedCostRange: `$${Math.round(backsplashSqFt * 6 * mult)} – $${Math.round(backsplashSqFt * 18 * mult)}`, details: `~${backsplashSqFt} sq ft with 15% cut waste` },
        { category: 'Walls & Ceiling', material: 'Scuff-Resistant Kitchen Paint', quantity: Math.max(1, paintRes.paintNeededGallons), unit: 'gallons', estimatedCostRange: `$${Math.max(1, paintRes.paintNeededGallons) * 50} – $${Math.max(1, paintRes.paintNeededGallons) * 80}`, details: 'Washable satin or semi-gloss' },
        { category: 'Cabinetry', material: 'Drawer Pulls & Knobs', quantity: 24, unit: 'pieces', estimatedCostRange: `$${Math.round(24 * 4 * mult)} – $${Math.round(24 * 14 * mult)}`, details: 'Standard 24-piece kitchen cabinet set' },
      ];

      const totalCostMin = Math.round(bom.reduce((acc, item) => acc + parseInt(item.estimatedCostRange.replace(/[^0-9]/g, ' ').trim().split(/\s+/)[0], 10), 0));
      const totalCostMax = Math.round(bom.reduce((acc, item) => acc + parseInt(item.estimatedCostRange.replace(/[^0-9]/g, ' ').trim().split(/\s+/)[1], 10), 0));

      return {
        bom,
        totalCostMin,
        totalCostMax,
        roomAreaSqFt: Math.round(floorArea * 10) / 10,
        roomAreaSqM: Math.round((floorArea / 10.7639) * 10) / 10,
      };
    },
  },

  'deck-building-cost': {
    slug: 'deck-building-cost',
    title: 'Deck Building Material & Cost Estimator',
    shortTitle: 'Deck Building',
    tagline: 'Size decking boards, post footings, joists, railing, and hidden screws simultaneously.',
    description: 'Calculate complete deck framing and decking packages. Enter deck dimensions to calculate deck boards, concrete pier footings, railing balusters, and structural joist lumber.',
    metaTitle: 'Deck Building Cost Calculator - Decking, Posts, Railing & Joists',
    metaDescription: 'Free deck cost calculator. Estimate deck boards, 4x4 posts, concrete pier footings, railing pickets, and structural hardware in a unified Bill of Materials.',
    defaultDimensions: { length: 20, width: 14, height: 3 },
    subCalculators: ['Decking', 'Railing', 'Footings', 'Fasteners'],
    faqs: [
      { question: 'What is the cost difference between pressure treated and composite decking?', answer: 'Pressure-treated pine decking materials cost approximately $15 to $25 per square foot, while composite decking (Trex, TimberTech) averages $35 to $60 per square foot with fasteners.' },
      { question: 'How many concrete footings does a 20x14 deck require?', answer: 'A 20x14 deck with beams spaced 10ft typically requires 6 to 8 footings depending on joist overhang and local frost depth requirements.' },
    ],
    calculate: (dim, unit) => {
      const isMetric = unit === 'metric';
      const l = isMetric ? dim.length * 3.28084 : dim.length;
      const w = isMetric ? dim.width * 3.28084 : dim.width;

      const deckArea = l * w;
      const perimeter = 2 * (l + w);

      const deckRes = calculateDeck({
        unit: 'imperial',
        deckLength: l,
        deckWidth: w,
        selectedBoardLength: 16,
        boardWidthInches: 5.5,
      });

      const footingsCount = Math.max(6, Math.ceil((l / 8) + 1) * Math.ceil((w / 10) + 1));
      const mult = dim.quality === 'budget' ? 0.8 : dim.quality === 'premium' ? 1.8 : 1.0;

      const bom: ProjectBOMItem[] = [
        { category: 'Deck Surface', material: '5/4x6 Deck Boards (16ft)', quantity: deckRes.boardsNeeded, unit: 'boards', estimatedCostRange: `$${Math.round(deckRes.boardsNeeded * 16 * mult)} – $${Math.round(deckRes.boardsNeeded * 38 * mult)}`, details: `${deckRes.totalLinearFtNeeded} linear ft with 10% waste` },
        { category: 'Substructure', material: '2x8 Pressure-Treated Joists (16" OC)', quantity: Math.ceil((l * 12) / 16) + 2, unit: '14ft boards', estimatedCostRange: `$${(Math.ceil((l * 12) / 16) + 2) * 22} – $${(Math.ceil((l * 12) / 16) + 2) * 32}`, details: 'Ground-contact treated joists' },
        { category: 'Piers & Footings', material: 'Sonotube Concrete Piers', quantity: footingsCount, unit: 'piers', estimatedCostRange: `$${footingsCount * 45} – $${footingsCount * 80}`, details: `${footingsCount * 3} bags 60lb concrete & hardware` },
        { category: 'Guardrail', material: '36" Perimeter Railing & Balusters', quantity: Math.ceil(perimeter - 4), unit: 'linear ft', estimatedCostRange: `$${Math.round((perimeter - 4) * 20 * mult)} – $${Math.round((perimeter - 4) * 55 * mult)}`, details: 'Code-compliant 4" baluster spacing' },
        { category: 'Fasteners', material: 'Hidden Fasteners / Coated Screws', quantity: deckRes.screwsNeededApprox, unit: 'screws', estimatedCostRange: `$${Math.ceil(deckRes.screwsNeededApprox / 350) * 45} – $${Math.ceil(deckRes.screwsNeededApprox / 350) * 75}`, details: 'Corrosion-resistant exterior rated' },
      ];

      const totalCostMin = Math.round(bom.reduce((acc, item) => acc + parseInt(item.estimatedCostRange.replace(/[^0-9]/g, ' ').trim().split(/\s+/)[0], 10), 0));
      const totalCostMax = Math.round(bom.reduce((acc, item) => acc + parseInt(item.estimatedCostRange.replace(/[^0-9]/g, ' ').trim().split(/\s+/)[1], 10), 0));

      return {
        bom,
        totalCostMin,
        totalCostMax,
        roomAreaSqFt: Math.round(deckArea * 10) / 10,
        roomAreaSqM: Math.round((deckArea / 10.7639) * 10) / 10,
      };
    },
  },

  'basement-finishing-cost': {
    slug: 'basement-finishing-cost',
    title: 'Basement Finishing Material & Cost Estimator',
    shortTitle: 'Basement Finishing',
    tagline: 'Calculate perimeter wall studs, subfloor panels, insulation, drywall, and paint together.',
    description: 'Plan your basement remodel from bare concrete to finished space. Sizes perimeter 2x4 framing, rigid foam insulation, subfloor sleep system, drywall sheets, and wall paint.',
    metaTitle: 'Basement Finishing Cost Calculator - Framing, Drywall & Insulation',
    metaDescription: 'Free basement finishing calculator. Enter room dimensions to estimate 2x4 wall framing studs, drywall sheets, insulation, subfloor, and paint in one BOM.',
    defaultDimensions: { length: 30, width: 20, height: 8 },
    subCalculators: ['Wall Framing', 'Drywall', 'Insulation', 'Flooring', 'Paint'],
    faqs: [
      { question: 'What is the average cost per square foot to finish a basement?', answer: 'DIY basement finishing typically costs between $12 to $25 per square foot in materials. Professional basement contractors charge $40 to $90+ per square foot.' },
      { question: 'Why is foam insulation critical in a basement?', answer: 'Continuous rigid foam or rockwool insulation against concrete foundation walls prevents warm indoor moisture from condensing on cold foundation masonry, preventing mold.' },
    ],
    calculate: (dim, unit) => {
      const isMetric = unit === 'metric';
      const l = isMetric ? dim.length * 3.28084 : dim.length;
      const w = isMetric ? dim.width * 3.28084 : dim.width;
      const h = isMetric ? dim.height * 3.28084 : dim.height;

      const floorArea = l * w;
      const perimeter = 2 * (l + w);
      const wallArea = perimeter * h;

      const framingRes = calculateWallFraming({
        unit: 'imperial',
        wallLength: perimeter,
        studSpacing: 16,
      });

      const drywallRes = calculateDrywall({
        unit: 'imperial',
        roomLength: l,
        roomWidth: w,
        roomHeight: h,
        includeCeiling: true,
        doorsCount: 2,
        windowsCount: 2,
        sheetSize: '4x8',
      });

      const mult = dim.quality === 'budget' ? 0.8 : dim.quality === 'premium' ? 1.5 : 1.0;

      const bom: ProjectBOMItem[] = [
        { category: 'Framing', material: '2x4x8 Studs & Plates', quantity: framingRes.totalStudsNeeded, unit: 'studs', estimatedCostRange: `$${Math.round(framingRes.totalStudsNeeded * 6.5)} – $${Math.round(framingRes.totalStudsNeeded * 9.5)}`, details: '16" on-center perimeter framing' },
        { category: 'Insulation', material: 'R-13 Wall Insulation Batts', quantity: Math.ceil(wallArea / 40), unit: 'rolls', estimatedCostRange: `$${Math.ceil(wallArea / 40) * 24} – $${Math.ceil(wallArea / 40) * 35}`, details: `${Math.round(wallArea)} sq ft wall insulation` },
        { category: 'Drywall', material: '1/2" Sheetrock (4x8)', quantity: drywallRes.sheetsNeeded, unit: 'sheets', estimatedCostRange: `$${drywallRes.sheetsNeeded * 15} – $${drywallRes.sheetsNeeded * 22}`, details: 'Walls and ceiling with joint tape' },
        { category: 'Flooring', material: 'Basement Subfloor Tile & LVP', quantity: Math.ceil(floorArea * 1.1), unit: 'sq ft', estimatedCostRange: `$${Math.round(floorArea * 2.8 * mult)} – $${Math.round(floorArea * 6.5 * mult)}`, details: 'Moisture-resistant raised floor' },
        { category: 'Finishing', material: 'Latex Primer & Wall Paint', quantity: Math.ceil(wallArea / 300) * 2, unit: 'gallons', estimatedCostRange: `$${Math.ceil(wallArea / 300) * 2 * 45} – $${Math.ceil(wallArea / 300) * 2 * 75}`, details: '2 coats primer + 2 coats paint' },
      ];

      const totalCostMin = Math.round(bom.reduce((acc, item) => acc + parseInt(item.estimatedCostRange.replace(/[^0-9]/g, ' ').trim().split(/\s+/)[0], 10), 0));
      const totalCostMax = Math.round(bom.reduce((acc, item) => acc + parseInt(item.estimatedCostRange.replace(/[^0-9]/g, ' ').trim().split(/\s+/)[1], 10), 0));

      return {
        bom,
        totalCostMin,
        totalCostMax,
        roomAreaSqFt: Math.round(floorArea * 10) / 10,
        roomAreaSqM: Math.round((floorArea / 10.7639) * 10) / 10,
      };
    },
  },

  'backyard-patio-cost': {
    slug: 'backyard-patio-cost',
    title: 'Backyard Paver Patio Material & Cost Estimator',
    shortTitle: 'Backyard Patio',
    tagline: 'Estimate pavers, compacted crushed stone base, bedding sand, and polymer sand in one go.',
    description: 'Calculate complete patio hardscape materials. Enter patio dimensions once to compute pavers, excavator base gravel tons, screed sand, polymeric joint sand, and snap-edging.',
    metaTitle: 'Backyard Patio Cost Calculator - Pavers, Sand, Gravel & Base',
    metaDescription: 'Free paver patio calculator. Enter length and width to calculate pavers, crushed stone gravel tons, bedding sand, and edge restraint in a unified Bill of Materials.',
    defaultDimensions: { length: 18, width: 14, height: 0 },
    subCalculators: ['Pavers', 'Gravel Base', 'Bedding Sand', 'Edge Restraints'],
    faqs: [
      { question: 'How much does a 250 sq ft paver patio cost?', answer: 'A DIY paver patio averages $1,500 to $3,500 in materials (approx $6 to $14 per sq ft). Professional installation ranges from $4,500 to $9,000+ ($18 to $35/sq ft).' },
      { question: 'What goes under a paver patio?', answer: 'From bottom to top: compacted subsoil, geotextile fabric, 4 to 6 inches of compacted crushed stone base, 1 inch of uncompacted coarse bedding sand, pavers, and polymeric sand swept into the joints.' },
    ],
    calculate: (dim, unit) => {
      const isMetric = unit === 'metric';
      const l = isMetric ? dim.length * 3.28084 : dim.length;
      const w = isMetric ? dim.width * 3.28084 : dim.width;

      const patioArea = l * w;
      const perimeter = 2 * (l + w);

      const paverRes = calculatePaver({
        unit: 'imperial',
        patioLength: l,
        patioWidth: w,
        paverSize: '12x12',
        sandBaseDepthInches: 1,
        gravelBaseDepthInches: 4,
      });

      const mult = dim.quality === 'budget' ? 0.75 : dim.quality === 'premium' ? 1.75 : 1.0;

      const bom: ProjectBOMItem[] = [
        { category: 'Surface', material: 'Interlocking Concrete Pavers (12x12)', quantity: paverRes.paversNeeded, unit: 'pavers', estimatedCostRange: `$${Math.round(patioArea * 3.5 * mult)} – $${Math.round(patioArea * 8.5 * mult)}`, details: `${Math.round(patioArea)} sq ft with 10% waste` },
        { category: 'Sub-Base', material: 'Crushed Stone Road Base (4" depth)', quantity: paverRes.gravelBaseTons, unit: 'tons', estimatedCostRange: `$${Math.round(paverRes.gravelBaseTons * 42)} – $${Math.round(paverRes.gravelBaseTons * 65)}`, details: `${paverRes.gravelBaseCuYds} cu yds compacted` },
        { category: 'Bedding', material: 'Coarse Bedding Sand (1" depth)', quantity: paverRes.beddingSandTons, unit: 'tons', estimatedCostRange: `$${Math.round(paverRes.beddingSandTons * 45)} – $${Math.round(paverRes.beddingSandTons * 70)}`, details: 'Level screeded bed' },
        { category: 'Joints & Edging', material: 'Polymeric Joint Sand', quantity: Math.ceil(patioArea / 75), unit: '50lb bags', estimatedCostRange: `$${Math.ceil(patioArea / 75) * 32} – $${Math.ceil(patioArea / 75) * 45}`, details: 'Locks joints and prevents weeds' },
        { category: 'Perimeter', material: 'Snap-Edge Restraints & Spikes', quantity: paverRes.edgeRestraintLinearFt, unit: 'linear ft', estimatedCostRange: `$${Math.round(paverRes.edgeRestraintLinearFt * 2.5)} – $${Math.round(paverRes.edgeRestraintLinearFt * 4.5)}`, details: 'Heavy-duty plastic edging with 10" spikes' },
      ];

      const totalCostMin = Math.round(bom.reduce((acc, item) => acc + parseInt(item.estimatedCostRange.replace(/[^0-9]/g, ' ').trim().split(/\s+/)[0], 10), 0));
      const totalCostMax = Math.round(bom.reduce((acc, item) => acc + parseInt(item.estimatedCostRange.replace(/[^0-9]/g, ' ').trim().split(/\s+/)[1], 10), 0));

      return {
        bom,
        totalCostMin,
        totalCostMax,
        roomAreaSqFt: Math.round(patioArea * 10) / 10,
        roomAreaSqM: Math.round((patioArea / 10.7639) * 10) / 10,
      };
    },
  },
};
