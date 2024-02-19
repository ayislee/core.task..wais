'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReportPriceSchema extends Schema {
  up () {
    this.create('report_price', (table) => {
      table.increments('report_price')
      table.integer('itinerary_id').unsigned().notNullable().references('itinerary_id').inTable('itinerary')
      table.integer('product_id').unsigned().notNullable().references('product_id').inTable('product')
      table.decimal('price',10,2).unsigned()
      table.enum('status',['in_stock','out_stock'])
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('report_price')
  }
}

module.exports = ReportPriceSchema
