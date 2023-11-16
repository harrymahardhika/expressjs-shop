const router = require('express').Router()
const { Product } = require('../models')

router.get('/', async (req, res) => {
  const products = await Product.findAll({ include: ['categories'] })
  res.json(products)
})

router.get('/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id, {
    include: ['categories']
  })

  if (!product) {
    return res.status(404).json({ error: 'Product not found' })
  }

  res.json(product)
})

module.exports = router
