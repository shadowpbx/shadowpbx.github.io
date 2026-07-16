import React, { useState } from 'react';
import { HelpCircle, RefreshCw, Landmark } from 'lucide-react';

export default function GraphFOREX() {
  const [usInterestRate, setUsInterestRate] = useState<number>(0); // -40 (US low) to 40 (US high)
  const [tasteForUS, setTasteForUS] = useState<number>(0);         // -40 to 40

  // Dual-graph dimensions (smaller size to fit side-by-side)
  const size = 180;
  const padding = 35;

  // Let's model shifts for $ (US Dollar)
  // High US Interest rates attract foreign capital -> Demand for $ shifts right
  // Taste for US goods increases -> Demand for $ shifts right
  const dShiftUSD = usInterestRate * 0.7 + tasteForUS * 0.7;
  const sShiftUSD = 0; // Supply of dollars is relatively stable in this simple scenario

  // Intersection for USD
  const xeUSD = (size - padding * 2)/2 + padding + dShiftUSD / 2;
  const yeUSD = (size - padding * 2)/2 + padding - dShiftUSD / 2;

  // Let's model shifts for € (Euro)
  // To buy US assets, Europeans must supply their Euros -> Supply of € shifts right
  // Europeans buy more US goods -> Supply of € shifts right
  const dShiftEUR = 0;
  const sShiftEUR = usInterestRate * 0.7 + tasteForUS * 0.7;

  // Intersection for EUR
  const xeEUR = (size - padding * 2)/2 + padding - sShiftEUR / 2;
  const yeEUR = (size - padding * 2)/2 + padding + sShiftEUR / 2;

  return (
    <div className="flex flex-col gap-5 bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
      {/* Visual Dual-Canvas Layout */}
      <div className="flex flex-col xl:flex-row gap-6 items-center justify-center">
        
        {/* Market 1: US Dollar ($) */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1">
            <Landmark className="w-3.5 h-3.5 text-blue-600" /> Market for US Dollars ($)
          </span>
          <div className="relative border border-gray-100 bg-gray-50 rounded-lg p-2">
            <svg width={size} height={size} className="overflow-visible font-mono">
              {/* Axes */}
              <line x1={padding} y1={size-padding} x2={size-10} y2={size-padding} stroke="#9ca3af" strokeWidth="1.5" />
              <line x1={padding} y1={padding-10} x2={padding} y2={size-padding} stroke="#9ca3af" strokeWidth="1.5" />

              <text x={size-10} y={size-padding+12} textAnchor="end" className="text-[8px] fill-gray-500 font-sans">Qty of $</text>
              <text x={padding-6} y={padding-14} textAnchor="start" className="text-[8px] fill-gray-500 font-sans">Exch. Rate (€/$)</text>

              {/* Demand curve ($) */}
              <line 
                x1={padding} y1={padding + 15 - dShiftUSD} 
                x2={size - padding} y2={size - padding - 15 - dShiftUSD} 
                stroke="#2563eb" strokeWidth="2" className="transition-all duration-300" 
              />
              <text x={size-padding-2} y={size-padding-15-dShiftUSD} className="text-[9px] font-bold fill-blue-700">D_$</text>

              {/* Supply curve ($) */}
              <line 
                x1={padding} y1={size - padding - 15 - sShiftUSD} 
                x2={size - padding} y2={padding + 15 - sShiftUSD} 
                stroke="#10b981" strokeWidth="2" className="transition-all duration-300" 
              />
              <text x={size-padding-2} y={padding+15-sShiftUSD} className="text-[9px] font-bold fill-emerald-700">S_$</text>

              {/* Dashed lines */}
              <line x1={padding} y1={yeUSD} x2={xeUSD} y2={yeUSD} stroke="#9ca3af" strokeDasharray="2,2" className="transition-all duration-300" />
              <line x1={xeUSD} y1={size-padding} x2={xeUSD} y2={yeUSD} stroke="#9ca3af" strokeDasharray="2,2" className="transition-all duration-300" />

              <circle cx={xeUSD} cy={yeUSD} r="4.5" fill="#1e293b" stroke="#ffffff" className="transition-all duration-300" />
            </svg>
          </div>
          <span className="text-[10px] text-blue-600 font-bold mt-1 uppercase tracking-wide">
            {dShiftUSD > 0 ? 'Dollar Appreciates ↑' : dShiftUSD < 0 ? 'Dollar Depreciates ↓' : 'Dollar Stable'}
          </span>
        </div>

        {/* Sync/Mirror Indicator */}
        <div className="hidden xl:flex flex-col items-center justify-center text-gray-400">
          <RefreshCw className="w-5 h-5 animate-spin-slow mb-1" />
          <span className="text-[9px] font-mono text-center uppercase tracking-wider font-bold">Mirror<br/>Linkage</span>
        </div>

        {/* Market 2: Euro (€) */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1">
            <Landmark className="w-3.5 h-3.5 text-emerald-600" /> Market for Euros (€)
          </span>
          <div className="relative border border-gray-100 bg-gray-50 rounded-lg p-2">
            <svg width={size} height={size} className="overflow-visible font-mono">
              {/* Axes */}
              <line x1={padding} y1={size-padding} x2={size-10} y2={size-padding} stroke="#9ca3af" strokeWidth="1.5" />
              <line x1={padding} y1={padding-10} x2={padding} y2={size-padding} stroke="#9ca3af" strokeWidth="1.5" />

              <text x={size-10} y={size-padding+12} textAnchor="end" className="text-[8px] fill-gray-500 font-sans">Qty of €</text>
              <text x={padding-6} y={padding-14} textAnchor="start" className="text-[8px] fill-gray-500 font-sans">Exch. Rate ($/€)</text>

              {/* Demand curve (€) */}
              <line 
                x1={padding} y1={padding + 15 - dShiftEUR} 
                x2={size - padding} y2={size - padding - 15 - dShiftEUR} 
                stroke="#2563eb" strokeWidth="2" className="transition-all duration-300" 
              />
              <text x={size-padding-2} y={size-padding-15-dShiftEUR} className="text-[9px] font-bold fill-blue-700">D_€</text>

              {/* Supply curve (€) */}
              <line 
                x1={padding} y1={size - padding - 15 - sShiftEUR} 
                x2={size - padding} y2={padding + 15 - sShiftEUR} 
                stroke="#10b981" strokeWidth="2" className="transition-all duration-300" 
              />
              <text x={size-padding-2} y={padding+15-sShiftEUR} className="text-[9px] font-bold fill-emerald-700">S_€</text>

              {/* Dashed lines */}
              <line x1={padding} y1={yeEUR} x2={xeEUR} y2={yeEUR} stroke="#9ca3af" strokeDasharray="2,2" className="transition-all duration-300" />
              <line x1={xeEUR} y1={size-padding} x2={xeEUR} y2={yeEUR} stroke="#9ca3af" strokeDasharray="2,2" className="transition-all duration-300" />

              <circle cx={xeEUR} cy={yeEUR} r="4.5" fill="#1e293b" stroke="#ffffff" className="transition-all duration-300" />
            </svg>
          </div>
          <span className="text-[10px] text-emerald-600 font-bold mt-1 uppercase tracking-wide">
            {sShiftEUR > 0 ? 'Euro Depreciates ↓' : sShiftEUR < 0 ? 'Euro Appreciates ↑' : 'Euro Stable'}
          </span>
        </div>

      </div>

      {/* Sliders Panel */}
      <div className="bg-slate-50 border border-slate-100 rounded-lg p-3.5 space-y-3.5">
        <div>
          <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
            <span>US Real Interest Rates (Relative to EU)</span>
            <span className={`font-mono font-bold text-xs ${usInterestRate > 0 ? 'text-blue-600' : usInterestRate < 0 ? 'text-emerald-600' : 'text-gray-500'}`}>
              {usInterestRate > 0 ? 'US High' : usInterestRate < 0 ? 'EU High' : 'Equal'}
            </span>
          </div>
          <input 
            type="range" 
            min="-30" 
            max="30" 
            value={usInterestRate} 
            onChange={(e) => setUsInterestRate(parseInt(e.target.value))}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
            <span>Foreign Preference for US Exports</span>
            <span className="font-mono text-xs text-gray-500">{tasteForUS > 0 ? 'Taste ↑' : tasteForUS < 0 ? 'Taste ↓' : 'Base'}</span>
          </div>
          <input 
            type="range" 
            min="-30" 
            max="30" 
            value={tasteForUS} 
            onChange={(e) => setTasteForUS(parseInt(e.target.value))}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Micro-Tutorial */}
        <div className="p-2 bg-white rounded border border-gray-100 text-[10px] leading-relaxed text-gray-600 flex gap-2">
          <HelpCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <strong>Interactive Dual Link:</strong> As US real interest rates rise, Europeans seek higher US yields, requiring them to buy Dollars. This shifts <strong>Demand for Dollars right</strong> (Dollar appreciates). At the same time, they must sell Euros to acquire Dollars, shifting <strong>Supply of Euros right</strong> (Euro depreciates).
          </div>
        </div>
      </div>
    </div>
  );
}
