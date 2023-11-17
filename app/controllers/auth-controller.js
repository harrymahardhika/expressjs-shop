const router = require('express').Router()
const { User, Token } = require('../models')
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator')
const rs = require('randomstring')

const validateLogin = () => {
  const rules = [check('email').isEmail(), check('password').isLength({ min: 6 })]

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

router.post('/', validateLogin(), async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ where: { email } })

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = Buffer.from(`${rs.generate()}:${rs.generate()}`).toString('base64')
  await Token.create({ token, userId: user.id })

  res.json({ token, user: user.toJSON() })
})

module.exports = router
