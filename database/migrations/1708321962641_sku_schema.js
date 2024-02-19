'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SkuSchema extends Schema {
  up () {
    this.create('sku', (table) => {
      table.increments('sku_id')
      table.integer('product_id').unsigned().notNullable().references('product_id').inTable('product')
      table.integer('store_id').unsigned().notNullable().references('store_id').inTable('store')
      table.string('sku')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('sku')
  }
}

module.exports = SkuSchema
