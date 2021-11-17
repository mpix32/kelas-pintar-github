'use strict'

const Model = use('Model')

class Students extends Model {
    static get table () {
        return 'students'
    }
    static get primaryKey () {
        return 'student_id'
    }

    report() {
        return this.hasOne('App/Models/Report')
    }

}

module.exports = Students
