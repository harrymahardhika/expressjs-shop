const { faker } = require('@faker-js/faker')
const { User, Role } = require('../../app/models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = await Role.findAll()

    for (let i = 0; i < 10; i++) {
      await User.create({
        email: faker.internet.email().toLowerCase(),
        password: 'password',
        name: faker.person.fullName(),
        roleId: roles[Math.floor(Math.random() * roles.length)].id,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tokens', null, {})
    await queryInterface.bulkDelete('Users', null, {})
  }
}
