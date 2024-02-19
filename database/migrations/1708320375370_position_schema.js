'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PositionSchema extends Schema {
  up () {
    this.table('position', (table) => {
      // alter table
      table.integer('distance_checkin')
      table.integer('distance_checkout')
    })
  }

  down () {
    this.table('position', (table) => {
      // reverse alternations
    })
  }
}

module.exports = PositionSchema
