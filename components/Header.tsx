'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ALL_CALCULATORS, CATEGORIES } from '@/lib/calculatorList';
import { useRegion, REGIONS, RegionCode } from '@/lib/regionContext';
import { BrandLogo } from './BrandLogo';
import { ChevronDown, Menu, X, Search, Globe, FolderKanban, BookOpen } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const { region, setRegionCode } = useRegion();

  const filteredCalculators = searchQuery.trim()
    ? ALL_CALCULATORS.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (c.keywords && c.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())))
      )
    : ALL_CALCULATORS;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-charcoal-100 bg-white/95 backdrop-blur-md print:hidden shadow-2xs">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8 gap-2">
          {/* Logo */}
          <div className="shrink-0 min-w-0">
            <BrandLogo size="md" />
          </div>

          {/* Desktop Navigation (§2) */}
          <nav className="hidden md:flex items-center gap-5">
            {/* Calculators Dropdown */}
            <div className="relative">
              <button
                type="button"
                id="header-calculators-menu-button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 250)}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#263238] hover:text-terracotta transition-colors cursor-pointer"
              >
                <span>Calculators</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 mt-3 w-88 rounded-2xl border border-charcoal-100 bg-white p-3 shadow-xl shadow-charcoal-900/10 z-50">
                  <div className="flex items-center justify-between px-2 py-1 mb-1 border-b border-charcoal-100 text-[11px] font-bold uppercase tracking-wider text-charcoal-400">
                    <span>All Calculators ({ALL_CALCULATORS.length})</span>
                    <Link href="/" className="text-terracotta normal-case hover:underline font-semibold">
                      Directory →
                    </Link>
                  </div>
                  <div className="max-h-96 overflow-y-auto space-y-1 pr-1">
                    {ALL_CALCULATORS.map((calc) => (
                      <Link
                        key={calc.slug}
                        href={`/calculators/${calc.slug}`}
                        className="flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium text-[#263238] hover:bg-terracotta-50 hover:text-terracotta-700 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <span className="truncate pr-2">{calc.name}</span>
                        <span className="text-[10px] text-charcoal-400 shrink-0">{calc.category}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Categories Dropdown (§2) */}
            <div className="relative">
              <button
                type="button"
                id="header-categories-menu-button"
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                onBlur={() => setTimeout(() => setCategoryDropdownOpen(false), 250)}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#263238] hover:text-terracotta transition-colors cursor-pointer"
              >
                <span>Categories</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {categoryDropdownOpen && (
                <div className="absolute left-0 mt-3 w-64 rounded-2xl border border-charcoal-100 bg-white p-2 shadow-xl shadow-charcoal-900/10 z-50">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 px-2 py-1 border-b border-charcoal-100 mb-1">
                    Renovation Categories
                  </div>
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat}
                      href={`/?category=${encodeURIComponent(cat)}`}
                      className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium text-[#263238] hover:bg-terracotta-50 hover:text-terracotta transition-colors"
                      onClick={() => setCategoryDropdownOpen(false)}
                    >
                      <span>{cat}</span>
                      <span className="text-[10px] text-charcoal-400 font-bold">
                        {ALL_CALCULATORS.filter((c) => c.category === cat).length}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Guides */}
            <Link
              href="/guides"
              className="flex items-center gap-1 text-xs font-semibold text-[#263238] hover:text-terracotta transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-charcoal-400" />
              <span>Guides</span>
            </Link>

            {/* Region / Units Selector */}
            <div className="relative">
              <button
                type="button"
                id="header-region-selector"
                onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}
                onBlur={() => setTimeout(() => setRegionDropdownOpen(false), 250)}
                className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-charcoal-200 hover:bg-warm-50 text-[#263238] transition-colors cursor-pointer"
                title="Change Region & Units"
              >
                <span>{region.flag}</span>
                <span>{region.code} ({region.currencySymbol})</span>
                <ChevronDown className="h-3 w-3 text-charcoal-400" />
              </button>

              {regionDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-charcoal-100 bg-white p-2 shadow-xl shadow-charcoal-900/10 z-50">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 px-2 py-1">
                    Select Region & Currency
                  </div>
                  {Object.values(REGIONS).map((reg) => (
                    <button
                      key={reg.code}
                      type="button"
                      onClick={() => {
                        setRegionCode(reg.code as RegionCode);
                        setRegionDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        region.code === reg.code
                          ? 'bg-terracotta-50 text-terracotta-700 font-semibold'
                          : 'text-[#263238] hover:bg-warm-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{reg.flag}</span>
                        <span>{reg.name}</span>
                      </span>
                      <span className="text-[11px] text-charcoal-400">{reg.currencySymbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Global Search Button */}
            <button
              type="button"
              id="header-search-trigger"
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-charcoal-200 bg-warm-50 px-3 py-1.5 text-xs text-charcoal-500 hover:border-terracotta-400 hover:text-terracotta transition-colors cursor-pointer"
            >
              <Search className="h-3.5 w-3.5 text-charcoal-400" />
              <span>Search tools...</span>
              <kbd className="hidden lg:inline-block rounded bg-charcoal-100 px-1.5 py-0.5 text-[10px] font-mono text-charcoal-600">
                ⌘K
              </kbd>
            </button>
          </nav>

          {/* Mobile Header Actions (§2: Logo, Search, Region, Menu) */}
          <div className="flex md:hidden items-center gap-1 sm:gap-2 shrink-0">
            <button
              type="button"
              id="mobile-search-btn"
              onClick={() => setSearchModalOpen(true)}
              className="p-2 rounded-xl text-charcoal-700 hover:bg-warm-100 transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-[#263238]" />
            </button>

            <button
              type="button"
              id="mobile-region-btn"
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-charcoal-200 bg-warm-50 text-xs font-semibold text-[#263238] hover:bg-warm-100 transition-colors cursor-pointer"
              aria-label="Select Region"
            >
              <span>{region.flag}</span>
              <span className="font-bold text-[11px]">{region.code}</span>
            </button>

            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#263238] hover:bg-warm-100 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-charcoal-100 bg-white px-4 pt-3 pb-6 md:hidden">
            {/* Region picker for mobile */}
            <div className="mb-4 p-3 rounded-2xl bg-warm-50 border border-charcoal-100">
              <div className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-terracotta" />
                <span>Region & Unit Setting</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Object.values(REGIONS).map((reg) => (
                  <button
                    key={reg.code}
                    type="button"
                    onClick={() => setRegionCode(reg.code as RegionCode)}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs ${
                      region.code === reg.code
                        ? 'bg-terracotta text-white font-semibold'
                        : 'bg-white text-[#263238] border border-charcoal-200'
                    }`}
                  >
                    <span>{reg.flag} {reg.code}</span>
                    <span className="text-[11px] opacity-80">{reg.currencySymbol}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1 pb-3 border-b border-charcoal-100">
              <Link
                href="/"
                className="block px-3 py-2 text-sm font-semibold text-[#263238] rounded-lg hover:bg-warm-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Calculators Directory
              </Link>
              <Link
                href="/projects"
                className="flex items-center justify-between px-3 py-2 text-sm font-medium text-[#263238] rounded-lg hover:bg-warm-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Project Combo Pages</span>
                <span className="text-[10px] bg-terracotta-100 text-terracotta-800 px-2 py-0.5 rounded-full font-bold">5 Guides</span>
              </Link>
              <Link
                href="/guides"
                className="block px-3 py-2 text-sm font-medium text-[#263238] rounded-lg hover:bg-warm-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                DIY Renovation Guides
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-sm font-medium text-[#263238] rounded-lg hover:bg-warm-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                About RenovationCalculator
              </Link>
              <Link
                href="/privacy-policy"
                className="block px-3 py-2 text-sm font-medium text-[#263238] rounded-lg hover:bg-warm-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Privacy Policy
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-sm font-medium text-[#263238] rounded-lg hover:bg-warm-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>

            <div className="pt-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400 px-3 mb-2">
                Browse 40+ Calculators
              </p>
              <div className="grid grid-cols-1 gap-1 max-h-56 overflow-y-auto pr-1">
                {ALL_CALCULATORS.map((calc) => (
                  <Link
                    key={calc.slug}
                    href={`/calculators/${calc.slug}`}
                    className="px-3 py-1.5 text-xs text-charcoal-600 hover:text-terracotta rounded-md hover:bg-terracotta-50 truncate"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {calc.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-charcoal-900/60 backdrop-blur-xs"
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-3xl border border-charcoal-200 bg-white p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-charcoal-100 pb-3 px-2">
              <Search className="h-5 w-5 text-charcoal-400 shrink-0" />
              <input
                type="text"
                id="global-search-input"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 40+ calculators (e.g., tile, concrete, grout, wire gauge, HVAC)..."
                className="w-full bg-transparent text-sm text-[#263238] placeholder-charcoal-400 focus:outline-hidden"
              />
              <button
                type="button"
                onClick={() => setSearchModalOpen(false)}
                className="text-xs text-charcoal-400 hover:text-charcoal-700 p-1"
              >
                ESC
              </button>
            </div>

            <div className="mt-3 max-h-80 overflow-y-auto space-y-1">
              {filteredCalculators.length === 0 ? (
                <p className="text-xs text-center text-charcoal-400 py-6">
                  No calculators found for &quot;{searchQuery}&quot;
                </p>
              ) : (
                filteredCalculators.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/calculators/${c.slug}`}
                    onClick={() => setSearchModalOpen(false)}
                    className="flex flex-col p-2.5 rounded-xl hover:bg-warm-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#263238]">
                        {c.name}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-terracotta bg-terracotta-50 px-2 py-0.5 rounded-full">
                        {c.category}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-500 line-clamp-1 mt-0.5">
                      {c.description}
                    </p>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
