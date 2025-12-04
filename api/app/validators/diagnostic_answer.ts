import vine from '@vinejs/vine'

/**
 * Validator pour la création d'une réponse
 */
export const createAnswerValidator = vine.compile(
  vine.object({
    diagnosticId: vine.string().uuid(),
    questionId: vine.string().uuid(),
    questionOptionId: vine.string().uuid(),
  })
)

/**
 * Validator pour la mise à jour d'une réponse
 */
export const updateAnswerValidator = vine.compile(
  vine.object({
    questionOptionId: vine.string().uuid(),
  })
)

/**
 * Validator pour la création/mise à jour en batch
 */
export const batchAnswersValidator = vine.compile(
  vine.object({
    answers: vine.array(
      vine.object({
        questionId: vine.string().uuid(),
        questionOptionId: vine.string().uuid(),
      })
    ),
  })
)
