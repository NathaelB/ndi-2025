import type { HttpContext } from '@adonisjs/core/http'
import DiagnosticAnswersService from '#services/diagnostic_answers_service'
import {
  createAnswerValidator,
  updateAnswerValidator,
  batchAnswersValidator,
} from '#validators/diagnostic_answer'

export default class DiagnosticAnswersController {
  private answersService = new DiagnosticAnswersService()

  /**
   * GET /diagnostics/:diagnosticId/answers
   * Récupère toutes les réponses d'un diagnostic
   */
  async index({ params, request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 50)

    const answers = await this.answersService.getAnswersByDiagnostic(
      params.diagnosticId,
      page,
      limit
    )

    return response.ok({
      data: answers.all(),
      meta: answers.getMeta(),
    })
  }

  /**
   * POST /diagnostics/:diagnosticId/answers
   * Crée une nouvelle réponse pour un diagnostic
   */
  async store({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(createAnswerValidator)

    const { answer, isUpdate } = await this.answersService.createOrUpdateAnswer(
      params.diagnosticId,
      payload
    )

    if (isUpdate) {
      return response.ok({
        data: answer,
        message: 'Answer updated successfully',
      })
    }

    return response.created({
      data: answer,
      message: 'Answer created successfully',
    })
  }

  /**
   * GET /answers/:id
   * Récupère une réponse spécifique
   */
  async show({ params, response }: HttpContext) {
    const answer = await this.answersService.getAnswerById(params.id)

    return response.ok({
      data: answer,
    })
  }

  /**
   * PUT/PATCH /answers/:id
   * Met à jour une réponse existante
   */
  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(updateAnswerValidator)
    const answer = await this.answersService.updateAnswer(params.id, payload)

    return response.ok({
      data: answer,
      message: 'Answer updated successfully',
    })
  }

  /**
   * DELETE /answers/:id
   * Supprime une réponse
   */
  async destroy({ params, response }: HttpContext) {
    await this.answersService.deleteAnswer(params.id)

    return response.ok({
      message: 'Answer deleted successfully',
    })
  }

  /**
   * POST /diagnostics/:diagnosticId/answers/batch
   * Crée ou met à jour plusieurs réponses en une seule requête
   */
  async batchStore({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(batchAnswersValidator)
    const savedAnswers = await this.answersService.batchCreateOrUpdateAnswers(
      params.diagnosticId,
      payload.answers
    )

    return response.ok({
      data: savedAnswers,
      message: 'Answers saved successfully',
    })
  }
}
