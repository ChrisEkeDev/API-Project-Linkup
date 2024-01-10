'use strict';
const {
  Model, Validator
} = require('sequelize');
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
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    playerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    teamId: {
      type: DataTypes.INTEGER,
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
