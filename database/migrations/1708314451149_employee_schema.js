'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmployeeSchema extends Schema {
  up () {
    this.create('employee', (table) => {
      table.increments('employee_id')
      table.string('lid').notNullable()
      table.string('name')
      table.string('email').notNullable().unique()
      table.string('phone').notNullable().unique()
      table.string('password')
      table.string('nik')
      table.string('code')
      table.string('ktp')
      table.enum('gender',['male','female'])
      table.string('photo_profile')
      table.string('photo_ktp')
      table.string('photo_bank')
      table.integer('agency_dso_office_id').notNullable().unsigned().references('agency_dso_office_id').inTable('agency_dso_office')
      table.integer('dso_id').notNullable().unsigned().references('dso_id').inTable('dso')
      table.integer('position_id').notNullable().unsigned().references('position_id').inTable('position')
      table.enum('status',['active','not_active','suspend','resign'])
      
      table.datetime('deleted_at')
      table.string('deleted_by')
      table.timestamps()
    })
  }

  down () {
    this.drop('employee')
  }
}

module.exports = EmployeeSchema
