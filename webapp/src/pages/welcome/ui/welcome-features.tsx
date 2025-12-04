import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Server, Key, Database, Eye, Cloud } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Souveraineté des données',
    description: 'Gardez le contrôle total sur les données de vos élèves et enseignants sans dépendre des géants du numérique.',
    color: 'text-blue-600'
  },
  {
    icon: Server,
    title: 'Infrastructure autonome',
    description: 'Déployez vos propres solutions open-source pour ne plus être dépendant des services propriétaires.',
    color: 'text-green-600'
  },
  {
    icon: Key,
    title: 'Authentification sécurisée',
    description: 'Gérez l\'identité de vos utilisateurs avec des solutions respectueuses de la vie privée comme Keycloak.',
    color: 'text-purple-600'
  },
  {
    icon: Database,
    title: 'Stockage local',
    description: 'Hébergez vos données en France sur vos propres serveurs ou via des fournisseurs européens certifiés.',
    color: 'text-orange-600'
  },
  {
    icon: Eye,
    title: 'Transparence totale',
    description: 'Utilisez des logiciels open-source auditables pour garantir la transparence de vos outils numériques.',
    color: 'text-pink-600'
  },
  {
    icon: Cloud,
    title: 'Alternative aux GAFAM',
    description: 'Adoptez des alternatives européennes et open-source à Google Workspace, Microsoft 365 et autres.',
    color: 'text-cyan-600'
  }
]

export function WelcomeFeatures() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Reprenez le contrôle
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Les Big Tech dominent l'écosystème numérique éducatif.
            Il est temps de changer la donne avec des solutions respectueuses et souveraines.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="border-2 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-800`}>
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
