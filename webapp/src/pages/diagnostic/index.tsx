import { StartButton } from './ui/start-button.tsx'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Shield, Zap, Target, Award } from 'lucide-react'

export function DiagnosticIndexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="inline-block">
              <div className="text-6xl mb-4 animate-bounce">🏘️</div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Diagnostic Numérique
              <span className="block text-blue-600 dark:text-blue-400 mt-2">
                Village Gaulois
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Évaluez la souveraineté numérique de votre établissement et découvrez
              comment résister aux Big Tech comme un village d'irréductibles gaulois !
            </p>
          </div>

          {/* Description Card */}
          <Card className="border-2 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Comment ça marche ?</CardTitle>
              <CardDescription className="text-base">
                Un diagnostic en 3 étapes pour évaluer votre maturité numérique
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-lg">1. Répondez</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    10 questions sur vos pratiques numériques : OS, hébergement, authentification, durabilité...
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-lg">2. Obtenez votre score</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Un score de 0 à 100% évaluant votre niveau de souveraineté, durabilité et inclusion.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-lg">3. Recevez vos recommandations</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Des conseils personnalisés et visualisez votre village gaulois s'allumer !
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🎯</div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">3 axes évalués</h3>
                    <p className="text-sm text-muted-foreground">
                      Souveraineté, durabilité et inclusion numérique pour une vision complète.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">⚡</div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Rapide et ludique</h3>
                    <p className="text-sm text-muted-foreground">
                      5 minutes chrono pour découvrir votre niveau et voir votre village s'animer.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">💡</div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Recommandations personnalisées</h3>
                    <p className="text-sm text-muted-foreground">
                      Des pistes concrètes pour améliorer votre souveraineté numérique.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🏆</div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Village gaulois visuel</h3>
                    <p className="text-sm text-muted-foreground">
                      Voyez les huttes de votre village s'allumer au fur et à mesure de vos progrès !
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center space-y-6 pt-8">
            <StartButton />
            <p className="text-sm text-muted-foreground">
              ⏱️ Temps estimé : 5 minutes • 🔒 Aucune donnée sauvegardée
            </p>
          </div>

          {/* Info banner */}
          <Card className="border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Award className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-blue-900 dark:text-blue-100">
                    Projet Nuit de l'Info 2025
                  </h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                    Ce diagnostic a été créé dans le cadre de la NDI 2025 sur le thème
                    "Comment les établissements scolaires peuvent tenir tête aux Big Tech ?".
                    Il vise à sensibiliser aux enjeux de souveraineté numérique dans l'éducation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
