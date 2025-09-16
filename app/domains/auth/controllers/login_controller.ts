import AuthService from '#app/domains/auth/services/auth_service'
import { loginValidator } from '#app/domains/auth/validators/login_validator'
import { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  protected authService = new AuthService()

  show({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  async store(ctx: HttpContext) {
    const data = await ctx.request.validateUsing(loginValidator)
    await this.authService.login(ctx, data)
    return ctx.response.redirect().toRoute('home')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('auth.login.show')
  }
}