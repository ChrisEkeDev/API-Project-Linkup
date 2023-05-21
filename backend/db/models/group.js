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
        foreignKey: 'organizerId',
        targetKey: 'id'
      });

      Group.hasMany(models.Membership, {
        foreignKey: 'groupId',
        sourceKey: 'id'
      })

      Group.hasMany(models.Venue, {
        foreignKey: 'groupId',
        sourceKey: 'id'
      })

      Group.hasMany(models.Event, {
        foreignKey: 'groupId',
        sourceKey: 'id'
      })

      Group.belongsToMany(models.User, {
        through: models.Membership,
        foreignKey: 'groupId',
        otherKey: 'userId',
        sourceKey: 'id',
        targetKey: 'id'
      })

      Group.hasMany(models.GroupImage, {
        foreignKey: 'groupId',
        sourceKey: 'id'
      })
    }
  }

  Group.init({
    id: {
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
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
