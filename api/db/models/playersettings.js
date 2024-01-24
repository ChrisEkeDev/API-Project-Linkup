'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class PlayerSettings extends Model {
    static associate(models) {
      PlayerSettings.belongsTo(models.Player, {
        foreignKey: 'playerId',
        targetKey: 'id'
      })
    }
  }
  PlayerSettings.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidv4()
    },
    playerId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    theme: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['light', 'dark'],
    },
    locations: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    notifications: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'PlayerSettings',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return PlayerSettings;
};
