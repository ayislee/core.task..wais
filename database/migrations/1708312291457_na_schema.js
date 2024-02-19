'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NaSchema extends Schema {
  up () {
    this.create('na', (table) => {
      table.increments('na_id')
      table.string('name')
      table.datetime('deleted_at')
      table.string('deleted_by')
      table.timestamps()
    })
  }

  down () {
    this.drop('na')
  }
}

module.exports = NaSchema
