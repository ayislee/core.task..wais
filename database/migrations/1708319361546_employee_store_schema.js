'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmployeeStoreSchema extends Schema {
  up () {
    this.create('employee_store', (table) => {
      table.increments('employee_store_id')
      table.integer('employee_id').unsigned().notNullable().references('employee_id').inTable('employee')
      table.integer('store_id').unsigned().notNullable().references('store_id').inTable('store')
      table.datetime('start_date')
      table.datetime('end_date')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('employee_store')
  }
}

module.exports = EmployeeStoreSchema
