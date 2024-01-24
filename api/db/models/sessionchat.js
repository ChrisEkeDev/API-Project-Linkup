'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

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

      SessionChat.hasMany(models.Like, {
        foreignKey: "entityId",
        targetKey: 'id'
      })
    }
  }
  SessionChat.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    content:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    sessionId:  {
      type: DataTypes.UUID,
      allowNull: false
  },
    playerId:  {
      type: DataTypes.UUID,
      allowNull: false
  }
  }, {
    sequelize,
    modelName: 'SessionChat',
  });
  return SessionChat;
};
