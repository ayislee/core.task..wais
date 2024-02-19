'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BrandSchema extends Schema {
  up () {
    this.create('brand', (table) => {
      table.increments('brand_id')
      table.string('name')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('brand')
  }
}

module.exports = BrandSchema
