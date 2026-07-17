import React, { useState } from 'react';
import { HelpCircle, Sparkles, AlertCircle } from 'lucide-react';

export default function GraphLafferCurve() {
  const [taxRate, setTaxRate] = useState<number>(35); // Tax rate: 0% to 100%

  const size = 320;
  const padding = 50;
  const graphSize = size - padding * 2;

  // Parabolic Curve: Y = padding + graphSize - a * (X - X_optimum)^2
  // We want the peak to be at taxRate = 50%
  // SVG coordinates: (padding, size-padding) is (0%, $0), (size-padding, size-padding) is (100%, $0)
  // Peak at (padding + graphSize / 2, padding + 30)
  const optimumX = padding + graphSize / 2;
  const optimumY = padding + 30;

  // Let's generate points for a smooth parabola path
  let lafferPath = `M ${padding} ${size - padding}`;
  for (let rate = 1; rate <= 100; rate++) {
    const pct = rate / 100;
    const xCoord = padding + pct * graphSize;
    // Parabolic equation: height above base Y=size-padding
    const maxVal = graphSize - 40; // peak height
    const factor = 4 * maxVal; // normalization factor
    const yCoord = size - padding - factor * pct * (1 - pct);
    lafferPath += ` L ${xCoord} ${yCoord}`;
  }

  // Active Point coordinates based on taxRate
  const pctActive = taxRate / 100;
  const activeX = padding + pctActive * graphSize;
  const maxVal = graphSize - 40;
  const factor = 4 * maxVal;
  const activeY = size - padding - factor * pctActive * (1 - pctActive);

  // Status diagnosis
  const isOptimalRange = Math.abs(taxRate - 50) <= 2;
  const isProRevenueSide = taxRate < 50; // Arithmetical side
  const isProIncentiveSide = taxRate > 50; // Economic side

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
      {/* Visual Canvas Panel */}
      <div className="flex-1 flex flex-col items-center">
        <h4 className="text-sm font-semibold text-gray-800 mb-2 font-sans">
          Interactive Laffer Curve
        </h4>
        <div className="relative border border-gray-100 bg-gray-50/50 rounded-lg p-2">
          <svg width={size} height={size} className="overflow-visible font-mono">
            {/* Grid Axes */}
            <line x1={padding} y1={size-padding} x2={size-15} y2={size-padding} stroke="#d1d5db" strokeWidth="2" />
            <line x1={padding} y1={padding-15} x2={padding} y2={size-padding} stroke="#d1d5db" strokeWidth="2" />

            {/* Labels */}
            <text x={size - 5} y={size - padding + 15} textAnchor="end" className="text-xs fill-gray-500 font-sans font-medium">Tax Rate (%)</text>
            <text x={padding - 10} y={padding - 20} textAnchor="start" className="text-xs fill-gray-500 font-sans font-medium">Tax Revenue ($)</text>

            {/* Laffer Curve Path */}
            <path d={lafferPath} fill="none" stroke="#2563eb" strokeWidth="3" />

            {/* Optimal Rate Line (t*) */}
            <line x1={optimumX} y1={optimumY} x2={optimumX} y2={size - padding} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x={optimumX} y={optimumY - 8} textAnchor="middle" className="text-[10px] font-bold fill-amber-700">t* (Optimal Rate)</text>
            <text x={optimumX} y={size - padding + 15} textAnchor="middle" className="text-[10px] font-bold fill-amber-700">50%</text>

            {/* Current Rate Dashed lines */}
            <line x1={padding} y1={activeY} x2={activeX} y2={activeY} stroke="#94a3b8" strokeDasharray="2,2" className="transition-all duration-300" />
            <line x1={activeX} y1={size - padding} x2={activeX} y2={activeY} stroke="#94a3b8" strokeDasharray="2,2" className="transition-all duration-300" />

            {/* Active Rate Marker */}
            <circle cx={activeX} cy={activeY} r="6.5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" className="transition-all duration-300" />
            <text x={activeX + 10} y={activeY - 6} className="text-[10px] font-bold fill-red-600 font-sans">Current</text>
          </svg>
        </div>
      </div>

      {/* Interactive Controls Panel */}
      <div className="w-full md:w-64 flex flex-col justify-between">
        <div>
          {/* Theory Status Display */}
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3.5 mb-4 text-xs">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800 uppercase tracking-wide mb-2">
              <Sparkles className="w-4 h-4 text-blue-500" /> Revenue & Incentive Analysis
            </div>
            
            <div className="space-y-2 leading-relaxed text-gray-600">
              <div className="flex justify-between">
                <span>Current Tax Rate:</span>
                <span className="font-bold text-gray-800">{taxRate}%</span>
              </div>
              <div className="flex justify-between">
                <span>Revenue Index:</span>
                <span className="font-bold text-blue-600">{((size - padding - activeY) / 1.5).toFixed(0)} pts</span>
              </div>

              <div className="border-t border-slate-200 pt-2 mt-2">
                <span className="font-semibold text-gray-700 block mb-1">Impact of Cutting Tax Rates:</span>
                {isProRevenueSide && (
                  <span className="text-red-600 font-semibold flex items-start gap-1">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    Revenue will decrease. (Arithmetical effect dominates).
                  </span>
                )}
                {isProIncentiveSide && (
                  <span className="text-emerald-600 font-semibold flex items-start gap-1">
                    <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                    Revenue will INCREASE! Workers have stronger incentives, expanding the tax base.
                  </span>
                )}
                {isOptimalRange && (
                  <span className="text-amber-600 font-semibold flex items-start gap-1">
                    <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                    Revenue is currently maximized.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
              <span>National Income Tax Rate</span>
              <span className="font-mono text-xs text-blue-600 font-bold">{taxRate}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={taxRate} 
              onChange={(e) => setTaxRate(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>0% Tax Rate</span>
              <span>100% Tax Rate</span>
            </div>
          </div>
        </div>

        {/* Micro-Tutorial */}
        <div className="mt-4 p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-[10.5px] leading-relaxed text-gray-600 flex gap-2">
          <HelpCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <strong>The Core Argument:</strong> Arthur Laffer argued that tax rates above t* (50% here) are counterproductive. At very high rates, people work less, hide income, or move away, causing total tax revenue to fall.
          </div>
        </div>
      </div>
    </div>
  );
}
