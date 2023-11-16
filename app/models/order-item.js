const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      // define association here
      models.OrderItem.belongsTo(models.Order)
      models.OrderItem.belongsTo(models.Product, { as: 'product' })
    }
  }
  OrderItem.init(
    {
      orderId: { type: DataTypes.INTEGER, allowNull: false },
      productId: { type: DataTypes.INTEGER, allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      total: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
    },
    {
      sequelize,
      modelName: 'OrderItem'
    }
  )
  return OrderItem
}
