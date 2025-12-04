import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Category from '#models/category'
import QuestionOption from '#models/question_option'
import DiagnosticAnswer from '#models/diagnostic_answer'

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare categoryId: number

  @column()
  declare content: string

  @column()
  declare order: number

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @hasMany(() => QuestionOption)
  declare options: HasMany<typeof QuestionOption>

  @hasMany(() => DiagnosticAnswer)
  declare diagnosticAnswers: HasMany<typeof DiagnosticAnswer>
}
