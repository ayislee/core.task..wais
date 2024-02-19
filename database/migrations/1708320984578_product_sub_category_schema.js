'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSubCategorySchema extends Schema {
  up () {
    this.create('product_sub_category', (table) => {
      table.increments('product_sub_category_id')
      table.integer('product_category_id').unsigned().notNullable().references('product_category_id').inTable('product_category')
      table.string('sap_name')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('product_sub_category')
  }
}

module.exports = ProductSubCategorySchema
