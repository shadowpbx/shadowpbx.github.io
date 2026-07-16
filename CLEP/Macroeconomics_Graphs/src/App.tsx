import React, { useState } from 'react';
import { modelsData } from './data/modelsData';
import ModelSelector from './components/ModelSelector';
import ModelDetails from './components/ModelDetails';
import ModelQuiz from './components/ModelQuiz';
import { Compass, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [selectedModelId, setSelectedModelId] = useState<string>('ppc');

  const selectedModel = modelsData.find((m) => m.id === selectedModelId) || modelsData[0];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] p-3 md:p-10 flex flex-col border-0 md:border-[16px] border-white font-sans antialiased">
      
      {/* Dynamic Visual Banner - Geometric Balance Theme */}
      <header className="border-b-2 border-black pb-4 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase mb-1 opacity-60">
              Macroeconomic Visual Index • AP Econ Aligned
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase leading-none">
              Economics Graph Lab
            </h1>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase leading-none">
              Curriculum Reference<br className="hidden sm:inline" />
              <span className="opacity-65 font-medium">11 Complete Visual Models</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Core Dashboard Layout */}
      <main className="flex-1">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Index Sidebar */}
          <ModelSelector
            models={modelsData}
            selectedModelId={selectedModelId}
            onSelectModel={setSelectedModelId}
          />

          {/* Workspace Area */}
          <div className="flex-1 space-y-8 min-w-0">
            {/* Simulation & Curriculum Details */}
            <ModelDetails model={selectedModel} />

            {/* Quiz practice board */}
            <ModelQuiz questions={selectedModel.quizzes} />
          </div>

        </div>
      </main>

      {/* Footer credit */}
      <footer className="mt-12 flex flex-col sm:flex-row justify-between items-center text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 border-t border-black pt-4 gap-2">
        <p>Unit 1-6 Comprehensive Overview</p>
        <p>Technical Chart Series 001-A</p>
        <p>Visualizing Macro Foundations</p>
      </footer>

    </div>
  );
}
