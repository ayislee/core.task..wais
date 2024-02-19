'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GroupRouteSchema extends Schema {
  up () {
    this.create('group_route', (table) => {
      table.increments('group_route_id')
      table.string('sku')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('group_route')
  }
}

module.exports = GroupRouteSchema
