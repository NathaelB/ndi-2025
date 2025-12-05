import { useNavigate, useSearch } from '@tanstack/react-router'
import { useDiagnosticResult } from './features/use-diagnostic.ts'
import { type DiagnosticAnswers } from './features/types'
import { ScoreBar } from './ui/score-bar.tsx'
import { Village } from './ui/village.tsx'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Download, Share2, RefreshCw, Lightbulb } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export function DiagnosticResultPage() {
  const navigate = useNavigate()
  const search = useSearch({ from: '/diagnostic/result' }) as { answers?: string }

  // Parse answers from URL search params
  let answers: DiagnosticAnswers = {}
  try {
    if (search.answers) {
      answers = JSON.parse(search.answers)
    }
  } catch (error) {
    console.error('Error parsing answers:', error)
  }

  const { data: result, isLoading } = useDiagnosticResult(answers)

  const handleRestart = () => {
    navigate({ to: '/diagnostic' })
  }

  const handleShare = () => {
    // Simulation du partage
    alert('Fonctionnalité de partage à venir !')
  }

  const handleDownload = () => {
    // Simulation du téléchargement
    alert('Téléchargement du rapport PDF à venir !')
  }

  if (isLoading || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-spin">⚙️</div>
          <p className="text-xl font-semibold">Calcul de votre score...</p>
        </div>
      </div>
    )
  }

  const getLevelEmoji = () => {
    switch (result.level) {
      case 'débutant':
        return '🌱'
      case 'intermédiaire':
        return '🌿'
      case 'avancé':
        return '🌳'
      case 'expert':
        return '🏆'
      default:
        return '🎯'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={handleRestart} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Recommencer
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleShare} className="gap-2">
                <Share2 className="w-4 h-4" />
                Partager
              </Button>
              <Button variant="outline" onClick={handleDownload} className="gap-2">
                <Download className="w-4 h-4" />
                Télécharger
              </Button>
            </div>
          </div>

          {/* Score principal */}
          <Card className="border-2 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <div className="text-center space-y-4">
                <div className="text-7xl animate-bounce">{getLevelEmoji()}</div>
                <h1 className="text-4xl font-bold">Votre Score : {result.totalScore}%</h1>
                <Badge variant="secondary" className="text-xl px-6 py-2">
                  Niveau : {result.level}
                </Badge>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                  {result.totalScore < 25 && "Vous débutez votre parcours vers la souveraineté numérique. C'est un excellent point de départ !"}
                  {result.totalScore >= 25 && result.totalScore < 50 && "Vous progressez bien ! Continuez vos efforts vers plus de souveraineté."}
                  {result.totalScore >= 50 && result.totalScore < 75 && "Bravo ! Votre établissement est bien engagé dans la transition numérique."}
                  {result.totalScore >= 75 && "Félicitations ! Vous êtes un modèle de souveraineté numérique !"}
                </p>
              </div>
            </div>
          </Card>

          {/* Village Gaulois */}
          <Village level={result.villageLevel} score={result.totalScore} />

          {/* Scores par catégorie */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Détail par catégorie</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <ScoreBar
                label="Souveraineté"
                score={result.categoryScores.souverainete}
                color="blue"
                icon="🔐"
              />
              <ScoreBar
                label="Durabilité"
                score={result.categoryScores.durabilite}
                color="green"
                icon="🌱"
              />
              <ScoreBar
                label="Inclusion"
                score={result.categoryScores.inclusion}
                color="purple"
                icon="🤝"
              />
            </div>
          </div>

          {/* Recommandations */}
          <Card className="border-2 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Lightbulb className="w-6 h-6 text-yellow-500" />
                Recommandations personnalisées
              </CardTitle>
              <CardDescription className="text-base">
                Voici des pistes concrètes pour améliorer votre souveraineté numérique
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400">
                    {index + 1}
                  </div>
                  <p className="text-base leading-relaxed flex-1">{recommendation}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Actions suivantes */}
          <Card className="border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950">
            <CardHeader>
              <CardTitle className="text-xl">Et maintenant ?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    📚 Se former
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Consultez notre bibliothèque de ressources sur la souveraineté numérique
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    🤝 Rejoindre la communauté
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Échangez avec d'autres établissements engagés dans la transition
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    🛠️ Passer à l'action
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Téléchargez notre guide de migration vers des solutions souveraines
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    📊 Suivre vos progrès
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Refaites le diagnostic dans 6 mois pour mesurer votre évolution
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button onClick={handleRestart} className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Refaire le diagnostic
                </Button>
                <Button variant="outline" onClick={() => navigate({ to: '/' })}>
                  Retour à l'accueil
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer info */}
          <div className="text-center text-sm text-muted-foreground space-y-2 pt-8">
            <p>
              💡 Ce diagnostic est un outil pédagogique créé pour la Nuit de l'Info 2025
            </p>
            <p>
              🔒 Aucune donnée n'est collectée ou stockée
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
