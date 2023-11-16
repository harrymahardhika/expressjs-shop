const router = require('express').Router()
const { User, Token } = require('../models')
const bcrypt = require('bcrypt')
const randomString = require('randomstring')

const validateLogin = () => {}
router.post('/', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ where: { email } })

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = Buffer.from(`${randomString.generate()}:${randomString.generate()}`).toString(
    'base64'
  )
  await Token.create({ token, userId: user.id })

  res.json({ token })
})

module.exports = router
