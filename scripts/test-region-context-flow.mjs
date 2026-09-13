import assert from 'node:assert/strict';
import { REGIONS } from '../lib/regionContext.tsx';
import { detectUserRegion } from '../lib/region-detection.ts';

console.log('🧪 Testing Region Storage & Notice Lifecycle Flow...\n');

// Mock localStorage
class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  clear() {
    this.store = {};
  }
}

const mockStorage = new MockLocalStorage();

// Simulate RegionProvider mount logic
function simulateMount(storage, mockLocale, mockTz) {
  const savedRegion = storage.getItem('buildcalc_region');
  const savedUnit = storage.getItem('buildcalc_unit');
  const noticeDismissed = storage.getItem('buildcalc_region_notice_dismissed') === 'true';

  if (savedRegion && REGIONS[savedRegion]) {
    return {
      regionCode: savedRegion,
      unit: savedUnit || REGIONS[savedRegion].defaultUnit,
      isAutoDetected: false,
      showDetectedNotice: false,
      detectionRan: false,
    };
  }

  const detected = detectUserRegion(mockLocale, mockTz);
  return {
    regionCode: detected.region,
    unit: REGIONS[detected.region].defaultUnit,
    isAutoDetected: true,
    showDetectedNotice: !noticeDismissed,
    detectionRan: true,
    detectedSignal: detected.signal,
  };
}

// Simulate user manual region change
function simulateManualChange(storage, newRegionCode) {
  const newUnit = REGIONS[newRegionCode].defaultUnit;
  storage.setItem('buildcalc_region', newRegionCode);
  storage.setItem('buildcalc_unit', newUnit);
  storage.setItem('buildcalc_region_notice_dismissed', 'true');
  return {
    regionCode: newRegionCode,
    unit: newUnit,
    isAutoDetected: false,
    showDetectedNotice: false,
  };
}

// Simulate user clicking dismiss on the notice
function simulateNoticeDismiss(storage) {
  storage.setItem('buildcalc_region_notice_dismissed', 'true');
  return {
    showDetectedNotice: false,
  };
}

// Test 1: First visit with Australian browser
mockStorage.clear();
const firstVisitAU = simulateMount(mockStorage, 'en-AU', 'Australia/Sydney');
assert.equal(firstVisitAU.regionCode, 'AU');
assert.equal(firstVisitAU.unit, 'metric');
assert.equal(firstVisitAU.isAutoDetected, true);
assert.equal(firstVisitAU.showDetectedNotice, true);
assert.equal(firstVisitAU.detectionRan, true);
console.log('  ✓ Test 1 Passed: First visit correctly auto-detects AU, sets metric, shows notice.');

// Test 2: User dismisses notice
const dismissed = simulateNoticeDismiss(mockStorage);
assert.equal(dismissed.showDetectedNotice, false);
assert.equal(mockStorage.getItem('buildcalc_region_notice_dismissed'), 'true');

// Next page navigation before any manual override
const nextVisitSameSession = simulateMount(mockStorage, 'en-AU', 'Australia/Sydney');
assert.equal(nextVisitSameSession.regionCode, 'AU');
assert.equal(nextVisitSameSession.showDetectedNotice, false);
console.log('  ✓ Test 2 Passed: Notice dismissal persists and notice does not reappear.');

// Test 3: User manually overrides to UK
const manualOverride = simulateManualChange(mockStorage, 'UK');
assert.equal(manualOverride.regionCode, 'UK');
assert.equal(manualOverride.unit, 'metric');
assert.equal(manualOverride.isAutoDetected, false);
assert.equal(manualOverride.showDetectedNotice, false);
assert.equal(mockStorage.getItem('buildcalc_region'), 'UK');
console.log('  ✓ Test 3 Passed: Manual override immediately switches region and stores choice in localStorage.');

// Test 4: Subsequent visit (reload / new tab) with Indian browser locale
// (Stored preference UK must win over Indian browser signal)
const subsequentVisit = simulateMount(mockStorage, 'en-IN', 'Asia/Kolkata');
assert.equal(subsequentVisit.regionCode, 'UK');
assert.equal(subsequentVisit.isAutoDetected, false);
assert.equal(subsequentVisit.detectionRan, false);
assert.equal(subsequentVisit.showDetectedNotice, false);
console.log('  ✓ Test 4 Passed: Stored preference persists across reloads; auto-detection is skipped.');

console.log('\n🎉 All lifecycle & persistence tests passed successfully!');
