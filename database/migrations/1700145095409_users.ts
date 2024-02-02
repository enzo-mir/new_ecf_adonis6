import Hash from '@adonisjs/core/services/hash'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.integer('guests').defaultTo(1).notNullable()
      table.string('alergy').notNullable()
      table.boolean('role').defaultTo(0).notNullable()
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        {
          id: null,
          name: '',
          email: 'admin@admin.com',
          password: await Hash.make('admin'),
          guests: 0,
          alergy: '',
          role: 1,
        },
        {
          id: null,
          name: 'testName',
          email: 'test@test.com',
          password: await Hash.make('test'),
          guests: 1,
          alergy: 'tomates',
          role: 0,
        },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
