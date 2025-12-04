import type { HttpContext } from '@adonisjs/core/http'
import DiagnosticsService from '#services/diagnostics_service'
import { createDiagnosticValidator, updateFinalScoreValidator } from '#validators/diagnostic'
import { inject } from '@adonisjs/core'
import { ApiOperation, ApiResponse } from '@foadonis/openapi/decorators'
import Diagnostic from '#models/diagnostic'

@inject()
export default class DiagnosticsController {
  constructor(protected diagnosticsService: DiagnosticsService) {}

  /**
   * GET /diagnostics
   * Récupère tous les diagnostics (avec pagination)
   */
  @ApiOperation({ summary: 'List all diagnostics with pagination' })
  @ApiResponse({ type: () => [Diagnostic] })
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
  @ApiOperation({ summary: 'Create a new diagnostic for a user' })
  @ApiResponse({ type: () => Diagnostic })
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
  @ApiOperation({ summary: 'Get a specific diagnostic with all its answers' })
  @ApiResponse({ type: () => Diagnostic })
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
  @ApiOperation({ summary: 'Update the final score of a diagnostic' })
  @ApiResponse({ type: () => Diagnostic })
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
  @ApiOperation({ summary: 'Delete a diagnostic and all its answers' })
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
  @ApiOperation({ summary: 'Get all diagnostics for a specific user' })
  @ApiResponse({ type: () => [Diagnostic] })
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
  @ApiOperation({ summary: 'Calculate the final score based on answers' })
  @ApiResponse({ type: () => Diagnostic })
  async calculateScore({ params, response }: HttpContext) {
    const diagnostic = await this.diagnosticsService.calculateDiagnosticScore(params.id)

    return response.ok({
      data: diagnostic,
      message: 'Score calculated successfully',
    })
  }
}
