'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CheckIn extends Model {

    static associate(models) {
      CheckIn.belongsTo(models.Player, {
        as: 'player',
        foreignKey: 'playerId',
        targetKey: 'id'

      })

      CheckIn.belongsTo(models.Session, {
        as: "session",
        foreignKey: 'sessionId',
        targetKey: 'id'
      })
    }
  }

  CheckIn.init({
    id: {
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sessionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    playerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'CheckIn',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return CheckIn;
};
