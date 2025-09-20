import User from '#app/domains/user/models/user'
import { registerValidator } from '#app/domains/auth/validators/register_validator'
import { loginValidator } from '#app/domains/auth/validators/login_validator'
import { HttpContext } from '@adonisjs/core/http'
import { Exception } from '@adonisjs/core/exceptions'
import { dd } from '@adonisjs/core/services/dumper'

export default class AuthService {
  async register(data: any) {
    const payload = await registerValidator.validate(data)
    const user = await User.create(payload)
    return user
  }

  async login({ auth }: HttpContext, data: { email: string; password: string }) {
    // Cari user berdasarkan email atau username
    const identifier = data.email

    // Cari user berdasarkan email ATAU username
    const user = await User.query()
      .where('email', identifier)
      .orWhere('username', identifier)
      .first()

    if (!user) {
      throw new Exception('User tidak ditemukan', {
        status: 400,
        code: 'E_INVALID_AUTH_UID',
      })
    }

    // Verifikasi password
    const isValid = await user.verifyPassword(data.password)
    if (!isValid) {
      throw new Exception('Password salah', { status: 400, code: 'E_INVALID_AUTH_PASSWORD' })
    }

    // Login user
    await auth.use('web').login(user)

    return user
  }
}
