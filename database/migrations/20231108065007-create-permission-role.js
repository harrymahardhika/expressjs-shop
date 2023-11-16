/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PermissionRole', {
      permissionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: 'Permissions', key: 'id' }
        }
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: 'Roles', key: 'id' }
        }
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PermissionRole')
  }
}
