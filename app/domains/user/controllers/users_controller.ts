import UserService from '#app/domains/user/services/user_service'
import { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  protected userService = new UserService()

  async index({ view }: HttpContext) {
    const users = await this.userService.getAll()
    return view.render('pages/users/index', { users })
  }

  create({ view }: HttpContext) {
    return view.render('pages/users/create')
  }

  async store({ request, response }: HttpContext) {
    await this.userService.create(request.all())
    return response.redirect().toRoute('users.index')
  }

  async show({ params, view }: HttpContext) {
    const user = await this.userService.findById(params.id)
    return view.render('pages/users/show', { user })
  }

  async edit({ params, view }: HttpContext) {
    const user = await this.userService.findById(params.id)
    return view.render('pages/users/edit', { user })
  }

  async update({ params, request, response }: HttpContext) {
    await this.userService.update(params.id, request.all())
    return response.redirect().toRoute('users.index')
  }

  async destroy({ params, response }: HttpContext) {
    await this.userService.delete(params.id)
    return response.redirect().back()
  }
}
