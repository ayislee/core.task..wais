'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmployeeLeaderSchema extends Schema {
  up () {
    this.create('employee_leader', (table) => {
      table.increments('employee_leader_id')
      table.integer('employee_id').unsigned().notNullable().references('employee_id').inTable('employee')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('employee_leader')
  }
}

module.exports = EmployeeLeaderSchema
