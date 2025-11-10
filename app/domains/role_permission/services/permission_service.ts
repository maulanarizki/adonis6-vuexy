import Permission from '#app/domains/role_permission/models/permission'
import {
  createPermissionValidator,
  updatePermissionValidator,
} from '#app/domains/role_permission/validators/permission_validator'

export default class PermissionService {
  async getAllGrid(options: {
    page?: number
    limit?: number
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
    search?: string
  }) {
    const { page = 1, limit = 10, sortBy = 'created_at', sortOrder = 'desc', search } = options
    const query = Permission.query()

    if (search) {
      query.where('name', 'LIKE', `%${search}%`).orWhere('description', 'LIKE', `%${search}%`)
    }

    query.orderBy(sortBy, sortOrder)
    return query.paginate(page, limit)
  }

  async findById(id: number) {
    return Permission.findOrFail(id)
  }

  async create(data: any) {
    const payload = await createPermissionValidator.validate(data)
    return Permission.create(payload)
  }

  async update(id: number, data: any) {
    const permission = await Permission.findOrFail(id)
    const payload = await updatePermissionValidator.validate(data)
    permission.merge(payload)
    await permission.save()
    return permission
  }

  async delete(id: number) {
    const permission = await Permission.findOrFail(id)
    await permission.delete()
  }
}
