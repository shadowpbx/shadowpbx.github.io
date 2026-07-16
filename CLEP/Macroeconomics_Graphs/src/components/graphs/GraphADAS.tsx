import React, { useState } from 'react';
import { HelpCircle, Layers, Sliders } from 'lucide-react';

export default function GraphADAS() {
  const [adShift, setAdShift] = useState<number>(0);     // AD Shift: -40 to 40
  const [srasShift, setSrasShift] = useState<number>(0); // SRAS Shift: -40 to 40
  const [lrasShift, setLrasShift] = useState<number>(0); // LRAS Shift: -20 to 20

  // SVG Size
  const size = 320;
  const padding = 50;

  // Curves Math
  const adStartX = padding;
  const adStartY = 70 - adShift;
  const adEndX = size - padding;
  const adEndY = 290 - adShift;

  const srasStartX = padding;
  const srasStartY = 250 - srasShift;
  const srasEndX = size - padding;
  const srasEndY = 30 - srasShift;

  // LRAS position
  const lrasX = 140 + lrasShift;

  // Short-run equilibrium (intersection of AD and SRAS)
  const xe = 140 + (adShift - srasShift) / 2;
  const ye = 160 - (adShift + srasShift) / 2;

  // Check state: Recessionary vs Inflationary vs Long-run Equilibrium
  const gapType = Math.abs(xe - lrasX) < 3
    ? 'lre'
    : xe < lrasX
      ? 'recessionary'
      : 'inflationary';

  const gapSize = Math.abs(xe - lrasX);

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
      {/* Visual Canvas Panel */}
      <div className="flex-1 flex flex-col items-center">
        <h4 className="text-sm font-semibold text-gray-800 mb-2 font-sans">
          Interactive AD/AS Graph
        </h4>
        <div className="relative border border-gray-100 bg-gray-50/50 rounded-lg p-2">
          <svg width={size} height={size} className="overflow-visible font-mono">
            {/* Shading Gaps */}
            {gapType === 'recessionary' && gapSize > 4 && (
              <rect 
                x={xe} 
                y={padding} 
                width={lrasX - xe} 
                height={size - padding * 2} 
                fill="#ef4444" 
                fillOpacity="0.1" 
                className="transition-all duration-300"
              />
            )}
            {gapType === 'inflationary' && gapSize > 4 && (
              <rect 
                x={lrasX} 
                y={padding} 
                width={xe - lrasX} 
                height={size - padding * 2} 
                fill="#3b82f6" 
                fillOpacity="0.1" 
                className="transition-all duration-300"
              />
            )}

            {/* Grid Axes */}
            <line x1={padding} y1={size-padding} x2={size-15} y2={size-padding} stroke="#d1d5db" strokeWidth="2" />
            <line x1={padding} y1={padding-15} x2={padding} y2={size-padding} stroke="#d1d5db" strokeWidth="2" />

            {/* Labels */}
            <text x={size - 5} y={size - padding + 15} textAnchor="end" className="text-xs fill-gray-500 font-sans font-medium">Real GDP (Y)</text>
            <text x={padding - 10} y={padding - 20} textAnchor="start" className="text-xs fill-gray-500 font-sans font-medium">Price Level (PL)</text>

            {/* Aggregate Demand (AD) Curve */}
            <line x1={adStartX} y1={adStartY} x2={adEndX} y2={adEndY} stroke="#2563eb" strokeWidth="3" className="transition-all duration-300 ease-out" />
            <text x={adEndX - 5} y={adEndY - 8} className="text-xs font-bold fill-blue-700 font-sans">AD</text>

            {/* Short-Run Aggregate Supply (SRAS) Curve */}
            <line x1={srasStartX} y1={srasStartY} x2={srasEndX} y2={srasEndY} stroke="#10b981" strokeWidth="3" className="transition-all duration-300 ease-out" />
            <text x={srasEndX - 5} y={srasEndY + 15} className="text-xs font-bold fill-emerald-700 font-sans">SRAS</text>

            {/* Long-Run Aggregate Supply (LRAS) Curve (Vertical) */}
            <line x1={lrasX} y1={padding - 10} x2={lrasX} y2={size - padding} stroke="#f59e0b" strokeWidth="3.5" className="transition-all duration-300 ease-out" />
            <text x={lrasX} y={padding - 16} textAnchor="middle" className="text-xs font-bold fill-amber-700 font-sans">LRAS</text>
            <text x={lrasX} y={size - padding + 13} textAnchor="middle" className="text-[10px] fill-amber-700 font-sans font-bold">Y_F</text>

            {/* Dotted lines from short-run equilibrium to Axes */}
            <line x1={padding} y1={ye} x2={xe} y2={ye} stroke="#6b7280" strokeDasharray="3,3" className="transition-all duration-300" />
            <line x1={xe} y1={size-padding} x2={xe} y2={ye} stroke="#6b7280" strokeDasharray="3,3" className="transition-all duration-300" />

            {/* Current PL & Y Labels */}
            <text x={padding - 8} y={ye + 4} textAnchor="end" className="text-[10px] font-bold fill-gray-600 font-sans">PL*</text>
            <text x={xe} y={size - padding + 13} textAnchor="middle" className="text-[10px] font-bold fill-gray-600 font-sans">Y*</text>

            {/* Gap Bracket / Indicator */}
            {gapType === 'recessionary' && gapSize > 10 && (
              <g className="transition-all duration-300">
                <path d={`M ${xe} ${size - padding - 20} L ${lrasX} ${size - padding - 20}`} stroke="#ef4444" strokeWidth="1.5" />
                <text x={(xe + lrasX)/2} y={size - padding - 26} textAnchor="middle" className="text-[8px] font-extrabold fill-red-600 uppercase">Recessionary Gap</text>
              </g>
            )}
            {gapType === 'inflationary' && gapSize > 10 && (
              <g className="transition-all duration-300">
                <path d={`M ${lrasX} ${size - padding - 20} L ${xe} ${size - padding - 20}`} stroke="#3b82f6" strokeWidth="1.5" />
                <text x={(xe + lrasX)/2} y={size - padding - 26} textAnchor="middle" className="text-[8px] font-extrabold fill-blue-600 uppercase">Inflationary Gap</text>
              </g>
            )}

            {/* Short-Run Equilibrium Point */}
            <circle cx={xe} cy={ye} r="5.5" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" className="transition-all duration-300" />
          </svg>
        </div>
      </div>

      {/* Interactive Controls Panel */}
      <div className="w-full md:w-64 flex flex-col justify-between">
        <div>
          {/* Macro Status Card */}
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800 uppercase tracking-wide mb-1.5">
              <Layers className="w-3.5 h-3.5" /> Macroeconomic State
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Price Level (PL):</span>
                <span className="font-bold text-gray-800">{((300 - ye) / 10).toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Real GDP (Y):</span>
                <span className="font-bold text-gray-800">{(xe / 10).toFixed(1)}</span>
              </div>
              <div className="border-t border-slate-200 pt-1.5 mt-1.5 flex justify-between items-center">
                <span className="text-gray-500 font-semibold">Diagnosis:</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  gapType === 'recessionary' ? 'bg-red-100 text-red-700' :
                  gapType === 'inflationary' ? 'bg-blue-100 text-blue-700' :
                  'bg-emerald-100 text-emerald-700'
                }`}>
                  {gapType === 'recessionary' ? 'Recessionary Gap' :
                   gapType === 'inflationary' ? 'Inflationary Gap' :
                   'Long-Run Equilibrium'}
                </span>
              </div>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="mb-4">
            <span className="text-[11px] font-bold text-gray-500 uppercase block mb-1.5">Economic Scenarios</span>
            <div className="grid grid-cols-2 gap-1.5">
              <button 
                onClick={() => { setAdShift(0); setSrasShift(0); setLrasShift(0); }}
                className="text-[10px] py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded border border-gray-200"
              >
                Long-Run Equil.
              </button>
              <button 
                onClick={() => { setAdShift(-30); setSrasShift(0); setLrasShift(0); }}
                className="text-[10px] py-1 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded border border-red-200"
              >
                Demand Recession
              </button>
              <button 
                onClick={() => { setAdShift(30); setSrasShift(0); setLrasShift(0); }}
                className="text-[10px] py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded border border-blue-200"
              >
                Inflationary Gap
              </button>
              <button 
                onClick={() => { setAdShift(0); setSrasShift(-30); setLrasShift(0); }}
                className="text-[10px] py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 font-semibold rounded border border-amber-200"
              >
                Stagflation (SRAS ←)
              </button>
            </div>
          </div>

          {/* Shifter Sliders */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                <span>Aggregate Demand (AD)</span>
                <span className={`font-mono text-[10px] font-bold ${adShift > 0 ? 'text-blue-600' : adShift < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                  {adShift > 0 ? 'AD Right (Expansion)' : adShift < 0 ? 'AD Left (Contraction)' : 'Base'}
                </span>
              </div>
              <input 
                type="range" 
                min="-40" 
                max="40" 
                value={adShift} 
                onChange={(e) => setAdShift(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                <span>Short-Run Supply (SRAS)</span>
                <span className={`font-mono text-[10px] font-bold ${srasShift > 0 ? 'text-emerald-600' : srasShift < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                  {srasShift > 0 ? 'SRAS Right' : srasShift < 0 ? 'SRAS Left (Shock)' : 'Base'}
                </span>
              </div>
              <input 
                type="range" 
                min="-40" 
                max="40" 
                value={srasShift} 
                onChange={(e) => setSrasShift(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                <span>Full Employment (LRAS)</span>
                <span className="font-mono text-[10px] text-gray-500">{lrasShift > 0 ? 'Growth' : lrasShift < 0 ? 'Contraction' : 'Base'}</span>
              </div>
              <input 
                type="range" 
                min="-20" 
                max="20" 
                value={lrasShift} 
                onChange={(e) => setLrasShift(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Micro-Tutorial */}
        <div className="mt-4 p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-[10.5px] leading-relaxed text-gray-600 flex gap-2">
          <HelpCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div>
            {gapType === 'lre' && (
              <span><strong>Long-Run Equilibrium:</strong> The AD and SRAS intersect exactly on the vertical LRAS. The economy is producing at its potential (Natural Rate of Unemployment), and prices are stable.</span>
            )}
            {gapType === 'recessionary' && (
              <span><strong>Recessionary Gap:</strong> Equilibrium output Y* is below potential Y_F. Unemployment is higher than the natural rate. Over time, nominal wages will fall, shifting SRAS right back to LRAS (self-correction).</span>
            )}
            {gapType === 'inflationary' && (
              <span><strong>Inflationary Gap:</strong> Equilibrium output Y* is above potential Y_F. The economy is overheated; unemployment is below the natural rate. Eventually, nominal wages will rise, shifting SRAS left back to LRAS.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
