import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Question from '#models/question'
import Recommendation from '#models/recommendation'
import DiagnosticAnswer from '#models/diagnostic_answer'
import { ApiProperty } from '@foadonis/openapi/decorators'

export interface ImpactScores {
  sovereignty?: number
  sobriety?: number
  durability?: number
  inclusion?: number
  [key: string]: number | undefined
}

export default class QuestionOption extends BaseModel {
  @ApiProperty({ description: 'Question Option ID (UUID)' })
  @column({ isPrimary: true })
  declare id: string

  @ApiProperty({ description: 'Question ID (UUID)' })
  @column()
  declare questionId: string

  @ApiProperty({ description: 'Option label' })
  @column()
  declare label: string

  @ApiProperty({ description: 'Option value' })
  @column()
  declare value: string

  @ApiProperty({ description: 'Impact scores object', required: false, type: 'object' })
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

  @ApiProperty({ description: 'Creation date', type: 'string' })
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @ApiProperty({ description: 'Last update date', required: false, type: 'string' })
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
