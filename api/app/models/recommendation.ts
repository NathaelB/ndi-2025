import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import QuestionOption from '#models/question_option'

export default class Recommendation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare questionOptionId: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare actionLabel: string | null

  @column()
  declare actionUrl: string | null

  @column()
  declare priority: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => QuestionOption)
  declare questionOption: BelongsTo<typeof QuestionOption>
}
