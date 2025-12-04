import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Github, BookOpen, Target } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

export function WelcomeCallToAction() {
  const navigate = useNavigate()

  const handleStartDiagnostic = () => {
    navigate({ to: '/diagnostic' })
  }

  return (
    <section className="py-20 bg-gradient-to-t from-blue-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-2 shadow-xl">
          <CardContent className="p-8 sm:p-12">
            <div className="text-center space-y-6">
              {/* Title */}
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Prêt à reprendre le contrôle ?
              </h2>

              {/* Description */}
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explorez notre plateforme et découvrez comment mettre en place
                une infrastructure numérique souveraine pour votre établissement scolaire.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  onClick={handleStartDiagnostic}
                  className="gap-2 text-base"
                >
                  <Target className="w-5 h-5" />
                  Faire le diagnostic
                  <ArrowRight className="w-5 h-5" />
                </Button>

                <Button size="lg" variant="outline" className="gap-2 text-base">
                  <BookOpen className="w-5 h-5" />
                  Documentation
                </Button>
              </div>

              {/* Secondary Link */}
              <div className="pt-6 border-t">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Voir le projet sur GitHub</span>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats or Additional Info */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600">100%</div>
            <div className="text-sm text-muted-foreground mt-1">Open Source</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">RGPD</div>
            <div className="text-sm text-muted-foreground mt-1">Conforme</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">🇫🇷</div>
            <div className="text-sm text-muted-foreground mt-1">Souveraineté numérique</div>
          </div>
        </div>
      </div>
    </section>
  )
}
