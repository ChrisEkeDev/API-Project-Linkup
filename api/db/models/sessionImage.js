'use strict';
const { Model, Validator } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class SessionImage extends Model {

    static associate(models) {
      SessionImage.belongsTo(models.Session, {
        as: "session",
        foreignKey: 'sessionId',
        targetKey: 'id'
      })
    }
  }

  SessionImage.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidv4()
    },
    sessionId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'SessionImage',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return SessionImage;
};
