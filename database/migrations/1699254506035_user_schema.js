'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
    up() {
        this.create('users', (table) => {
            table.increments('user_id')
            table.string('email').unique().notNullable()
            table.string('password')
            table.string('fullname')
            table.string('phone')
            table.enu('status',['0','1']).defaultTo('0')
            table.enu('type',['admin','user']).defaultTo('user')
            table.integer('entity_id').unsigned()
            table.timestamps()
        })
    }

    down() {
        this.drop('users')
    }
}

module.exports = UserSchema
