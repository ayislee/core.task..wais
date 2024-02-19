'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RouteSchema extends Schema {
  up () {
    this.create('route', (table) => {
      table.increments('route_id')
      table.integer('group_route_id').unsigned().notNullable().references('group_route_id').inTable('group_route')
      table.string('name')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('route')
  }
}

module.exports = RouteSchema
