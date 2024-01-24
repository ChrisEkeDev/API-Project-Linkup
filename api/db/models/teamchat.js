'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class TeamChat extends Model {
    static associate(models) {
      TeamChat.belongsTo(models.Player, {
        foreignKey: "playerId",
        targetKey: 'id'
      })
      TeamChat.belongsTo(models.Team, {
          foreignKey: "teamId",
          targetKey: 'id'
      })
      TeamChat.hasMany(models.Like, {
        foreignKey: "entityId",
        targetKey: 'id'
      })
    }
  }
  TeamChat.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    content:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    teamId: {
      type: DataTypes.UUID,
      allowNull: false
  },
    playerId:  {
      type: DataTypes.UUID,
      allowNull: false
  }
  }, {
    sequelize,
    modelName: 'TeamChat',
  });
  return TeamChat;
};
