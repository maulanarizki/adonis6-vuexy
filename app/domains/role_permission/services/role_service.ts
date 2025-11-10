import Role from '#app/domains/role_permission/models/role'
import {
  createRoleValidator,
  updateRoleValidator,
} from '#app/domains/role_permission/validators/role_validator'

export default class RoleService {
  async getAllGrid(options: {
    page?: number
    limit?: number
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
    search?: string
  }) {
    const { page = 1, limit = 10, sortBy = 'created_at', sortOrder = 'desc', search } = options
    const query = Role.query()

    if (search) {
      query.where('name', 'LIKE', `%${search}%`).orWhere('description', 'LIKE', `%${search}%`)
    }

    query.orderBy(sortBy, sortOrder)
    return query.paginate(page, limit)
  }

  async findById(id: number) {
    return Role.findOrFail(id)
  }

  async create(data: any) {
    const payload = await createRoleValidator.validate(data)
    const role = await Role.create(payload)
    if (data.permissions) {
      await role.related('permissions').sync(data.permissions)
    }
    return role
  }

  async update(id: number, data: any) {
    const role = await Role.findOrFail(id)
    const payload = await updateRoleValidator.validate(data)
    role.merge(payload)
    await role.save()

    if (data.permissions) {
      await role.related('permissions').sync(data.permissions)
    } else {
      await role.related('permissions').detach()
    }

    return role
  }

  async delete(id: number) {
    const role = await Role.findOrFail(id)
    await role.delete()
  }
}
