'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GiftTrackingSchema extends Schema {
  up () {
    this.create('gift_tracking', (table) => {
      table.increments('gift_tracking_id')
      table.integer('gift_store_id').unsigned().notNullable().references('gift_store_id').inTable('gift_store')
      table.integer('itinerary_id').unsigned().notNullable().references('itinerary_id').inTable('itinerary')
      table.string('photo')
      table.integer('last_stock').unsigned()
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('gift_tracking')
  }
}

module.exports = GiftTrackingSchema
