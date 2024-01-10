'use strict';
const { Model, Validator, Op, fn, col } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Session extends Model {

    static associate(models) {
      Session.belongsTo(models.Player, {
        as: "creator",
        foreignKey: 'creatorId',
        targetKey: 'id'
      })

      Session.belongsTo(models.Team, {
        as: "host",
        foreignKey: 'hostId',
        targetKey: 'id'
      })

      Session.belongsTo(models.Court, {
        foreignKey: 'courtId',
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
        foreignKey: 'sessionId',
        sourceKey: 'id'
      })


      Session.hasMany(models.Comment, {
        foreignKey: 'sessionId',
        sourceKey: 'id'
      })

      Session.hasMany(models.CheckIn, {
        foreignKey: 'sessionId',
        sourceKey: 'id'
      })
    }
  }

  Session.init({
    id: {
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    creatorId: {
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
    courtId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hostId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
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
