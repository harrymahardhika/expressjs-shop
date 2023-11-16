const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  const CategoryProduct = sequelize.define(
    'CategoryProduct',
    {},
    { timestamps: false, tableName: 'CategoryProduct' }
  )

  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Category.belongsToMany(models.Product, { through: CategoryProduct })
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Category'
    }
  )
  return Category
}
