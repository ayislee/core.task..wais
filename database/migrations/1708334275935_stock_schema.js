'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StockSchema extends Schema {
  up () {
    this.create('stock', (table) => {
      table.increments('stock_id')
      table.integer('product_id').unsigned().notNullable().references('product_id').inTable('product')
      table.integer('itinerary_id').unsigned().notNullable().references('itinerary_id').inTable('itinerary')
      table.integer('initial_stock').unsigned()
      table.integer('sell_in').unsigned()
      table.integer('sell_out').unsigned()
      table.integer('last_stock').unsigned()
      table.enum('status',['active','not_active','not_listing'])
      table.datetime('inactive_date')
      table.string('reason')

      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('stock')
  }
}

module.exports = StockSchema
