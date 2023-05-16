'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupImage extends Model {

    static associate(models) {
      GroupImage.belongsTo(models.Group, {
        foreignKey: 'groupId'
      })
    }
  }

  GroupImage.init({
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'Groups',
          key: 'id'
      },
      onDelete: 'CASCADE'
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preview: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'GroupImage',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return GroupImage;
};
