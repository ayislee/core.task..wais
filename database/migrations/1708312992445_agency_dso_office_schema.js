'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AgencyDsoOfficeSchema extends Schema {
  up () {
    this.create('agency_dso_office', (table) => {
      table.increments('agency_dso_office_id')
      table.integer('agency_id').unsigned().notNullable().references('agency_id').inTable('agency')
      table.string('name')
      table.datetime('deleted_at')
      table.string('deleted_by')
      table.timestamps()
    })
  }

  down () {
    this.drop('agency_dso_office')
  }
}

module.exports = AgencyDsoOfficeSchema
