import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Permission from '#app/domains/role_permission/models/permission'
import User from '#app/domains/user/models/user'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @manyToMany(() => Permission, {
    pivotTable: 'permission_role',
  })
  declare permissions: ManyToMany<typeof Permission>

  @manyToMany(() => User, {
    pivotTable: 'role_user',
  })
  declare users: ManyToMany<typeof User>
}
