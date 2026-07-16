import React, { useState } from 'react';
import { HelpCircle, Layers, Sliders } from 'lucide-react';

export default function GraphPhillipsCurve() {
  const [adShift, setAdShift] = useState<number>(0);       // Moves point ALONG SRPC: -50 (AD left) to 50 (AD right)
  const [srasShift, setSrasShift] = useState<number>(0);   // Shifts SRPC: -40 (SRAS left, shifts SRPC right) to 40
  const [lrpcShift, setLrpcShift] = useState<number>(0);   // Shifts LRPC (NRU): -25 to 25

  const size = 320;
  const padding = 50;

  // LRPC Position (NRU)
  const nruX = 160 + lrpcShift;

  // SRPC curve position (shifts opposite to SRAS)
  // Let's model SRPC as a curve or a downward sloping line:
  // SRPC Y-intercept increases (shifts right/up) if SRAS shifts left (negative value)
  const srpcOffset = -srasShift * 0.8;

  const srpcStartX = padding;
  const srpcStartY = 70 + srpcOffset;
  const srpcEndX = size - padding;
  const srpcEndY = 270 + srpcOffset;

  // Active Operating Point on the SRPC
  // AD Shift moves the point along the curve:
  // Positive AD shift (expansion) -> Higher inflation (lower Y coord), lower unemployment (lower X coord)
  // Negative AD shift (recession) -> Lower inflation (higher Y coord), higher unemployment (higher X coord)
  const baseX = 160;
  const pointX = baseX - adShift * 0.8; // Lower X is lower unemployment
  const pointY = 170 + srpcOffset - adShift * 0.8; // Lower Y is higher inflation

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
      {/* Visual Canvas Panel */}
      <div className="flex-1 flex flex-col items-center">
        <h4 className="text-sm font-semibold text-gray-800 mb-2 font-sans">
          Interactive Phillips Curve
        </h4>
        <div className="relative border border-gray-100 bg-gray-50/50 rounded-lg p-2">
          <svg width={size} height={size} className="overflow-visible font-mono">
            {/* Grid Axes */}
            <line x1={padding} y1={size-padding} x2={size-15} y2={size-padding} stroke="#d1d5db" strokeWidth="2" />
            <line x1={padding} y1={padding-15} x2={padding} y2={size-padding} stroke="#d1d5db" strokeWidth="2" />

            {/* Labels */}
            <text x={size - 5} y={size - padding + 15} textAnchor="end" className="text-xs fill-gray-500 font-sans font-medium">Unemployment Rate (u)</text>
            <text x={padding - 10} y={padding - 20} textAnchor="start" className="text-xs fill-gray-500 font-sans font-medium">Inflation Rate (π)</text>

            {/* LRPC (Vertical at NRU) */}
            <line x1={nruX} y1={padding} x2={nruX} y2={size - padding} stroke="#f59e0b" strokeWidth="3" className="transition-all duration-300 ease-out" />
            <text x={nruX} y={padding - 8} textAnchor="middle" className="text-xs font-bold fill-amber-700 font-sans">LRPC</text>
            <text x={nruX} y={size - padding + 15} textAnchor="middle" className="text-[10px] font-bold fill-amber-700 font-sans">NRU</text>

            {/* SRPC Curve */}
            <line x1={srpcStartX} y1={srpcStartY} x2={srpcEndX} y2={srpcEndY} stroke="#2563eb" strokeWidth="3" className="transition-all duration-300 ease-out" />
            <text x={srpcEndX - 10} y={srpcEndY - 8} className="text-xs font-bold fill-blue-700 font-sans">SRPC</text>

            {/* Base SRPC Reference if shifted */}
            {srasShift !== 0 && (
              <line 
                x1={srpcStartX} y1={70} x2={srpcEndX} y2={270} 
                stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3"
              />
            )}

            {/* Dashed lines from operating point to axes */}
            <line x1={padding} y1={pointY} x2={pointX} y2={pointY} stroke="#4b5563" strokeDasharray="3,3" className="transition-all duration-300" />
            <line x1={pointX} y1={size-padding} x2={pointX} y2={pointY} stroke="#4b5563" strokeDasharray="3,3" className="transition-all duration-300" />

            {/* Axis Value Points */}
            <circle cx={pointX} cy={pointY} r="6.5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" className="transition-all duration-300" />
            <text x={pointX + 10} y={pointY - 6} className="text-[10px] font-bold fill-red-600 font-sans">Current State</text>
          </svg>
        </div>
      </div>

      {/* Interactive Controls Panel */}
      <div className="w-full md:w-64 flex flex-col justify-between">
        <div>
          {/* Preset Buttons */}
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800 uppercase tracking-wide mb-1.5">
              <Layers className="w-3.5 h-3.5" /> Economic Scenarios
            </div>
            <div className="grid grid-cols-2 gap-1.5 mb-2.5">
              <button 
                onClick={() => { setAdShift(25); setSrasShift(0); }}
                className="text-[10px] py-1 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded border border-red-200"
              >
                AD Rise (Move Up)
              </button>
              <button 
                onClick={() => { setAdShift(0); setSrasShift(-25); }}
                className="text-[10px] py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 font-semibold rounded border border-amber-200"
              >
                Stagflation (SRPC →)
              </button>
            </div>
            <div className="text-[10px] text-gray-500 leading-normal">
              <strong>Aggregate Demand shifts</strong> cause a movement <em>along</em> the SRPC. <br/>
              <strong>Supply Shocks (SRAS shifts)</strong> shift the entire SRPC curve.
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                <span>Aggregate Demand (C+I+G+Xn)</span>
                <span className="font-mono text-[10px] text-gray-500">
                  {adShift > 0 ? 'Move Up-Left' : adShift < 0 ? 'Move Down-Right' : 'Equilibrium'}
                </span>
              </div>
              <input 
                type="range" 
                min="-30" 
                max="30" 
                value={adShift} 
                onChange={(e) => setAdShift(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[9px] text-gray-400 mt-0.5">
                <span>AD Left (Recession)</span>
                <span>AD Right (Inflation)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                <span>Short-Run Supply (SRAS)</span>
                <span className="font-mono text-[10px] text-gray-500">
                  {srasShift < 0 ? 'Shifts SRPC Right' : srasShift > 0 ? 'Shifts SRPC Left' : 'Base'}
                </span>
              </div>
              <input 
                type="range" 
                min="-30" 
                max="30" 
                value={srasShift} 
                onChange={(e) => setSrasShift(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[9px] text-gray-400 mt-0.5">
                <span>Negative Shock (SRPC →)</span>
                <span>Positive Shock (SRPC ←)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                <span>Natural Rate (LRPC)</span>
                <span className="font-mono text-[10px] text-gray-500">{lrpcShift > 0 ? 'NRU ↑' : lrpcShift < 0 ? 'NRU ↓' : 'Base'}</span>
              </div>
              <input 
                type="range" 
                min="-20" 
                max="20" 
                value={lrpcShift} 
                onChange={(e) => setLrpcShift(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Micro-Tutorial */}
        <div className="mt-4 p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-[10.5px] leading-relaxed text-gray-600 flex gap-2">
          <HelpCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <strong>Mirroring AD/AS:</strong> Notice how raising AD decreases unemployment but raises inflation (movement up-left along SRPC). If SRAS decreases, both unemployment and inflation rise (stagflation), which is shown by a rightward shift of the entire SRPC.
          </div>
        </div>
      </div>
    </div>
  );
}
