const router = require('express').Router()
const { Category } = require('../models')

router.get('/', async (req, res) => {
  const categories = await Category.findAll()
  res.json(categories)
})

router.get('/:id', async (req, res) => {
  const product = await Category.findByPk(req.params.id)

  if (!product) {
    return res.status(404).json({ error: 'Category not found' })
  }

  res.json(product)
})

module.exports = router
