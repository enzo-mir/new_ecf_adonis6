/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'

router.get('/', ({ inertia }: HttpContext) => {
  const title = 'Hello world with Inertia'
  return inertia.render('home', { title })
})
