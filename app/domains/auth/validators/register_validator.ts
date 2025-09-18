import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    full_name: vine.string().minLength(3),
    email: vine.string().email().unique({ table: 'users', column: 'email' }), // ✅ email harus unik
    username: vine.string().minLength(3).unique({ table: 'users', column: 'username' }), // ✅ username harus unik
    password: vine.string().minLength(6).confirmed(), // ✅ password + password_confirmation
  })
)
