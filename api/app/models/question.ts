import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Category from '#models/category'
import QuestionOption from '#models/question_option'
import DiagnosticAnswer from '#models/diagnostic_answer'
import { ApiProperty } from '@foadonis/openapi/decorators'

export default class Question extends BaseModel {
  @ApiProperty({ description: 'Question ID (UUID)' })
  @column({ isPrimary: true })
  declare id: string

  @ApiProperty({ description: 'Category ID (UUID)' })
  @column()
  declare categoryId: string

  @ApiProperty({ description: 'Question content' })
  @column()
  declare content: string

  @ApiProperty({ description: 'Question order' })
  @column()
  declare order: number

  @ApiProperty({ description: 'Is question active' })
  @column()
  declare isActive: boolean

  @ApiProperty({ description: 'Creation date', type: 'string' })
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @ApiProperty({ description: 'Last update date', required: false, type: 'string' })
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @hasMany(() => QuestionOption)
  declare options: HasMany<typeof QuestionOption>

  @hasMany(() => DiagnosticAnswer)
  declare diagnosticAnswers: HasMany<typeof DiagnosticAnswer>

  @beforeCreate()
  static assignUuid(question: Question) {
    question.id = crypto.randomUUID()
  }
}
