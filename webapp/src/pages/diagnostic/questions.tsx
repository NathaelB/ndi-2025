import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { DIAGNOSTIC_QUESTIONS } from "./features/types";
import { useScore } from "./features/score-context";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function DiagnosticQuestionsPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const { answers, updateAnswer } = useScore();

  const currentQuestion = DIAGNOSTIC_QUESTIONS[currentStep];
  const totalSteps = DIAGNOSTIC_QUESTIONS.length;
  const isLastStep = currentStep === totalSteps - 1;
  const hasAnswered = !!answers[currentQuestion.id];

  const handleNext = () => {
    if (isLastStep) {
      navigate({
        to: "/diagnostic/result",
      });
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleAnswerChange = (value: string) => {
    updateAnswer(currentQuestion.id, value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl space-y-8">
        {/* Progress bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">
              Question {currentStep + 1} sur {totalSteps}
            </span>
            <span className="text-cyan-400 font-semibold">
              {Math.round(((currentStep + 1) / totalSteps) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 ease-out"
              style={{
                width: `${((currentStep + 1) / totalSteps) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          {/* Category badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 backdrop-blur-md border border-slate-700/50">
              <span className="text-xl">
                {currentQuestion.category === "souverainete" && "🔐"}
                {currentQuestion.category === "durabilite" && "🌱"}
                {currentQuestion.category === "inclusion" && "🤝"}
              </span>
              <span className="text-sm font-medium text-slate-300 capitalize">
                {currentQuestion.category}
              </span>
            </div>
          </div>

          {/* Question title */}
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {currentQuestion.title}
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              {currentQuestion.description}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswerChange(option.value)}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 ${
                  answers[currentQuestion.id] === option.value
                    ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20"
                    : "border-slate-700/50 bg-slate-900/30 hover:bg-slate-800/50 hover:border-slate-600 backdrop-blur-sm"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="font-semibold text-white text-lg mb-1">
                      {option.label}
                    </div>
                    {option.description && (
                      <div className="text-sm text-slate-400">
                        {option.description}
                      </div>
                    )}
                  </div>
                  {option.score > 0 && (
                    <div className="flex-shrink-0 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-semibold">
                      +{option.score}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="gap-2 text-slate-300 hover:text-white hover:bg-slate-800/50 disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" />
            Précédent
          </Button>

          <Button
            onClick={handleNext}
            disabled={!hasAnswered}
            className={`gap-2 px-8 ${
              hasAnswered
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                : "bg-slate-700 text-slate-400"
            }`}
          >
            {isLastStep ? "Voir les résultats" : "Suivant"}
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
