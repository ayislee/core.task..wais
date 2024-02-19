'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PromoStoreSchema extends Schema {
  up () {
    this.create('promo_store', (table) => {
      table.increments('promo_store_id')
      table.integer('promo_id').unsigned().notNullable().references('promo_id').inTable('promo')
      table.integer('store_id').unsigned().notNullable().references('store_id').inTable('store')
      table.datetime('actual_start_date')
      table.datetime('actual_end_date')
      table.decimal('normal_price',10,2)
      table.decimal('promo_price',10,2)
      table.enum('additional_display',['0','1'])
      
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('promo_store')
  }
}

module.exports = PromoStoreSchema
