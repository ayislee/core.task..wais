'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompetitorProductSchema extends Schema {
  up () {
    this.create('competitor_product', (table) => {
      table.increments('competitor_product_id')
      table.integer('product_sub_category_id').unsigned().notNullable().references('product_sub_category_id').inTable('product_sub_category')
      table.integer('competitor_brand_id').unsigned().notNullable().references('competitor_id').inTable('competitor_brand')
      table.string('product_sap_name')
      table.string('product_code')
      table.string('product_sap_code')
      table.string('variant')
      table.string('classification')
      table.string('packaging')
      table.string('package_content')
      table.string('weight')
      table.string('photo')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('competitor_product')
  }
}

module.exports = CompetitorProductSchema
