import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { QuestionCard } from './ui/question-card.tsx'
import { QuestionStepper } from './ui/question-stepper.tsx'
import { DIAGNOSTIC_QUESTIONS } from './features/types'
import { useDiagnosticAnswers } from './features/use-diagnostic.ts'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export function DiagnosticQuestionsPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const { answers, saveAnswer } = useDiagnosticAnswers()

  const currentQuestion = DIAGNOSTIC_QUESTIONS[currentStep]
  const totalSteps = DIAGNOSTIC_QUESTIONS.length
  const isLastStep = currentStep === totalSteps - 1
  const hasAnswered = !!answers[currentQuestion.id]

  const handleNext = () => {
    if (isLastStep) {
      // Naviguer vers les résultats avec les réponses
      navigate({
        to: '/diagnostic/result',
        search: { answers: JSON.stringify(answers) },
      })
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleAnswerChange = (value: string) => {
    saveAnswer(currentQuestion.id, value)
  }

  const handleBack = () => {
    navigate({ to: '/diagnostic' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={handleBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
            <h1 className="text-2xl font-bold">Diagnostic Numérique</h1>
            <div className="w-24" /> {/* Spacer for alignment */}
          </div>

          {/* Stepper */}
          <QuestionStepper
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canGoNext={hasAnswered}
            isLastStep={isLastStep}
          />

          {/* Question Card */}
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <QuestionCard
              question={currentQuestion}
              value={answers[currentQuestion.id]}
              onChange={handleAnswerChange}
            />
          </div>

          {/* Category indicator */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Catégorie :</span>
            <span className="font-semibold capitalize">
              {currentQuestion.category === 'souverainete' && '🔐 Souveraineté'}
              {currentQuestion.category === 'durabilite' && '🌱 Durabilité'}
              {currentQuestion.category === 'inclusion' && '🤝 Inclusion'}
            </span>
          </div>

          {/* Progress info */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Vos réponses sont enregistrées automatiquement.
              Vous pouvez revenir en arrière à tout moment.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
