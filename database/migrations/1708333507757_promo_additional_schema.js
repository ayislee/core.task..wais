'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PromoAdditionalSchema extends Schema {
  up () {
    this.create('promo_additional', (table) => {
      table.increments('promo_additional_id')
      table.string('name')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('promo_additional')
  }
}

module.exports = PromoAdditionalSchema
