import UserService from '#app/domains/user/services/user_service'
import { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  protected userService = new UserService()

  async index({ view, auth }: HttpContext) {
    // ✅ ambil user yang sedang login
    const authUser = auth.user

    // kalau mau semua user juga tetap bisa
    const data = await this.userService.getAll()

    return view.render('pages/dashboard/index', {
      data,
      authUser, // kirim ke view
    })
  }
}
