import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'

interface ScoreBarProps {
  label: string
  score: number
  color?: 'blue' | 'green' | 'purple' | 'orange'
  icon?: string
}

export function ScoreBar({ label, score, color = 'blue', icon }: ScoreBarProps) {
  const getColorClasses = () => {
    switch (color) {
      case 'green':
        return 'bg-green-500'
      case 'purple':
        return 'bg-purple-500'
      case 'orange':
        return 'bg-orange-500'
      default:
        return 'bg-blue-500'
    }
  }

  const getScoreLevel = () => {
    if (score < 25) return { text: 'Débutant', color: 'text-red-600' }
    if (score < 50) return { text: 'En progression', color: 'text-orange-600' }
    if (score < 75) return { text: 'Avancé', color: 'text-blue-600' }
    return { text: 'Expert', color: 'text-green-600' }
  }

  const level = getScoreLevel()

  return (
    <Card className="border-2">
      <CardContent className="p-6">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {icon && <span className="text-2xl">{icon}</span>}
              <h3 className="font-semibold text-lg">{label}</h3>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{score}%</div>
              <div className={`text-sm font-medium ${level.color}`}>
                {level.text}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative">
            <Progress value={score} className="h-3" />
            <div
              className={`absolute top-0 left-0 h-3 rounded-full transition-all ${getColorClasses()}`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
