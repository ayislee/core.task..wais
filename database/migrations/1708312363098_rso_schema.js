'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RsoSchema extends Schema {
  up () {
    this.create('rso', (table) => {
      table.increments('rso_id')
      table.integer('na_id').unsigned().notNullable().references('na_id').inTable('na')
      table.string('name')
      table.datetime('deleted_at')
      table.string('deleted_by')
      table.timestamps()
    })
  }

  down () {
    this.drop('rso')
  }
}

module.exports = RsoSchema
