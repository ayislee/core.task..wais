'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ModuleSchema extends Schema {
  up () {
    this.create('module', (table) => {
      table.increments('module_id')
      table.string('name')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('module')
  }
}

module.exports = ModuleSchema
