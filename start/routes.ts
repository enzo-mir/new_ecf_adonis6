/*
|--------------------------------------------------------------------------
| Routers file
|--------------------------------------------------------------------------
|
| The Routers file is used for defining the HTTP Routers.
|
*/
<<<<<<< HEAD
const AdminController = () => import('#controllers/admin_controller')
const AuthentificationsController = () => import('#controllers/authentifications_controller')
const ImagesController = () => import('#controllers/images_controller')
const ProfilesController = () => import('#controllers/profiles_controller')
const ReservationsController = () => import('#controllers/reservations_controller')
=======
import AdminController from '#controllers/admin_controller'
import AuthentificationsController from '#controllers/authentifications_controller'
import ImagesController from '#controllers/images_controller'
import ProfilesController from '#controllers/profiles_controller'
<<<<<<< HEAD
import PropsPagesController from '#controllers/props_pages_controller'
=======
>>>>>>> origin/release
import ReservationsController from '#controllers/reservations_controller'
>>>>>>> 97234da35e74503be710bd143ef312b0348765fd
import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
<<<<<<< HEAD
const ForgotPasswordsController = () => import('#controllers/forgot_passwords_controller')
const PropsPagesController = () => import('#controllers/props_pages_controller')

router.get('/', [PropsPagesController, 'home'])
router.get('carte', [PropsPagesController, 'card'])
=======
<<<<<<< HEAD
=======
import PropsPagesController from '#controllers/props_pages_controller'

>>>>>>> origin/release
Router.get('/', [PropsPagesController, 'home'])
Router.get('carte', [PropsPagesController, 'card'])
>>>>>>> 97234da35e74503be710bd143ef312b0348765fd

router
  .group(() => {
    router.post('/add', [ReservationsController, 'add'])
    router.post('/delete', [ReservationsController, 'delete'])
  })
  .prefix('/reservation')

router
  .group(() => {
    router.post('/update', [ProfilesController, 'update']).use(middleware.auth())
    router.post('/logout', [ProfilesController, 'logout'])
    router.post('/delete', [ProfilesController, 'delete'])
    router.post('/forgot_pasword/:email', [ForgotPasswordsController, 'forgot_post'])
    router.post('/new_password', [ForgotPasswordsController, 'new_password'])
  })
  .prefix('profile')

router
  .group(() => {
    router.post('/login', [AuthentificationsController, 'login'])
    router.post('/register', [AuthentificationsController, 'register'])
  })
  .prefix('auth')

router
  .group(() => {
    router.get('', [AdminController, 'index']).use(middleware.auth())
    router.post('/hoursEdition', [AdminController, 'hours'])
    router.post('/userUpdate', [AdminController, 'userUpdate'])
    router.post('/deletUser/:id', [AdminController, 'deleteUser'])
    router.post('/createUser', [AdminController, 'createUser'])
  })
  .prefix('/admin')

router.post('/card/update', [AdminController, 'cardUpdate'])

router
  .group(() => {
    router.post('/upload', [ImagesController, 'upload'])
    router.post('/delete', [ImagesController, 'delete'])
    router.post('/update', [ImagesController, 'update'])
  })
  .prefix('/image')
router.get('/forgot_password/:email', [ForgotPasswordsController, 'index'])
router.any('/*', async (ctx: HttpContext) => {
  return ctx.inertia.render('undefined_page')
})
