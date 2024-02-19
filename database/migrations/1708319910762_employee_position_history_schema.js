'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmployeePositionHistorySchema extends Schema {
  up () {
    this.create('employee_position_history', (table) => {
      table.increments('employee_position_history_id')
      table.integer('employee_id').unsigned().notNullable().references('employee_id').inTable('employee')
      table.integer('position_id').unsigned().notNullable().references('position_id').inTable('position')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('employee_position_history')
  }
}

module.exports = EmployeePositionHistorySchema
