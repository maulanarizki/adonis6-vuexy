import User from '#app/domains/user/models/user'
import { registerValidator } from '#app/domains/auth/validators/register_validator'
import { loginValidator } from '#app/domains/auth/validators/login_validator'
import { HttpContext } from '@adonisjs/core/http'
import { dd } from '@adonisjs/core/services/dumper'

export default class AuthService {
  async register(data: any) {
    const payload = await registerValidator.validate(data)
    const user = await User.create(payload)
    return user
  }

  // FIX 3: 'request' yang tidak terpakai dihapus dari destructuring
  async login({ auth }: HttpContext, data: any) {
    // ✅ langsung gunakan AuthFinder
    const payload = await loginValidator.validate(data)
    dd(payload)
    const user = await User.verifyCredentials(data.email, data.password)

    // ✅ login user
    await auth.use('web').login(user)

    return user
  }
}
