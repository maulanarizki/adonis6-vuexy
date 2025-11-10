import vine from '@vinejs/vine'

export const createRoleValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
    description: vine.string().trim().optional(),
    permissions: vine.array(vine.number()).optional(),
  })
)

export const updateRoleValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
    description: vine.string().trim().optional(),
    permissions: vine.array(vine.number()).optional(),
  })
)
