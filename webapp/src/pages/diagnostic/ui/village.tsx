import { VillageHut } from './village-hut.tsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface VillageProps {
  level: number // 0-5 huttes allumées
  score: number
}

export function Village({ level, score }: VillageProps) {
  const huts = Array.from({ length: 5 }, (_, i) => i < level)

  const getVillageMessage = () => {
    if (level === 0) {
      return {
        title: "Le village est endormi... 💤",
        description: "Votre village gaulois n'est pas encore éveillé. Il est temps de commencer la résistance numérique !",
        badge: "En sommeil",
        badgeVariant: "secondary" as const,
      }
    }
    if (level === 1) {
      return {
        title: "La première hutte s'allume ! 🏠",
        description: "Le village commence à se réveiller. Les premiers habitants prennent conscience de la souveraineté numérique.",
        badge: "Éveil",
        badgeVariant: "secondary" as const,
      }
    }
    if (level === 2) {
      return {
        title: "Le village s'organise ! 🔥",
        description: "De plus en plus d'habitants rejoignent le mouvement. La résistance s'organise !",
        badge: "En progression",
        badgeVariant: "default" as const,
      }
    }
    if (level === 3) {
      return {
        title: "Le village prend vie ! ⚡",
        description: "Le village gaulois est bien actif ! Votre démarche de souveraineté numérique est solide.",
        badge: "Actif",
        badgeVariant: "default" as const,
      }
    }
    if (level === 4) {
      return {
        title: "Un village florissant ! 🌟",
        description: "Votre village rayonne ! Vous êtes un exemple de souveraineté numérique pour les autres établissements.",
        badge: "Florissant",
        badgeVariant: "default" as const,
      }
    }
    return {
      title: "Le village des irréductibles ! 🏆",
      description: "Félicitations ! Votre village gaulois résiste parfaitement aux Big Tech. Vous êtes un modèle de souveraineté !",
      badge: "Irréductible",
      badgeVariant: "default" as const,
    }
  }

  const message = getVillageMessage()

  return (
    <Card className="border-2 shadow-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-b-2">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="text-2xl flex items-center gap-2">
            <span>🏘️</span>
            Village Gaulois
          </CardTitle>
          <Badge variant={message.badgeVariant} className="text-base px-4 py-1">
            {message.badge}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-8">
          {/* Message */}
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold">{message.title}</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {message.description}
            </p>
          </div>

          {/* Village visualization */}
          <div className="relative py-12">
            {/* Ciel avec étoiles */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-blue-800 to-green-900 rounded-lg overflow-hidden">
              <div className="absolute inset-0">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 50}%`,
                      animationDelay: `${Math.random() * 3}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Sol */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-green-800 to-green-900 rounded-b-lg" />

            {/* Huttes */}
            <div className="relative z-10 flex items-end justify-center gap-6 sm:gap-12 px-4">
              {huts.map((isActive, index) => (
                <VillageHut key={index} isActive={isActive} index={index} />
              ))}
            </div>

            {/* Lune */}
            <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-300 shadow-lg shadow-yellow-400/50" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t-2">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{level}</div>
              <div className="text-sm text-muted-foreground">Huttes allumées</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{score}%</div>
              <div className="text-sm text-muted-foreground">Score global</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{5 - level}</div>
              <div className="text-sm text-muted-foreground">Potentiel restant</div>
            </div>
          </div>

          {/* Légende */}
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground pt-4 border-t">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500" />
              <span>Allumé</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-600" />
              <span>Éteint</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
