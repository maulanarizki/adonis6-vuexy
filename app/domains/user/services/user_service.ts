import User from '#app/domains/user/models/user'
import {
  createUserValidator,
  updateUserValidator,
} from '#app/domains/user/validators/user_validator'
import { dd } from '@adonisjs/core/services/dumper'
import { LucidModel } from '@adonisjs/lucid/types/model'
import { ExtractModelRelations } from '@adonisjs/lucid/types/relations'

export default class UserService {
  // Metode getAll yang sudah di-upgrade
  async getAll(
    options: {
      page?: number
      limit?: number
      sortBy?: string
      sortOrder?: 'asc' | 'desc'
      search?: string
    } = {}
  ) {
    const { page = 1, limit = 10, sortBy = 'created_at', sortOrder = 'desc', search } = options

    const query = User.query()

    if (search) {
      query.where((builder) => {
        builder
          .where('full_name', 'LIKE', `%${search}%`)
          .orWhere('username', 'LIKE', `%${search}%`)
          .orWhere('email', 'LIKE', `%${search}%`)
      })
    }

    query.orderBy(sortBy, sortOrder)

    return query.paginate(page, limit)
  }

  async getAllGrid(
    options: {
      page?: number
      limit?: number
      sortBy?: string
      sortOrder?: 'asc' | 'desc'
      search?: string
    } = {}
  ) {
    // ... implementasi yang ada sudah benar
    const { page = 1, limit = 10, sortBy = 'created_at', sortOrder = 'desc', search } = options
    const query = User.query()
    // dd(search);
    if (search) {
      // dd(search);
      query.where((builder) => {
        builder
          .where('full_name', 'LIKE', `%${search}%`)
          .orWhere('username', 'LIKE', `%${search}%`)
          .orWhere('email', 'LIKE', `%${search}%`)
      })
    }
    query.orderBy(sortBy, sortOrder)
    return query.paginate(page, limit)
  }

  async getForDataTable(options: {
    start: number
    length: number
    searchValue: string
    orderByColumn: string
    orderDirection: 'asc' | 'desc'
  }) {
    const { start, length, searchValue, orderByColumn, orderDirection } = options

    const query = User.query()

    // Pencarian
    if (searchValue) {
      query.where((builder) => {
        builder
          .where('full_name', 'like', `%${searchValue}%`)
          .orWhere('username', 'like', `%${searchValue}%`)
          .orWhere('email', 'like', `%${searchValue}%`)
      })
    }

    // Pengurutan
    query.orderBy(orderByColumn, orderDirection)

    // Paginasi
    const page = Math.floor(start / length) + 1
    return query.paginate(page, length)
  }

  async findById(id: number) {
    return User.findOrFail(id)
  }

  async create(data: any) {
    const payload = await createUserValidator.validate(data)
    const user = await User.create(payload)

    if (data.roles) {
      await user.related('roles').sync(data.roles)
    }

    return user
  }

  async update(id: number, data: any) {
    const user = await User.findOrFail(id)
    const payload = await updateUserValidator.validate(data)
    user.merge(payload)
    await user.save()

    if (data.roles) {
      await user.related('roles').sync(data.roles)
    } else {
      await user.related('roles').detach()
    }

    return user
  }

  async delete(id: number) {
    const user = await User.findOrFail(id)
    await user.delete()
  }
}
