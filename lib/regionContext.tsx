'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UnitSystem } from './types';

import { detectUserRegion } from './region-detection';

export type RegionCode = 'US' | 'UK' | 'IN' | 'AU';

export interface RegionInfo {
  code: RegionCode;
  name: string;
  flag: string;
  currencySymbol: string;
  currencyCode: string;
  defaultUnit: UnitSystem;
  terminology: {
    drywall: string;
    lumber: string;
    baseboard: string;
    gutter: string;
    shingles: string;
    subfloor: string;
  };
}

export const REGIONS: Record<RegionCode, RegionInfo> = {
  US: {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currencySymbol: '$',
    currencyCode: 'USD',
    defaultUnit: 'imperial',
    terminology: {
      drywall: 'Drywall / Sheetrock',
      lumber: 'Lumber',
      baseboard: 'Baseboard Trim',
      gutter: 'Rain Gutters',
      shingles: 'Roofing Shingles',
      subfloor: 'Subfloor / Plywood',
    },
  },
  UK: {
    code: 'UK',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currencySymbol: '£',
    currencyCode: 'GBP',
    defaultUnit: 'metric',
    terminology: {
      drywall: 'Plasterboard',
      lumber: 'Timber',
      baseboard: 'Skirting Board',
      gutter: 'Guttering',
      shingles: 'Roof Tiles / Slates',
      subfloor: 'Subfloor Boarding',
    },
  },
  IN: {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    currencySymbol: '₹',
    currencyCode: 'INR',
    defaultUnit: 'metric',
    terminology: {
      drywall: 'Gypsum Board',
      lumber: 'Timber / Wood',
      baseboard: 'Skirting Tiles / Border',
      gutter: 'Rainwater Gutters',
      shingles: 'Roofing Sheets / Tiles',
      subfloor: 'Base Screed / Plywood',
    },
  },
  AU: {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    currencySymbol: 'A$',
    currencyCode: 'AUD',
    defaultUnit: 'metric',
    terminology: {
      drywall: 'Gyprock / Plasterboard',
      lumber: 'Timber',
      baseboard: 'Skirting Boards',
      gutter: 'Guttering & Downpipes',
      shingles: 'Roof Tiles / Colorbond',
      subfloor: 'Structural Flooring',
    },
  },
};

interface RegionContextType {
  region: RegionInfo;
  setRegionCode: (code: RegionCode) => void;
  unit: UnitSystem;
  setUnit: (unit: UnitSystem) => void;
  isAutoDetected: boolean;
  showDetectedNotice: boolean;
  dismissDetectedNotice: () => void;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export function RegionProvider({ children }: { children: React.ReactNode }) {
  const [regionCode, setRegionCodeState] = useState<RegionCode>('US');
  const [unit, setUnitState] = useState<UnitSystem>('imperial');
  const [isAutoDetected, setIsAutoDetected] = useState<boolean>(false);
  const [showDetectedNotice, setShowDetectedNotice] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedRegion = localStorage.getItem('buildcalc_region') as RegionCode;
      const savedUnit = localStorage.getItem('buildcalc_unit') as UnitSystem;
      const noticeDismissed = localStorage.getItem('buildcalc_region_notice_dismissed') === 'true';

      if (savedRegion && REGIONS[savedRegion]) {
        // User has already set a manual preference or previous visit
        setRegionCodeState(savedRegion);
        if (savedUnit && (savedUnit === 'imperial' || savedUnit === 'metric')) {
          setUnitState(savedUnit);
        } else {
          setUnitState(REGIONS[savedRegion].defaultUnit);
        }
        setIsAutoDetected(false);
        setShowDetectedNotice(false);
        return;
      }

      // First visit: Auto-detect region from browser language & timezone
      const detected = detectUserRegion();
      setRegionCodeState(detected.region);
      setUnitState(REGIONS[detected.region].defaultUnit);
      setIsAutoDetected(true);

      // Unobtrusive first-visit notice (dismissible, not a modal)
      if (!noticeDismissed) {
        setShowDetectedNotice(true);
      }
    } catch {
      // Ignore if localStorage unavailable
    }
  }, []);

  const setRegionCode = (code: RegionCode) => {
    if (!REGIONS[code]) return;
    setRegionCodeState(code);
    const newUnit = REGIONS[code].defaultUnit;
    setUnitState(newUnit);
    setIsAutoDetected(false);
    setShowDetectedNotice(false); // Immediate dismissal on manual choice
    try {
      localStorage.setItem('buildcalc_region', code);
      localStorage.setItem('buildcalc_unit', newUnit);
      localStorage.setItem('buildcalc_region_notice_dismissed', 'true');
    } catch {}
  };

  const dismissDetectedNotice = () => {
    setShowDetectedNotice(false);
    try {
      localStorage.setItem('buildcalc_region_notice_dismissed', 'true');
    } catch {}
  };

  const setUnit = (newUnit: UnitSystem) => {
    setUnitState(newUnit);
    try {
      localStorage.setItem('buildcalc_unit', newUnit);
    } catch {}
  };

  return (
    <RegionContext.Provider
      value={{
        region: REGIONS[regionCode] || REGIONS.US,
        setRegionCode,
        unit,
        setUnit,
        isAutoDetected,
        showDetectedNotice,
        dismissDetectedNotice,
      }}
    >
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (!context) {
    return {
      region: REGIONS.US,
      setRegionCode: () => {},
      unit: 'imperial' as UnitSystem,
      setUnit: () => {},
      isAutoDetected: false,
      showDetectedNotice: false,
      dismissDetectedNotice: () => {},
    };
  }
  return context;
}
