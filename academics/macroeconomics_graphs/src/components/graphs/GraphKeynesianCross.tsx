import React, { useState } from 'react';
import { HelpCircle, Sparkles, TrendingUp } from 'lucide-react';

export default function GraphKeynesianCross() {
  const [mpc, setMpc] = useState<number>(0.6); // MPC: 0.4 to 0.9 (slope)
  const [autonomous, setAutonomous] = useState<number>(0); // vertical shift: -30 to 30

  const size = 320;
  const padding = 50;
  const graphSize = size - padding * 2;

  // 45-degree Line: goes from (padding, size-padding) to (size-padding, padding)
  // i.e., X = Y in terms of graph distance from origin (padding, size-padding)
  // coordinate of (padding, size-padding) is origin (0,0)
  // coordinate of (size-padding, padding) is (graphSize, graphSize)
  // Path for 45-degree line:
  const refLinePath = `M ${padding} ${size - padding} L ${size - padding} ${padding}`;

  // Planned Aggregate Expenditures (AE) Line: AE = Autonomous + MPC * Y
  // Vertical intercept at Y-axis (X = padding): Y_coord = size - padding - BaseIntercept - autonomous
  const baseIntercept = 70;
  const interceptY = size - padding - baseIntercept - autonomous;

  // Let's calculate the end coordinate at X = size - padding (Y = graphSize)
  // Slope = mpc. Distance = graphSize. AE rise = graphSize * mpc
  // AE_end_Y_coord = interceptY - graphSize * mpc
  const endY = interceptY - graphSize * mpc;

  // Full employment line (vertical at 75% of graph width)
  const fullEmpX = padding + graphSize * 0.75;

  // Equilibrium intersection (AE meets 45-degree line)
  // At intersection: Y_distance_from_origin = BaseIntercept + autonomous + mpc * X_distance_from_origin
  // Since on 45-degree line X_distance = Y_distance:
  // X_dist = BaseIntercept + autonomous + mpc * X_dist
  // X_dist * (1 - mpc) = BaseIntercept + autonomous
  // X_dist = (BaseIntercept + autonomous) / (1 - mpc)
  const eqXDist = (baseIntercept + autonomous) / (1 - mpc);
  
  // Keep equilibrium within bounds
  const boundedEqXDist = Math.max(10, Math.min(graphSize * 1.1, eqXDist));
  const eqX = padding + boundedEqXDist;
  const eqY = size - padding - boundedEqXDist;

  // Multiplier calculation
  const multiplier = 1 / (1 - mpc);

  // Output Gap analysis
  const gapType = Math.abs(eqX - fullEmpX) < 4
    ? 'lre'
    : eqX < fullEmpX
      ? 'recessionary'
      : 'inflationary';

  const gapValue = Math.abs(eqX - fullEmpX);

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white p-5 rounded-none border-none shadow-none">
      {/* Visual Canvas Panel */}
      <div className="flex-1 flex flex-col items-center">
        <h4 className="text-xs font-black uppercase tracking-[0.15em] text-black mb-2">
          Keynesian Cross Simulation
        </h4>
        <div className="relative border border-black bg-[#F8F9FA] rounded-none p-2">
          <svg width={size} height={size} className="overflow-visible font-mono">
            {/* Shading Recessionary or Inflationary Gaps */}
            {gapType === 'recessionary' && gapValue > 5 && (
              <rect 
                x={eqX} 
                y={padding} 
                width={fullEmpX - eqX} 
                height={size - padding * 2} 
                fill="#ef4444" 
                fillOpacity="0.08" 
                className="transition-all duration-300"
              />
            )}
            {gapType === 'inflationary' && gapValue > 5 && (
              <rect 
                x={fullEmpX} 
                y={padding} 
                width={eqX - fullEmpX} 
                height={size - padding * 2} 
                fill="#3b82f6" 
                fillOpacity="0.08" 
                className="transition-all duration-300"
              />
            )}

            {/* Grid Axes */}
            <line x1={padding} y1={size-padding} x2={size-15} y2={size-padding} stroke="#000000" strokeWidth="2" />
            <line x1={padding} y1={padding-15} x2={padding} y2={size-padding} stroke="#000000" strokeWidth="2" />

            {/* Labels */}
            <text x={size - 5} y={size - padding + 15} textAnchor="end" className="text-[10px] font-bold fill-black uppercase tracking-wider">Real GDP / Output (Y)</text>
            <text x={padding - 10} y={padding - 20} textAnchor="start" className="text-[10px] font-bold fill-black uppercase tracking-wider">Aggregate Expenditures (AE)</text>

            {/* 45-degree reference line (Y = AE) */}
            <path d={refLinePath} fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x={size-padding - 20} y={padding + 10} className="text-[10px] font-black fill-black">Y = AE (45°)</text>

            {/* Planned AE Line */}
            <line x1={padding} y1={interceptY} x2={size - padding} y2={endY} stroke="#000000" strokeWidth="3.5" className="transition-all duration-300 ease-out" />
            <text x={size - padding - 15} y={endY - 12} className="text-xs font-black fill-black uppercase tracking-wider">Planned AE</text>

            {/* Full Employment Line Y_F */}
            <line x1={fullEmpX} y1={padding} x2={fullEmpX} y2={size - padding} stroke="#f59e0b" strokeWidth="2" />
            <text x={fullEmpX} y={padding - 10} textAnchor="middle" className="text-[10px] font-black fill-amber-700">Y_F</text>

            {/* Dashed lines from equilibrium to axes */}
            <line x1={padding} y1={eqY} x2={eqX} y2={eqY} stroke="#1a1a1a" strokeDasharray="2,2" className="transition-all duration-300" />
            <line x1={eqX} y1={size-padding} x2={eqX} y2={eqY} stroke="#1a1a1a" strokeDasharray="2,2" className="transition-all duration-300" />

            {/* Equilibrium Point */}
            <circle cx={eqX} cy={eqY} r="6" fill="#000000" stroke="#ffffff" strokeWidth="2" className="transition-all duration-300" />
            <text x={eqX + 10} y={eqY - 6} className="text-[10px] font-black fill-black uppercase tracking-wider">Equilibrium Y*</text>

            {/* Gap Bracket */}
            {gapType === 'recessionary' && gapValue > 10 && (
              <g className="transition-all duration-300">
                <path d={`M ${eqX} ${size - padding - 15} L ${fullEmpX} ${size - padding - 15}`} stroke="#ef4444" strokeWidth="1.5" />
                <text x={(eqX + fullEmpX)/2} y={size - padding - 22} textAnchor="middle" className="text-[8px] font-extrabold fill-red-600 uppercase">Recessionary Gap</text>
              </g>
            )}
            {gapType === 'inflationary' && gapValue > 10 && (
              <g className="transition-all duration-300">
                <path d={`M ${fullEmpX} ${size - padding - 15} L ${eqX} ${size - padding - 15}`} stroke="#3b82f6" strokeWidth="1.5" />
                <text x={(eqX + fullEmpX)/2} y={size - padding - 22} textAnchor="middle" className="text-[8px] font-extrabold fill-blue-600 uppercase">Inflationary Gap</text>
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Interactive Controls Panel */}
      <div className="w-full md:w-64 flex flex-col justify-between">
        <div>
          {/* Multiplier Metrics */}
          <div className="bg-[#F8F9FA] border border-black rounded-none p-3.5 mb-4 text-xs font-bold">
            <div className="flex items-center gap-1.5 text-[10px] font-black text-black uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-black" /> Multiplier Statistics
            </div>
            
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-black/60 font-medium">Marginal Prop. to Consume (MPC):</span>
                <span className="font-black text-black">{mpc.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/60 font-medium">Spending Multiplier:</span>
                <span className="font-mono font-black text-black text-sm">
                  {multiplier.toFixed(2)}x
                </span>
              </div>
              <div className="border-t border-black/15 pt-1.5 mt-1.5 flex justify-between">
                <span className="text-black/60 font-medium">Diagnosis:</span>
                <span className={`px-2 py-0.5 rounded-none text-[9px] font-black uppercase tracking-wider border ${
                  gapType === 'recessionary' ? 'bg-red-50 text-red-700 border-red-200' :
                  gapType === 'inflationary' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  {gapType === 'recessionary' ? 'Recessionary Gap' :
                   gapType === 'inflationary' ? 'Inflationary Gap' :
                   'Full Employment'}
                </span>
              </div>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold text-black uppercase tracking-wider mb-1">
                <span>Slope (MPC)</span>
                <span className="font-mono text-xs text-black font-black">{mpc.toFixed(2)}</span>
              </div>
              <input 
                type="range" 
                min="0.4" 
                max="0.85" 
                step="0.05"
                value={mpc} 
                onChange={(e) => setMpc(parseFloat(e.target.value))}
                className="w-full h-1 bg-black rounded-none appearance-none cursor-pointer accent-black"
              />
              <div className="flex justify-between text-[9px] text-black/50 uppercase font-bold tracking-wider mt-1">
                <span>Lower Multiplier</span>
                <span>Higher Multiplier</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-black uppercase tracking-wider mb-1">
                <span>Autonomous Spending Shift</span>
                <span className="font-mono text-xs font-black text-black">
                  {autonomous > 0 ? '+ ' + autonomous : autonomous < 0 ? autonomous : '0 (Base)'}
                </span>
              </div>
              <input 
                type="range" 
                min="-30" 
                max="30" 
                value={autonomous} 
                onChange={(e) => setAutonomous(parseInt(e.target.value))}
                className="w-full h-1 bg-black rounded-none appearance-none cursor-pointer accent-black"
              />
              <div className="flex justify-between text-[9px] text-black/50 uppercase font-bold tracking-wider mt-1">
                <span>Spending Slump</span>
                <span>Fiscal stimulus</span>
              </div>
            </div>
          </div>
        </div>

        {/* Micro-Tutorial */}
        <div className="mt-4 p-3 bg-[#F8F9FA] rounded-none border border-black text-[10.5px] leading-relaxed text-black/80 flex gap-2">
          <HelpCircle className="w-4 h-4 text-black shrink-0 mt-0.5" />
          <div>
            <strong>The Multiplier Effect:</strong> Shift autonomous spending slightly up. Notice how the equilibrium output Y* increases by a **much larger amount** than the initial shift. That magnification is the <em>spending multiplier</em> in action!
          </div>
        </div>
      </div>
    </div>
  );
}
