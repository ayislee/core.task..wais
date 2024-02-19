'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReportAdditionalDisplaySchema extends Schema {
  up () {
    this.create('report_additional_display', (table) => {
      table.increments('report_additional_display_id')
      table.integer('itinerary_id').unsigned().notNullable().references('itinerary_id').inTable('itinerary')
      table.integer('product_category_id').unsigned().notNullable().references('product_category_id').inTable('product_category')
      table.integer('additional_display_type_id').unsigned().notNullable().references('additional_display_type_id').inTable('additional_display_type')
      table.json('photo_json')
      table.string('remark')
      table.enum('status',['waiting','approve','reject'])
      table.text('status_note')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('report_additional_display')
  }
}

module.exports = ReportAdditionalDisplaySchema
