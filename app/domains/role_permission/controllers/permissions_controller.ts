import { HttpContext } from '@adonisjs/core/http'
import PermissionService from '#app/domains/role_permission/services/permission_service'
import { errors } from '@vinejs/vine'

export default class PermissionsController {
  protected permissionService = new PermissionService()

  async index({ view }: HttpContext) {
    return view.render('pages/permissions/index')
  }

  async api({ request, response }: HttpContext) {
    const {
      page = 1,
      limit = 10,
      search = '',
      sort = 'created_at',
      direction = 'desc',
    } = request.qs()

    const permissions = await this.permissionService.getAllGrid({
      page: Number(page),
      limit: Number(limit),
      sortBy: sort,
      sortOrder: direction as 'asc' | 'desc',
      search,
    })

    return response.json({
      data: permissions.all(),
      total: permissions.total,
    })
  }

  async show({ params, response }: HttpContext) {
    try {
      const permission = await this.permissionService.findById(params.id)
      return response.ok({ success: true, data: permission })
    } catch (error) {
      return response.notFound({ success: false, message: 'Permission not found.' })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const newPermission = await this.permissionService.create(request.all())
      return response.created({
        success: true,
        message: 'Permission created successfully.',
        data: newPermission,
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
      const updatedPermission = await this.permissionService.update(params.id, request.all())
      return response.ok({
        success: true,
        message: 'Permission updated successfully.',
        data: updatedPermission,
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
      await this.permissionService.delete(params.id)
      return response.ok({ success: true, message: 'Permission deleted successfully.' })
    } catch (error) {
      return response.internalServerError({ success: false, message: 'An error occurred.' })
    }
  }
}
