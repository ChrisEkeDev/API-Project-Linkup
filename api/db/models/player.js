'use strict';

const { Model, Validator } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {

    static associate(models) {

      Player.hasMany(models.Session, {
        onDelete: 'CASCADE',
        foreignKey: 'creatorId',
        sourceKey: 'id'
      })

      Player.hasMany(models.Team, {
        onDelete: 'CASCADE',
        foreignKey: 'captainId',
        sourceKey: 'id'
      })

      Player.hasMany(models.TeamChat, {
        onDelete: 'CASCADE',
        foreignKey: 'playerId',
        sourceKey: 'id'
      })

      Player.hasMany(models.SessionChat, {
        onDelete: 'CASCADE',
        foreignKey: 'playerId',
        sourceKey: 'id'
      })


      Player.belongsToMany(models.Team, {
        through: models.Membership,
        foreignKey: 'playerId',
        otherKey: 'teamId',
        sourceKey: 'id',
        targetKey: 'id'
      })

      Player.hasMany(models.Membership, {
        onDelete: 'CASCADE',
        foreignKey: 'playerId',
        sourceKey: 'id'
      })

      Player.belongsToMany(models.Session, {
        through: models.CheckIn,
        foreignKey: 'playerId',
        otherKey: 'sessionId',
        sourceKey: 'id',
        targetKey: 'id'
      })

      Player.hasMany(models.CheckIn, {
        onDelete: 'CASCADE',
        foreignKey: 'playerId',
        sourceKey: 'id'
      })

      Player.hasMany(models.Like, {
        onDelete: 'SET_NULL',
        foreignKey: 'playerId',
        sourceKey: 'id'
      })
    }
  }

  Player.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidv4()
    },
    name:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60,60]
      }
    },
    profileImage: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Player',
    defaultScope: {
      attributes: {
        exclude: ['email', 'hashedPassword', 'updatedAt']
      }
    }
  });
  return Player;
};
