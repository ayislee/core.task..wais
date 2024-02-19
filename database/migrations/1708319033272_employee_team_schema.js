'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmployeeTeamSchema extends Schema {
  up () {
    this.create('employee_team', (table) => {
      table.increments('employee_team_id')
      table.integer('employee_id').unsigned().notNullable().references('employee_id').inTable('employee')
      table.integer('employee_leader_id').unsigned().notNullable().references('employee_leader_id').inTable('employee_leader')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('employee_team')
  }
}

module.exports = EmployeeTeamSchema
