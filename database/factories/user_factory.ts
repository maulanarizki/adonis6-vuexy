// database/factories/user_factory.ts
import Factory from '@adonisjs/lucid/factories'
import User from '#app/domains/user/models/user'
import hash from '@adonisjs/core/services/hash'

export const UserFactory = Factory.define(User, async ({ faker }) => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const uniqueSuffix = Date.now() + Math.random().toString(36).substring(2, 7)

  return {
    fullName: `${firstName} ${lastName}`,
    username: `${faker.internet.userName({ firstName, lastName })}_${uniqueSuffix}`,
    email: faker.internet.email({ firstName, lastName, provider: `example.com` }).replace('@', `+${uniqueSuffix}@`),
    password: await hash.make('password123'), // default password
  }
}).build()