import type { HttpContext } from '@adonisjs/core/http'
import QuestionsService from '#services/questions_service'
import { inject } from '@adonisjs/core'
import { ApiOperation, ApiResponse } from '@foadonis/openapi/decorators'
import Question from '#models/question'
import { CategoryWithQuestionsResponse } from '#responses/category_with_questions_response'
import { CategoriesWithQuestionsResponse } from '#responses/categories_with_questions_response'

@inject()
export default class QuestionsController {
  constructor(protected questionsService: QuestionsService) {}

  /**
   * GET /questions
   * Récupère toutes les questions actives avec leurs options (sans les scores)
   */
  @ApiOperation({ summary: 'Get all active questions with their options (without scores)' })
  @ApiResponse({ type: [Question] })
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)

    const questions = await this.questionsService.getAllQuestions(page, limit)
    const formattedQuestions = this.questionsService.formatQuestions(questions.all())

    return response.ok({
      data: formattedQuestions,
      meta: questions.getMeta(),
    })
  }

  /**
   * GET /questions/:id
   * Récupère une question spécifique avec ses options (sans les scores)
   */
  @ApiOperation({ summary: 'Get a specific question with its options (without scores)' })
  @ApiResponse({ type: Question })
  async show({ params, response }: HttpContext) {
    const question = await this.questionsService.getQuestionById(params.id)
    const formattedQuestion = this.questionsService.formatQuestion(question)

    return response.ok({
      data: formattedQuestion,
    })
  }

  /**
   * GET /categories/:categoryId/questions
   * Récupère toutes les questions d'une catégorie (sans les scores)
   */
  @ApiOperation({ summary: 'Get all questions for a category (without scores)' })
  @ApiResponse({ type: CategoryWithQuestionsResponse })
  async byCategory({ params, request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)

    const { category, questions } = await this.questionsService.getQuestionsByCategory(
      params.categoryId,
      page,
      limit
    )

    const formattedQuestions = questions.all().map((question) => ({
      id: question.id,
      content: question.content,
      order: question.order,
      options: question.options.map((option) => ({
        id: option.id,
        label: option.label,
        value: option.value,
      })),
    }))

    return response.ok({
      data: {
        category: {
          id: category.id,
          slug: category.slug,
          label: category.label,
          color: category.color,
        },
        questions: formattedQuestions,
      },
      meta: questions.getMeta(),
    })
  }

  /**
   * GET /categories
   * Récupère toutes les catégories avec leurs questions (sans les scores)
   */
  @ApiOperation({ summary: 'Get all categories with their questions (without scores)' })
  @ApiResponse({ type: CategoriesWithQuestionsResponse })
  async categoriesWithQuestions({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)

    const categories = await this.questionsService.getCategoriesWithQuestions(page, limit)
    const formattedCategories = categories
      .all()
      .map((category) => this.questionsService.formatCategory(category))

    return response.ok({
      data: formattedCategories,
      meta: categories.getMeta(),
    })
  }
}
