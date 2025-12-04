import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import DiagnosticAnswer from '#models/diagnostic_answer'

export interface FinalScore {
  global: number
  sovereignty?: number
  sobriety?: number
  durability?: number
  inclusion?: number
  [key: string]: number | undefined
}

export default class Diagnostic extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userId: string

  @column({
    prepare: (value: FinalScore | null) => (value ? JSON.stringify(value) : null),
    consume: (value: string | null) => (value ? (JSON.parse(value) as FinalScore) : null),
  })
  declare finalScore: FinalScore | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => DiagnosticAnswer)
  declare answers: HasMany<typeof DiagnosticAnswer>

  @beforeCreate()
  static assignUuid(diagnostic: Diagnostic) {
    diagnostic.id = crypto.randomUUID()
  }
}
