'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductPriceSchema extends Schema {
  up () {
    this.create('product_price', (table) => {
      table.increments('product_price_id')
      table.integer('product_id').unsigned().notNullable().references('product_id').inTable('product')
      table.decimal('price',10,2)
      table.datetime('start_date')
      table.integer('store_category_id').unsigned().notNullable().references('store_category_id').inTable('store_category')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('product_price')
  }
}

module.exports = ProductPriceSchema
