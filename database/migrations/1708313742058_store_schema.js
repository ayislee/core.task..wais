'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoreSchema extends Schema {
  up () {
    this.create('store', (table) => {
      table.increments('store_id')
      table.string('name')
      table.string('store_code').unique()
      table.string('store_category_desc')
      table.string('store_distribution_desc')
      table.string('store_owner')
      table.string('store_phone')
      table.integer('city_id')
      table.integer('district_id')
      table.string('remark')
      table.enum('is_close',['0','1']).defaultTo('1').notNullable()
      table.integer('timezone').notNullable().defaultTo(0)
      table.integer('store_sub_category_id').notNullable().unsigned().references('store_sub_category_id').inTable('store_sub_category')
      table.integer('dso_id').notNullable().unsigned().references('dso_id').inTable('dso')
      table.float('lat')
      table.float('long')
      table.float('alt_lat')
      table.float('alt_long')
      table.text('address')
      table.datetime('deleted_at')
      table.string('deleted_by')
      table.timestamps()
    })
  }

  down () {
    this.drop('store')
  }
}

module.exports = StoreSchema
