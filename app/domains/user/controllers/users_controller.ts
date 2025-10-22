import UserService from '#app/domains/user/services/user_service'
import { HttpContext } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'
import router from '@adonisjs/core/services/router'
import { dd } from '@adonisjs/core/services/dumper'

export default class UsersController {
  protected userService = new UserService()

  async index({ view }: HttpContext) {
    return view.render('pages/users/index')
  }

  async api({ request, response }: HttpContext) {
    const {
      page = 1,
      limit = 10,
      search = '',
      sort = 'created_at',
      direction = 'desc',
    } = request.qs()

    const users = await this.userService.getAllGrid({
      page: Number(page),
      limit: Number(limit),
      sortBy: sort,
      sortOrder: direction as 'asc' | 'desc',
      search,
    })

    const result = {
      data: users.all(),
      total: users.total,
    }
    return response.json(result)
  }

  /**
   * Mengambil data satu user untuk ditampilkan di modal edit.
   */
  async show({ params, response }: HttpContext) {
    try {
      const user = await this.userService.findById(params.id)
      return response.ok({ success: true, data: user })
    } catch (error) {
      return response.status(404).json({ success: false, message: 'User not found.' })
    }
  }

  /**
   * Menyimpan user baru dari modal.
   */
  async store({ request, response }: HttpContext) {
    try {
      const newUser = await this.userService.create(request.all())
      return response.created({
        success: true,
        message: 'User berhasil ditambahkan!',
        data: newUser,
      })
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json({
          success: false,
          message: 'Validasi gagal.',
          errors: error.messages,
        })
      }
      return response.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server.',
      })
    }
  }

  /**
   * Memperbarui user dari modal.
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const updatedUser = await this.userService.update(params.id, request.all())
      return response.ok({
        success: true,
        message: 'User berhasil diperbarui!',
        data: updatedUser,
      })
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json({
          success: false,
          message: 'Validasi gagal.',
          errors: error.messages,
        })
      }
      return response
        .status(500)
        .json({ success: false, message: 'Terjadi kesalahan pada server.' })
    }
  }

  /**
   * Menghapus user.
   */
  async destroy({ params, response }: HttpContext) {
    try {
      await this.userService.delete(params.id)
      return response.ok({ success: true, message: 'User berhasil dihapus!' })
    } catch (error) {
      // Handle jika user tidak ditemukan
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json({ success: false, message: 'User tidak ditemukan.' })
      }
      return response.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' })
    }
  }
}