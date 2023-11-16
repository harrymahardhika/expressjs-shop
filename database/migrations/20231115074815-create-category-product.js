/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CategoryProduct', {
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: 'Categories', key: 'id' }
        }
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: 'Products', key: 'id' }
        }
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CategoryProduct')
  }
}
