import { RegionCode } from './regionContext';

/**
 * Static mapping configuration for client-side country/region auto-detection.
 * Uses only browser-provided signals: navigator.language / navigator.languages and
 * Intl.DateTimeFormat().resolvedOptions().timeZone.
 *
 * Privacy-first: Zero IP lookups, zero server-side tracking, zero third-party APIs.
 */

export interface DetectionResult {
  region: RegionCode;
  signal: 'locale' | 'timezone' | 'disambiguated-timezone' | 'fallback';
  rawLanguage?: string;
  rawTimezone?: string;
}

export const DEFAULT_FALLBACK_REGION: RegionCode = 'US';

/**
 * 1. Timezone-to-Region mapping
 * Explicit IANA timezone strings mapped to supported regions.
 */
export const TIMEZONE_REGION_MAP: Record<string, RegionCode> = {
  // --- India (IN) ---
  'Asia/Kolkata': 'IN',
  'Asia/Calcutta': 'IN',

  // --- United Kingdom (UK) ---
  'Europe/London': 'UK',
  'Europe/Belfast': 'UK',
  'Europe/Jersey': 'UK',
  'Europe/Guernsey': 'UK',
  'Europe/Isle_of_Man': 'UK',

  // --- Australia (AU) ---
  'Australia/Sydney': 'AU',
  'Australia/Melbourne': 'AU',
  'Australia/Brisbane': 'AU',
  'Australia/Perth': 'AU',
  'Australia/Adelaide': 'AU',
  'Australia/Hobart': 'AU',
  'Australia/Darwin': 'AU',
  'Australia/Canberra': 'AU',
  'Australia/Lord_Howe': 'AU',
  'Australia/Eucla': 'AU',
  'Australia/Broken_Hill': 'AU',
  'Antarctica/Macquarie': 'AU',

  // --- United States (US) ---
  'America/New_York': 'US',
  'America/Chicago': 'US',
  'America/Denver': 'US',
  'America/Los_Angeles': 'US',
  'America/Phoenix': 'US',
  'America/Anchorage': 'US',
  'America/Honolulu': 'US',
  'America/Detroit': 'US',
  'America/Boise': 'US',
  'America/Juneau': 'US',
  'America/Sitka': 'US',
  'America/Metlakatla': 'US',
  'America/Yakutat': 'US',
  'America/Nome': 'US',
  'America/Adak': 'US',
  'America/Menominee': 'US',
  'America/North_Dakota/Center': 'US',
  'America/North_Dakota/New_Salem': 'US',
  'America/North_Dakota/Beulah': 'US',
  'America/Indiana/Indianapolis': 'US',
  'America/Indiana/Knox': 'US',
  'America/Indiana/Marengo': 'US',
  'America/Indiana/Petersburg': 'US',
  'America/Indiana/Tell_City': 'US',
  'America/Indiana/Vevay': 'US',
  'America/Indiana/Vincennes': 'US',
  'America/Indiana/Winamac': 'US',
  'America/Kentucky/Louisville': 'US',
  'America/Kentucky/Monticello': 'US',
  'Pacific/Honolulu': 'US',
};

/**
 * 2. Locale-to-Region mapping
 * Direct language tags mapped to supported regions.
 */
export const LOCALE_REGION_MAP: Record<string, RegionCode> = {
  // India
  'en-in': 'IN',
  'hi': 'IN',
  'hi-in': 'IN',
  'bn-in': 'IN',
  'ta-in': 'IN',
  'te-in': 'IN',
  'mr-in': 'IN',
  'gu-in': 'IN',
  'kn-in': 'IN',
  'ml-in': 'IN',
  'pa-in': 'IN',
  'ur-in': 'IN',

  // United Kingdom
  'en-gb': 'UK',
  'cy-gb': 'UK',
  'gd-gb': 'UK',

  // Australia
  'en-au': 'AU',

  // United States
  'en-us': 'US',
  'es-us': 'US',
};

/**
 * Synchronously detects the user's most probable supported region based on client-side signals.
 *
 * Evaluation Order:
 * 1. Primary Signal: Browser locale (navigator.language / navigator.languages).
 * 2. Disambiguation Signal: Intl.DateTimeFormat().resolvedOptions().timeZone.
 *    If locale is ambiguous (e.g. generic "en" or default "en-US" on Android/Windows while the
 *    user is physically in India, UK, or Australia), timezone takes precedence as the stronger signal.
 * 3. Fallback: Default to US if neither signal maps to a supported region.
 *
 * @param customLanguage Optional override for unit testing
 * @param customTimezone Optional override for unit testing
 */
export function detectUserRegion(
  customLanguage?: string,
  customTimezone?: string
): DetectionResult {
  let lang = customLanguage;
  let tz = customTimezone;

  if (typeof window !== 'undefined') {
    if (!lang) {
      lang = navigator.language || (navigator.languages && navigator.languages[0]) || '';
    }
    if (!tz) {
      try {
        tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      } catch {
        tz = '';
      }
    }
  }

  const cleanLang = (lang || '').toLowerCase().trim();
  const cleanTz = (tz || '').trim();

  // 1. Resolve Timezone Signal
  let tzRegion: RegionCode | undefined = TIMEZONE_REGION_MAP[cleanTz];
  if (!tzRegion && cleanTz.startsWith('Australia/')) {
    tzRegion = 'AU';
  }

  // 2. Resolve Locale Signal
  let localeRegion: RegionCode | undefined = LOCALE_REGION_MAP[cleanLang];
  if (!localeRegion) {
    if (cleanLang.endsWith('-in')) localeRegion = 'IN';
    else if (cleanLang.endsWith('-gb')) localeRegion = 'UK';
    else if (cleanLang.endsWith('-au')) localeRegion = 'AU';
    else if (cleanLang.endsWith('-us')) localeRegion = 'US';
  }

  // 3. Disambiguation & Resolution:
  // Case A: Both signals agree
  if (tzRegion && localeRegion && tzRegion === localeRegion) {
    return {
      region: tzRegion,
      signal: 'timezone',
      rawLanguage: lang,
      rawTimezone: tz,
    };
  }

  // Case B: Timezone maps to a supported region, but locale is generic ("en") or mismatched
  // (e.g., "en-US" OS default on phone while physically in "Asia/Kolkata", "Europe/London", or "Australia/Sydney").
  // Per requirement 1b, timezone is the stronger geographic signal.
  if (tzRegion) {
    return {
      region: tzRegion,
      signal: localeRegion ? 'disambiguated-timezone' : 'timezone',
      rawLanguage: lang,
      rawTimezone: tz,
    };
  }

  // Case C: Timezone is unmapped/overseas, but locale explicitly specifies a supported region
  // (e.g., user travels to Tokyo with an "en-AU" or "en-GB" device).
  if (localeRegion) {
    return {
      region: localeRegion,
      signal: 'locale',
      rawLanguage: lang,
      rawTimezone: tz,
    };
  }

  // Case D: Fallback
  return {
    region: DEFAULT_FALLBACK_REGION,
    signal: 'fallback',
    rawLanguage: lang,
    rawTimezone: tz,
  };
}
