'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {

    static associate(models) {
      Player.hasMany(models.Comment, {
        foreignKey: 'playerId',
        sourceKey: 'id'
      })
      // Player.belongsToMany(models.Team, {
      //   through: models.Membership,
      //   foreignKey: 'playerId',
      //   otherKey: 'teamId',
      //   sourceKey: 'id',
      //   targetKey: 'id'
      // })

      // Player.hasMany(models.Membership, {
      //   foreignKey: 'playerId',
      //   sourceKey: 'id'
      // })

      Player.belongsToMany(models.Session, {
        through: models.CheckIn,
        foreignKey: 'playerId',
        otherKey: 'sessionId',
        sourceKey: 'id',
        targetKey: 'id'
      })

      Player.hasMany(models.CheckIn, {
        foreignKey: 'playerId',
        sourceKey: 'id'
      })

      Player.hasMany(models.Like, {
        foreignKey: 'playerId',
        sourceKey: 'id'
      })
    }
  }

  Player.init({
    id: {
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
