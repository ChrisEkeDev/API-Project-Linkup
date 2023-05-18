'use strict';

const { states } = require('../../utils/states');

const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {

    static associate(models) {
      Group.belongsTo(models.User, {
        as: 'Organizer',
        foreignKey: 'organizerId'
      });

      Group.hasMany(models.Membership, {
        foreignKey: 'groupId'
      })

      Group.hasMany(models.Venue, {
        foreignKey: 'groupId'
      })

      Group.hasMany(models.Event, {
        foreignKey: 'groupId'
      })

      Group.belongsToMany(models.User, {
        through: models.Membership,
        foreignKey: 'groupId',
        otherKey: 'userId'
      })

      Group.hasMany(models.GroupImage, {
        foreignKey: 'groupId'
      })
    }
  }

  Group.init({
    organizerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,60]
      }
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        min: 50
      }
    },
    type: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['In person', 'Online']
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: states
    }
  }, {
    sequelize,
    modelName: 'Group'
  });
  return Group;
};
