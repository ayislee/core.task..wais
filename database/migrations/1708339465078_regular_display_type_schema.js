'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RegularDisplayTypeSchema extends Schema {
  up () {
    this.create('regular_display_type', (table) => {
      table.increments('regular_display_type_id')
      table.string('name')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('regular_display_type')
  }
}

module.exports = RegularDisplayTypeSchema