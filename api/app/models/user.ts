import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, beforeCreate } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Diagnostic from '#models/diagnostic'
import { ApiProperty } from '@foadonis/openapi/decorators'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @ApiProperty({ description: 'User ID (UUID)' })
  @column({ isPrimary: true })
  declare id: string

  @ApiProperty({ description: 'Full name', required: false })
  @column()
  declare fullName: string | null

  @ApiProperty({ description: 'Email address' })
  @column()
  declare email: string

  @ApiProperty({ description: 'Password (hidden in serialization)', required: false })
  @column({ serializeAs: null })
  declare password: string

  @ApiProperty({ description: 'Creation date', type: 'string' })
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @ApiProperty({ description: 'Last update date', required: false, type: 'string' })
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Diagnostic)
  declare diagnostics: HasMany<typeof Diagnostic>

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @beforeCreate()
  static assignUuid(user: User) {
    user.id = crypto.randomUUID()
  }
}
