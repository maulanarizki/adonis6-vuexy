// database/seeders/user_seeder.ts
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { UserFactory } from '../factories/user_factory.js'

export default class UserSeeder extends BaseSeeder {
  async run() {
    await UserFactory.createMany(50)
  }
}
