'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItinerarySchema extends Schema {
  up () {
    this.create('itinerary', (table) => {
      table.increments('itinerary_id')
      table.integer('store_id').unsigned().notNullable().references('store_id').inTable('store')
      table.integer('employee_id').unsigned().notNullable().references('employee_id').inTable('employee')
      table.datetime('activity_date')
      table.datetime('checkin_date')
      table.datetime('checkout_date')
      table.string('photo')
      table.float('lat')
      table.float('long')
      table.text('note')
      table.enum('is_route',['0','1']).defaultTo('1')
      table.timestamps()
      table.datetime('deleted_at')
      table.enum('status',['waiting','approve','reject'])
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('itinerary')
  }
}

module.exports = ItinerarySchema
