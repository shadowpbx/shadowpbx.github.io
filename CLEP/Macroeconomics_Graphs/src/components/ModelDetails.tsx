import React from 'react';
import { EconomicModel } from '../types';
import { HelpCircle, FileText, Share2, ClipboardList, BookOpen, AlertTriangle } from 'lucide-react';
import { tutorialsData } from '../data/tutorialsData';

// Import All 11 Graphs
import GraphPPC from './graphs/GraphPPC';
import GraphSupplyDemand from './graphs/GraphSupplyDemand';
import GraphCircularFlow from './graphs/GraphCircularFlow';
import GraphADAS from './graphs/GraphADAS';
import GraphMoneyMarket from './graphs/GraphMoneyMarket';
import GraphLoanableFunds from './graphs/GraphLoanableFunds';
import GraphPhillipsCurve from './graphs/GraphPhillipsCurve';
import GraphFOREX from './graphs/GraphFOREX';
import GraphBusinessCycle from './graphs/GraphBusinessCycle';
import GraphLafferCurve from './graphs/GraphLafferCurve';
import GraphKeynesianCross from './graphs/GraphKeynesianCross';

interface ModelDetailsProps {
  model: EconomicModel;
}

export default function ModelDetails({ model }: ModelDetailsProps) {
  const tutorial = tutorialsData[model.id];
  
  // Render the appropriate graph component based on selected model id
  const renderGraph = () => {
    switch (model.id) {
      case 'ppc':
        return <GraphPPC />;
      case 'supply-demand':
        return <GraphSupplyDemand />;
      case 'circular-flow':
        return <GraphCircularFlow />;
      case 'ad-as':
        return <GraphADAS />;
      case 'money-market':
        return <GraphMoneyMarket />;
      case 'loanable-funds':
        return <GraphLoanableFunds />;
      case 'phillips-curve':
        return <GraphPhillipsCurve />;
      case 'forex':
        return <GraphFOREX />;
      case 'business-cycle':
        return <GraphBusinessCycle />;
      case 'laffer-curve':
        return <GraphLafferCurve />;
      case 'keynesian-cross':
        return <GraphKeynesianCross />;
      default:
        return (
          <div className="p-8 text-center bg-gray-50 border border-gray-100 rounded-xl text-xs text-gray-400 font-sans">
            Interactive visual simulation not available.
          </div>
        );
    }
  };

  return (
    <div className="flex-1 space-y-6">
      
      {/* Title & Description Card */}
      <div className="bg-white border border-black rounded-none p-5 font-sans">
        <h2 className="text-2xl font-black text-black tracking-tight uppercase">
          {model.name}
        </h2>
        <p className="text-xs text-black/75 mt-2 leading-relaxed">
          {model.description}
        </p>
      </div>

      {/* Dynamic Simulation Workspace */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-bold text-black uppercase tracking-[0.2em] flex items-center gap-1">
            <Share2 className="w-3.5 h-3.5" /> Simulation Lab
          </span>
          <span className="text-[9px] bg-black text-white font-black px-2 py-0.5 rounded-none uppercase tracking-widest">
            Fully Interactive
          </span>
        </div>
        <div className="border border-black bg-white rounded-none overflow-hidden">
          {renderGraph()}
        </div>
      </div>

      {/* Curriculum reference guide (Key concepts, shifters, formulas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Key Concepts and Formulas */}
        <div className="bg-white border border-black rounded-none p-5 space-y-4">
          <div className="border-b-2 border-black pb-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black flex items-center gap-1.5">
              <ClipboardList className="w-4 h-4" /> Key Exam Concepts
            </h4>
          </div>
          <ul className="space-y-2 text-xs text-black/80 leading-relaxed list-disc pl-4">
            {model.keyConcepts.map((concept, idx) => (
              <li key={idx}>{concept}</li>
            ))}
          </ul>

          {model.formulas && model.formulas.length > 0 && (
            <div className="pt-3 border-t border-black/15">
              <h5 className="text-[10px] font-black uppercase tracking-[0.15em] text-black/60 mb-2">
                Essential Equations
              </h5>
              <div className="space-y-1.5">
                {model.formulas.map((formula, idx) => (
                  <div key={idx} className="bg-[#F8F9FA] border border-black rounded-none p-2.5 font-mono text-[11px] text-black font-bold">
                    {formula}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Shifters */}
        <div className="bg-white border border-black rounded-none p-5 space-y-4">
          <div className="border-b-2 border-black pb-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> Curve Shifters & Triggers
            </h4>
          </div>
          <div className="space-y-4">
            {model.shifters.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-2">
                <h5 className="text-[10px] font-extrabold uppercase text-black tracking-wider">
                  {group.group}
                </h5>
                <ul className="space-y-1.5 text-xs text-black/65 pl-3 list-disc">
                  {group.items.map((item, itemIdx) => (
                    <li key={itemIdx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Detailed Study Guide & CLEP Exam Lab Tutorial */}
      {tutorial && (
        <div className="bg-white border-2 border-black rounded-none p-6 space-y-6 font-sans">
          <div className="border-b-4 border-black pb-3 flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-[0.15em] text-black flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-black" /> Comprehensive Study Guide
            </h3>
            <span className="text-[9px] font-mono font-black border border-black px-2 py-0.5 uppercase tracking-widest bg-yellow-300 text-black">
              Target CLEP Score: 80
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {/* Overview */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-wider text-black flex items-center gap-1.5 mb-1 bg-black text-white px-2 py-1 w-fit">
                  Overview
                </h4>
                <p className="text-xs text-black/85 leading-relaxed font-semibold">
                  {tutorial.overview}
                </p>
              </div>

              {/* The Axes */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-wider text-black flex items-center gap-1.5 mb-1 bg-black text-white px-2 py-1 w-fit">
                  The Axes Explained
                </h4>
                <p className="text-xs text-black/85 leading-relaxed font-semibold">
                  {tutorial.axes}
                </p>
              </div>

              {/* Shapes & Mechanics */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-wider text-black flex items-center gap-1.5 mb-1 bg-black text-white px-2 py-1 w-fit">
                  Shape of the Curve & Mechanics
                </h4>
                <p className="text-xs text-black/85 leading-relaxed font-semibold">
                  {tutorial.shapesAndMechanics}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Reading Points */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-wider text-black flex items-center gap-1.5 mb-1 bg-black text-white px-2 py-1 w-fit">
                  Reading the Points
                </h4>
                <p className="text-xs text-black/85 leading-relaxed font-semibold">
                  {tutorial.readingPoints}
                </p>
              </div>

              {/* Shifters */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-wider text-black flex items-center gap-1.5 mb-1 bg-black text-white px-2 py-1 w-fit">
                  The Shifters
                </h4>
                <p className="text-xs text-black/85 leading-relaxed font-semibold">
                  {tutorial.shifters}
                </p>
              </div>
            </div>
          </div>

          {/* CLEP Exam Trap Box */}
          <div className="border border-black bg-amber-50 p-5 rounded-none relative overflow-hidden shadow-[3px_3px_0px_rgba(0,0,0,1)]">
            <div className="absolute top-0 right-0 bg-black text-white text-[9px] font-black px-3 py-1 uppercase tracking-widest">
              CLEP Trap Alert
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-black text-white p-2 rounded-none shrink-0 border border-black mt-0.5">
                <AlertTriangle className="w-4 h-4 text-yellow-300" />
              </div>
              <div>
                <h5 className="text-xs font-black uppercase tracking-[0.15em] text-black mb-1.5">
                  The CLEP Exam Trap
                </h5>
                <p className="text-xs text-black/90 leading-relaxed font-bold">
                  {tutorial.examTrap}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
