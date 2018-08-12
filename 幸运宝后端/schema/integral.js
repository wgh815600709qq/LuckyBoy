module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Integral', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      _action: {
        type: DataTypes.STRING,
        allowNull: false
      },
      _remark: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      _integral: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'integral',
      paranoid: true // Soft deletion
    })
  }
  