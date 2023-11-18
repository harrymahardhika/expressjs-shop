const router = require('express').Router()
const { Op } = require('sequelize')
const { Product } = require('../models')

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = 20
  const offset = (page - 1) * limit
  const query = req.query.q ? req.query.q.trim() : ''

  const filter = {
    name: {
      [Op.like]: `%${query}%`
    }
  }

  // Get the products, including the categories
  const products = await Product.findAll({
    where: query ? filter : {},
    include: ['categories'],
    limit,
    offset
  })

  // Calculate pagination info
  const total = await Product.count({ where: query ? filter : {} })
  const totalPages = Math.ceil(total / limit)
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
    data: products
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
