'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReportExpireSchema extends Schema {
  up () {
    this.create('report_expire', (table) => {
      table.increments('report_expire_id')
      table.integer('itinerary_id').unsigned().notNullable().references('itinerary_id').inTable('itinerary')
      table.integer('product_id').unsigned().notNullable().references('product_id').inTable('product')
      table.integer('quantity')
      table.datetime('expire_date')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('report_expire')
  }
}

module.exports = ReportExpireSchema
