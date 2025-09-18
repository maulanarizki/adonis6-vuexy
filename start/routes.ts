import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const RegisterController = () => import('#app/domains/auth/controllers/register_controller')
const LoginController = () => import('#app/domains/auth/controllers/login_controller')
const UsersController = () => import('#app/domains/user/controllers/users_controller')
const DashboardController = () => import('#app/domains/dashboard/controllers/dashboard_controller')

router.on('/').render('pages/home').as('home')

// Auth Routes
router
  .group(() => {
    router.get('/register', [RegisterController, 'show']).as('register.show')
    router.post('/register', [RegisterController, 'store']).as('register.store')
    router.get('/login', [LoginController, 'show']).as('login.show')
    router.post('/login', [LoginController, 'store']).as('login.store')
  })
  .as('auth')
  .use(middleware.guest())

router.post('/logout', [LoginController, 'logout']).as('auth.logout').use(middleware.auth())

// User CRUD Routes (Protected)
router
  .group(() => {
    router.get('/users', [UsersController, 'index']).as('index')
    router.get('/users/create', [UsersController, 'create']).as('create')
    router.post('/users', [UsersController, 'store']).as('store')
    router.get('/users/:id', [UsersController, 'show']).as('show')
    router.get('/users/:id/edit', [UsersController, 'edit']).as('edit')
    router.put('/users/:id', [UsersController, 'update']).as('update')
    router.delete('/users/:id', [UsersController, 'destroy']).as('destroy')
  })
  .prefix('/admin')
  .as('users')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/dashboard', [DashboardController, 'index']).as('index')
  })
  .prefix('/admin')
  .as('dashboard')
  .use(middleware.auth())
