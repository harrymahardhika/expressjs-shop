const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const insertCategories = []

    for (let i = 0; i < 10; i++) {
      const name = faker.commerce.department()

      if (!insertCategories.find((category) => category.name === name)) {
        insertCategories.push({
          name: name,
          description: faker.commerce.productDescription(),
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
    }
    await queryInterface.bulkInsert('Categories', insertCategories)

    const insertProducts = []
    for (let i = 0; i < 50; i++) {
      insertProducts.push({
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('Products', insertProducts)

    const categories = await queryInterface.sequelize.query(`SELECT id from Categories`)
    const products = await queryInterface.sequelize.query(`SELECT id from Products`)
    const insertCategoryProducts = []

    for (let i = 0; i < products[0].length; i++) {
      const randomCategories = []
      for (let j = 0; j < 3; j++) {
        const randomCategory = categories[0][Math.floor(Math.random() * categories[0].length)].id
        if (!randomCategories.includes(randomCategory)) {
          randomCategories.push(randomCategory)
        }
      }

      randomCategories.forEach((categoryId) => {
        insertCategoryProducts.push({
          productId: products[0][i].id,
          categoryId
        })
      })
    }
    await queryInterface.bulkInsert('CategoryProduct', insertCategoryProducts)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CategoryProduct', null, {})
    await queryInterface.bulkDelete('Products', null, {})
    await queryInterface.bulkDelete('Categories', null, {})
  }
}
