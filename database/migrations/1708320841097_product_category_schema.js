'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductCategorySchema extends Schema {
  up () {
    this.create('product_category', (table) => {
      table.increments('product_category_id')
      table.string('name')
      table.string('sap_name')
      table.integer('brand_id').unsigned().notNullable().references('brand_id').inTable('brand')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('product_category')
  }
}

module.exports = ProductCategorySchema
