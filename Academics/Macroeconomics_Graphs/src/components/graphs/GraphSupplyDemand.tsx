import React, { useState } from 'react';
import { HelpCircle, Layers, Sliders } from 'lucide-react';

type InterventionType = 'none' | 'ceiling' | 'floor';

export default function GraphSupplyDemand() {
  const [dShift, setDShift] = useState<number>(0); // Demand Shift: -50 to 50
  const [sShift, setSShift] = useState<number>(0); // Supply Shift: -50 to 50
  const [intervention, setIntervention] = useState<InterventionType>('none');
  const [showWelfare, setShowWelfare] = useState<boolean>(true);

  // SVG dimensions
  const size = 320;
  const padding = 50;

  // Curves Math
  // Demand: Y = 70 + (X - 50) - dShift
  // Supply: Y = 250 - (X - 50) - sShift
  // Base endpoints:
  const dStartX = padding;
  const dStartY = 70 - dShift;
  const dEndX = size - padding;
  const dEndY = 290 - dShift;

  const sStartX = padding;
  const sStartY = 250 - sShift;
  const sEndX = size - padding;
  const sEndY = 30 - sShift;

  // Calculate Equilibrium Intersection
  const xe = 140 + (dShift - sShift) / 2;
  const ye = 160 - (dShift + sShift) / 2;

  // Human-readable labels for values (mapped from SVG coords)
  const eqPriceLabel = ((300 - ye) / 10).toFixed(1);
  const eqQtyLabel = (xe / 10).toFixed(1);

  // Intervention values
  const ceilingY = 200; // Low price = high Y
  const floorY = 120;   // High price = low Y

  let activePriceY = ye;
  let activeQtyX = xe;
  let shortageOrSurplus: 'none' | 'shortage' | 'surplus' = 'none';
  let gapValue = 0;

  // Q_D and Q_S at current intervention price
  let xd = xe;
  let xs = xe;

  if (intervention === 'ceiling') {
    // Ceiling is binding ONLY if set below equilibrium (i.e. ceilingY > ye in SVG Y coords)
    const isBinding = ceilingY > ye;
    if (isBinding) {
      activePriceY = ceilingY;
      // x_d = y - 20 + dShift
      xd = ceilingY - 20 + dShift;
      // x_s = 300 - y - sShift
      xs = 300 - ceilingY - sShift;
      activeQtyX = Math.min(xd, xs); // Trade occurs at the short side
      shortageOrSurplus = 'shortage';
      gapValue = xd - xs;
    }
  } else if (intervention === 'floor') {
    // Floor is binding ONLY if set above equilibrium (i.e. floorY < ye in SVG Y coords)
    const isBinding = floorY < ye;
    if (isBinding) {
      activePriceY = floorY;
      xd = floorY - 20 + dShift;
      xs = 300 - floorY - sShift;
      activeQtyX = Math.min(xd, xs); // Trade occurs at the short side
      shortageOrSurplus = 'surplus';
      gapValue = xs - xd;
    }
  }

  // Consumer Surplus (CS), Producer Surplus (PS), Deadweight Loss (DWL) polygons
  // Demand Top Intercept (at X = padding): Y = 70 - dShift
  // Supply Bottom Intercept (at X = padding): Y = 250 - sShift
  const dInterceptY = 70 - dShift;
  const sInterceptY = 250 - sShift;

  // CS Points: (padding, dInterceptY), (activeQtyX, activePriceY), (padding, activePriceY)
  // PS Points: (padding, sInterceptY), (activeQtyX, activePriceY), (padding, activePriceY)
  // For normal equilibrium (no intervention):
  // CS: triangle of (padding, dInterceptY) -> (xe, ye) -> (padding, ye)
  // PS: triangle of (padding, sInterceptY) -> (xe, ye) -> (padding, ye)
  // For binding interventions:
  // CS: trapezoid under Demand up to activeQtyX and above activePriceY
  // PS: trapezoid above Supply up to activeQtyX and below activePriceY
  // DWL: triangle between activeQtyX, xe, and the demand/supply price difference at activeQtyX
  const priceAtActiveQtyDemand = activeQtyX - 20 + dShift;
  const priceAtActiveQtySupply = 300 - activeQtyX - sShift;

  const csPoints = intervention === 'none' 
    ? `${padding},${dInterceptY} ${xe},${ye} ${padding},${ye}`
    : `${padding},${dInterceptY} ${activeQtyX},${priceAtActiveQtyDemand} ${activeQtyX},${activePriceY} ${padding},${activePriceY}`;

  const psPoints = intervention === 'none'
    ? `${padding},${sInterceptY} ${xe},${ye} ${padding},${ye}`
    : `${padding},${activePriceY} ${activeQtyX},${activePriceY} ${activeQtyX},${priceAtActiveQtySupply} ${padding},${sInterceptY}`;

  const dwlPoints = `${activeQtyX},${priceAtActiveQtyDemand} ${xe},${ye} ${activeQtyX},${priceAtActiveQtySupply}`;

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
      {/* Visual Canvas Panel */}
      <div className="flex-1 flex flex-col items-center">
        <h4 className="text-sm font-semibold text-gray-800 mb-2 font-sans">
          Interactive Single Market Graph
        </h4>
        <div className="relative border border-gray-100 bg-gray-50/50 rounded-lg p-2">
          <svg width={size} height={size} className="overflow-visible font-mono">
            {/* Welfare Shading Areas */}
            {showWelfare && (
              <>
                {/* Consumer Surplus (CS) - Blue */}
                <polygon points={csPoints} fill="#3b82f6" fillOpacity="0.15" className="transition-all duration-300" />
                {/* Producer Surplus (PS) - Green */}
                <polygon points={psPoints} fill="#10b981" fillOpacity="0.15" className="transition-all duration-300" />
                {/* Deadweight Loss (DWL) - Red (only if intervention is active) */}
                {intervention !== 'none' && gapValue > 0 && (
                  <polygon points={dwlPoints} fill="#ef4444" fillOpacity="0.3" className="transition-all duration-300" />
                )}
              </>
            )}

            {/* Grid Axes */}
            <line x1={padding} y1={size-padding} x2={size-15} y2={size-padding} stroke="#d1d5db" strokeWidth="2" />
            <line x1={padding} y1={padding-15} x2={padding} y2={size-padding} stroke="#d1d5db" strokeWidth="2" />

            {/* Labels */}
            <text x={size - 5} y={size - padding + 15} textAnchor="end" className="text-xs fill-gray-500 font-sans font-medium">Quantity (Q)</text>
            <text x={padding - 10} y={padding - 20} textAnchor="start" className="text-xs fill-gray-500 font-sans font-medium">Price (P)</text>

            {/* Demand Curve */}
            <line x1={dStartX} y1={dStartY} x2={dEndX} y2={dEndY} stroke="#2563eb" strokeWidth="3.5" className="transition-all duration-300 ease-out" />
            <text x={dEndX - 5} y={dEndY - 10} className="text-xs font-bold fill-blue-700 font-sans">D</text>

            {/* Supply Curve */}
            <line x1={sStartX} y1={sStartY} x2={sEndX} y2={sEndY} stroke="#10b981" strokeWidth="3.5" className="transition-all duration-300 ease-out" />
            <text x={sEndX - 5} y={sEndY + 18} className="text-xs font-bold fill-emerald-700 font-sans">S</text>

            {/* Intervention Lines */}
            {intervention === 'ceiling' && (
              <>
                <line x1={padding} y1={ceilingY} x2={size-padding} y2={ceilingY} stroke="#ef4444" strokeWidth="2" strokeDasharray="3,1" />
                <text x={size-padding - 80} y={ceilingY - 6} className="text-[10px] font-bold fill-red-600 font-sans">Price Ceiling</text>
              </>
            )}
            {intervention === 'floor' && (
              <>
                <line x1={padding} y1={floorY} x2={size-padding} y2={floorY} stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,1" />
                <text x={size-padding - 80} y={floorY - 6} className="text-[10px] font-bold fill-amber-600 font-sans">Price Floor</text>
              </>
            )}

            {/* Dashed Lines for Price & Quantity */}
            <line x1={padding} y1={activePriceY} x2={activeQtyX} y2={activePriceY} stroke="#4b5563" strokeDasharray="3,3" className="transition-all duration-300" />
            <line x1={activeQtyX} y1={size-padding} x2={activeQtyX} y2={activePriceY} stroke="#4b5563" strokeDasharray="3,3" className="transition-all duration-300" />

            {/* Shortage/Surplus Markers */}
            {shortageOrSurplus !== 'none' && gapValue > 0 && (
              <>
                {/* Horizontal line showing gap */}
                <line x1={xs} y1={activePriceY} x2={xd} y2={activePriceY} stroke="#9333ea" strokeWidth="2" />
                <circle cx={xs} cy={activePriceY} r="4" fill="#9333ea" />
                <circle cx={xd} cy={activePriceY} r="4" fill="#9333ea" />
                
                {/* Dotted lines for Q_S and Q_D down to X-axis */}
                <line x1={xs} y1={activePriceY} x2={xs} y2={size-padding} stroke="#9333ea" strokeDasharray="2,2" />
                <line x1={xd} y1={activePriceY} x2={xd} y2={size-padding} stroke="#9333ea" strokeDasharray="2,2" />

                <text x={xs} y={size-padding+12} textAnchor="middle" className="text-[10px] fill-purple-700 font-sans font-bold">Q_S</text>
                <text x={xd} y={size-padding+12} textAnchor="middle" className="text-[10px] fill-purple-700 font-sans font-bold">Q_D</text>

                {/* Bracket for the shortage/surplus */}
                <path 
                  d={`M ${Math.min(xs, xd)} ${activePriceY - 12} L ${Math.max(xs, xd)} ${activePriceY - 12}`} 
                  stroke="#9333ea" 
                  strokeWidth="1.5" 
                  fill="none" 
                />
                <text x={(xs + xd)/2} y={activePriceY - 18} textAnchor="middle" className="text-[10px] font-bold fill-purple-800 font-sans uppercase">
                  {shortageOrSurplus}
                </text>
              </>
            )}

            {/* Active Transaction Point (Where buying and selling meet) */}
            <circle cx={activeQtyX} cy={activePriceY} r="6" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" className="transition-all duration-300" />
            
            {/* Equilibrium Point (Ghost point if ceiling/floor active) */}
            {intervention !== 'none' && (
              <circle cx={xe} cy={ye} r="4.5" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="2,2" />
            )}
          </svg>
        </div>

        {/* Welfare Toggles */}
        <div className="flex gap-4 mt-2">
          <label className="flex items-center text-xs text-gray-500 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={showWelfare} 
              onChange={() => setShowWelfare(!showWelfare)}
              className="mr-1.5 h-3.5 w-3.5 rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Show Surplus Areas
          </label>
        </div>
      </div>

      {/* Interactive Controls Panel */}
      <div className="w-full md:w-64 flex flex-col justify-between">
        <div>
          {/* Market Stats */}
          <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 uppercase tracking-wide mb-1.5">
              <Layers className="w-3.5 h-3.5" /> Market Metrics
            </div>
            <div className="grid grid-cols-2 gap-y-1 text-xs">
              <div className="text-gray-500">Price (P):</div>
              <div className="font-bold text-right text-gray-800">
                ${((300 - activePriceY) / 10).toFixed(2)}
              </div>
              <div className="text-gray-500">Quantity (Q):</div>
              <div className="font-bold text-right text-gray-800">
                {(activeQtyX / 10).toFixed(1)} units
              </div>
              {intervention !== 'none' && gapValue > 0 && (
                <>
                  <div className="text-purple-700 font-semibold">{shortageOrSurplus === 'shortage' ? 'Shortage' : 'Surplus'}:</div>
                  <div className="font-bold text-right text-purple-700">{(gapValue / 10).toFixed(1)} units</div>
                  <div className="text-red-600 font-semibold">Deadweight Loss:</div>
                  <div className="font-bold text-right text-red-600">Active Area</div>
                </>
              )}
            </div>
          </div>

          {/* Shifter Sliders */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                <span>Demand Curve</span>
                <span className={`font-mono text-xs font-bold ${dShift > 0 ? 'text-blue-600' : dShift < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                  {dShift > 0 ? 'Shited Right' : dShift < 0 ? 'Shifted Left' : 'Equilibrium'}
                </span>
              </div>
              <input 
                type="range" 
                min="-40" 
                max="40" 
                value={dShift} 
                onChange={(e) => setDShift(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                <span>Supply Curve</span>
                <span className={`font-mono text-xs font-bold ${sShift > 0 ? 'text-emerald-600' : sShift < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                  {sShift > 0 ? 'Shifted Right' : sShift < 0 ? 'Shifted Left' : 'Equilibrium'}
                </span>
              </div>
              <input 
                type="range" 
                min="-40" 
                max="40" 
                value={sShift} 
                onChange={(e) => setSShift(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Intervention Options */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-gray-700 block mb-2">Government Price Controls</span>
              <div className="grid grid-cols-3 gap-1">
                <button 
                  onClick={() => setIntervention('none')}
                  className={`text-xs px-2 py-1.5 rounded-md border font-medium transition-all ${intervention === 'none' ? 'bg-slate-800 text-white border-slate-800 shadow-xs' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                >
                  Free Market
                </button>
                <button 
                  onClick={() => setIntervention('ceiling')}
                  className={`text-xs px-2 py-1.5 rounded-md border font-medium transition-all ${intervention === 'ceiling' ? 'bg-red-600 text-white border-red-600 shadow-xs' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                >
                  Price Ceiling
                </button>
                <button 
                  onClick={() => setIntervention('floor')}
                  className={`text-xs px-2 py-1.5 rounded-md border font-medium transition-all ${intervention === 'floor' ? 'bg-amber-600 text-white border-amber-600 shadow-xs' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                >
                  Price Floor
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Micro-Tutorial */}
        <div className="mt-4 p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-[10.5px] leading-relaxed text-gray-600 flex gap-2">
          <HelpCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div>
            {intervention === 'none' && (
              <span><strong className="text-gray-800">Welfare Analysis:</strong> The shaded blue area is <strong>Consumer Surplus</strong> (extra utility for buyers). The green area is <strong>Producer Surplus</strong>. Free markets maximize this joint surplus (allocative efficiency).</span>
            )}
            {intervention === 'ceiling' && (
              <span><strong className="text-gray-800">Price Ceiling (Binding):</strong> Set below equilibrium. Buyers want to buy more (Q_D) but sellers will only sell less (Q_S), causing a persistent <strong>shortage</strong>. The red area represents <strong>Deadweight Loss (DWL)</strong>, representing lost economic efficiency.</span>
            )}
            {intervention === 'floor' && (
              <span><strong className="text-gray-800">Price Floor (Binding):</strong> Set above equilibrium. Sellers want to produce more (Q_S) than buyers are willing to purchase (Q_D), leading to a persistent <strong>surplus</strong>. It creates a <strong>Deadweight Loss</strong> (red area).</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
