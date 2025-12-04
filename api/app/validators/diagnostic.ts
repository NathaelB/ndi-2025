import vine from '@vinejs/vine'

/**
 * Validator pour la création d'un diagnostic
 */
export const createDiagnosticValidator = vine.compile(
  vine.object({
    userId: vine.string().uuid(),
  })
)

/**
 * Validator pour la mise à jour du score final
 */
export const updateFinalScoreValidator = vine.compile(
  vine.object({
    finalScore: vine.object({
      global: vine.number(),
      sovereignty: vine.number().optional(),
      sobriety: vine.number().optional(),
      durability: vine.number().optional(),
      inclusion: vine.number().optional(),
    }),
  })
)
