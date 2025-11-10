import vine from '@vinejs/vine'

export const createPermissionValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
    description: vine.string().trim().optional(),
  })
)

export const updatePermissionValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
    description: vine.string().trim().optional(),
  })
)
