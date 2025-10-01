import UserService from '#app/domains/user/services/user_service'
import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'
import { dd } from '@adonisjs/core/services/dumper'

export default class UsersController {
  protected userService = new UserService()

  async index({ request, view }: HttpContext) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'created_at',
      sortOrder = 'desc',
      search = '',
    } = request.qs()

    const users = await this.userService.getAll({
      page: Number(page),
      limit: Number(limit),
      sortBy,
      sortOrder,
      search,
    })

    // --- PERBAIKAN DI SINI ---
    // 1. Atur base URL untuk pagination. Menggunakan route() lebih aman.
    users.baseUrl(router.makeUrl('users.index'))

    // 2. Tambahkan query string yang ada (selain 'page') ke semua link pagination
    //    agar sorting dan filter tetap aktif saat pindah halaman.
    users.queryString({ sortBy, sortOrder, search })

    return view.render('pages/users/index', {
      users,
      // queryParams tetap berguna untuk link sorting di header tabel
      queryParams: { sortBy, sortOrder, search },
    })
  }

  create({ view }: HttpContext) {
    return view.render('pages/users/create')
  }

  async store({ request, response }: HttpContext) {
    await this.userService.create(request.all())
    return response.redirect().toRoute('users.index')
  }

  async show({ params, view }: HttpContext) {
    const user = await this.userService.findById(params.id)
    return view.render('pages/users/show', { user })
  }

  async edit({ params, view }: HttpContext) {
    const user = await this.userService.findById(params.id)
    return view.render('pages/users/edit', { user })
  }

  async update({ params, request, response }: HttpContext) {
    await this.userService.update(params.id, request.all())
    return response.redirect().toRoute('users.index')
  }

  async destroy({ params, response }: HttpContext) {
    await this.userService.delete(params.id)
    return response.redirect().back()
  }
}
