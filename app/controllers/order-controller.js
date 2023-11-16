const router = require('express').Router()
const { Order, OrderItem, Cart, sequelize } = require('../models')
const allowedTo = require('../middlewares/permission')
const permission = require('../constants/permission')

router.post('/', allowedTo(permission.ADD_ORDER), async (req, res) => {
  const items = await Cart.findAll({
    where: { userId: req.user.id }
  })

  if (!items.length) {
    return res.status(422).json({ error: 'Cart is empty' })
  }

  const t = await sequelize.transaction()

  try {
    const order = await Order.create(
      {
        userId: req.user.id,
        total: items.reduce((acc, item) => acc + item.total, 0)
      },
      { transaction: t }
    )

    const orderItems = items.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      total: item.total
    }))

    await OrderItem.bulkCreate(orderItems, { transaction: t })
    await Cart.destroy({ where: { userId: req.user.id } })
    await t.commit()

    res.json({ message: 'Order has been created' })
  } catch (error) {
    await t.rollback()
    res.status(500).json({ error: 'Something went wrong' })
  }
})

router.get('/', allowedTo(permission.BROWSE_ORDERS), async (req, res) => {
  const orders = await Order.findAll({
    where: { userId: req.user.id },
    include: [
      {
        model: OrderItem,
        as: 'items',
        include: ['product']
      }
    ]
  })

  res.json(orders)
})

module.exports = router
