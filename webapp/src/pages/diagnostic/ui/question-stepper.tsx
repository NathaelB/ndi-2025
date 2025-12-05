import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'

interface QuestionStepperProps {
  currentStep: number
  totalSteps: number
  onNext: () => void
  onPrevious: () => void
  canGoNext: boolean
  isLastStep: boolean
}

export function QuestionStepper({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  canGoNext,
  isLastStep,
}: QuestionStepperProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Question {currentStep + 1} sur {totalSteps}</span>
          <span>{Math.round(progress)}% complété</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentStep === 0}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Précédent
        </Button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${index <= currentStep
                  ? 'w-8 bg-blue-600'
                  : 'w-2 bg-gray-300 dark:bg-gray-700'
                }`}
            />
          ))}
        </div>

        <Button
          onClick={onNext}
          disabled={!canGoNext}
          className="gap-2"
        >
          {isLastStep ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Voir le résultat
            </>
          ) : (
            <>
              Suivant
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
