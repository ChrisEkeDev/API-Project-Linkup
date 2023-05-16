'use strict';

const { states } = require('../../utils/states');

const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Group, {
        foreignKey: 'organizerId'
      })
      User.belongsToMany(models.Group, {
        through: models.Membership,
        foreignKey: 'userId',
        otherKey: 'groupId'
      })

      User.hasMany(models.Membership)

      User.belongsToMany(models.Event, {
        through: models.Attendance,
        foreignKey: 'userId',
        otherKey: 'eventId'
      })
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) throw new Error('Username cannot be an email address.')
        }
      }
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
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['email', 'hashedPassword', 'createdAt', 'updatedAt']
      }
    }
  });
  return User;
};
