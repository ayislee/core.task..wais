'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompetitorSchema extends Schema {
  up () {
    this.create('competitor', (table) => {
      table.increments('competitor_id')
      table.string('name')
      table.string('producer_name')

      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('competitor')
  }
}

module.exports = CompetitorSchema
