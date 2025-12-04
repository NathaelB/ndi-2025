import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Diagnostic from '#models/diagnostic'
import Question from '#models/question'
import QuestionOption from '#models/question_option'

export default class DiagnosticAnswer extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare diagnosticId: string

  @column()
  declare questionId: string

  @column()
  declare questionOptionId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Diagnostic)
  declare diagnostic: BelongsTo<typeof Diagnostic>

  @belongsTo(() => Question)
  declare question: BelongsTo<typeof Question>

  @belongsTo(() => QuestionOption)
  declare questionOption: BelongsTo<typeof QuestionOption>

  @beforeCreate()
  static assignUuid(answer: DiagnosticAnswer) {
    answer.id = crypto.randomUUID()
  }
}
