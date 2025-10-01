// database/factories/user_factory.ts
import Factory from '@adonisjs/lucid/factories'
import User from '#app/domains/user/models/user'
import hash from '@adonisjs/core/services/hash'

export const UserFactory = Factory.define(User, async ({ faker }) => {
  return {
    fullName: faker.person.fullName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: await hash.make('password123'), // default password
  }
}).build()
