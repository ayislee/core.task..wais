'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PromoTrackingSchema extends Schema {
  up () {
    this.create('promo_tracking', (table) => {
      table.increments('promo_tracking_id')
      table.integer('promo_store_id').unsigned().notNullable().references('promo_store_id').inTable('promo_store')
      table.integer('itinerary_id').unsigned().notNullable().references('itinerary_id').inTable('itinerary')
      table.integer('promo_additional_id').unsigned().notNullable().references('promo_additional_id').inTable('promo_additional')
      table.integer('posm_type_id').unsigned().notNullable().references('posm_type_id').inTable('posm_type')
      table.datetime('actual_start_date')
      table.datetime('actual_end_date')
      table.string('photo')
      table.enum('is_stock',['0','1'])
      table.enum('is_additional_display',['0','1'])
      table.enum('is_posm',['0','1'])      
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('promo_tracking')
  }
}

module.exports = PromoTrackingSchema
