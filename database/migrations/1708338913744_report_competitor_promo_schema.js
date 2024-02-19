'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReportCompetitorPromoSchema extends Schema {
  up () {
    this.create('report_competitor_promo', (table) => {
      table.increments('report_competitor_promo_id')
      table.integer('itinerary_id').unsigned().notNullable().references('itinerary_id').inTable('itinerary')
      table.integer('competitor_product_id').unsigned().notNullable().references('competitor_product_id').inTable('competitor_product')
      table.integer('promo_type_id').unsigned().notNullable().references('promo_type_id').inTable('promo_type')
      table.integer('promo_additional_id').unsigned().notNullable().references('promo_additional_id').inTable('promo_additional')
      table.integer('posm_type_id').unsigned().notNullable().references('posm_type_id').inTable('posm_type')
      table.string('name')
      table.datetime('start_period_date')
      table.datetime('end_period_date')
      table.decimal('normal_price',10,2)
      table.decimal('promo_price',10,2)
      table.enum('additional_display',['0','1'])
      table.enum('posm',['0','1'])
      table.string('photo')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('report_competitor_promo')
  }
}

module.exports = ReportCompetitorPromoSchema
