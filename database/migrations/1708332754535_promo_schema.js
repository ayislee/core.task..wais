'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PromoSchema extends Schema {
  up () {
    this.create('promo', (table) => {
      table.increments('promo_id')
      table.integer('promo_type_id').unsigned().notNullable().references('promo_type_id').inTable('promo_type')
      table.integer('product_id').unsigned().notNullable().references('product_id').inTable('product')
      table.datetime('start_date')
      table.datetime('end_date')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('promo')
  }
}

module.exports = PromoSchema
