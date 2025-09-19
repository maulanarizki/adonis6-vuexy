import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim(),
    password: vine.string().minLength(6).trim(),
  })
)
