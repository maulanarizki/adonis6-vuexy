import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().unique(async (db, value) => {
      const user = await db.from('users').where('email', value).first()
      return !user
    }),
    password: vine.string().minLength(8),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
  })
)