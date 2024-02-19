'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GiftSchema extends Schema {
  up () {
    this.create('gift', (table) => {
      table.increments('gift_id')
      table.integer('product_id').unsigned().notNullable().references('product_id').inTable('product')
      table.string('name')
      table.datetime('start_date')
      table.datetime('end_date')
      table.string('desc')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('gift')
  }
}

module.exports = GiftSchema
