'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Report extends Model {
    static get table () {
        return 'report'
    }
    static get primaryKey () {
        return 'report_id'
    }

}

module.exports = Report
