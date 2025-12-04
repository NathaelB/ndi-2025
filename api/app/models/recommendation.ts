import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import QuestionOption from '#models/question_option'
import { ApiProperty } from '@foadonis/openapi/decorators'

export default class Recommendation extends BaseModel {
  @ApiProperty({ description: 'Recommendation ID (UUID)' })
  @column({ isPrimary: true })
  declare id: string

  @ApiProperty({ description: 'Question Option ID (UUID)' })
  @column()
  declare questionOptionId: string

  @ApiProperty({ description: 'Recommendation title' })
  @column()
  declare title: string

  @ApiProperty({ description: 'Recommendation description' })
  @column()
  declare description: string

  @ApiProperty({ description: 'Action label', required: false })
  @column()
  declare actionLabel: string | null

  @ApiProperty({ description: 'Action URL', required: false })
  @column()
  declare actionUrl: string | null

  @ApiProperty({ description: 'Priority level' })
  @column()
  declare priority: number

  @ApiProperty({ description: 'Creation date', type: 'string' })
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @ApiProperty({ description: 'Last update date', required: false, type: 'string' })
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => QuestionOption)
  declare questionOption: BelongsTo<typeof QuestionOption>

  @beforeCreate()
  static assignUuid(recommendation: Recommendation) {
    recommendation.id = crypto.randomUUID()
  }
}
