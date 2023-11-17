const router = require('express').Router()
const { Product } = require('../models')

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 20
  const offset = (page - 1) * limit

  // Get the products, including the categories
  const products = await Product.findAndCountAll({
    include: ['categories'],
    limit,
    offset
  })

  // Calculate pagination info
  const totalPages = Math.ceil(products.count / limit)
  const hasNextPage = page < totalPages
  const hasPreviousPage = page > 1
  const nextPage = hasNextPage ? page + 1 : null
  const previousPage = hasPreviousPage ? page - 1 : null

  // Send the response
  res.json({
    totalPages,
    currentPage: parseInt(page),
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
    data: products.rows
  })
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
