'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DsoSchema extends Schema {
  up () {
    this.create('dso', (table) => {
      table.increments('dso_id')
      table.integer('rso_id').unsigned().notNullable().references('rso_id').inTable('rso')
      table.string('name')
      table.datetime('deleted_at')
      table.string('deleted_by')
      table.timestamps()
    })
  }

  down () {
    this.drop('dso')
  }
}

module.exports = DsoSchema
