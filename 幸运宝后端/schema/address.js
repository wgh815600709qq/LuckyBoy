module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Address', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      _receiver: {
        type: DataTypes.STRING,
        allowNull: false
      },
      _phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      _province: {
        type: DataTypes.STRING,
        allowNull: false
      },
      _city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      _district: {
        type: DataTypes.STRING,
        allowNull: false
      },
      _detail: {
        type: DataTypes.STRING,
        allowNull: false
      },
      is_default: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'address',
      paranoid: true // Soft deletion
    })
  }
  