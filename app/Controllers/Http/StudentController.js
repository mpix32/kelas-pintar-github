'use strict'

const Student = use('App/Models/Student');

class StudentController {

    async paginate({ request, response }) {

        try {            
            let pagination = request.only(['page', 'limit', 'sortOrder', 'nameLike'])
            const page = parseInt(pagination.page, 10) || 1;
            const limit = parseInt(pagination.limit, 10) || 10;
            let query = Student.query();
            if (pagination.nameLike) {
                query = query.where('name', 'LIKE', `%${pagination.nameLike}%`)
            }
            query = query.orderBy('student_id', pagination.sortOrder).paginate(page, limit);
            const students = await query;
            return response.json(students)

        } catch (error) {
            throw error
        }
        
    }

    async store ({ request, response }) {

        try {
            const studentInfo = request.only(['name'])
            
            const userExists = await Student.findBy('name', studentInfo.name)

            if (userExists) {
                return response
                  .status(400)
                  .send({ message: { error: 'Student already registered' } })
              }

            const student = new Student()
            student.name = studentInfo.name
            await student.save()

            return response.status(201).json(student)

        } catch (error) {
            return response
            .status(err.status)
            .send(err)
        }

    }

    async index ({response}) {
        const students = await Student.query()
                        .with('report')
                        .fetch();
        return response.status(200).json({
            message: 'Succesfully get student',
            data: students
        })

    }

    async update ({params, request, response}) {
        const studentInfo = request.only(['student_id', 'name'])
        const student = await Student.find(studentInfo.student_id)
        if (!student) {
          return response.status(404).json({data: 'Resource not found'})
        }
        student.name = studentInfo.name

        await student.save()

        return response.status(200).json(student)
    }

    async show ({params, response}) {
        const student = await Student.find(params.id)

        return response.json(student)
    }

    async delete ({params, response}) {
        const student = await Student.find(params.id)
        if (!student) {
          return response.status(404).json({data: 'Resource not found'})
        }
        await student.delete()

        return response.status(204).json(null)
    }
}

module.exports = StudentController
