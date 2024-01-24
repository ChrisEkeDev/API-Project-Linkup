'use strict';

/** @type {import('sequelize-cli').Migration} */

const {
  player1uuid,
  player2uuid,
  player3uuid,
  player4uuid,
  player5uuid
} = require('../seedUUIDs');
const { v4: uuidv4 } = require('uuid');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'PlayerSettings';
    await queryInterface.bulkInsert(options, [
      {
        id: uuidv4(),
        playerId: player1uuid,
        theme: 'light',
        locations: false,
        notifications: false,
      },
      {
        id: uuidv4(),
        playerId: player2uuid,
        theme: 'light',
        locations: false,
        notifications: false,
      },
      {
        id: uuidv4(),
        playerId: player3uuid,
        theme: 'dark',
        locations: false,
        notifications: false,
      },
      {
        id: uuidv4(),
        playerId: player4uuid,
        theme: 'light',
        locations: false,
        notifications: false,
      },
      {
        id: uuidv4(),
        playerId: player5uuid,
        theme: 'light',
        locations: false,
        notifications: false,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'PlayerSettings';
    await queryInterface.bulkDelete(options);
  }
};
