import React from 'react';
import { EconomicModel, ModelCategory } from '../types';
import { BookOpen, TrendingUp, Cpu, PieChart } from 'lucide-react';

interface ModelSelectorProps {
  models: EconomicModel[];
  selectedModelId: string;
  onSelectModel: (id: string) => void;
}

export default function ModelSelector({
  models,
  selectedModelId,
  onSelectModel,
}: ModelSelectorProps) {
  const categories: { key: ModelCategory; label: string; icon: any }[] = [
    { key: 'foundations', label: 'Foundations', icon: Cpu },
    { key: 'micro', label: 'Microeconomics', icon: PieChart },
    { key: 'macro', label: 'Macroeconomics', icon: TrendingUp },
  ];

  return (
    <div className="w-full lg:w-80 shrink-0 bg-white border border-black rounded-none p-4 h-fit lg:sticky lg:top-6">
      <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-black">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-black" />
          <h3 className="font-black text-black text-xs uppercase tracking-wider">
            Visual Models Index
          </h3>
        </div>
        <span className="text-[10px] bg-black text-white font-black px-1.5 py-0.5 rounded-none uppercase tracking-wider">
          11 Models
        </span>
      </div>

      {/* Responsive Horizontal Scroll on small screens, Vertical list on desktop */}
      <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible no-scrollbar pb-2 lg:pb-0">
        {categories.map((cat) => {
          const categoryModels = models.filter((m) => m.category === cat.key);
          const Icon = cat.icon;

          return (
            <div key={cat.key} className="flex-none w-64 lg:w-full space-y-2">
              <div className="flex items-center gap-1.5 px-1 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-black border-b border-black/10">
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </div>
              
              <div className="space-y-1">
                {categoryModels.map((model) => {
                  const isActive = model.id === selectedModelId;
                  // Find the absolute index of this model in the global list for Swiss numbers
                  const globalIndex = models.findIndex(m => m.id === model.id) + 1;
                  const formattedIndex = String(globalIndex).padStart(2, '0');

                  return (
                    <button
                      key={model.id}
                      onClick={() => onSelectModel(model.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-none text-xs font-bold transition-all duration-150 flex items-center justify-between border ${
                        isActive
                          ? 'bg-black text-white border-black translate-x-1 shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                          : 'bg-white text-black border-transparent hover:border-black hover:translate-x-1'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className={`text-[10px] font-mono opacity-50 ${isActive ? 'text-white opacity-90' : 'text-black'}`}>
                          {formattedIndex}
                        </span>
                        <span className="truncate">{model.name}</span>
                      </div>
                      {isActive && (
                        <span className="w-1.5 h-1.5 bg-white shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
