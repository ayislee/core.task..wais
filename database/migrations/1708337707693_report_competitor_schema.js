'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReportCompetitorSchema extends Schema {
  up () {
    this.create('report_competitor', (table) => {
      table.increments('report_competitor_id')
      table.integer('itinerary_id').unsigned().notNullable().references('itinerary_id').inTable('itinerary')
      table.integer('competitor_product_id').unsigned().notNullable().references('competitor_product_id').inTable('competitor_product')
      table.decimal('price',10,2).unsigned()
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('report_competitor')
  }
}

module.exports = ReportCompetitorSchema
