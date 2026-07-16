import React, { useState, useEffect } from 'react';
import { HelpCircle, RefreshCw, Layers } from 'lucide-react';

export default function GraphCircularFlow() {
  const [highlightFlow, setHighlightFlow] = useState<'both' | 'money' | 'real'>('both');
  const [showGov, setShowGov] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(3); // 1 (slow) to 5 (fast)
  const [offset, setOffset] = useState<number>(0);

  // Animate the flow particles
  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      setOffset((prev) => (prev + speed * 0.4) % 100);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [speed]);

  // Dimensions
  const size = 320;
  
  // Node Centers
  const nodes = {
    households: { x: 50, y: 160, label: 'Households' },
    businesses: { x: 270, y: 160, label: 'Businesses' },
    productMarket: { x: 160, y: 55, label: 'Product Market' },
    resourceMarket: { x: 160, y: 265, label: 'Resource Market' },
    government: { x: 160, y: 160, label: 'Government' },
  };

  // Helper to draw curved path or lines
  // Outer Money Flow (Counter-clockwise: Households -> Product -> Businesses -> Resource -> Households)
  // Households -> Product: (50, 160) -> (160, 55)
  // Product -> Businesses: (160, 55) -> (270, 160)
  // Businesses -> Resource: (270, 160) -> (160, 265)
  // Resource -> Households: (160, 265) -> (50, 160)
  
  // Real Flow (Clockwise: Households -> Resource -> Businesses -> Product -> Households)

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
      {/* Visual Canvas Panel */}
      <div className="flex-1 flex flex-col items-center">
        <h4 className="text-sm font-semibold text-gray-800 mb-2 font-sans">
          Animated Circular Flow Diagram
        </h4>
        <div className="relative border border-gray-100 bg-gray-900 rounded-lg p-2 overflow-hidden shadow-inner">
          <svg width={size} height={size} className="overflow-visible font-sans select-none">
            
            {/* --- PATHS AND FLOW ARROWS --- */}
            {/* Outer Ring: MONEY FLOW (GREEN) */}
            {(highlightFlow === 'both' || highlightFlow === 'money') && (
              <g>
                {/* Outer Flow: Spending/Revenue & Factor Payments/Income */}
                <rect x="25" y="25" width="270" height="270" rx="20" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="6,4" className="opacity-40" />
                
                {/* Animated Green Money Particles */}
                <rect 
                  x="25" y="25" width="270" height="270" rx="20" 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="5" 
                  strokeDasharray="8,22" 
                  strokeDashoffset={-offset * 1.5}
                />
                
                {/* Labels for Outer Loop */}
                <text x="160" y="18" textAnchor="middle" className="text-[9px] font-bold fill-emerald-400 uppercase tracking-wider">
                  Monetary Flow: Spending & Revenue ($)
                </text>
                <text x="160" y="310" textAnchor="middle" className="text-[9px] font-bold fill-emerald-400 uppercase tracking-wider">
                  Monetary Flow: Wages, Rent, Income ($)
                </text>
              </g>
            )}

            {/* Inner Ring: REAL FLOW (BLUE) - Goods, Services, Resources */}
            {(highlightFlow === 'both' || highlightFlow === 'real') && (
              <g>
                <rect x="65" y="65" width="190" height="190" rx="15" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="6,4" className="opacity-40" />
                
                {/* Animated Blue Factor/Goods Particles (opposite direction) */}
                <rect 
                  x="65" y="65" width="190" height="190" rx="15" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="5" 
                  strokeDasharray="8,18" 
                  strokeDashoffset={offset * 1.5}
                />
                
                {/* Labels for Inner Loop */}
                <text x="160" y="80" textAnchor="middle" className="text-[8.5px] font-semibold fill-blue-400 uppercase tracking-wide">
                  Real Flow: Goods & Services
                </text>
                <text x="160" y="248" textAnchor="middle" className="text-[8.5px] font-semibold fill-blue-400 uppercase tracking-wide">
                  Real Flow: Labor, Land, Capital
                </text>
              </g>
            )}

            {/* Government Intersecting Flow lines (Taxes, transfers, subsidies) */}
            {showGov && (
              <g className="opacity-75">
                {/* Household <-> Gov */}
                <line x1={nodes.households.x + 30} y1={nodes.households.y - 10} x2={nodes.government.x - 30} y2={nodes.government.y - 10} stroke="#10b981" strokeWidth="1.5" strokeDasharray="2,2" />
                <line x1={nodes.households.x + 30} y1={nodes.households.y + 10} x2={nodes.government.x - 30} y2={nodes.government.y + 10} stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2,2" />
                <text x="100" y="145" textAnchor="middle" className="text-[7.5px] fill-emerald-300 font-mono">Taxes</text>
                <text x="100" y="183" textAnchor="middle" className="text-[7.5px] fill-blue-300 font-mono">Transfers</text>

                {/* Businesses <-> Gov */}
                <line x1={nodes.businesses.x - 30} y1={nodes.businesses.y - 10} x2={nodes.government.x + 30} y2={nodes.government.y - 10} stroke="#10b981" strokeWidth="1.5" strokeDasharray="2,2" />
                <line x1={nodes.businesses.x - 30} y1={nodes.businesses.y + 10} x2={nodes.government.x + 30} y2={nodes.government.y + 10} stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2,2" />
                <text x="220" y="145" textAnchor="middle" className="text-[7.5px] fill-emerald-300 font-mono">Taxes</text>
                <text x="220" y="183" textAnchor="middle" className="text-[7.5px] fill-blue-300 font-mono">Subsidies</text>
              </g>
            )}

            {/* --- NODES (CARDS) --- */}
            {/* Top: Product Market */}
            <g transform={`translate(${nodes.productMarket.x - 55}, ${nodes.productMarket.y - 18})`}>
              <rect width="110" height="36" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
              <text x="55" y="21" textAnchor="middle" className="text-[10px] font-bold fill-slate-100">PRODUCT MARKET</text>
            </g>

            {/* Bottom: Resource Market */}
            <g transform={`translate(${nodes.resourceMarket.x - 55}, ${nodes.resourceMarket.y - 18})`}>
              <rect width="110" height="36" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
              <text x="55" y="21" textAnchor="middle" className="text-[10px] font-bold fill-slate-100">RESOURCE MARKET</text>
            </g>

            {/* Left: Households */}
            <g transform={`translate(${nodes.households.x - 45}, ${nodes.households.y - 22})`}>
              <rect width="90" height="44" rx="6" fill="#0f172a" stroke="#2563eb" strokeWidth="2" />
              <text x="45" y="20" textAnchor="middle" className="text-[11px] font-bold fill-blue-200">HOUSEHOLDS</text>
              <text x="45" y="34" textAnchor="middle" className="text-[8px] fill-slate-400">Consumers / Owners</text>
            </g>

            {/* Right: Businesses */}
            <g transform={`translate(${nodes.businesses.x - 45}, ${nodes.businesses.y - 22})`}>
              <rect width="90" height="44" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
              <text x="45" y="20" textAnchor="middle" className="text-[11px] font-bold fill-emerald-200">BUSINESSES</text>
              <text x="45" y="34" textAnchor="middle" className="text-[8px] fill-slate-400">Producers / Sellers</text>
            </g>

            {/* Center: Government */}
            {showGov && (
              <g transform={`translate(${nodes.government.x - 32}, ${nodes.government.y - 20})`}>
                <rect width="64" height="40" rx="8" fill="#1e1b4b" stroke="#c084fc" strokeWidth="1.5" />
                <text x="32" y="19" textAnchor="middle" className="text-[9px] font-bold fill-purple-100">GOVERNMENT</text>
                <text x="32" y="30" textAnchor="middle" className="text-[7.5px] fill-slate-400">Public Sector</text>
              </g>
            )}

          </svg>
        </div>
      </div>

      {/* Interactive Controls Panel */}
      <div className="w-full md:w-64 flex flex-col justify-between">
        <div>
          {/* Controls */}
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800 uppercase tracking-wide mb-2">
              <Layers className="w-3.5 h-3.5" /> Display Options
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-xs text-gray-500 block mb-1">Highlight Flows:</span>
                <div className="grid grid-cols-3 gap-1">
                  <button 
                    onClick={() => setHighlightFlow('both')}
                    className={`text-[10px] px-1 py-1 rounded border font-semibold transition-all ${highlightFlow === 'both' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                  >
                    Both Loops
                  </button>
                  <button 
                    onClick={() => setHighlightFlow('money')}
                    className={`text-[10px] px-1 py-1 rounded border font-semibold transition-all ${highlightFlow === 'money' ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                  >
                    Money ($)
                  </button>
                  <button 
                    onClick={() => setHighlightFlow('real')}
                    className={`text-[10px] px-1 py-1 rounded border font-semibold transition-all ${highlightFlow === 'real' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                  >
                    Real Flow
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 font-medium">Include Government:</span>
                <button 
                  onClick={() => setShowGov(!showGov)}
                  className={`text-xs px-2 py-0.5 rounded border transition-all ${showGov ? 'bg-purple-100 text-purple-800 border-purple-300 font-bold' : 'bg-gray-100 text-gray-400 border-gray-200'}`}
                >
                  {showGov ? 'Active' : 'Hidden'}
                </button>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                  <span>Economic Activity Speed</span>
                  <span className="font-mono text-xs font-bold text-slate-600">Level {speed}</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={speed} 
                  onChange={(e) => setSpeed(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Micro-Tutorial */}
        <div className="mt-4 p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-[10.5px] leading-relaxed text-gray-600 flex gap-2">
          <HelpCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-gray-800">Two Complementary Flows:</span>
            <ul className="list-disc pl-3.5 mt-1 space-y-0.5 text-gray-500">
              <li><strong className="text-emerald-600">Monetary Flow (Green particles)</strong>: Households spend money on goods, which becomes business revenue. Businesses pay households wages, rent, and profit.</li>
              <li><strong className="text-blue-600">Real Flow (Blue particles)</strong>: Households supply factors (labor, land, capital) to Resource Market. Businesses use them to build goods/services sold in Product Market.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
