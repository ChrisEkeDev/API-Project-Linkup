'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SessionChat extends Model {
    static associate(models) {
      SessionChat.belongsTo(models.Player, {
        foreignKey: "playerId",
        targetKey: 'id'
      })

      SessionChat.belongsTo(models.Session, {
          foreignKey: "sessionId",
          targetKey: 'id'
      })
    }
  }
  SessionChat.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    content:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    sessionId:  {
      type: DataTypes.INTEGER,
      allowNull: false
  },
    playerId:  {
      type: DataTypes.INTEGER,
      allowNull: false
  }
  }, {
    sequelize,
    modelName: 'SessionChat',
  });
  return SessionChat;
};
