const permission = require('../../app/constants/permission')
const permissionAssignment = require('../../app/permission-assignment')
const { Role, Permission } = require('../../app/models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const insertPermission = []

    for (const key in permission) {
      insertPermission.push({
        name: permission[key],
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    await queryInterface.bulkInsert('Permissions', insertPermission)

    const permissionRole = []

    for (const role in permissionAssignment) {
      const roleId = await Role.findOne({
        where: {
          name: role
        }
      }).then((role) => role.id)

      for (const permission of permissionAssignment[role]) {
        const permissionId = await Permission.findOne({
          where: {
            name: permission
          }
        }).then((permission) => permission.id)

        permissionRole.push({
          roleId: roleId,
          permissionId: permissionId
        })
      }
    }

    await queryInterface.bulkInsert('PermissionRole', permissionRole)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PermissionRole', null, {})
    await queryInterface.bulkDelete('Permissions', null, {})
  }
}
