'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PermitSchema extends Schema {
  up () {
    this.create('permit', (table) => {
      table.increments('permit_id')
      table.integer('employee_id').unsigned().notNullable().references('employee_id').inTable('employee')
      table.integer('permit_type_id').unsigned().notNullable().references('permit_type_id').inTable('permit_type')
      table.datetime('start_date')
      table.datetime('end_date')
      table.string('reason')
      table.enum('auto_approve',['0','1']).defaultTo('0')
      table.string('photo')
      table.enum('status',['waiting','approve','reject']).defaultTo('waiting')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('permit')
  }
}

module.exports = PermitSchema
