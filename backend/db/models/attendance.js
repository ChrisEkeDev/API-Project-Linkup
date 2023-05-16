'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {

    static associate(models) {
      Attendance.belongsTo(models.User, {
        foreignKey: 'userId'
      })

      Attendance.belongsTo(models.Event, {
        foreignKey: 'eventId'
      })
    }
  }

  Attendance.init({
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Events',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Waitlist', 'Attending']]
      }
    }
  }, {
    sequelize,
    modelName: 'Attendance',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return Attendance;
};
