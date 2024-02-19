'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PromoTypeSchema extends Schema {
  up () {
    this.create('promo_type', (table) => {
      table.increments('promo_type_id')
      table.string('name')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('promo_type')
  }
}

module.exports = PromoTypeSchema
