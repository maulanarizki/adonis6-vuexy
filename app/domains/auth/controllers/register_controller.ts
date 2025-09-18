import AuthService from '#app/domains/auth/services/auth_service'
import { HttpContext } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'

export default class RegisterController {
  protected authService = new AuthService()

  show({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  async store({ request, response, session }: HttpContext) {
    try {
      await this.authService.register(request.all())

      // Flash sukses
      session.flash('success', 'Registrasi berhasil! Silakan login.')
      return response.redirect().toRoute('auth.login.show')
    } catch (error) {
      if (error.messages) {
        // VineJS: ambil array error messages saja
        session.flash('errors', error.messages)
      } else {
        session.flash('errors', [{ message: 'Registrasi gagal. Periksa kembali form Anda.' }])
      }
      return response.redirect().back()
    }
  }
}
