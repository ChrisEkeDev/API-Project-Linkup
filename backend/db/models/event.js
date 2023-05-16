'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {

    static associate(models) {
      Event.belongsTo(models.Venue, {
        foreignKey: 'venueId'
      })

      Event.belongsTo(models.Group, {
        foreignKey: 'groupId'
      })

      Event.belongsToMany(models.User, {
        through: models.Attendance,
        foreignKey: 'eventId',
        otherKey: 'userId'
      })

      Event.hasMany(models.EventImage, {
        foreignKey: 'eventId'
      })

      Event.hasMany(models.Attendance, {
        foreignKey: 'eventId'
      })
    }
  }

  Event.init({
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    venueId: {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['In person', 'Online']]
      }
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        isNumeric: true
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        isNumeric: true
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        validateDate(value) {
          let enteredDate = new Date(value);
          let currentDate = new Date();
          if (enteredDate < currentDate) throw new Error('Start date must be in the future')
        }
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        validateDate(value) {
          let enteredDate = new Date(value);
          let startDate = new Date(this.startDate);
          if (enteredDate < startDate) throw new Error('End date is less than start date')
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Event',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return Event;
};
