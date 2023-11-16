const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const CategoryProduct = sequelize.define(
    'CategoryProduct',
    {},
    { timestamps: false, tableName: 'CategoryProduct' }
  )

  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Product.belongsToMany(models.Category, { through: CategoryProduct, as: 'categories' })
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.STRING,
      imageUrl: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Product'
    }
  )
  return Product
}
