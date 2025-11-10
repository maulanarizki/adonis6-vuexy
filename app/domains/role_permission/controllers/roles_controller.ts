import { HttpContext } from '@adonisjs/core/http'
import RoleService from '#app/domains/role_permission/services/role_service'
import { errors } from '@vinejs/vine'

export default class RolesController {
  protected roleService = new RoleService()

  async index({ view }: HttpContext) {
    return view.render('pages/roles/index')
  }

  async api({ request, response }: HttpContext) {
    const {
      page = 1,
      limit = 10,
      search = '',
      sort = 'created_at',
      direction = 'desc',
    } = request.qs()

    const roles = await this.roleService.getAllGrid({
      page: Number(page),
      limit: Number(limit),
      sortBy: sort,
      sortOrder: direction as 'asc' | 'desc',
      search,
    })

    return response.json({
      data: roles.all(),
      total: roles.total,
    })
  }

  async show({ params, response }: HttpContext) {
    try {
      const role = await this.roleService.findById(params.id)
      await role.load('permissions')
      return response.ok({ success: true, data: role })
    } catch (error) {
      return response.notFound({ success: false, message: 'Role not found.' })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const newRole = await this.roleService.create(request.all())
      return response.created({
        success: true,
        message: 'Role created successfully.',
        data: newRole,
      })
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response
          .status(422)
          .json({ success: false, message: 'Validation failed.', errors: error.messages })
      }
      return response.internalServerError({ success: false, message: 'An error occurred.' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const updatedRole = await this.roleService.update(params.id, request.all())
      return response.ok({
        success: true,
        message: 'Role updated successfully.',
        data: updatedRole,
      })
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response
          .status(422)
          .json({ success: false, message: 'Validation failed.', errors: error.messages })
      }
      return response.internalServerError({ success: false, message: 'An error occurred.' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      await this.roleService.delete(params.id)
      return response.ok({ success: true, message: 'Role deleted successfully.' })
    } catch (error) {
      return response.internalServerError({ success: false, message: 'An error occurred.' })
    }
  }
}
