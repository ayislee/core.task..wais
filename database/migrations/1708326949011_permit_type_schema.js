'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PermitTypeSchema extends Schema {
  up () {
    this.create('permit_type', (table) => {
      table.increments('permit_type_id')
      table.string('name')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('permit_type')
  }
}

module.exports = PermitTypeSchema
