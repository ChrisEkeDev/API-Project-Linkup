'use strict';
const { Model, Validator } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

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
      type:DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidv4()
    },
    sessionId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    playerId: {
      type: DataTypes.UUID,
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
