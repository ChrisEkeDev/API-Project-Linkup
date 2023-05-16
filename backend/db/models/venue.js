'use strict';

const { states } = require('../../utils/states');

const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {

    static associate(models) {
      Venue.belongsTo(models.Group, {
        foreignKey: 'groupId'
      })

      Venue.hasMany(models.Event, {
        foreignKey: 'venueId'
      })

    }
  }

  Venue.init({
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,2],
        isUppercase: true,
        isAlpha: true,
        notEmpty: true,
        isIn: [states]
      }
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      min: -90,
      max: 90
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      min: -180,
      max: 180
    }
  }, {
    sequelize,
    modelName: 'Venue',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return Venue;
};
