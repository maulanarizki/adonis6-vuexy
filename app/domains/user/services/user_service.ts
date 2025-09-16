import User from '#app/domains/user/models/user'
import { createUserValidator, updateUserValidator } from '#app/domains/user/validators/user_validator'

export default class UserService {
  async getAll() {
    return User.all()
  }

  async findById(id: number) {
    return User.findOrFail(id)
  }

  async create(data: any) {
    const payload = await createUserValidator.validate(data)
    return User.create(payload)
  }

  async update(id: number, data: any) {
    const user = await User.findOrFail(id)
    const payload = await updateUserValidator.validate(data)
    user.merge(payload)
    await user.save()
    return user
  }

  async delete(id: number) {
    const user = await User.findOrFail(id)
    await user.delete()
  }
}