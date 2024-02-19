'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GroupRouteEmployeeSchema extends Schema {
  up () {
    this.create('group_route_employee', (table) => {
      table.increments('group_route_employee')
      table.integer('group_route_id').unsigned().notNullable().references('group_route_id').inTable('group_route')
      table.integer('employee_id').unsigned().notNullable().references('employee_id').inTable('employee')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('group_route_employee')
  }
}

module.exports = GroupRouteEmployeeSchema
