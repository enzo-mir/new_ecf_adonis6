import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'desserts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.integer('price').notNullable()
    })
    this.defer(async (db) => {
      await db.rawQuery(
        "INSERT INTO `desserts` (`id`, `name`, `description`, `price`) VALUES(1, 'mousse au chocolat', 'mousse au chocolat praliné des produits locaux', 6),(2, 'café gourmand', 'café accompagné de une boule de glace a la vanille', 8),(3, 'tarte tatin', 'tarte tatin aux pommes onctueuses', 7),(4, 'crème brûlée', 'crème brûlée caramélisée', 8)"
      )
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
