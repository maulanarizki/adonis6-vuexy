import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().optional(),
    username: vine
      .string()
      .alphaNumeric()
      .minLength(3)
      .unique(async (db, value) => {
        const user = await db.from('users').where('username', value).first()
        return !user
      }),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(8),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().optional(),
    username: vine.string().alphaNumeric().minLength(3),
    email: vine.string().email(),
    password: vine.string().minLength(8).optional(),
  })
)
