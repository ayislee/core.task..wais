'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReportGiftSchema extends Schema {
  up () {
    this.create('report_gift', (table) => {
      table.increments('report_gift_id')
      table.integer('itinerary_id').unsigned().notNullable().references('itinerary_id').inTable('itinerary')
      table.integer('gift_id').unsigned().notNullable().references('gift_id').inTable('gift')
      table.integer('topup')
      table.integer('last_stock')
      table.string('photo')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('report_gift')
  }
}

module.exports = ReportGiftSchema
