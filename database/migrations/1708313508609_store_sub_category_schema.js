'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoreSubCategorySchema extends Schema {
  up () {
    this.create('store_sub_category', (table) => {
      table.increments('store_sub_category_id')
      table.integer('store_category_id').unsigned().notNullable().references('store_category_id').inTable('store_category')
      table.string('name')
      table.datetime('deleted_at')
      table.string('deleted_by')
      table.timestamps()
    })
  }

  down () {
    this.drop('store_sub_categoriy')
  }
}

module.exports = StoreSubCategorySchema
