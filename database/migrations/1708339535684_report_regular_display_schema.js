'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReportRegularDisplaySchema extends Schema {
  up () {
    this.create('report_regular_display', (table) => {
      table.increments('report_regular_display_id')
      table.integer('itinerary_id').unsigned().notNullable().references('itinerary_id').inTable('itinerary')
      table.integer('product_category_id').unsigned().notNullable().references('product_category_id').inTable('product_category')
      table.integer('regular_display_type_id').unsigned().notNullable().references('regular_display_type_id').inTable('regular_display_type')
      table.string('before_photo')
      table.string('after_photo')
      table.string('remark')
      table.enum('status',['waiting','approve','reject'])
      table.string('status_note')
      table.timestamps()
      table.datetime('deleted_at')
      table.string('deleted_by')
    })
  }

  down () {
    this.drop('report_regular_display')
  }
}

module.exports = ReportRegularDisplaySchema
