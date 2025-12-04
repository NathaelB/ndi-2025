import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'question_options'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table
        .integer('question_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('questions')
        .onDelete('CASCADE')

      table.string('label').notNullable()
      table.string('value', 100).notNullable()
      table.jsonb('impact_scores').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
