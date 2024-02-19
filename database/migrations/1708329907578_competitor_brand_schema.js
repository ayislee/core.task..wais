'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompetitorBrandSchema extends Schema {
  up () {
    this.create('competitor_brand', (table) => {
      table.increments('competitor_brand_id')
      table.integer('competitor_id').unsigned().notNullable().references('competitor_id').inTable('competitor')
      table.integer('brand_id').unsigned().notNullable().references('brand_id').inTable('brand')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('competitor_brand')
  }
}

module.exports = CompetitorBrandSchema
