import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PermissionRole extends BaseSchema {
  protected tableName = 'permission_role'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('permission_id')
        .unsigned()
        .references('id')
        .inTable('permissions')
        .onDelete('CASCADE')
      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE')
      table.unique(['permission_id', 'role_id'])
      table.timestamps(true, true) // created_at & updated_at with timezone and defaults
    })
  }

  public async down() {
    this.schema.dropTableIfExists(this.tableName)
  }
}