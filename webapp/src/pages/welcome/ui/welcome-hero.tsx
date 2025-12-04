import { Shield, Lock, Users, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function WelcomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-20 sm:py-32">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Badge */}
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            <Shield className="w-4 h-4 mr-2 inline" />
            Projet NDI 2025
          </Badge>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-5xl">
            Comment les établissements scolaires peuvent{' '}
            <span className="text-blue-600 dark:text-blue-400">
              tenir tête aux Big Tech
            </span>{' '}
            ?
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl">
            Découvrez comment protéger les données de vos élèves et reprendre le contrôle
            de votre infrastructure numérique face aux géants de la technologie.
          </p>

          {/* Key Points */}
          <div className="flex flex-wrap justify-center gap-6 pt-8">
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <Lock className="w-5 h-5 text-blue-600" />
              <span>Protection des données</span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <Users className="w-5 h-5 text-blue-600" />
              <span>Autonomie numérique</span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>Solutions éducatives</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl -z-10" />
    </section>
  )
}
