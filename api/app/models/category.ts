import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Question from '#models/question'
import { before } from 'node:test'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare slug: string

  @column()
  declare label: string

  @column()
  declare color: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Question)
  declare questions: HasMany<typeof Question>

  @beforeCreate()
  static assignUuid(category: Category) {
    category.id = crypto.randomUUID()
  }
}
