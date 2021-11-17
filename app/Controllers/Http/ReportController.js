'use strict'

const Report = use('App/Models/Report');
const Database = use('Database')

class ReportController {
    async index ({response}) {
        const students = await Report.query()
                        .fetch();
        return response.status(200).json({
            message: 'Succesfully get student',
            data: students
        })

    }

    async store ({ request, response }) {
        try {
            const reportInfo = request.only(['student_id','chapter_id','grade','score'])
            
            const report = new Report()
            report.student_id = reportInfo.student_id
            report.chapter_id = reportInfo.chapter_id
            report.grade = reportInfo.grade
            report.score = reportInfo.score
            await report.save()
            return response.status(201).json(report)
        }catch (error){
            return response
            .status(err.status)
            .send(err)
        }
    }

    async update ({params, request, response}) {
        const reportInfo = request.only(['student_id','chapter_id','grade','score'])
        
        const report = await Report.find(reportInfo.student_id)
        if (!student) {
          return response.status(404).json({data: 'Resource not found'})
        }
        report.student_id = reportInfo.student_id
        report.chapter_id = reportInfo.chapter_id
        report.grade = reportInfo.grade
        report.score = reportInfo.score

        await student.save()

        return response.status(200).json(student)
    }

    async delete ({params, response}) {
        const report = await Report.find(params.id)
        if (!student) {
          return response.status(404).json({data: 'Resource not found'})
        }
        await student.delete()

        return response.status(204).json(null)
    }

    async averageBychapter ({params, response}){

       
        const data = await Database
        .from('v_average_by_grade').where('chapter_id',params.id)
       
        return response.status(200).json({
            message: 'Succesfully get Average',
            data: data
        })
    }

    async averageStudent ({params, response}){

       
        const data = await Database
        .from('v_average_by_grade').where('student_id',params.student_id)
       
        return response.status(200).json({
            message: 'Succesfully get Average',
            data: data
        })
    }

    async averageList({params, response}){

       
        const data = await Database
        .from('v_average_by_grade')
       
        return response.status(200).json({
            message: 'Succesfully get Average',
            data: data
        })
    }

    async highest({params, response}){

       
        const data = await Database
        .from('v_max_average')
       
        return response.status(200).json({
            message: 'Succesfully get Average',
            data: data
        })
    }

    async smallest({params, response}){

       
        const data = await Database
        .from('v_min_average')
       
        return response.status(200).json({
            message: 'Succesfully get Average',
            data: data
        })
    }

}

module.exports = ReportController
