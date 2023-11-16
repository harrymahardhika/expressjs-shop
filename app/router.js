const router = require('express').Router()
const auth = require('./middlewares/auth')

router.use('/register', require('./controllers/register-controller'))
router.use('/auth', require('./controllers/auth-controller'))
router.use('/categories', require('./controllers/category-controller'))
router.use('/products', require('./controllers/product-controller'))

router.use('/cart', auth, require('./controllers/cart-controller'))
router.use('/orders', auth, require('./controllers/order-controller'))

module.exports = router
