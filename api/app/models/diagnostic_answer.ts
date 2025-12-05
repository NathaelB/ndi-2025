import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Diagnostic from '#models/diagnostic'
import Question from '#models/question'
import QuestionOption from '#models/question_option'
import { ApiProperty } from '@foadonis/openapi/decorators'

export default class DiagnosticAnswer extends BaseModel {
  @ApiProperty({ description: 'Answer ID (UUID)' })
  @column({ isPrimary: true })
  declare id: string

  @ApiProperty({ description: 'Diagnostic ID (UUID)' })
  @column()
  declare diagnosticId: string

  @ApiProperty({ description: 'Question ID (UUID)' })
  @column()
  declare questionId: string

  @ApiProperty({ description: 'Question Option ID (UUID)' })
  @column()
  declare questionOptionId: string

  @ApiProperty({ description: 'Creation date', type: 'string' })
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @ApiProperty({ description: 'Last update date', required: false, type: 'string' })
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
