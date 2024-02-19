'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PosmTypeSchema extends Schema {
  up () {
    this.create('posm_type', (table) => {
      table.increments('posm_type_id')
      table.string('name')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('posm_type')
  }
}

module.exports = PosmTypeSchema
