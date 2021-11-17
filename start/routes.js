'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.get('/', () => {
//   return { greeting: 'Hello world in JSON' }
// })


Route.group(() => {

  Route.get('students/paginate', 'StudentController.paginate')
  Route.get('students', 'StudentController.index')
  Route.get('students/:id', 'StudentController.show')
  Route.post('students', 'StudentController.store')
  Route.put('students', 'StudentController.update')
  Route.delete('students/:id', 'StudentController.delete')

  Route.get('chapter/paginate', 'ChapterController.paginate')
  Route.get('chapter', 'ChapterController.index')
  Route.get('chapter/:id', 'ChapterController.show')
  Route.post('chapter', 'ChapterController.store')
  Route.put('chapter', 'ChapterController.update')
  Route.delete('chapter/:id', 'ChapterController.delete')

  Route.get('subjects/paginate', 'SubjectController.paginate')
  Route.get('subjects', 'SubjectController.index')
  Route.get('subjects/:id', 'SubjectController.show')
  Route.post('subjects', 'SubjectController.store')
  Route.put('subjects', 'SubjectController.update')
  Route.delete('subjects/:id', 'SubjectController.delete')

  Route.get('reports', 'ReportController.index')
  Route.get('reports/:id', 'ReportController.show')
  Route.post('reports', 'ReportController.store')
  Route.put('reports', 'ReportController.update')
  Route.delete('reports/:id', 'ReportController.delete')

  Route.get('averageByChapter/:id', 'ReportController.averageBychapter')
  Route.get('averageStudent/:student_id', 'ReportController.averageStudent')
  Route.get('averageList', 'ReportController.averageList')

  Route.get('highest', 'ReportController.highest')
  Route.get('smallest', 'ReportController.smallest')

}).prefix('api/v1')
