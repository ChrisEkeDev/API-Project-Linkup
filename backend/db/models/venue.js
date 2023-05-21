'use strict';

const { states } = require('../../utils/states');

const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {

    static associate(models) {
      Venue.belongsTo(models.Group, {
        foreignKey: 'groupId',
        targetKey: 'id'
      })

      Venue.hasMany(models.Event, {
        foreignKey: 'venueId',
        sourceKey: 'id'
      })

    }
  }

  Venue.init({
    id: {
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
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
      type: DataTypes.ENUM,
      allowNull: false,
      values: states
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
