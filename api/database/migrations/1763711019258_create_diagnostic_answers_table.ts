import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'diagnostic_answers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('diagnostic_id').notNullable().references('id').inTable('diagnostics').onDelete('CASCADE')

      table.uuid('question_id').notNullable().references('id').inTable('questions').onDelete('CASCADE')

      table
        .uuid('question_option_id')
        .notNullable()
        .references('id')
        .inTable('question_options')
        .onDelete('CASCADE')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      // Contrainte unique pour éviter les doublons de réponses
      table.unique(['diagnostic_id', 'question_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
