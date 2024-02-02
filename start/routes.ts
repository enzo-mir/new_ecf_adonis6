/*
|--------------------------------------------------------------------------
| Routers file
|--------------------------------------------------------------------------
|
| The Routers file is used for defining the HTTP Routers.
|
*/
import AdminController from '#controllers/admin_controller'
import AuthentificationsController from '#controllers/authentifications_controller'
import ImagesController from '#controllers/images_controller'
import ProfilesController from '#controllers/profiles_controller'
import PropsPagesController from '#controllers/props_pages_controller'
import ReservationsController from '#controllers/reservations_controller'
import { HttpContext } from '@adonisjs/core/http'
import Router from '@adonisjs/core/services/Router'
import { middleware } from './kernel.js'

Router.get('/', [PropsPagesController, 'home']).use(middleware.auth())

Router.get('/carte', [PropsPagesController, 'card'])

Router.group(() => {
  Router.post('/add', [ReservationsController, 'add'])
  Router.post('/delete', [ReservationsController, 'delete'])
}).prefix('/reservation')

Router.group(() => {
  Router.post('/update', [ProfilesController, 'update'])
  Router.post('/logout', [ProfilesController, 'logout'])
  Router.post('/delete', [ProfilesController, 'delete'])
}).prefix('profile')

Router.group(() => {
  Router.post('/login', [AuthentificationsController, 'login'])
  Router.post('/register', [AuthentificationsController, 'register'])
})
  .prefix('auth')
  .use(middleware.auth())

Router.group(() => {
  Router.get('', [AdminController, 'index'])
  Router.post('/hoursEdition', [AdminController, 'hours'])
}).prefix('/admin')

Router.post('/card/update', [AdminController, 'cardUpdate'])

Router.group(() => {
  Router.post('/upload', [ImagesController, 'upload'])
  Router.post('/delete', [ImagesController, 'delete'])
  Router.post('/update', [ImagesController, 'update'])
}).prefix('/image')

Router.any('/*', async (ctx: HttpContext) => {
  return ctx.inertia.render('UndefinedPage')
})
