import React, { useState } from 'react';
import { HelpCircle, Layers, Sliders } from 'lucide-react';

export default function GraphLoanableFunds() {
  const [dlfShift, setDlfShift] = useState<number>(0); // DLF shift: -40 to 40
  const [slfShift, setSlfShift] = useState<number>(0); // SLF shift: -40 to 40

  const size = 320;
  const padding = 50;

  // Curves Math
  const dlfStartX = padding;
  const dlfStartY = 70 - dlfShift;
  const dlfEndX = size - padding;
  const dlfEndY = 290 - dlfShift;

  const slfStartX = padding;
  const slfStartY = 250 - slfShift;
  const slfEndX = size - padding;
  const slfEndY = 30 - slfShift;

  // Equilibrium intersection
  const xe = 140 + (dlfShift - slfShift) / 2;
  const ye = 160 - (dlfShift + slfShift) / 2;

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
      {/* Visual Canvas Panel */}
      <div className="flex-1 flex flex-col items-center">
        <h4 className="text-sm font-semibold text-gray-800 mb-2 font-sans">
          Loanable Funds Market Simulator
        </h4>
        <div className="relative border border-gray-100 bg-gray-50/50 rounded-lg p-2">
          <svg width={size} height={size} className="overflow-visible font-mono">
            {/* Grid Axes */}
            <line x1={padding} y1={size-padding} x2={size-15} y2={size-padding} stroke="#d1d5db" strokeWidth="2" />
            <line x1={padding} y1={padding-15} x2={padding} y2={size-padding} stroke="#d1d5db" strokeWidth="2" />

            {/* Labels */}
            <text x={size - 5} y={size - padding + 15} textAnchor="end" className="text-xs fill-gray-500 font-sans font-medium">Quantity of Funds (QLF)</text>
            <text x={padding - 10} y={padding - 20} textAnchor="start" className="text-xs fill-gray-500 font-sans font-medium">Real Interest Rate (r)</text>

            {/* DLF Curve */}
            <line x1={dlfStartX} y1={dlfStartY} x2={dlfEndX} y2={dlfEndY} stroke="#2563eb" strokeWidth="3" className="transition-all duration-300 ease-out" />
            <text x={dlfEndX - 5} y={dlfEndY - 8} className="text-xs font-bold fill-blue-700 font-sans">D_LF</text>

            {/* SLF Curve */}
            <line x1={slfStartX} y1={slfStartY} x2={slfEndX} y2={slfEndY} stroke="#10b981" strokeWidth="3" className="transition-all duration-300 ease-out" />
            <text x={slfEndX - 5} y={slfEndY + 15} className="text-xs font-bold fill-emerald-700 font-sans">S_LF</text>

            {/* Equilibrium Dashed lines */}
            <line x1={padding} y1={ye} x2={xe} y2={ye} stroke="#6b7280" strokeDasharray="3,3" className="transition-all duration-300" />
            <line x1={xe} y1={size-padding} x2={xe} y2={ye} stroke="#6b7280" strokeDasharray="3,3" className="transition-all duration-300" />

            {/* Axis labels */}
            <text x={padding - 8} y={ye + 4} textAnchor="end" className="text-xs font-bold fill-gray-600 font-sans">r*</text>
            <text x={xe} y={size - padding + 15} textAnchor="middle" className="text-xs font-bold fill-gray-600 font-sans">Q*</text>

            {/* Equilibrium Point */}
            <circle cx={xe} cy={ye} r="5.5" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" className="transition-all duration-300" />
          </svg>
        </div>
      </div>

      {/* Interactive Controls Panel */}
      <div className="w-full md:w-64 flex flex-col justify-between">
        <div>
          {/* Quick Scenario Buttons */}
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800 uppercase tracking-wide mb-1.5">
              <Layers className="w-3.5 h-3.5" /> Market Scenarios
            </div>
            <div className="grid grid-cols-2 gap-1.5 mb-2">
              <button 
                onClick={() => { setDlfShift(30); setSlfShift(0); }}
                className="text-[10px] py-1 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded border border-red-200"
              >
                Budget Deficit (D_LF →)
              </button>
              <button 
                onClick={() => { setDlfShift(0); setSlfShift(30); }}
                className="text-[10px] py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold rounded border border-emerald-200"
              >
                More Savings (S_LF →)
              </button>
            </div>
            <div className="text-[10px] text-gray-500 leading-normal">
              A <strong>Budget Deficit</strong> requires the government to borrow, increasing the demand for funds, which drives up real interest rates (r) and crowds out private investment.
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                <span>Demand (DLF - Borrowers)</span>
                <span className={`font-mono text-xs font-bold ${dlfShift > 0 ? 'text-blue-600' : dlfShift < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                  {dlfShift > 0 ? 'Shifted Right' : dlfShift < 0 ? 'Shifted Left' : 'Base'}
                </span>
              </div>
              <input 
                type="range" 
                min="-40" 
                max="40" 
                value={dlfShift} 
                onChange={(e) => setDlfShift(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                <span>Supply (SLF - Savers)</span>
                <span className={`font-mono text-xs font-bold ${slfShift > 0 ? 'text-emerald-600' : slfShift < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                  {slfShift > 0 ? 'Shifted Right' : slfShift < 0 ? 'Shifted Left' : 'Base'}
                </span>
              </div>
              <input 
                type="range" 
                min="-40" 
                max="40" 
                value={slfShift} 
                onChange={(e) => setSlfShift(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Micro-Tutorial */}
        <div className="mt-4 p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-[10.5px] leading-relaxed text-gray-600 flex gap-2">
          <HelpCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <strong>Real vs. Nominal Interest Rates:</strong> This market determines the <strong>real interest rate (r)</strong>, which is the nominal interest rate corrected for expected inflation. It reflects the true price of borrowing and saving.
          </div>
        </div>
      </div>
    </div>
  );
}
