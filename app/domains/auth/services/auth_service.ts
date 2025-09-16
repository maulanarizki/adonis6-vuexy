import User from '#app/domains/user/models/user'
import { registerValidator } from '#app/domains/auth/validators/register_validator'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthService {
  async register(data: any) {
    const payload = await registerValidator.validate(data)
    const user = await User.create(payload)
    return user
  }

  // FIX 3: 'request' yang tidak terpakai dihapus dari destructuring
  async login({ auth }: HttpContext, data: any) {
    const { email, password } = data
    await User.verifyCredentials(email, password)
    const user = await User.findBy('email', email)
    if (user) {
      await auth.use('web').login(user)
    }
    return user
  }
}