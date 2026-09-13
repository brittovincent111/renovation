'use client';

import React, { useState, useMemo } from 'react';
import { CalculatorMeta, UnitSystem, FAQItem } from '@/lib/types';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { getCalculatorConfig, FieldDefinition } from '@/lib/calculatorConfigs';
import { useRegion } from '@/lib/regionContext';
import { SlidersHorizontal, ChevronDown, Calculator, Check } from 'lucide-react';

interface CalculatorEngineViewProps {
  meta: CalculatorMeta;
  initialUnit?: UnitSystem;
  canonicalPath?: string;
  contentOverride?: { formulaHighlight?: string; howItIsCalculated: string[]; faqs: FAQItem[] };
}

export function CalculatorEngineView({ meta, initialUnit,
  canonicalPath,
  contentOverride,
}: CalculatorEngineViewProps) {
  const { unit: contextUnit, setUnit: setContextUnit } = useRegion();
  const unit = initialUnit || contextUnit;

  const config = useMemo(() => getCalculatorConfig(meta.slug), [meta.slug]);
  const [inputs, setInputs] = useState<Record<string, any>>(config.defaultInputs);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [calculatedPulse, setCalculatedPulse] = useState(false);

  // Divide fields into basic and advanced
  const { basicFields, advancedFields } = useMemo(() => {
    const basic: FieldDefinition[] = [];
    const advanced: FieldDefinition[] = [];

    // Check if any fields are explicitly marked as advanced
    const hasExplicitAdvanced = config.fields.some((f) => f.isAdvanced);

    config.fields.forEach((field, index) => {
      if (hasExplicitAdvanced) {
        if (field.isAdvanced) {
          advanced.push(field);
        } else {
          basic.push(field);
        }
      } else {
        // Intelligent fallback: if > 4 fields, secondary deductions/buffers go to advanced
        const isSecondary =
          index >= 4 ||
          ['waste', 'doors', 'windows', 'tilesPerBox', 'thickness', 'joint'].some((kw) =>
            field.id.toLowerCase().includes(kw)
          );
        if (isSecondary && config.fields.length > 3) {
          advanced.push(field);
        } else {
          basic.push(field);
        }
      }
    });

    return { basicFields: basic, advancedFields: advanced };
  }, [config.fields]);

  const handleInputChange = (fieldId: string, value: any) => {
    setInputs((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleUnitChange = (newUnit: UnitSystem) => {
    setContextUnit(newUnit);
  };

  const calculationResult = useMemo(() => {
    try {
      return config.calculate(inputs, unit);
    } catch (e) {
      console.error('Calculation error:', e);
      return {
        primaryValue: 0,
        primaryUnit: 'Units',
        primaryLabel: 'Estimated Material',
        details: [{ label: 'Status', value: 'Please verify input parameters' }],
      };
    }
  }, [config, inputs, unit]);

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setCalculatedPulse(true);
    setTimeout(() => setCalculatedPulse(false), 1200);

    // On mobile screens, smoothly scroll to result card so user immediately sees results
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      const resultEl = document.getElementById('result-card-container');
      if (resultEl) {
        resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  const renderField = (field: FieldDefinition) => {
    const unitLabel = unit === 'metric' ? field.unitMetric : field.unitImperial;

    if (field.type === 'select') {
      return (
        <div key={field.id} className="sm:col-span-2">
          <label
            htmlFor={field.id}
            className="block text-xs font-semibold uppercase tracking-wider text-[#263238] mb-1.5"
          >
            {field.label}
          </label>
          <select
            id={field.id}
            value={inputs[field.id] ?? field.defaultValue}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal-200 bg-white text-base sm:text-sm font-medium text-[#263238] focus:outline-hidden focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition-all cursor-pointer shadow-xs"
          >
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-white text-[#263238]">
                {opt.label}
              </option>
            ))}
          </select>
          {field.helperText && (
            <p className="mt-1 text-[11px] text-charcoal-500">{field.helperText}</p>
          )}
        </div>
      );
    }

    if (field.type === 'checkbox') {
      return (
        <div key={field.id} className="sm:col-span-2 flex items-center gap-3 py-2">
          <input
            type="checkbox"
            id={field.id}
            checked={Boolean(inputs[field.id] ?? field.defaultValue)}
            onChange={(e) => handleInputChange(field.id, e.target.checked)}
            className="h-4 w-4 rounded-md border-charcoal-300 text-terracotta focus:ring-terracotta cursor-pointer"
          />
          <label htmlFor={field.id} className="text-xs font-semibold text-[#263238] cursor-pointer">
            {field.label}
          </label>
        </div>
      );
    }

    return (
      <div key={field.id}>
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor={field.id}
            className="text-xs font-semibold uppercase tracking-wider text-[#263238]"
          >
            {field.label}
          </label>
          {unitLabel && (
            <span className="text-[10px] font-bold text-charcoal-500 bg-warm-50 border border-charcoal-100 px-2 py-0.5 rounded-md">
              {unitLabel}
            </span>
          )}
        </div>
        <div className="relative">
          <input
            type="number"
            id={field.id}
            step={field.step ?? 1}
            min={field.min ?? 0}
            max={field.max}
            value={inputs[field.id] ?? field.defaultValue}
            onChange={(e) => handleInputChange(field.id, e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal-200 bg-white text-base sm:text-sm font-semibold text-[#263238] focus:outline-hidden focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition-all tabular-nums shadow-xs"
          />
        </div>
        {field.helperText && (
          <p className="mt-1 text-[11px] text-charcoal-500">{field.helperText}</p>
        )}
      </div>
    );
  };

  return (
    <CalculatorLayout
      slug={meta.slug}
      canonicalPath={canonicalPath}
      name={meta.name}
      category={meta.category}
      description={meta.description}
      unit={unit}
      onUnitChange={handleUnitChange}
      result={calculationResult}
      howItIsCalculated={contentOverride?.howItIsCalculated ?? config.howItIsCalculated}
      formulaHighlight={contentOverride?.formulaHighlight ?? config.formulaHighlight}
      faqs={contentOverride?.faqs ?? config.faqs}
      externalNote={config.externalNote}
    >
      <form onSubmit={handleCalculate} className="space-y-6">
        {/* Primary / Basic Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {basicFields.map(renderField)}
        </div>

        {/* Collapsible Advanced Options (§21 of Spec) */}
        {advancedFields.length > 0 && (
          <div className="pt-2 border-t border-charcoal-100">
            <button
              type="button"
              id="toggle-advanced-options"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-between py-2 text-xs font-semibold text-charcoal-600 hover:text-terracotta transition-colors"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-charcoal-400" />
                <span>Advanced Options ({advancedFields.length} settings)</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-charcoal-400 transition-transform duration-200 ${
                  showAdvanced ? 'rotate-180 text-terracotta' : ''
                }`}
              />
            </button>

            {showAdvanced && (
              <div className="mt-3 p-4 rounded-2xl bg-warm-50 border border-charcoal-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {advancedFields.map(renderField)}
              </div>
            )}
          </div>
        )}

        {/* Prominent Calculate Button (§5, §6, §20) */}
        {/* Strictly isolated: NEVER place ads between inputs and this button or directly above it */}
        <div className="pt-2">
          <button
            type="submit"
            id="calculate-button"
            className="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-terracotta hover:bg-terracotta-600 active:bg-terracotta-700 text-white font-bold text-sm tracking-wide shadow-md shadow-terracotta/20 hover:shadow-lg hover:shadow-terracotta/30 transition-all duration-150 cursor-pointer"
          >
            {calculatedPulse ? (
              <>
                <Check className="w-4 h-4 text-warm-white" />
                <span>Calculated!</span>
              </>
            ) : (
              <>
                <Calculator className="w-4 h-4" />
                <span>Calculate Materials</span>
              </>
            )}
          </button>
          <span className="block sm:inline-block sm:ml-3 mt-2 sm:mt-0 text-xs text-charcoal-400">
            Real-time verified calculation
          </span>
        </div>
      </form>
    </CalculatorLayout>
  );
}
