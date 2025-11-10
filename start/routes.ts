import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const RegisterController = () => import('#app/domains/auth/controllers/register_controller')
const LoginController = () => import('#app/domains/auth/controllers/login_controller')
const UsersController = () => import('#app/domains/user/controllers/users_controller')
const UsersdatatableController = () =>
  import('#app/domains/user/controllers/usersdatatable_controller')
const DashboardController = () => import('#app/domains/dashboard/controllers/dashboard_controller')
const RolesController = () => import('#app/domains/role_permission/controllers/roles_controller')
const PermissionsController = () =>
  import('#app/domains/role_permission/controllers/permissions_controller')

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
    // gridjs
    router.get('/', [UsersController, 'index']).as('index')
    router.get('/api', [UsersController, 'api']).as('api')
    // Rute CRUD yang lebih bersih (RESTful)
    router.post('/', [UsersController, 'store']).as('store')
    router.get('/:id', [UsersController, 'show']).as('show')
    router.put('/:id', [UsersController, 'update']).as('update')
    router.delete('/:id', [UsersController, 'destroy']).as('destroy')
  })
  .prefix('/users')
  .as('users')
  .use(middleware.auth())

router
  .group(() => {
    // datatable
    router.get('/', [UsersdatatableController, 'index']).as('index')
    router.get('/data', [UsersdatatableController, 'data']).as('data')
    router.get('/create', [UsersdatatableController, 'create']).as('create')
    router.post('/store', [UsersdatatableController, 'store']).as('store')
    router.get('/:id', [UsersdatatableController, 'show']).as('show')
    router.get('/:id/edit', [UsersdatatableController, 'edit']).as('edit')
    router.put('/update/:id', [UsersdatatableController, 'update']).as('update')
    router.delete('/delete/:id', [UsersdatatableController, 'destroy']).as('destroy')
  })
  .prefix('/usersdatatable')
  .as('usersdatatable')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [RolesController, 'index']).as('index')
    router.get('/api', [RolesController, 'api']).as('api')
    router.get('/:id', [RolesController, 'show']).as('show')
    router.post('/', [RolesController, 'store']).as('store')
    router.put('/:id', [RolesController, 'update']).as('update')
    router.delete('/:id', [RolesController, 'destroy']).as('destroy')
  })
  .prefix('/roles')
  .as('roles')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [PermissionsController, 'index']).as('index')
    router.get('/api', [PermissionsController, 'api']).as('api')
    router.get('/:id', [PermissionsController, 'show']).as('show')
    router.post('/', [PermissionsController, 'store']).as('store')
    router.put('/:id', [PermissionsController, 'update']).as('update')
    router.delete('/:id', [PermissionsController, 'destroy']).as('destroy')
  })
  .prefix('/permissions')
  .as('permissions')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/dashboard', [DashboardController, 'index']).as('index')
  })
  .prefix('/admin')
  .as('dashboard')
  .use(middleware.auth())
