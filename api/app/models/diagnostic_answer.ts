import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Diagnostic from '#models/diagnostic'
import Question from '#models/question'
import QuestionOption from '#models/question_option'

export default class DiagnosticAnswer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare diagnosticId: number

  @column()
  declare questionId: number

  @column()
  declare questionOptionId: number

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
}
