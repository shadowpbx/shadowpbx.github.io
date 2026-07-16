export type ModelCategory = 'foundations' | 'micro' | 'macro';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  // Dynamic action for the graph if applicable
  requiredShift?: {
    curve: string;
    direction: 'left' | 'right' | 'up' | 'down';
  };
}

export interface ShifterGroup {
  group: string;
  items: string[];
}

export interface ModelTutorial {
  overview: string;
  axes: string;
  shapesAndMechanics: string;
  readingPoints: string;
  shifters: string;
  examTrap: string;
}

export interface EconomicModel {
  id: string;
  name: string;
  category: ModelCategory;
  description: string;
  yAxis: string;
  xAxis: string;
  keyConcepts: string[];
  shifters: ShifterGroup[];
  formulas?: string[];
  quizzes: QuizQuestion[];
  tutorial?: ModelTutorial;
}
