'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UploadSchema extends Schema {
  up () {
    this.create('upload', (table) => {
      table.increments('upload_id')
      table.string('name')
      table.string('desc')
      table.enum('status',['waiting','process','finish','failed'])
      table.string('error_log')
      table.string('link')
      table.integer('request_by').unsigned().notNullable().references('user_id').inTable('users')
      table.integer('module_id').unsigned().notNullable().references('module_id').inTable('module')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('upload')
  }
}

module.exports = UploadSchema
