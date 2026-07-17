import React, { useState } from 'react';
import { HelpCircle, Layers, Sliders } from 'lucide-react';

export default function GraphMoneyMarket() {
  const [msShift, setMsShift] = useState<number>(0); // MS shift: -50 (sell bonds) to 50 (buy bonds)
  const [mdShift, setMdShift] = useState<number>(0); // MD shift: -40 to 40

  const size = 320;
  const padding = 50;

  // Curves Math
  const mdStartX = padding;
  const mdStartY = 70 - mdShift;
  const mdEndX = size - padding;
  const mdEndY = 290 - mdShift;

  const msX = 160 + msShift;

  // Equilibrium (Nominal Interest Rate)
  // MD: Y = 70 + (X - 50) - mdShift
  // At X = msX:
  const ye = 70 + (msX - 50) - mdShift;

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
      {/* Visual Canvas Panel */}
      <div className="flex-1 flex flex-col items-center">
        <h4 className="text-sm font-semibold text-gray-800 mb-2 font-sans">
          Interactive Money Market
        </h4>
        <div className="relative border border-gray-100 bg-gray-50/50 rounded-lg p-2">
          <svg width={size} height={size} className="overflow-visible font-mono">
            {/* Grid Axes */}
            <line x1={padding} y1={size-padding} x2={size-15} y2={size-padding} stroke="#d1d5db" strokeWidth="2" />
            <line x1={padding} y1={padding-15} x2={padding} y2={size-padding} stroke="#d1d5db" strokeWidth="2" />

            {/* Labels */}
            <text x={size - 5} y={size - padding + 15} textAnchor="end" className="text-xs fill-gray-500 font-sans font-medium">Quantity of Money (M)</text>
            <text x={padding - 10} y={padding - 20} textAnchor="start" className="text-xs fill-gray-500 font-sans font-medium">Nominal Interest Rate (ir)</text>

            {/* Money Demand (MD) Curve */}
            <line x1={mdStartX} y1={mdStartY} x2={mdEndX} y2={mdEndY} stroke="#2563eb" strokeWidth="3" className="transition-all duration-300 ease-out" />
            <text x={mdEndX - 5} y={mdEndY - 8} className="text-xs font-bold fill-blue-700 font-sans">MD</text>

            {/* Money Supply (MS) Curve (Vertical) */}
            <line x1={msX} y1={padding} x2={msX} y2={size - padding} stroke="#10b981" strokeWidth="3.5" className="transition-all duration-300 ease-out" />
            <text x={msX} y={padding - 8} textAnchor="middle" className="text-xs font-bold fill-emerald-700 font-sans">MS</text>

            {/* Equilibrium Dashed Line to Y-axis */}
            <line x1={padding} y1={ye} x2={msX} y2={ye} stroke="#6b7280" strokeDasharray="3,3" className="transition-all duration-300" />
            
            {/* Equilibrium Markers */}
            <text x={padding - 8} y={ye + 4} textAnchor="end" className="text-xs font-bold fill-gray-600 font-sans">ir*</text>
            <text x={msX} y={size - padding + 15} textAnchor="middle" className="text-xs font-bold fill-gray-600 font-sans">M*</text>

            {/* Intersection point */}
            <circle cx={msX} cy={ye} r="5.5" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" className="transition-all duration-300" />
          </svg>
        </div>
      </div>

      {/* Interactive Controls Panel */}
      <div className="w-full md:w-64 flex flex-col justify-between">
        <div>
          {/* Central Bank Quick Actions */}
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800 uppercase tracking-wide mb-1.5">
              <Layers className="w-3.5 h-3.5" /> Central Bank Actions (Fed)
            </div>
            <div className="grid grid-cols-2 gap-1.5 mb-2.5">
              <button 
                onClick={() => setMsShift(35)}
                className="text-[10px] py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold rounded border border-emerald-200"
              >
                Buy Bonds (MS →)
              </button>
              <button 
                onClick={() => setMsShift(-35)}
                className="text-[10px] py-1 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded border border-red-200"
              >
                Sell Bonds (MS ←)
              </button>
            </div>
            <div className="text-[10px] text-gray-500 leading-normal">
              <strong>"Buy = Bigger"</strong> (MS increases, lowering interest rates). <br/>
              <strong>"Sell = Smaller"</strong> (MS decreases, raising interest rates).
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                <span>Money Supply (MS)</span>
                <span className={`font-mono text-xs font-bold ${msShift > 0 ? 'text-emerald-600' : msShift < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                  {msShift > 0 ? 'Expansionary' : msShift < 0 ? 'Contractionary' : 'Base'}
                </span>
              </div>
              <input 
                type="range" 
                min="-45" 
                max="45" 
                value={msShift} 
                onChange={(e) => setMsShift(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                <span>Money Demand (MD)</span>
                <span className={`font-mono text-xs font-bold ${mdShift > 0 ? 'text-blue-600' : mdShift < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                  {mdShift > 0 ? 'MD Right' : mdShift < 0 ? 'MD Left' : 'Base'}
                </span>
              </div>
              <input 
                type="range" 
                min="-40" 
                max="40" 
                value={mdShift} 
                onChange={(e) => setMdShift(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Micro-Tutorial */}
        <div className="mt-4 p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-[10.5px] leading-relaxed text-gray-600 flex gap-2">
          <HelpCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <strong>Interest Rate Transmission:</strong> When the Central Bank buys bonds, they inject money into banks, shifting MS right. This drives down the <strong>nominal interest rate</strong>, lowering borrowing costs for firms and households, thereby stimulating AD.
          </div>
        </div>
      </div>
    </div>
  );
}
