const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  const PermissionRole = sequelize.define(
    'PermissionRole',
    {},
    { timestamps: false, tableName: 'PermissionRole' }
  )

  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Role.hasMany(models.User)
      models.Role.belongsToMany(models.Permission, { through: PermissionRole })
    }
  }
  Role.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Role'
    }
  )
  return Role
}
