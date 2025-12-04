import type { HttpContext } from '@adonisjs/core/http'
import DiagnosticsService from '#services/diagnostics_service'
import { createDiagnosticValidator, updateFinalScoreValidator } from '#validators/diagnostic'

export default class DiagnosticsController {
  private diagnosticsService = new DiagnosticsService()

  /**
   * GET /diagnostics
   * Récupère tous les diagnostics (avec pagination)
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)
    const userId = request.input('userId')

    const diagnostics = await this.diagnosticsService.getAllDiagnostics(page, limit, userId)

    return response.ok({
      data: diagnostics.all(),
      meta: diagnostics.getMeta(),
    })
  }

  /**
   * POST /diagnostics
   * Crée un nouveau diagnostic pour un utilisateur
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createDiagnosticValidator)
    const diagnostic = await this.diagnosticsService.createDiagnostic(payload.userId)

    return response.created({
      data: diagnostic,
      message: 'Diagnostic created successfully',
    })
  }

  /**
   * GET /diagnostics/:id
   * Récupère un diagnostic spécifique avec toutes ses réponses
   */
  async show({ params, response }: HttpContext) {
    const diagnostic = await this.diagnosticsService.getDiagnosticById(params.id)

    return response.ok({
      data: diagnostic,
    })
  }

  /**
   * PUT/PATCH /diagnostics/:id/finalize
   * Met à jour le score final d'un diagnostic
   */
  async finalize({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(updateFinalScoreValidator)
    const diagnostic = await this.diagnosticsService.finalizeDiagnostic(
      params.id,
      payload.finalScore
    )

    return response.ok({
      data: diagnostic,
      message: 'Diagnostic finalized successfully',
    })
  }

  /**
   * DELETE /diagnostics/:id
   * Supprime un diagnostic et toutes ses réponses
   */
  async destroy({ params, response }: HttpContext) {
    await this.diagnosticsService.deleteDiagnostic(params.id)

    return response.ok({
      message: 'Diagnostic deleted successfully',
    })
  }

  /**
   * GET /users/:userId/diagnostics
   * Récupère tous les diagnostics d'un utilisateur spécifique
   */
  async byUser({ params, request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)

    const diagnostics = await this.diagnosticsService.getDiagnosticsByUser(
      params.userId,
      page,
      limit
    )

    return response.ok({
      data: diagnostics.all(),
      meta: diagnostics.getMeta(),
    })
  }

  /**
   * POST /diagnostics/:id/calculate-score
   * Calcule automatiquement le score final basé sur les réponses
   */
  async calculateScore({ params, response }: HttpContext) {
    const diagnostic = await this.diagnosticsService.calculateDiagnosticScore(params.id)

    return response.ok({
      data: diagnostic,
      message: 'Score calculated successfully',
    })
  }
}
