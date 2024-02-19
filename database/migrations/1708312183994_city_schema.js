'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CitySchema extends Schema {
  up () {
    this.create('city', (table) => {
      table.increments('city_id')
      table.string('name')
      table.datetime('deleted_at')
      table.string('deleted_by')
      table.timestamps()
    })
  }

  down () {
    this.drop('citiy')
  }
}

module.exports = CitySchema
