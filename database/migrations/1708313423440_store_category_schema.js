'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoreCategorySchema extends Schema {
  up () {
    this.create('store_category', (table) => {
      table.increments('store_category_id')
      table.string('name')
      table.datetime('deleted_at')
      table.string('deleted_by')
      table.timestamps()
    })
  }

  down () {
    this.drop('store_categoriy')
  }
}

module.exports = StoreCategorySchema
