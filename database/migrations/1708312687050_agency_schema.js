'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AgencySchema extends Schema {
  up () {
    this.create('agency', (table) => {
      table.increments('agency_id')
      table.string('name')
      table.datetime('deleted_at')
      table.string('deleted_by')
      table.timestamps()
    })
  }

  down () {
    this.drop('agency')
  }
}

module.exports = AgencySchema
