'use strict';

const { states } = require('../../utils/states');

const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
        notEmpty: true,
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
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: ['In Person', 'Online']
      }
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: states,
        isAlpha: true,
        len: [2,2],
        isUppercase: true
      }
    },
    previewImage: {
      type: DataTypes.STRING,
      defaultValue: null,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Group'
  });
  return Group;
};
