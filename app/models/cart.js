const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Cart.belongsTo(models.User, { as: 'user' })
      models.Cart.belongsTo(models.Product, { as: 'product' })
    }
  }
  Cart.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      productId: { type: DataTypes.INTEGER, allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      total: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
    },
    {
      sequelize,
      modelName: 'Cart',
      tableName: 'Cart'
    }
  )
  return Cart
}
