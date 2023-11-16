const router = require('express').Router()
const { validationResult, check } = require('express-validator')
const { User, Role } = require('../models')
const roleConstant = require('../constants/role')

const validate = () => {
  const rules = [
    check('name').isLength({ min: 1 }),
    check('email')
      .isEmail()
      .custom(async (email) => {
        const existingUser = await User.findOne({ where: { email } })

        if (existingUser) {
          throw new Error('Email already in use')
        }
      }),
    check('password').isLength({ min: 6 }),
    check('passwordConfirmation').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password')
      }
      return true
    })
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

router.post('/', validate(), async (req, res) => {
  const { name, email, password } = req.body

  const role = await Role.findOne({ where: { name: roleConstant.ADMINISTRATOR } })

  try {
    await User.create({
      name,
      email,
      password,
      roleId: role.id
    })

    res.json({ message: 'Registration success' })
  } catch (error) {
    res.status(422).json(error)
  }
})

module.exports = router
