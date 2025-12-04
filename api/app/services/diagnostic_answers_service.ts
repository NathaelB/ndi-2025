import DiagnosticAnswer from '#models/diagnostic_answer'
import Diagnostic from '#models/diagnostic'
import Question from '#models/question'
import QuestionOption from '#models/question_option'

interface CreateAnswerData {
  diagnosticId: string
  questionId: string
  questionOptionId: string
}

interface UpdateAnswerData {
  questionOptionId: string
}

interface BatchAnswerData {
  questionId: string
  questionOptionId: string
}

export default class DiagnosticAnswersService {
  /**
   * Récupère toutes les réponses d'un diagnostic avec pagination
   */
  async getAnswersByDiagnostic(diagnosticId: string, page: number = 1, limit: number = 50) {
    const diagnostic = await Diagnostic.findOrFail(diagnosticId)

    const answers = await DiagnosticAnswer.query()
      .where('diagnosticId', diagnostic.id)
      .preload('question', (query) => {
        query.preload('category')
      })
      .preload('questionOption')
      .orderBy('createdAt', 'asc')
      .paginate(page, limit)

    return answers
  }

  /**
   * Récupère une réponse spécifique par ID
   */
  async getAnswerById(id: string) {
    const answer = await DiagnosticAnswer.query()
      .where('id', id)
      .preload('question', (query) => {
        query.preload('category')
      })
      .preload('questionOption')
      .preload('diagnostic')
      .firstOrFail()

    return answer
  }

  /**
   * Crée ou met à jour une réponse pour un diagnostic
   */
  async createOrUpdateAnswer(diagnosticId: string, data: CreateAnswerData) {
    // Vérifier que le diagnostic existe et correspond
    const diagnostic = await Diagnostic.findOrFail(diagnosticId)
    if (diagnostic.id !== data.diagnosticId) {
      throw new Error('Diagnostic ID mismatch')
    }

    // Vérifier que la question existe
    const question = await Question.findOrFail(data.questionId)

    // Vérifier que l'option appartient à la question
    const questionOption = await QuestionOption.findOrFail(data.questionOptionId)
    if (questionOption.questionId !== question.id) {
      throw new Error('Question option does not belong to the specified question')
    }

    // Vérifier si une réponse existe déjà
    const existingAnswer = await DiagnosticAnswer.query()
      .where('diagnosticId', diagnostic.id)
      .where('questionId', question.id)
      .first()

    let answer: DiagnosticAnswer
    let isUpdate = false

    if (existingAnswer) {
      // Mettre à jour la réponse existante
      existingAnswer.questionOptionId = questionOption.id
      await existingAnswer.save()
      answer = existingAnswer
      isUpdate = true
    } else {
      // Créer une nouvelle réponse
      answer = await DiagnosticAnswer.create({
        diagnosticId: diagnostic.id,
        questionId: question.id,
        questionOptionId: questionOption.id,
      })
    }

    // Charger les relations
    await answer.load('question', (query) => {
      query.preload('category')
    })
    await answer.load('questionOption')

    return { answer, isUpdate }
  }

  /**
   * Met à jour une réponse existante
   */
  async updateAnswer(id: string, data: UpdateAnswerData) {
    const answer = await DiagnosticAnswer.findOrFail(id)

    // Vérifier que l'option appartient à la même question
    const questionOption = await QuestionOption.findOrFail(data.questionOptionId)
    if (questionOption.questionId !== answer.questionId) {
      throw new Error('Question option does not belong to the same question')
    }

    answer.questionOptionId = questionOption.id
    await answer.save()

    await answer.load('question', (query) => {
      query.preload('category')
    })
    await answer.load('questionOption')

    return answer
  }

  /**
   * Supprime une réponse
   */
  async deleteAnswer(id: string) {
    const answer = await DiagnosticAnswer.findOrFail(id)
    await answer.delete()
    return answer
  }

  /**
   * Crée ou met à jour plusieurs réponses en batch
   */
  async batchCreateOrUpdateAnswers(diagnosticId: string, answers: BatchAnswerData[]) {
    const diagnostic = await Diagnostic.findOrFail(diagnosticId)
    const savedAnswers: DiagnosticAnswer[] = []

    for (const answerData of answers) {
      // Vérifier que la question existe
      const question = await Question.findOrFail(answerData.questionId)

      // Vérifier que l'option appartient à la question
      const questionOption = await QuestionOption.findOrFail(answerData.questionOptionId)
      if (questionOption.questionId !== question.id) {
        throw new Error(
          `Question option ${questionOption.id} does not belong to question ${question.id}`
        )
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

    return savedAnswers
  }
}
