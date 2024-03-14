import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reservations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('guests').defaultTo(1).notNullable()
      table.string('date').notNullable()
      table.string('moment').notNullable()
      table.string('hours').notNullable()
      table.string('name').notNullable()
      table.string('email').notNullable()
      table.string('alergy').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
