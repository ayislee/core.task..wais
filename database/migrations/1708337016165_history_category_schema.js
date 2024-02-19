'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HistoryCategorySchema extends Schema {
  up () {
    this.create('history_category', (table) => {
      table.increments('history_category_id')
      table.string('name')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('history_category')
  }
}

module.exports = HistoryCategorySchema
