import type { HttpContext } from '@adonisjs/core/http'
import DiagnosticAnswer from '#models/diagnostic_answer'
import Diagnostic from '#models/diagnostic'
import Question from '#models/question'
import QuestionOption from '#models/question_option'
import { errors as vineErrors } from '@vinejs/vine'
import {
  createAnswerValidator,
  updateAnswerValidator,
  batchAnswersValidator,
} from '#validators/diagnostic_answer'

export default class DiagnosticAnswersController {
  /**
   * GET /diagnostics/:diagnosticId/answers
   * Récupère toutes les réponses d'un diagnostic
   */
  async index({ params, response }: HttpContext) {
    try {
      const diagnostic = await Diagnostic.findOrFail(params.diagnosticId)

      const answers = await DiagnosticAnswer.query()
        .where('diagnosticId', diagnostic.id)
        .preload('question', (query) => {
          query.preload('category')
        })
        .preload('questionOption')
        .orderBy('createdAt', 'asc')

      return response.ok({
        data: answers,
      })
    } catch (error) {
      return response.notFound({
        error: 'Diagnostic not found',
      })
    }
  }

  /**
   * POST /diagnostics/:diagnosticId/answers
   * Crée une nouvelle réponse pour un diagnostic
   */
  async store({ params, request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createAnswerValidator)

      // Vérifier que le diagnostic existe et correspond au paramètre
      const diagnostic = await Diagnostic.findOrFail(params.diagnosticId)
      if (diagnostic.id !== payload.diagnosticId) {
        return response.badRequest({
          error: 'Diagnostic ID mismatch',
        })
      }

      // Vérifier que la question existe
      const question = await Question.findOrFail(payload.questionId)

      // Vérifier que l'option de question existe et appartient à la question
      const questionOption = await QuestionOption.findOrFail(payload.questionOptionId)
      if (questionOption.questionId !== question.id) {
        return response.badRequest({
          error: 'Question option does not belong to the specified question',
        })
      }

      // Vérifier si une réponse existe déjà pour cette question dans ce diagnostic
      const existingAnswer = await DiagnosticAnswer.query()
        .where('diagnosticId', diagnostic.id)
        .where('questionId', question.id)
        .first()

      if (existingAnswer) {
        // Mettre à jour la réponse existante
        existingAnswer.questionOptionId = questionOption.id
        await existingAnswer.save()

        await existingAnswer.load('question', (query) => {
          query.preload('category')
        })
        await existingAnswer.load('questionOption')

        return response.ok({
          data: existingAnswer,
          message: 'Answer updated successfully',
        })
      }

      // Créer une nouvelle réponse
      const answer = await DiagnosticAnswer.create({
        diagnosticId: diagnostic.id,
        questionId: question.id,
        questionOptionId: questionOption.id,
      })

      await answer.load('question', (query) => {
        query.preload('category')
      })
      await answer.load('questionOption')

      return response.created({
        data: answer,
        message: 'Answer created successfully',
      })
    } catch (error) {
      if (error instanceof vineErrors.E_VALIDATION_ERROR) {
        return response.badRequest({
          errors: error.messages,
        })
      }

      return response.notFound({
        error: 'Resource not found',
      })
    }
  }

  /**
   * GET /answers/:id
   * Récupère une réponse spécifique
   */
  async show({ params, response }: HttpContext) {
    try {
      const answer = await DiagnosticAnswer.query()
        .where('id', params.id)
        .preload('question', (query) => {
          query.preload('category')
        })
        .preload('questionOption')
        .preload('diagnostic')
        .firstOrFail()

      return response.ok({
        data: answer,
      })
    } catch (error) {
      return response.notFound({
        error: 'Answer not found',
      })
    }
  }

  /**
   * PUT/PATCH /answers/:id
   * Met à jour une réponse existante
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const answer = await DiagnosticAnswer.findOrFail(params.id)
      const payload = await request.validateUsing(updateAnswerValidator)

      // Vérifier que l'option appartient à la même question
      const questionOption = await QuestionOption.findOrFail(payload.questionOptionId)
      if (questionOption.questionId !== answer.questionId) {
        return response.badRequest({
          error: 'Question option does not belong to the same question',
        })
      }

      answer.questionOptionId = questionOption.id
      await answer.save()

      await answer.load('question', (query) => {
        query.preload('category')
      })
      await answer.load('questionOption')

      return response.ok({
        data: answer,
        message: 'Answer updated successfully',
      })
    } catch (error) {
      if (error instanceof vineErrors.E_VALIDATION_ERROR) {
        return response.badRequest({
          errors: error.messages,
        })
      }

      return response.notFound({
        error: 'Answer not found',
      })
    }
  }

  /**
   * DELETE /answers/:id
   * Supprime une réponse
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const answer = await DiagnosticAnswer.findOrFail(params.id)
      await answer.delete()

      return response.ok({
        message: 'Answer deleted successfully',
      })
    } catch (error) {
      return response.notFound({
        error: 'Answer not found',
      })
    }
  }

  /**
   * POST /diagnostics/:diagnosticId/answers/batch
   * Crée ou met à jour plusieurs réponses en une seule requête
   */
  async batchStore({ params, request, response }: HttpContext) {
    try {
      const diagnostic = await Diagnostic.findOrFail(params.diagnosticId)
      const payload = await request.validateUsing(batchAnswersValidator)

      const savedAnswers = []

      for (const answerData of payload.answers) {
        // Vérifier que la question existe
        const question = await Question.findOrFail(answerData.questionId)

        // Vérifier que l'option appartient à la question
        const questionOption = await QuestionOption.findOrFail(answerData.questionOptionId)
        if (questionOption.questionId !== question.id) {
          return response.badRequest({
            error: `Question option ${questionOption.id} does not belong to question ${question.id}`,
          })
        }

        // Vérifier si une réponse existe déjà
        const existingAnswer = await DiagnosticAnswer.query()
          .where('diagnosticId', diagnostic.id)
          .where('questionId', question.id)
          .first()

        if (existingAnswer) {
          existingAnswer.questionOptionId = questionOption.id
          await existingAnswer.save()
          savedAnswers.push(existingAnswer)
        } else {
          const newAnswer = await DiagnosticAnswer.create({
            diagnosticId: diagnostic.id,
            questionId: question.id,
            questionOptionId: questionOption.id,
          })
          savedAnswers.push(newAnswer)
        }
      }

      // Charger les relations pour toutes les réponses
      for (const answer of savedAnswers) {
        await answer.load('question', (query) => {
          query.preload('category')
        })
        await answer.load('questionOption')
      }

      return response.ok({
        data: savedAnswers,
        message: 'Answers saved successfully',
      })
    } catch (error) {
      if (error instanceof vineErrors.E_VALIDATION_ERROR) {
        return response.badRequest({
          errors: error.messages,
        })
      }

      return response.notFound({
        error: 'Resource not found',
      })
    }
  }
}
