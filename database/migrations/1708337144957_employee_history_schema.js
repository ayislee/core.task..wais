'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmployeeHistorySchema extends Schema {
  up () {
    this.create('employee_history', (table) => {
      table.increments('employee_history_id')
      table.integer('employee_id').unsigned().notNullable().references('employee_id').inTable('employee')
      table.integer('history_category_id').unsigned().notNullable().references('history_category_id').inTable('history_category')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('employee_history')
  }
}

module.exports = EmployeeHistorySchema
