import AuthService from '#app/domains/auth/services/auth_service'
import { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  protected authService = new AuthService()

  show({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  async store({ request, response, auth }: HttpContext) {
    const user = await this.authService.register(request.all())
    await auth.use('web').login(user)
    return response.redirect().toRoute('home')
  }
}