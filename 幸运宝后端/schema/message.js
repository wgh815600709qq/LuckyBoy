module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Message', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      _from: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      _to: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      _message: {
        type: DataTypes.STRING,
        allowNull: false
      },
      _read: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    }, {
      tableName: 'message',
      paranoid: true // Soft deletion
    })
  }
  