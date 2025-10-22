import UserService from '#app/domains/user/services/user_service'
import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'
import { dd } from '@adonisjs/core/services/dumper'

export default class UsersdatatableController {
  protected userService = new UserService()

  async index({ view }: HttpContext) {
    return view.render('pages/users/indexdatatable')
  }

  /**
   * Handle DataTables ajax request
   */
  async data({ request, response }: HttpContext) {
    const { draw, start, length, search, order } = request.qs()

    const searchValue = search.value
    // Pastikan untuk menangani kasus dimana order mungkin tidak ada
    const orderByColumn = order ? request.qs().columns[order[0].column].data : 'id'
    const orderDirection = order ? order[0].dir : 'asc'

    const data = await this.userService.getForDataTable({
      start: +start,
      length: +length,
      searchValue,
      orderByColumn,
      orderDirection,
    })

    console.log(data) // Objek ModelPaginator akan ditampilkan di sini

    return response.json({
      draw: +draw,
      recordsTotal: data.total,
      recordsFiltered: data.total, // Untuk saat ini, kita asumsikan jumlah total dan yang difilter sama
      data: data.all(), // Gunakan .all() untuk mendapatkan array data dari paginator
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
