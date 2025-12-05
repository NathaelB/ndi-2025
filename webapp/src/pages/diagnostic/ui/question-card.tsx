import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { type DiagnosticQuestion } from '../features/types'

interface QuestionCardProps {
  question: DiagnosticQuestion
  value?: string
  onChange: (value: string) => void
}

export function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  return (
    <Card className="border-2 shadow-lg">
      <CardHeader className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              {question.id === 'os' && '💻'}
              {question.id === 'data-location' && '🌍'}
              {question.id === 'authentication' && '🔐'}
              {question.id === 'hosting' && '☁️'}
              {question.id === 'hardware-reuse' && '♻️'}
              {question.id === 'software' && '📝'}
              {question.id === 'resource-sharing' && '🤝'}
              {question.id === 'digital-policy' && '📋'}
              {question.id === 'training' && '👩‍🏫'}
              {question.id === 'accessibility' && '♿'}
            </span>
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl leading-tight">{question.title}</CardTitle>
          </div>
        </div>
        <CardDescription className="text-base">
          {question.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
          {question.options.map((option) => (
            <div
              key={option.value}
              className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:bg-accent ${value === option.value
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                : 'border-gray-200 dark:border-gray-700'
                }`}
            >
              <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
              <Label
                htmlFor={`${question.id}-${option.value}`}
                className="flex-1 cursor-pointer leading-relaxed"
              >
                <div className="font-medium">{option.label}</div>
                {option.description && (
                  <div className="text-sm text-muted-foreground mt-1">
                    {option.description}
                  </div>
                )}
              </Label>
              <div className="flex-shrink-0 text-sm font-semibold text-muted-foreground">
                {option.score > 0 && (
                  <span className="text-green-600 dark:text-green-400">
                    +{option.score}
                  </span>
                )}
                {option.score === 0 && (
                  <span className="text-gray-400">0</span>
                )}
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
