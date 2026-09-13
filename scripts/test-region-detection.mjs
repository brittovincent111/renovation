import assert from 'node:assert/strict';

// Dynamically import compiled or execute region-detection logic
import { detectUserRegion, DEFAULT_FALLBACK_REGION } from '../lib/region-detection.ts';

console.log('🧪 Starting Region Detection Verification Tests...\n');

const testCases = [
  // 1. India (IN)
  {
    name: 'India: explicit locale and timezone',
    locale: 'en-IN',
    tz: 'Asia/Kolkata',
    expected: 'IN',
    expectedSignal: 'timezone',
  },
  {
    name: 'India: Hindi locale with Calcutta timezone',
    locale: 'hi-IN',
    tz: 'Asia/Calcutta',
    expected: 'IN',
    expectedSignal: 'timezone',
  },
  {
    name: 'India disambiguation: en-US phone default in Kolkata',
    locale: 'en-US',
    tz: 'Asia/Kolkata',
    expected: 'IN',
    expectedSignal: 'disambiguated-timezone',
  },

  // 2. United Kingdom (UK)
  {
    name: 'UK: explicit en-GB and London timezone',
    locale: 'en-GB',
    tz: 'Europe/London',
    expected: 'UK',
    expectedSignal: 'timezone',
  },
  {
    name: 'UK disambiguation: en-US laptop default in London',
    locale: 'en-US',
    tz: 'Europe/London',
    expected: 'UK',
    expectedSignal: 'disambiguated-timezone',
  },
  {
    name: 'UK: Belfast timezone',
    locale: 'en-GB',
    tz: 'Europe/Belfast',
    expected: 'UK',
    expectedSignal: 'timezone',
  },

  // 3. Australia (AU)
  {
    name: 'Australia: explicit en-AU and Sydney timezone',
    locale: 'en-AU',
    tz: 'Australia/Sydney',
    expected: 'AU',
    expectedSignal: 'timezone',
  },
  {
    name: 'Australia disambiguation: en-US default in Melbourne',
    locale: 'en-US',
    tz: 'Australia/Melbourne',
    expected: 'AU',
    expectedSignal: 'disambiguated-timezone',
  },
  {
    name: 'Australia: generic en with Perth timezone',
    locale: 'en',
    tz: 'Australia/Perth',
    expected: 'AU',
    expectedSignal: 'timezone',
  },

  // 4. United States (US)
  {
    name: 'US: explicit en-US and New York timezone',
    locale: 'en-US',
    tz: 'America/New_York',
    expected: 'US',
    expectedSignal: 'timezone',
  },
  {
    name: 'US: Los Angeles timezone',
    locale: 'en-US',
    tz: 'America/Los_Angeles',
    expected: 'US',
    expectedSignal: 'timezone',
  },
  {
    name: 'US: Chicago timezone',
    locale: 'es-US',
    tz: 'America/Chicago',
    expected: 'US',
    expectedSignal: 'timezone',
  },

  // 5. Fallback & Traveler Edge Cases
  {
    name: 'Fallback: French locale and Paris timezone -> US',
    locale: 'fr-FR',
    tz: 'Europe/Paris',
    expected: 'US',
    expectedSignal: 'fallback',
  },
  {
    name: 'Fallback: Japanese locale and Tokyo timezone -> US',
    locale: 'ja-JP',
    tz: 'Asia/Tokyo',
    expected: 'US',
    expectedSignal: 'fallback',
  },
  {
    name: 'Traveler: Australian device (en-AU) visiting Tokyo -> AU',
    locale: 'en-AU',
    tz: 'Asia/Tokyo',
    expected: 'AU',
    expectedSignal: 'locale',
  },
  {
    name: 'Traveler: British device (en-GB) visiting Paris -> UK',
    locale: 'en-GB',
    tz: 'Europe/Paris',
    expected: 'UK',
    expectedSignal: 'locale',
  },
  {
    name: 'Missing signals -> Default US Fallback',
    locale: '',
    tz: '',
    expected: 'US',
    expectedSignal: 'fallback',
  },
];

let passed = 0;
let failed = 0;

for (const tc of testCases) {
  const res = detectUserRegion(tc.locale, tc.tz);
  try {
    assert.equal(res.region, tc.expected, `Expected region ${tc.expected} but got ${res.region}`);
    assert.equal(res.signal, tc.expectedSignal, `Expected signal ${tc.expectedSignal} but got ${res.signal}`);
    console.log(`  ✓ PASSED: ${tc.name} => ${res.region} (${res.signal})`);
    passed++;
  } catch (err) {
    console.error(`  ✗ FAILED: ${tc.name}`);
    console.error(`    ${err.message}`);
    failed++;
  }
}

console.log(`\nResults: ${passed} passed, ${failed} failed.\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 All region detection test cases passed successfully!');
}
