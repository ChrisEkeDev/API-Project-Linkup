'use strict';
const { Model, Validator } = require('sequelize');
const { Sequelize } = require('.');
const { Membership } = require('../models')

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {

    static associate(models) {
      Team.belongsTo(models.Player, {
        as: 'captain',
        foreignKey: 'captainId',
        targetKey: 'id'
      });

      Team.hasMany(models.TeamChat, {
        foreignKey: 'teamId',
        sourceKey: 'id'
      })

      Team.hasMany(models.Membership, {
        foreignKey: 'teamId',
        sourceKey: 'id'
      })

      Team.belongsToMany(models.Player, {
        through: models.Membership,
        foreignKey: 'teamId',
        otherKey: 'playerId',
        sourceKey: 'id',
        targetKey: 'id'
      })
    }
  }

  Team.init({
    id: {
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    captainId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [5,60]
      }
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  }, {
    sequelize,
    modelName: 'Team'
  });
  return Team;
};
