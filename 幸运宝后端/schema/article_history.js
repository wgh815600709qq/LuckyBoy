module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ArticleHistory', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      article_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      _auditor: {
        type: DataTypes.STRING,
        allowNull: false
      },
      _action: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'article_history',
      paranoid: true // Soft deletion
    })
  }
  