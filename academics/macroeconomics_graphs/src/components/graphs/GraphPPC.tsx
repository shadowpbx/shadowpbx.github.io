import React, { useState } from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';

export default function GraphPPC() {
  const [capacity, setCapacity] = useState<number>(0); // -50 (contraction) to 50 (growth)
  const [allocation, setAllocation] = useState<number>(50); // 0 (all capital) to 100 (all consumer)
  const [showPoints, setShowPoints] = useState<boolean>(true);

  // Core dimensions of the SVG canvas
  const size = 320;
  const padding = 50;
  const graphSize = size - padding * 2;

  // Base curve points (parabolic curve representing increasing opportunity cost)
  // At capacity 0: curve goes from (padding, padding) to (size - padding, size - padding)
  // Let's parameterize the curve: Y = C_y - (X - padding)^2 * constant
  // Dynamic radius based on economic capacity
  const baseR = 200;
  const currentR = baseR + capacity * 1.5;

  // Calculate coordinates on the curve for the current allocation
  // Let angle go from 0 (all Capital Goods, Y-axis) to 90 (all Consumer Goods, X-axis)
  const angleRad = (allocation / 100) * (Math.PI / 2);
  const pointX = padding + currentR * Math.sin(angleRad);
  const pointY = size - padding - currentR * Math.cos(angleRad);

  // Generate path string for the PPC curve (an arc)
  const startX = padding;
  const startY = size - padding - currentR;
  const endX = padding + currentR;
  const endY = size - padding;

  const ppcPath = `M ${startX} ${startY} A ${currentR} ${currentR} 0 0 1 ${endX} ${endY}`;

  // Opportunity cost calculation (simple derivative/ratio of capital vs consumer)
  const capGoods = (currentR * Math.cos(angleRad) / 2).toFixed(0);
  const conGoods = (currentR * Math.sin(angleRad) / 2).toFixed(0);
  
  // Calculate relative opportunity cost
  // Opportunity cost of 1 more Consumer Good is steeper as we go right (high allocation)
  const oppCost = (Math.tan(angleRad)).toFixed(2);

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
      {/* Visual Canvas Panel */}
      <div className="flex-1 flex flex-col items-center">
        <h4 className="text-sm font-semibold text-gray-800 mb-2 font-sans">
          Interactive Simulation
        </h4>
        <div className="relative border border-gray-100 bg-gray-50/50 rounded-lg p-2">
          <svg width={size} height={size} className="overflow-visible font-mono">
            {/* Grid lines */}
            <line x1={padding} y1={size-padding} x2={size-15} y2={size-padding} stroke="#d1d5db" strokeWidth="2" />
            <line x1={padding} y1={padding-15} x2={padding} y2={size-padding} stroke="#d1d5db" strokeWidth="2" />

            {/* Axes Arrows */}
            <path d={`M ${size-15} ${size-padding-4} L ${size-7} ${size-padding} L ${size-15} ${size-padding+4} Z`} fill="#9ca3af" />
            <path d={`M ${padding-4} ${padding-15} L ${padding} ${padding-23} L ${padding+4} ${padding-15} Z`} fill="#9ca3af" />

            {/* Labels */}
            <text x={size - 5} y={size - padding + 15} textAnchor="end" className="text-xs fill-gray-500 font-sans font-medium">Consumer Goods</text>
            <text x={padding - 10} y={padding - 28} textAnchor="start" className="text-xs fill-gray-500 font-sans font-medium">Capital Goods</text>

            {/* PPC Curve */}
            <path 
              d={ppcPath} 
              fill="none" 
              stroke="#2563eb" 
              strokeWidth="4" 
              strokeLinecap="round"
              className="transition-all duration-300 ease-out"
            />

            {/* Original Base Curve dashed reference (if shifted) */}
            {capacity !== 0 && (
              <path 
                d={`M ${padding} ${size - padding - baseR} A ${baseR} ${baseR} 0 0 1 ${padding + baseR} ${size - padding}`} 
                fill="none" 
                stroke="#cbd5e1" 
                strokeWidth="2" 
                strokeDasharray="4,4"
              />
            )}

            {/* Operating Point A on Curve */}
            <circle 
              cx={pointX} 
              cy={pointY} 
              r="7" 
              fill="#10b981" 
              stroke="#ffffff" 
              strokeWidth="2" 
              className="transition-all duration-300 ease-out shadow-lg"
            />
            <text 
              x={pointX + 12} 
              y={pointY - 6} 
              className="text-xs font-bold fill-emerald-600 font-sans"
            >
              A (Efficient)
            </text>

            {/* Static Points for Reference */}
            {showPoints && (
              <>
                {/* Point B: Inefficient / Recession (Inside) */}
                <g className="cursor-pointer">
                  <circle cx={padding + currentR * 0.35} cy={size - padding - currentR * 0.35} r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                  <text x={padding + currentR * 0.35 + 10} y={size - padding - currentR * 0.35 - 4} className="text-xs font-semibold fill-amber-600 font-sans">B (Inefficient)</text>
                </g>

                {/* Point C: Unattainable (Outside) */}
                <g className="cursor-pointer">
                  <circle cx={padding + currentR * 0.85} cy={size - padding - currentR * 0.85} r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                  <text x={padding + currentR * 0.85 - 10} y={size - padding - currentR * 0.85 - 10} textAnchor="end" className="text-xs font-semibold fill-red-600 font-sans">C (Unattainable)</text>
                </g>
              </>
            )}

            {/* Dotted lines from Point A to Axes */}
            <line x1={padding} y1={pointY} x2={pointX} y2={pointY} stroke="#10b981" strokeDasharray="3,3" className="transition-all duration-300 ease-out" />
            <line x1={pointX} y1={size - padding} x2={pointX} y2={pointY} stroke="#10b981" strokeDasharray="3,3" className="transition-all duration-300 ease-out" />
          </svg>
        </div>
        <div className="flex gap-4 mt-2">
          <label className="flex items-center text-xs text-gray-500 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={showPoints} 
              onChange={() => setShowPoints(!showPoints)}
              className="mr-1.5 h-3.5 w-3.5 rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Show Points B & C
          </label>
        </div>
      </div>

      {/* Interactive Controls & Economics Explanation */}
      <div className="w-full md:w-64 flex flex-col justify-between">
        <div>
          <div className="bg-blue-50/50 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-1 text-xs font-bold text-blue-800 uppercase tracking-wide mb-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Live Metrics
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-gray-500">Capital Output:</div>
              <div className="font-bold text-right text-gray-800">{capGoods} units</div>
              <div className="text-gray-500">Consumer Output:</div>
              <div className="font-bold text-right text-gray-800">{conGoods} units</div>
              <div className="text-gray-500">Opp. Cost of Consumer:</div>
              <div className="font-bold text-right text-red-600">{oppCost} Capital</div>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                <span>Productive Capacity (Shifts PPC)</span>
                <span className={`font-mono text-xs font-bold ${capacity > 0 ? 'text-emerald-600' : capacity < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                  {capacity > 0 ? `+${capacity}%` : `${capacity}%`}
                </span>
              </div>
              <input 
                type="range" 
                min="-40" 
                max="40" 
                value={capacity} 
                onChange={(e) => setCapacity(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>Resource Destruction</span>
                <span>Economic Growth</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                <span>Resource Allocation (Move Point A)</span>
                <span className="font-mono text-xs font-bold text-blue-600">
                  {allocation}% Consumer
                </span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="95" 
                value={allocation} 
                onChange={(e) => setAllocation(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>More Capital Goods</span>
                <span>More Consumer Goods</span>
              </div>
            </div>
          </div>
        </div>

        {/* Micro-Tutorial */}
        <div className="mt-5 p-3 bg-gray-50 rounded-lg border border-gray-100 text-[11px] leading-relaxed text-gray-600 flex gap-2">
          <HelpCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-gray-800">Increasing Opportunity Costs:</span> Notice how the Opportunity Cost increases as you allocate more resources to Consumer Goods (moving Point A right). The curve becomes steeper, meaning you must sacrifice larger quantities of Capital Goods for each additional unit of Consumer Goods.
          </div>
        </div>
      </div>
    </div>
  );
}
