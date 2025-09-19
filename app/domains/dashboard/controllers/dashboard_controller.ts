import UserService from '#app/domains/user/services/user_service'
import { HttpContext } from '@adonisjs/core/http'
import { dd } from '@adonisjs/core/services/dumper'

export default class DashboardController {
  protected userService = new UserService()

  async index({ view, auth, route }: HttpContext) {
    // kalau mau semua user juga tetap bisa
    const data = await this.userService.getAll()

    return view.render('pages/dashboard/index', {
      data,
      currentRouteName: route?.name, // kirim nama route saat ini ke view
    })
  }
}
