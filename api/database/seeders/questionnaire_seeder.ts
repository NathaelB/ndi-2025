import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Category from '#models/category'
import Question from '#models/question'
import QuestionOption from '#models/question_option'
import Recommendation from '#models/recommendation'

export default class extends BaseSeeder {
  async run() {
    // 1. Créer les catégories (Piliers NIRD)
    const categories = await Category.createMany([
      {
        slug: 'sovereignty',
        label: 'Souveraineté Numérique',
        color: '#3b82f6', // Bleu
      },
      {
        slug: 'sobriety',
        label: 'Sobriété Numérique',
        color: '#10b981', // Vert
      },
      {
        slug: 'durability',
        label: 'Durabilité',
        color: '#f59e0b', // Orange
      },
      {
        slug: 'inclusion',
        label: 'Inclusion Numérique',
        color: '#8b5cf6', // Violet
      },
    ])

    const [sovereignty, sobriety, durability, inclusion] = categories

    // 2. Question 1 : Obsolescence & Matériel
    const q1 = await Question.create({
      categoryId: durability.id,
      content:
        "La fin du support de Windows 10 approche. Quelle est la stratégie de votre établissement pour les postes jugés 'incompatibles' ?",
      order: 1,
      isActive: true,
    })

    const q1Options = await QuestionOption.createMany([
      {
        questionId: q1.id,
        label: 'Remplacement systématique du parc par des ordinateurs neufs compatibles Windows 11',
        value: 'replace_computers',
        impactScores: {
          durability: -20,
          sobriety: -15,
          sovereignty: -5,
        },
      },
      {
        questionId: q1.id,
        label: 'Maintien sous Windows 10 sans mises à jour de sécurité (risqué)',
        value: 'keep_windows10',
        impactScores: {
          durability: 0,
          sovereignty: -10,
        },
      },
      {
        questionId: q1.id,
        label:
          "Installation d'un système d'exploitation libre et léger (Linux) sur le matériel existant",
        value: 'install_linux',
        impactScores: {
          durability: 20,
          sobriety: 15,
          sovereignty: 10,
        },
      },
    ])

    await Recommendation.createMany([
      {
        questionOptionId: q1Options[0].id,
        title: 'Stop au gaspillage !',
        description:
          'Installer Linux permet de prolonger la vie de ces PC parfaitement fonctionnels. Évitez le gaspillage électronique et réduisez votre empreinte carbone.',
        actionLabel: 'Consulter le guide NIRD sur Linux',
        actionUrl: 'https://nird.forge.apps.education.fr/',
        priority: 10,
      },
      {
        questionOptionId: q1Options[1].id,
        title: 'Danger : Faille de sécurité critique',
        description:
          'Maintenir Windows 10 sans mises à jour expose votre établissement à des risques de sécurité majeurs. Une migration vers un OS libre est préférable pour garantir la sécurité tout en conservant le matériel.',
        actionLabel: 'Voir les alternatives sécurisées',
        actionUrl: 'https://nird.forge.apps.education.fr/',
        priority: 15,
      },
    ])

    // 3. Question 2 : Hébergement & Données
    const q2 = await Question.create({
      categoryId: sovereignty.id,
      content: 'Où sont hébergées les données pédagogiques et administratives de vos élèves ?',
      order: 2,
      isActive: true,
    })

    const q2Options = await QuestionOption.createMany([
      {
        questionId: q2.id,
        label: 'Sur un cloud public américain (Google Drive, OneDrive, AWS)',
        value: 'cloud_us',
        impactScores: {
          sovereignty: -25,
          inclusion: -5,
        },
      },
      {
        questionId: q2.id,
        label: 'Chez un hébergeur européen (OVH, Scaleway) ou académique',
        value: 'cloud_eu',
        impactScores: {
          sovereignty: 10,
          inclusion: 0,
        },
      },
      {
        questionId: q2.id,
        label: "Serveur local auto-hébergé au sein de l'établissement ou de la collectivité",
        value: 'self_hosted',
        impactScores: {
          sovereignty: 20,
          durability: 5,
        },
      },
    ])

    await Recommendation.create({
      questionOptionId: q2Options[0].id,
      title: 'Alerte Souveraineté : Vos données sous juridiction étrangère',
      description:
        'Vos données sont soumises au Cloud Act américain. Les autorités US peuvent y accéder sans votre consentement. Reprenez le contrôle avec un hébergement souverain.',
      actionLabel: 'Simuler une migration vers FerrisCloud',
      actionUrl: '/simulation/ferris-cloud',
      priority: 20,
    })

    // 4. Question 3 : Identité Numérique
    const q3 = await Question.create({
      categoryId: sovereignty.id,
      content:
        "Quel système d'authentification est utilisé pour accéder aux services numériques de l'école ?",
      order: 3,
      isActive: true,
    })

    const q3Options = await QuestionOption.createMany([
      {
        questionId: q3.id,
        label: 'Comptes Google (Sign in with Google) ou Microsoft Azure AD',
        value: 'gafam_auth',
        impactScores: {
          sovereignty: -20,
          inclusion: -10,
        },
      },
      {
        questionId: q3.id,
        label: 'Comptes locaux gérés manuellement (un mot de passe par logiciel)',
        value: 'local_accounts',
        impactScores: {
          sovereignty: 5,
          inclusion: -15,
        },
      },
      {
        questionId: q3.id,
        label: 'SSO Académique ou solution Open Source centralisée (Keycloak/EduConnect)',
        value: 'sso_sovereign',
        impactScores: {
          sovereignty: 15,
          inclusion: 15,
        },
      },
    ])

    await Recommendation.createMany([
      {
        questionOptionId: q3Options[0].id,
        title: 'Dépendance critique : Identité numérique capturée',
        description:
          "Vous offrez l'identité de vos élèves aux GAFAM. En cas de coupure de service ou de changement de politique, vous perdez l'accès à vos outils. Reprenez le contrôle avec une solution souveraine.",
        actionLabel: 'Découvrir FerrisKey (Keycloak souverain)',
        actionUrl: '/simulation/ferris-key',
        priority: 25,
      },
      {
        questionOptionId: q3Options[1].id,
        title: 'Complexité inutile pour les utilisateurs',
        description:
          "La gestion manuelle des comptes est fastidieuse et source d'erreurs. Centralisez vos identités avec une solution souveraine comme Keycloak pour simplifier la vie de tous.",
        actionLabel: 'Voir comment simplifier avec le SSO',
        actionUrl: '/simulation/ferris-key',
        priority: 10,
      },
    ])

    // 5. Question 4 : Logiciels & Ressources
    const q4 = await Question.create({
      categoryId: inclusion.id,
      content: 'Quels outils bureautiques sont priorisés pour les travaux des élèves ?',
      order: 4,
      isActive: true,
    })

    const q4Options = await QuestionOption.createMany([
      {
        questionId: q4.id,
        label: 'Suite propriétaire payante (Microsoft Office 365)',
        value: 'proprietary_paid',
        impactScores: {
          inclusion: -10,
          sovereignty: -10,
          sobriety: -5,
        },
      },
      {
        questionId: q4.id,
        label: 'Outils en ligne gratuits avec publicité ou collecte de données',
        value: 'free_with_tracking',
        impactScores: {
          sovereignty: -15,
          inclusion: -5,
        },
      },
      {
        questionId: q4.id,
        label: 'Logiciels Libres et formats ouverts (LibreOffice, OnlyOffice, ODT, PDF)',
        value: 'open_source',
        impactScores: {
          inclusion: 20,
          sovereignty: 10,
        },
      },
    ])

    await Recommendation.createMany([
      {
        questionOptionId: q4Options[0].id,
        title: 'Coût élevé et dépendance propriétaire',
        description:
          'Les licences coûtent cher et vous enferment dans un écosystème propriétaire. Passez aux solutions libres (LibreOffice) ou collaboratives (OnlyOffice/CryptPad) pour économiser et gagner en autonomie.',
        actionLabel: 'Découvrir les alternatives libres',
        actionUrl: 'https://nird.forge.apps.education.fr/',
        priority: 8,
      },
      {
        questionOptionId: q4Options[1].id,
        title: "Si c'est gratuit, c'est vous le produit",
        description:
          "Ces outils 'gratuits' collectent massivement les données de vos élèves pour les monétiser. Utilisez les outils de La Forge des Communs Numériques pour une vraie gratuité respectueuse.",
        actionLabel: 'Voir La Forge des Communs Numériques',
        actionUrl: 'https://forge.apps.education.fr/',
        priority: 12,
      },
    ])

    // 6. Question 5 : Écologie & Réemploi
    const q5 = await Question.create({
      categoryId: durability.id,
      content: "Quelle est la politique d'achat de nouveau matériel informatique ?",
      order: 5,
      isActive: true,
    })

    const q5Options = await QuestionOption.createMany([
      {
        questionId: q5.id,
        label: 'Achat exclusif de matériel neuf tous les 3-4 ans',
        value: 'buy_new_only',
        impactScores: {
          durability: -15,
          sobriety: -20,
        },
      },
      {
        questionId: q5.id,
        label: 'Mixte (Neuf pour les besoins spécifiques, reconditionné pour le standard)',
        value: 'mixed_approach',
        impactScores: {
          durability: 5,
          sobriety: 5,
        },
      },
      {
        questionId: q5.id,
        label: 'Priorité absolue au matériel reconditionné et à la réparabilité',
        value: 'refurbished_priority',
        impactScores: {
          durability: 25,
          sobriety: 20,
        },
      },
    ])

    await Recommendation.create({
      questionOptionId: q5Options[0].id,
      title: 'Impact carbone majeur de la fabrication',
      description:
        "L'extraction des matières premières et la fabrication représentent 80% de l'empreinte carbone d'un ordinateur. Privilégiez le réemploi ou le reconditionné pour diviser par 5 votre impact environnemental.",
      actionLabel: "Comprendre l'impact du numérique",
      actionUrl: 'https://nird.forge.apps.education.fr/',
      priority: 15,
    })

    console.log('✅ Seeder terminé : 5 questions créées avec leurs options et recommandations')
  }
}
