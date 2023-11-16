const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const PermissionRole = sequelize.define(
    'PermissionRole',
    {},
    { timestamps: false, tableName: 'PermissionRole' }
  )

  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Permission.belongsToMany(models.Role, { through: PermissionRole })
    }
  }
  Permission.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Permission'
    }
  )
  return Permission
}
