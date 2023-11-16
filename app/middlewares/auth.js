const { User, Token } = require('../models')

module.exports = async (req, res, next) => {
  const authorizationToken = req.headers['authorization']
  if (!authorizationToken) {
    res.status(401).send({ error: 'No token provided' })
    return
  }

  const userToken = await Token.findOne({ where: { token: authorizationToken } })
  if (!userToken) {
    res.status(401).send({ error: 'Invalid token' })
    return
  }
  const user = await User.findByPk(userToken.userId)
  req.user = user.toJSON()

  next()
}
