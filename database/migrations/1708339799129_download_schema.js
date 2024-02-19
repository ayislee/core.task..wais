'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DownloadSchema extends Schema {
  up () {
    this.create('download', (table) => {
      table.increments('download_id')
      table.string('name')
      table.string('desc')
      table.enum('status',['waiting','process','finish','failed'])
      table.string('link')
      table.string('error_log')
      table.integer('request_by').unsigned().notNullable().references('user_id').inTable('users')
      table.integer('module_id').unsigned().notNullable().references('module_id').inTable('module')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('download')
  }
}

module.exports = DownloadSchema
