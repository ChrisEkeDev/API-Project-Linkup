'use strict';
/** @type {import('sequelize-cli').Migration} */
const { Sequelize, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sessions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUIDV4,
      },
      creatorId: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        references: {
          model: 'Players',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hostId: {
        type: Sequelize.UUIDV4,
        allowNull: true,
        references: {
          model: 'Teams',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      placeId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lat: {
          type: Sequelize.DECIMAL,
          allowNull: false
      },
      lng: {
          type: Sequelize.DECIMAL,
          allowNull: false
      },
      private: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      startDate: {
        type: Sequelize.STRING,
        allowNull: false
      },
      endDate: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sessions', options);
  }
};
