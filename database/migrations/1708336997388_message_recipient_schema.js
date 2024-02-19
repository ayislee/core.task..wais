'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessageRecipientSchema extends Schema {
  up () {
    this.create('message_recipient', (table) => {
      table.increments('message_recipient_id')
      table.integer('message_id').unsigned().notNullable().references('message_id').inTable('message')
      table.integer('employee_id').unsigned().notNullable().references('employee_id').inTable('employee')
      table.enum('is_read',['0','1'])
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('message_recipient')
  }
}

module.exports = MessageRecipientSchema
