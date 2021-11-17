'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Chapter extends Model {

    static get table () {
        return 'chapters'
    }

    static get primaryKey () {
        return 'chapter_id'
    }

    static get foreignKey(){
        return 'subject_id'
    }

    subject() {
        return this.belongsTo('App/Models/Subject')
    }
}

module.exports = Chapter
