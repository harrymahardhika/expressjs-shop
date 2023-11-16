const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const { Product, Cart } = require('../models')
const allowedTo = require('../middlewares/permission')
const permission = require('../constants/permission')

const validateAddToCart = () => {
  const rules = [
    check('productId')
      .isInt()
      .custom(async (productId, { req }) => {
        const product = await Product.findByPk(productId)

        if (!product) {
          throw new Error('Product not found')
        }

        const itemExistInCart = await Cart.findOne({
          where: { userId: req.user.id, productId }
        })

        if (itemExistInCart) {
          throw new Error('Product already in cart')
        }
      }),
    check('quantity').isInt({ min: 1 })
  ]

  return [
    rules,
    (req, res, next) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array()
        })
      }

      next()
    }
  ]
}

router.get('/', allowedTo(permission.VIEW_CART), async (req, res) => {
  const cart = await Cart.findAll({
    where: { userId: req.user.id },
    include: ['product']
  })

  res.json(cart)
})

router.post('/', [validateAddToCart(), allowedTo(permission.ADD_TO_CART)], async (req, res) => {
  const { productId, quantity } = req.body

  const product = await Product.findByPk(productId)

  await Cart.create({
    userId: req.user.id,
    productId,
    quantity,
    total: quantity * product.price
  })

  res.json({ message: 'Product added to cart' })
})

router.delete('/:id', allowedTo(permission.DELETE_CART_ITEM), async (req, res) => {
  const cart = await Cart.findByPk(req.params.id)

  if (!cart) {
    return res.status(404).json({ error: 'Cart item not found' })
  }

  await cart.destroy()

  res.json({ message: 'Cart item deleted' })
})

module.exports = router
