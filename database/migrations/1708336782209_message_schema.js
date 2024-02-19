'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessageSchema extends Schema {
  up () {
    this.create('message', (table) => {
      table.increments('message_id')
      table.string('name')
      table.string('sender')
      table.string('subject')
      table.text('content')
      table.string('attachment')
      table.string('link')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('message')
  }
}

module.exports = MessageSchema
