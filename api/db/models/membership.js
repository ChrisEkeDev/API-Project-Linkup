'use strict';
const { Model, Validator } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {

    static associate(models) {
      Membership.belongsTo(models.Player, {
        foreignKey: 'playerId',
        targetKey: 'id'
      })
      Membership.belongsTo(models.Team, {
        foreignKey: 'teamId',
        targetKey: 'id'
      })
    }
  }

  Membership.init({
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
    teamId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['host', 'co-host', 'pending', 'member'],
    }
  }, {
    sequelize,
    modelName: 'Membership',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return Membership;
};
