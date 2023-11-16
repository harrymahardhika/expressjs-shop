const { Model } = require('sequelize')
const orderStatus = require('../constants/order-status')

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // define association here
      models.Order.belongsTo(models.User)
      models.Order.hasMany(models.OrderItem, { as: 'items' })
    }
  }
  Order.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      number: { type: DataTypes.STRING },
      status: { type: DataTypes.STRING, defaultValue: orderStatus.PENDING },
      total: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
    },
    {
      sequelize,
      modelName: 'Order'
    }
  )

  Order.beforeCreate(async (order, options) => {
    try {
      const count = await Order.count()
      const numberParts = [
        'ORD',
        new Date().getFullYear() + new Date().getMonth() + new Date().getDate(),
        Math.floor(Math.random() * 1000),
        count + 1
      ]

      order.number = numberParts.join('-')
    } catch (err) {
      throw new Error(err)
    }
  })

  return Order
}
