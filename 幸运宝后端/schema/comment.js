module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Comments', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      article_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      reply_id: { // 评论人id
        type: DataTypes.INTEGER,
        allowNull: false
      },
      replyman_id: { // 被评论人的id
        type: DataTypes.INTEGER,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false  
      },
      _content: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'comments',
      paranoid: true // Soft deletion
    })
  }
  