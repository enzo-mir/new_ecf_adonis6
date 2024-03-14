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
<<<<<<< HEAD
import PropsPagesController from '#controllers/props_pages_controller'
=======
>>>>>>> origin/release
import ReservationsController from '#controllers/reservations_controller'
import { HttpContext } from '@adonisjs/core/http'
import Router from '@adonisjs/core/services/Router'
import { middleware } from './kernel.js'
<<<<<<< HEAD
=======
import PropsPagesController from '#controllers/props_pages_controller'

>>>>>>> origin/release
Router.get('/', [PropsPagesController, 'home'])
Router.get('carte', [PropsPagesController, 'card'])

Router.group(() => {
  Router.post('/add', [ReservationsController, 'add'])
  Router.post('/delete', [ReservationsController, 'delete'])
}).prefix('/reservation')

Router.group(() => {
  Router.post('/update', [ProfilesController, 'update']).use(middleware.auth())
  Router.post('/logout', [ProfilesController, 'logout'])
  Router.post('/delete', [ProfilesController, 'delete'])
}).prefix('profile')

Router.group(() => {
  Router.post('/login', [AuthentificationsController, 'login'])
  Router.post('/register', [AuthentificationsController, 'register'])
}).prefix('auth')

Router.group(() => {
  Router.get('', [AdminController, 'index']).use(middleware.auth())
  Router.post('/hoursEdition', [AdminController, 'hours'])
  Router.post('/userUpdate', [AdminController, 'userUpdate'])
  Router.post('/deletUser/:id', [AdminController, 'deleteUser'])
  Router.post('/createUser', [AdminController, 'createUser'])
}).prefix('/admin')

Router.post('/card/update', [AdminController, 'cardUpdate'])

Router.group(() => {
  Router.post('/upload', [ImagesController, 'upload'])
  Router.post('/delete', [ImagesController, 'delete'])
  Router.post('/update', [ImagesController, 'update'])
}).prefix('/image')

Router.any('/*', async (ctx: HttpContext) => {
  return ctx.inertia.render('undefined_page')
})
