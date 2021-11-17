'use strict'
const Chapter = use('App/Models/Chapter');

class ChapterController {
    async paginate({ request, response }) {

        try {            
            let pagination = request.only(['page', 'limit', 'sortOrder', 'nameLike'])
            const page = parseInt(pagination.page, 10) || 1;
            const limit = parseInt(pagination.limit, 10) || 10;
            let query = Chapter.query();
            if (pagination.nameLike) {
                query = query.where('chapter_name', 'LIKE', `%${pagination.nameLike}%`)
            }
            query = query.orderBy('chapter_id', pagination.sortOrder).paginate(page, limit);
            const chpater = await query;
            return response.json(chpater)

        } catch (error) {
            throw error
        }
        
    }

    async store ({ request, response }) {

        try {
            const chaptertInfo = request.only(['name','subject'])
            
            const chapter = new Chapter()
            chapter.chapter_name = chaptertInfo.name
            chapter.subject_id = chaptertInfo.subject
            await chapter.save()
            return response.status(201).json(chapter)

        } catch (error) {
            return response
            .status(err.status)
            .send(err)
        }

    }

    async index ({response}) {
        const chapter = await Chapter.query()
                        .with('subject')
                        .fetch();
        return response.status(200).json({
            message: 'Succesfully get Chapter',
            data: chapter
        })

    }

    async update ({params, request, response}) {
        const chapterInfo = request.only(['chpater_id', 'name','subject_id'])
        const chpater = await Chapter.find(chapterInfo.chpater_id)
        if (!chpater) {
          return response.status(404).json({data: 'Resource not found'})
        }
        chpater.chpater_name = chapterInfo.name
        chpater.subject_id = chapterInfo.subject_id

        await chpater.save()

        return response.status(200).json(chpater)
    }

    async show ({params, response}) {
        const chapter = await Chapter.find(params.id)

        return response.json(chapter)
    }

    async delete ({params, response}) {
        const chpater = await Chapter.find(params.id)
        if (!chpater) {
          return response.status(404).json({data: 'Resource not found'})
        }
        await chpater.delete()

        return response.status(204).json(null)
    }
}

module.exports = ChapterController
