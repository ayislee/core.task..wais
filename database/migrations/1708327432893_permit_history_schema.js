'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PermitHistorySchema extends Schema {
  up () {
    this.create('permit_history', (table) => {
      table.increments('permit_history_id')
      table.integer('permit_id').unsigned().notNullable().references('permit_id').inTable('permit')
      table.enum('status',['waiting','approve','reject']).defaultTo('waiting')
      table.text('note')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
      
    })
  }

  down () {
    this.drop('permit_history')
  }
}

module.exports = PermitHistorySchema
