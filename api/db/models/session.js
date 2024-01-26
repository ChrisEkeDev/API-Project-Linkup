'use strict';
const { Model, Validator, Op, fn, col } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Session extends Model {

    static associate(models) {
      Session.belongsTo(models.Player, {
        as: "creator",
        foreignKey: 'creatorId',
        targetKey: 'id'
      })

      Session.belongsTo(models.Team, {
        as: 'host',
        foreignKey: 'hostId',
        targetKey: 'id'
      })

      Session.belongsToMany(models.Player, {
        through: models.CheckIn,
        foreignKey: 'sessionId',
        otherKey: 'playerId',
        sourceKey: 'id',
        targetKey: 'id'
      })

      Session.hasMany(models.SessionImage, {
        onDelete: 'CASCADE',
        foreignKey: 'sessionId',
        sourceKey: 'id'
      })


      Session.hasMany(models.SessionChat, {
        onDelete: 'CASCADE',
        foreignKey: 'sessionId',
        sourceKey: 'id'
      })

      Session.hasMany(models.CheckIn, {
        onDelete: 'CASCADE',
        foreignKey: 'sessionId',
        sourceKey: 'id'
      })
    }
  }

  Session.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidv4()
    },
    creatorId: {
      type: DataTypes.UUID,
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
    placeId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
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
    },
    hostId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
    modelName: 'Session'
  });
  return Session;
};
