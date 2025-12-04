import Diagnostic, { type FinalScore } from '#models/diagnostic'
import User from '#models/user'

export default class DiagnosticsService {
  /**
   * Récupère tous les diagnostics avec pagination et filtrage optionnel par utilisateur
   */
  async getAllDiagnostics(page: number = 1, limit: number = 20, userId?: string) {
    const query = Diagnostic.query()
      .preload('user')
      .preload('answers', (answersQuery) => {
        answersQuery.preload('question').preload('questionOption')
      })
      .orderBy('createdAt', 'desc')

    // Filtrer par utilisateur si spécifié
    if (userId) {
      query.where('userId', userId)
    }

    const diagnostics = await query.paginate(page, limit)
    return diagnostics
  }

  /**
   * Crée un nouveau diagnostic pour un utilisateur
   */
  async createDiagnostic(userId: string) {
    // Vérifier que l'utilisateur existe
    const user = await User.findOrFail(userId)

    // Créer le diagnostic
    const diagnostic = await Diagnostic.create({
      userId: user.id,
      finalScore: null, // Sera calculé plus tard
    })

    await diagnostic.load('user')
    return diagnostic
  }

  /**
   * Récupère un diagnostic par ID avec toutes ses réponses
   */
  async getDiagnosticById(id: string) {
    const diagnostic = await Diagnostic.query()
      .where('id', id)
      .preload('user')
      .preload('answers', (answersQuery) => {
        answersQuery
          .preload('question', (questionQuery) => {
            questionQuery.preload('category')
          })
          .preload('questionOption')
          .orderBy('createdAt', 'asc')
      })
      .firstOrFail()

    return diagnostic
  }

  /**
   * Met à jour le score final d'un diagnostic
   */
  async finalizeDiagnostic(id: string, finalScore: FinalScore) {
    const diagnostic = await Diagnostic.findOrFail(id)

    diagnostic.finalScore = finalScore
    await diagnostic.save()

    await diagnostic.load('user')
    await diagnostic.load('answers')

    return diagnostic
  }

  /**
   * Supprime un diagnostic
   */
  async deleteDiagnostic(id: string) {
    const diagnostic = await Diagnostic.findOrFail(id)
    await diagnostic.delete()
    return diagnostic
  }

  /**
   * Récupère tous les diagnostics d'un utilisateur
   */
  async getDiagnosticsByUser(userId: string, page: number = 1, limit: number = 20) {
    const user = await User.findOrFail(userId)

    const diagnostics = await Diagnostic.query()
      .where('userId', user.id)
      .preload('answers', (answersQuery) => {
        answersQuery.preload('question').preload('questionOption')
      })
      .orderBy('createdAt', 'desc')
      .paginate(page, limit)

    return diagnostics
  }

  /**
   * Calcule automatiquement le score final basé sur les réponses
   */
  async calculateDiagnosticScore(id: string) {
    const diagnostic = await Diagnostic.query()
      .where('id', id)
      .preload('answers', (answersQuery) => {
        answersQuery.preload('questionOption')
      })
      .firstOrFail()

    // Calculer les scores par catégorie
    const scores = {
      sovereignty: 0,
      sobriety: 0,
      durability: 0,
      inclusion: 0,
    }

    let totalQuestions = 0

    for (const answer of diagnostic.answers) {
      const impactScores = answer.questionOption.impactScores

      if (!impactScores) continue

      if (impactScores.sovereignty !== undefined) {
        scores.sovereignty += impactScores.sovereignty
      }
      if (impactScores.sobriety !== undefined) {
        scores.sobriety += impactScores.sobriety
      }
      if (impactScores.durability !== undefined) {
        scores.durability += impactScores.durability
      }
      if (impactScores.inclusion !== undefined) {
        scores.inclusion += impactScores.inclusion
      }

      totalQuestions++
    }

    if (totalQuestions === 0) {
      throw new Error('No answers found to calculate score')
    }

    // Calculer le score global (moyenne des catégories)
    const global =
      (scores.sovereignty + scores.sobriety + scores.durability + scores.inclusion) /
      (totalQuestions * 4)

    const finalScore: FinalScore = {
      global: Math.round(global * 100) / 100,
      sovereignty: Math.round((scores.sovereignty / totalQuestions) * 100) / 100,
      sobriety: Math.round((scores.sobriety / totalQuestions) * 100) / 100,
      durability: Math.round((scores.durability / totalQuestions) * 100) / 100,
      inclusion: Math.round((scores.inclusion / totalQuestions) * 100) / 100,
    }

    diagnostic.finalScore = finalScore
    await diagnostic.save()

    await diagnostic.load('user')

    return diagnostic
  }
}
