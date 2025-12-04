import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Question from '#models/question'
import { ApiProperty } from '@foadonis/openapi/decorators'

export default class Category extends BaseModel {
  @ApiProperty({ description: 'Category ID (UUID)' })
  @column({ isPrimary: true })
  declare id: string

  @ApiProperty({ description: 'Category slug' })
  @column()
  declare slug: string

  @ApiProperty({ description: 'Category label' })
  @column()
  declare label: string

  @ApiProperty({ description: 'Category color' })
  @column()
  declare color: string

  @ApiProperty({ description: 'Creation date', type: 'string' })
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @ApiProperty({ description: 'Last update date', required: false, type: 'string' })
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Question)
  declare questions: HasMany<typeof Question>

  @beforeCreate()
  static assignUuid(category: Category) {
    category.id = crypto.randomUUID()
  }
}
