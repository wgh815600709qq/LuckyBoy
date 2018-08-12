module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Articles', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      _title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      _author: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      _content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      praise_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      comment_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      _status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0 
      },
      class_id: {
        type: DataTypes.INTEGER,
        allowNull: false,  
      },
      area_id: {
        type: DataTypes.INTEGER,
        allowNull: false,  
      }
    }, {
      tableName: 'articles',
      paranoid: true // Soft deletion
    })
  }
  