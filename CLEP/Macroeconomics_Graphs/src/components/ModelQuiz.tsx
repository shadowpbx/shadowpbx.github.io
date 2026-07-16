import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle, XCircle, HelpCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';

interface ModelQuizProps {
  questions: QuizQuestion[];
}

export default function ModelQuiz({ questions }: ModelQuizProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Reset quiz state whenever the questions change (e.g., when a different model is chosen)
  useEffect(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  }, [questions]);

  if (questions.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 text-center text-xs text-gray-400 font-sans">
        Practice questions coming soon for this model!
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null || isSubmitted) return;
    setIsSubmitted(true);
    if (selectedOption === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="bg-white border border-black rounded-none p-5 font-sans">
      <div className="flex items-center justify-between mb-4 border-b-2 border-black pb-3">
        <span className="text-[10px] font-black text-black uppercase tracking-[0.2em] flex items-center gap-1">
          <HelpCircle className="w-4 h-4 text-black" /> Exam Practice Laboratory
        </span>
        <span className="text-xs font-mono font-black bg-black text-white px-2.5 py-0.5 rounded-none uppercase tracking-wider">
          Q: {currentIndex + 1} / {questions.length}
        </span>
      </div>

      {!quizFinished ? (
        <div className="space-y-4">
          {/* Question Text */}
          <h4 className="text-sm font-black text-black leading-relaxed">
            {currentQuestion.question}
          </h4>

          {/* Options List */}
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrect = index === currentQuestion.correctIndex;

              let optionStyle = 'bg-white hover:bg-black/5 border-black text-black';
              if (isSelected) {
                optionStyle = 'bg-black text-white border-black font-extrabold shadow-[2px_2px_0px_rgba(0,0,0,1)]';
              }
              if (isSubmitted) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-50 border-2 border-emerald-600 text-emerald-950 font-bold';
                } else if (isSelected) {
                  optionStyle = 'bg-red-50 border-2 border-red-600 text-red-950';
                } else {
                  optionStyle = 'opacity-40 border-black/30 text-black/40 bg-[#F8F9FA]';
                }
              }

              return (
                <button
                  key={index}
                  disabled={isSubmitted}
                  onClick={() => handleOptionClick(index)}
                  className={`w-full text-left px-4 py-3 rounded-none border text-xs transition-all duration-150 flex items-start gap-2.5 ${optionStyle}`}
                >
                  <span className={`font-mono text-[10px] font-black border px-1.5 py-0.5 rounded-none shrink-0 ${
                    isSelected && !isSubmitted ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="leading-relaxed font-bold">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Actions & Feedback */}
          <div className="pt-2">
            {!isSubmitted ? (
              <button
                disabled={selectedOption === null}
                onClick={handleSubmit}
                className="w-full bg-black hover:bg-black/90 disabled:bg-black/10 disabled:text-black/30 disabled:border-black/10 disabled:cursor-not-allowed text-white font-black py-2.5 rounded-none text-xs uppercase tracking-widest transition-all border border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5"
              >
                Submit Answer
              </button>
            ) : (
              <div className="space-y-4">
                {/* Result Indicator */}
                <div className={`p-4 rounded-none border-2 flex gap-3 text-xs leading-relaxed ${
                  selectedOption === currentQuestion.correctIndex 
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                    : 'bg-red-50 border-red-600 text-red-900'
                }`}>
                  {selectedOption === currentQuestion.correctIndex ? (
                    <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-black uppercase tracking-wider text-[10px] block mb-1">
                      {selectedOption === currentQuestion.correctIndex ? 'Correct Verification' : 'Correction Required'}
                    </span>{' '}
                    <p className="font-medium">{currentQuestion.explanation}</p>
                  </div>
                </div>

                {/* Next Question Control */}
                <button
                  onClick={handleNext}
                  className="w-full bg-black hover:bg-black/90 text-white font-black py-2.5 rounded-none text-xs flex items-center justify-center gap-1 border border-black uppercase tracking-widest transition-all shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5"
                >
                  {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Finished Summary */
        <div className="text-center py-8 space-y-4 border border-black bg-[#F8F9FA] rounded-none">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-black text-white rounded-none border border-black mb-1">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider">Practice Session Completed</h4>
            <p className="text-xs text-black/60 mt-1">
              Verification score: <span className="font-black text-black">{score}</span> / <span className="font-black text-black">{questions.length}</span> correct modules
            </p>
          </div>
          
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs bg-black hover:bg-black/90 text-white font-black px-6 py-2.5 rounded-none border border-black uppercase tracking-widest transition-all shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5"
          >
            <RotateCcw className="w-4 h-4" /> Restart Session
          </button>
        </div>
      )}
    </div>
  );
}
