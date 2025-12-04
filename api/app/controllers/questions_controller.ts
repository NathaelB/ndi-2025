import type { HttpContext } from '@adonisjs/core/http'
import Question from '#models/question'
import Category from '#models/category'

export default class QuestionsController {
  /**
   * GET /questions
   * Récupère toutes les questions actives avec leurs options (sans les scores)
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)

    const questions = await Question.query()
      .where('isActive', true)
      .preload('category')
      .preload('options')
      .orderBy('order', 'asc')
      .paginate(page, limit)

    // Formatter les données pour exclure les scores
    const formattedQuestions = questions.all().map((question) => ({
      id: question.id,
      content: question.content,
      order: question.order,
      category: {
        id: question.category.id,
        slug: question.category.slug,
        label: question.category.label,
        color: question.category.color,
      },
      options: question.options.map((option) => ({
        id: option.id,
        label: option.label,
        value: option.value,
        // On n'inclut pas impactScores pour éviter la triche
      })),
    }))

    return response.ok({
      data: formattedQuestions,
      meta: questions.getMeta(),
    })
  }

  /**
   * GET /questions/:id
   * Récupère une question spécifique avec ses options (sans les scores)
   */
  async show({ params, response }: HttpContext) {
    const question = await Question.query()
      .where('id', params.id)
      .where('isActive', true)
      .preload('category')
      .preload('options')
      .firstOrFail()

    // Formatter les données pour exclure les scores
    const formattedQuestion = {
      id: question.id,
      content: question.content,
      order: question.order,
      category: {
        id: question.category.id,
        slug: question.category.slug,
        label: question.category.label,
        color: question.category.color,
      },
      options: question.options.map((option) => ({
        id: option.id,
        label: option.label,
        value: option.value,
        // On n'inclut pas impactScores pour éviter la triche
      })),
    }

    return response.ok({
      data: formattedQuestion,
    })
  }

  /**
   * GET /categories/:categoryId/questions
   * Récupère toutes les questions d'une catégorie (sans les scores)
   */
  async byCategory({ params, request, response }: HttpContext) {
    const category = await Category.findOrFail(params.categoryId)
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)

    const questions = await Question.query()
      .where('categoryId', category.id)
      .where('isActive', true)
      .preload('options')
      .orderBy('order', 'asc')
      .paginate(page, limit)

    // Formatter les données pour exclure les scores
    const formattedQuestions = questions.all().map((question) => ({
      id: question.id,
      content: question.content,
      order: question.order,
      options: question.options.map((option) => ({
        id: option.id,
        label: option.label,
        value: option.value,
        // On n'inclut pas impactScores pour éviter la triche
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
  async categoriesWithQuestions({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)

    const categories = await Category.query()
      .preload('questions', (query) => {
        query.where('isActive', true).preload('options').orderBy('order', 'asc')
      })
      .orderBy('label', 'asc')
      .paginate(page, limit)

    // Formatter les données pour exclure les scores
    const formattedCategories = categories.all().map((category) => ({
      id: category.id,
      slug: category.slug,
      label: category.label,
      color: category.color,
      questions: category.questions.map((question) => ({
        id: question.id,
        content: question.content,
        order: question.order,
        options: question.options.map((option) => ({
          id: option.id,
          label: option.label,
          value: option.value,
          // On n'inclut pas impactScores pour éviter la triche
        })),
      })),
    }))

    return response.ok({
      data: formattedCategories,
      meta: categories.getMeta(),
    })
  }
}
