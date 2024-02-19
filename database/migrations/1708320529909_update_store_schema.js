'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UpdateStoreSchema extends Schema {
  up () {
    this.create('update_store', (table) => {
      table.increments('update_store_id')
      table.integer('employee_id').unsigned().notNullable().references('employee_id').inTable('employee')
      table.integer('store_id').unsigned().notNullable().references('store_id').inTable('store')
      table.float('lat')
      table.float('long')
      table.string('reason')
      table.enum('status',['request','approve','reject'])
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('update_store')
  }
}

module.exports = UpdateStoreSchema
