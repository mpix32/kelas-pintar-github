'use strict'

const Subject = use('App/Models/Subject');
class SubjectController {
    async paginate({ request, response }) {

        try {            
            let pagination = request.only(['page', 'limit', 'sortOrder', 'nameLike'])
            const page = parseInt(pagination.page, 10) || 1;
            const limit = parseInt(pagination.limit, 10) || 10;
            let query = Subject.query();
            if (pagination.nameLike) {
                query = query.where('name', 'LIKE', `%${pagination.nameLike}%`)
            }
            query = query.orderBy('subject_id', pagination.sortOrder).paginate(page, limit);
            const Subject = await query;
            return response.json(Subject)

        } catch (error) {
            throw error
        }
        
    }

    async store ({ request, response }) {

        try {
            const subjectInfo = request.only(['name'])
            
            const userExists = await Subject.findBy('subject_name', subjectInfo.name)

            if (userExists) {
                return response
                  .status(400)
                  .send({ message: { error: 'Subject already registered' } })
              }

            const subject = new Subject()
            subject.subject_name = subjectInfo.name
            await subject.save()

            return response.status(201).json(subject)

        } catch (error) {
            return response
            .status(err.status)
            .send(err)
        }
    }

    async index ({response}) {
        const subject = await Subject.query()
                        // .with('report')
                        .fetch();
        return response.status(200).json({
            message: 'Succesfully get subject',
            data: subject
        })

    }

    async update ({params, request, response}) {
        const subjectInfo = request.only(['subject_id', 'name'])
        const subject = await Subject.find(subjectInfo.subject_id)
        if (!student) {
          return response.status(404).json({data: 'Resource not found'})
        }
        subject.name = subjectInfo.name

        await subject.save()

        return response.status(200).json(subject)
    }

    async show ({params, response}) {
        const subject = await Subject.find(params.id)

        return response.json(subject)
    }

    async delete ({params, response}) {
        const subject = await Subject.find(params.id)
        if (!subject) {
          return response.status(404).json({data: 'Resource not found'})
        }
        await subject.delete()

        return response.status(204).json(null)
    }
}

module.exports = SubjectController
