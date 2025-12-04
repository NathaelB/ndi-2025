import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'recommendations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table
        .uuid('question_option_id')
        .notNullable()
        .references('id')
        .inTable('question_options')
        .onDelete('CASCADE')

      table.string('title').notNullable()
      table.text('description').notNullable()
      table.string('action_label').nullable()
      table.string('action_url').nullable()
      table.integer('priority').notNullable().defaultTo(0)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
