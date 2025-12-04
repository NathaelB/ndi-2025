import Question from '#models/question'
import Category from '#models/category'

export default class QuestionsService {
  /**
   * Récupère toutes les questions actives avec pagination
   */
  async getAllQuestions(page: number = 1, limit: number = 20) {
    const questions = await Question.query()
      .where('isActive', true)
      .preload('category')
      .preload('options')
      .orderBy('order', 'asc')
      .paginate(page, limit)

    return questions
  }

  /**
   * Récupère une question spécifique par ID
   */
  async getQuestionById(id: string) {
    const question = await Question.query()
      .where('id', id)
      .where('isActive', true)
      .preload('category')
      .preload('options')
      .firstOrFail()

    return question
  }

  /**
   * Récupère toutes les questions d'une catégorie avec pagination
   */
  async getQuestionsByCategory(categoryId: string, page: number = 1, limit: number = 20) {
    const category = await Category.findOrFail(categoryId)

    const questions = await Question.query()
      .where('categoryId', category.id)
      .where('isActive', true)
      .preload('options')
      .orderBy('order', 'asc')
      .paginate(page, limit)

    return { category, questions }
  }

  /**
   * Récupère toutes les catégories avec leurs questions
   */
  async getCategoriesWithQuestions(page: number = 1, limit: number = 20) {
    const categories = await Category.query()
      .preload('questions', (query) => {
        query.where('isActive', true).preload('options').orderBy('order', 'asc')
      })
      .orderBy('label', 'asc')
      .paginate(page, limit)

    return categories
  }

  /**
   * Formate une question en excluant les scores
   */
  formatQuestion(question: Question) {
    return {
      id: question.id,
      content: question.content,
      order: question.order,
      category: question.category
        ? {
            id: question.category.id,
            slug: question.category.slug,
            label: question.category.label,
            color: question.category.color,
          }
        : undefined,
      options: question.options.map((option) => ({
        id: option.id,
        label: option.label,
        value: option.value,
        // On n'inclut pas impactScores pour éviter la triche
      })),
    }
  }

  /**
   * Formate une liste de questions en excluant les scores
   */
  formatQuestions(questions: Question[]) {
    return questions.map((question) => this.formatQuestion(question))
  }

  /**
   * Formate une catégorie avec ses questions en excluant les scores
   */
  formatCategory(category: Category) {
    return {
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
    }
  }
}
