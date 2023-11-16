const { Role, Permission } = require('../models')

module.exports = (permission) => {
  return async (req, res, next) => {
    const user = req.user
    const userPermissions = await Role.findOne({
      where: { id: user.roleId },
      include: { model: Permission }
    }).then((role) => {
      return role.Permissions.map((permission) => permission.name)
    })

    if (!userPermissions.includes(permission)) {
      res.status(403).send({ error: 'You are not allowed to access this resource' })
      return
    }

    next()
  }
}
