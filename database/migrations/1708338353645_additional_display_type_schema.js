'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdditionalDisplayTypeSchema extends Schema {
  up () {
    this.create('additional_display_type', (table) => {
      table.increments('additional_display_type_id')
      table.string('name')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('additional_display_type')
  }
}

module.exports = AdditionalDisplayTypeSchema
