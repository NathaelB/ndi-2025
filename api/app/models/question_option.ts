import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Question from '#models/question'
import Recommendation from '#models/recommendation'
import DiagnosticAnswer from '#models/diagnostic_answer'

export interface ImpactScores {
  sovereignty?: number
  sobriety?: number
  durability?: number
  inclusion?: number
  [key: string]: number | undefined
}

export default class QuestionOption extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare questionId: string

  @column()
  declare label: string

  @column()
  declare value: string

  @column({
    prepare: (value: ImpactScores | null) => (value ? JSON.stringify(value) : null),
    consume: (value: string | ImpactScores | null) => {
      if (!value) return null
      if (typeof value === 'string') {
        try {
          return JSON.parse(value) as ImpactScores
        } catch {
          return null
        }
      }
      return value as ImpactScores
    },
  })
  declare impactScores: ImpactScores | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Question)
  declare question: BelongsTo<typeof Question>

  @hasMany(() => Recommendation)
  declare recommendations: HasMany<typeof Recommendation>

  @hasMany(() => DiagnosticAnswer)
  declare diagnosticAnswers: HasMany<typeof DiagnosticAnswer>

  @beforeCreate()
  static assignUuid(questionOption: QuestionOption) {
    questionOption.id = crypto.randomUUID()
  }
}
