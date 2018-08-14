module.exports = function (sequelize, DataTypes) {
  return sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      _nickname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      _avatar: {
        type: DataTypes.STRING,
        allowNull: false
      },
      _score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      _identity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      open_id: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'user',
      paranoid: true // Soft deletion
    })
  }
  