'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RouteStoreSchema extends Schema {
  up () {
    this.create('route_store', (table) => {
      table.increments('route_store')
      table.integer('store_id').unsigned().notNullable().references('store_id').inTable('store')
      table.integer('route_id').unsigned().notNullable().references('route_id').inTable('route')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('route_store')
  }
}

module.exports = RouteStoreSchema
