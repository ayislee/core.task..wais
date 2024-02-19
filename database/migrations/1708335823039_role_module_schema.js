'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoleModuleSchema extends Schema {
  up () {
    this.create('role_module', (table) => {
      table.increments('role_module_id')
      table.integer('role_id').unsigned().notNullable().references('role_id').inTable('role')
      table.integer('module_id').unsigned().notNullable().references('module_id').inTable('module')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')

    })
  }

  down () {
    this.drop('role_module')
  }
}

module.exports = RoleModuleSchema
