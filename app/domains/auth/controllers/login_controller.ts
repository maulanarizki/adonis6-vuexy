import AuthService from '#app/domains/auth/services/auth_service'
import { loginValidator } from '#app/domains/auth/validators/login_validator'
import { HttpContext } from '@adonisjs/core/http'
import User from '#app/domains/user/models/user'
import { dd } from '@adonisjs/core/services/dumper'

export default class LoginController {
  protected authService = new AuthService()

  show({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  // async store(ctx: HttpContext) {
  //   const data = await ctx.request.validateUsing(loginValidator)
  //   await this.authService.login(ctx, data)
  //   return ctx.response.redirect().toRoute('dashboard.index')
  // }

  async store(ctx: HttpContext) {
    const { request, response, session } = ctx

    try {
      // validasi input
      const data = await request.validateUsing(loginValidator)

      // panggil AuthService dengan ctx dan data
      await this.authService.login(ctx, data)

      session.flash('success', 'Login berhasil!')
      return response.redirect().toRoute('dashboard.index')
    } catch (error) {
      if (error.messages) {
        session.flash('errors', error.messages)
      } else {
        session.flash('errors', [
          { message: 'Login gagal. Periksa kembali email/username dan password Anda.' },
        ])
      }
      return response.redirect().back()
    }
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('admin.login.show')
  }
}
