import React, { useState } from 'react';
import { HelpCircle, Sparkles, TrendingUp } from 'lucide-react';

export default function GraphBusinessCycle() {
  const [time, setTime] = useState<number>(35); // Time slider: 0 to 100

  const size = 320;
  const padding = 50;
  const graphSize = size - padding * 2;

  // Potential GDP (straight upward-sloping line)
  // Starts at Y = size - padding - 30 (high value, low coordinate in SVG: e.g. Y=240)
  // Ends at Y = padding + 20 (low value, high coordinate in SVG: e.g. Y=70)
  const potentialY = (t: number) => {
    const startY = size - padding - 40;
    const endY = padding + 30;
    return startY + (t / 100) * (endY - startY);
  };

  // Actual GDP (sine wave centered around potential GDP)
  const actualY = (t: number) => {
    const pot = potentialY(t);
    // Sine wave: complete 1.5 cycles from t=0 to 100
    const waveFreq = 1.5 * 2 * Math.PI;
    const waveAmp = 35; // height of the wave oscillation
    return pot - Math.sin((t / 100) * waveFreq) * waveAmp;
  };

  // Generate SVG path for Potential GDP line
  const potPath = `M ${padding} ${potentialY(0)} L ${size - padding + 20} ${potentialY(100)}`;

  // Generate SVG path for Actual GDP wave
  let actPath = `M ${padding} ${actualY(0)}`;
  for (let i = 1; i <= 100; i++) {
    const xCoord = padding + (i / 100) * (graphSize + 20);
    actPath += ` L ${xCoord} ${actualY(i)}`;
  }

  // Active point coordinates
  const activeX = padding + (time / 100) * (graphSize + 20);
  const activePotY = potentialY(time);
  const activeActY = actualY(time);

  // Determine Business Cycle Phase based on time derivative and wave position
  // Wave is -Math.sin(normalized_t * freq)
  // Derivative is proportional to -cos(normalized_t * freq)
  const waveFreq = 1.5 * 2 * Math.PI;
  const rad = (time / 100) * waveFreq;
  const sineVal = Math.sin(rad); // Positive means actual is above potential
  const cosVal = Math.cos(rad);  // Positive means actual wave is rising relative to potential

  let phase = 'Expansion';
  let phaseColor = 'text-blue-600 bg-blue-50 border-blue-200';
  let description = 'Real GDP is growing and employment is returning toward full employment.';

  // Classify phases cleanly
  if (Math.abs(cosVal) < 0.25 && sineVal > 0) {
    phase = 'Peak';
    phaseColor = 'text-red-700 bg-red-50 border-red-200';
    description = 'The local maximum of economic output. Unemployment is lowest, and inflation pressures are highest.';
  } else if (Math.abs(cosVal) < 0.25 && sineVal < 0) {
    phase = 'Trough';
    phaseColor = 'text-amber-700 bg-amber-50 border-amber-200';
    description = 'The turning point where GDP reaches its cyclical low. Unemployment is highest.';
  } else if (cosVal < 0) {
    phase = 'Contraction (Recession)';
    phaseColor = 'text-rose-700 bg-rose-50 border-rose-200';
    description = 'Economic output is declining (typically for 2 consecutive quarters), and unemployment is rising.';
  } else {
    phase = 'Expansion (Recovery)';
    phaseColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    description = 'The economy is growing, real GDP increases, and unemployment decreases.';
  }

  // Output Gap calculation (represented in arbitrary units)
  const outputGap = (activePotY - activeActY); // SVG coordinates: lower Y means higher value
  const gapType = Math.abs(outputGap) < 3 
    ? 'lre' 
    : outputGap > 0 
      ? 'inflationary' 
      : 'recessionary';

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
      {/* Visual Canvas Panel */}
      <div className="flex-1 flex flex-col items-center">
        <h4 className="text-sm font-semibold text-gray-800 mb-2 font-sans">
          Business Cycle Progress Tracker
        </h4>
        <div className="relative border border-gray-100 bg-gray-50/50 rounded-lg p-2">
          <svg width={size} height={size} className="overflow-visible font-mono">
            {/* Grid Axes */}
            <line x1={padding} y1={size-padding} x2={size-15} y2={size-padding} stroke="#d1d5db" strokeWidth="2" />
            <line x1={padding} y1={padding-15} x2={padding} y2={size-padding} stroke="#d1d5db" strokeWidth="2" />

            {/* Labels */}
            <text x={size - 5} y={size - padding + 15} textAnchor="end" className="text-xs fill-gray-500 font-sans font-medium">Time</text>
            <text x={padding - 10} y={padding - 20} textAnchor="start" className="text-xs fill-gray-500 font-sans font-medium">Real GDP</text>

            {/* Potential GDP Trend Line */}
            <path d={potPath} fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,4" />
            <text x={size - padding + 25} y={potentialY(100) + 4} className="text-[10px] font-bold fill-slate-500 font-sans">LR Potential GDP</text>

            {/* Actual GDP Wave Curve */}
            <path d={actPath} fill="none" stroke="#2563eb" strokeWidth="3" />
            <text x={size - padding + 25} y={actualY(100) + 4} className="text-[10px] font-bold fill-blue-700 font-sans">Actual GDP</text>

            {/* Output Gap shading bar at current time */}
            <line x1={activeX} y1={activePotY} x2={activeX} y2={activeActY} stroke={gapType === 'inflationary' ? '#3b82f6' : '#ef4444'} strokeWidth="3" />
            <circle cx={activeX} cy={activePotY} r="3" fill="#64748b" />

            {/* Active Position Indicator */}
            <circle cx={activeX} cy={activeActY} r="6.5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
            
            {/* Dashed lines for active coordinate values */}
            <line x1={padding} y1={activeActY} x2={activeX} y2={activeActY} stroke="#94a3b8" strokeDasharray="2,2" />
          </svg>
        </div>
      </div>

      {/* Interactive Controls Panel */}
      <div className="w-full md:w-64 flex flex-col justify-between">
        <div>
          {/* Active Phase Display */}
          <div className={`p-3.5 rounded-lg border mb-4 transition-all duration-300 ${phaseColor}`}>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" /> Current Phase: {phase}
            </div>
            <p className="text-[11px] leading-relaxed opacity-90">{description}</p>
          </div>

          {/* Output Gap Display */}
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 mb-4 text-xs">
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800 uppercase tracking-wide mb-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Output Gap Metrics
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-500">Actual output level:</span>
              <span className="font-bold text-gray-800">{((size - padding - activeActY) / 10).toFixed(1)}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-500">Potential growth:</span>
              <span className="font-bold text-gray-800">{((size - padding - activePotY) / 10).toFixed(1)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-1.5 mt-1.5">
              <span className="text-gray-600 font-semibold">Output Gap:</span>
              <span className={`font-bold ${gapType === 'inflationary' ? 'text-blue-600' : gapType === 'recessionary' ? 'text-red-500' : 'text-gray-500'}`}>
                {gapType === 'inflationary' ? `+${(outputGap/10).toFixed(1)} (Positive)` : 
                 gapType === 'recessionary' ? `${(outputGap/10).toFixed(1)} (Negative)` : 
                 '0.0 (None)'}
              </span>
            </div>
          </div>

          {/* Slider */}
          <div>
            <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
              <span>Time Progress Tracker</span>
              <span className="font-mono text-xs text-blue-600 font-bold">t = {time}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={time} 
              onChange={(e) => setTime(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        {/* Micro-Tutorial */}
        <div className="mt-4 p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-[10.5px] leading-relaxed text-gray-600 flex gap-2">
          <HelpCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <strong>Cycle Dynamics:</strong> Over time, actual GDP oscillates above and below potential GDP. When it goes above potential, a <strong>positive output gap</strong> occurs (inflationary pressure). When it drops below, a <strong>negative output gap</strong> represents a recession.
          </div>
        </div>
      </div>
    </div>
  );
}
