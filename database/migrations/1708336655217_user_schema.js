'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      // alter table
      table.integer('role_id').unsigned().notNullable().references('role_id').inTable('role')
      table.string('photo')
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
    })
  }
}

module.exports = UserSchema
