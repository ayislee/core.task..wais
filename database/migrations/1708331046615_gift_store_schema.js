'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GiftStoreSchema extends Schema {
  up () {
    this.create('gift_store', (table) => {
      table.increments('gift_store_id')
      table.integer('store_id').unsigned().notNullable().references('store_id').inTable('store')
      table.integer('gift_id').unsigned().notNullable().references('gift_id').inTable('gift')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('gift_store')
  }
}

module.exports = GiftStoreSchema
