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
    }
  }
  TeamChat.init({
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
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
    playerId:  {
      type: DataTypes.INTEGER,
      allowNull: false
  }
  }, {
    sequelize,
    modelName: 'TeamChat',
  });
  return TeamChat;
};
