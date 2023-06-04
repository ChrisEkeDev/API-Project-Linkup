'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {

    static associate(models) {
      Event.belongsTo(models.Venue, {
        foreignKey: 'venueId',
        targetKey: 'id'
      })

      Event.belongsTo(models.Group, {
        foreignKey: 'groupId',
        targetKey: 'id'
      })

      Event.belongsToMany(models.User, {
        through: models.Attendance,
        foreignKey: 'eventId',
        otherKey: 'userId',
        sourceKey: 'id',
        targetKey: 'id'
      })

      Event.hasMany(models.EventImage, {
        foreignKey: 'eventId',
        sourceKey: 'id'
      })

      Event.hasMany(models.Attendance, {
        foreignKey: 'eventId',
        sourceKey: 'id'
      })
    }
  }

  Event.init({
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
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: true
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
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['In person', 'Online']
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
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
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        isNumeric: true
      }
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isDate: true,
        validateDate(value) {
          let enteredDate = new Date(value);
          let currentDate = new Date();
          if (enteredDate < currentDate) throw new Error('Start date must be in the future')
        }
      }
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isDate: true,
        validateDate(value) {
          let enteredDate = new Date(value);
          let startDate = new Date(this.startDate);
          if (enteredDate < startDate) throw new Error('End date is less than start date')
        }
      }
    }
  }, {
    setterMethods: {
      setType: function(value) {
        if (value.toLowerCase() === 'online') this.setDataValue('venueId', null)
      },
      setStartDate: function(value) {
        let startDate = new Date(value).toISOString().slice(0,19).replace('T', ' ');
        this.setDataValue('startDate', startDate)
      },
      setEndDate: function(value) {
        let endDate = new Date(value).toISOString().slice(0,19).replace('T', ' ');
        this.setDataValue('endDate', endDate)
      }
    },
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
