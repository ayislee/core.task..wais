'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('product', (table) => {
      table.increments('product_id')
      table.string('name')
      table.string('product_sap_name')
      table.string('product_code')
      table.string('product_sap_code')
      table.string('variant')
      table.string('classification')
      table.string('packaging')
      table.string('package_content')
      table.string('weight')
      table.integer('product_sub_category_id').unsigned().notNullable().references('product_sub_category_id').inTable('product_sub_category')
      table.string('photo')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('product')
  }
}

module.exports = ProductSchema
