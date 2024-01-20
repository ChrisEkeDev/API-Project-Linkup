'use strict';

/** @type {import('sequelize-cli').Migration} */

const {
  player1uuid, session1uuid,
  player2uuid, session2uuid,
  player3uuid, session3uuid,
  player4uuid, session4uuid,
  player5uuid, session5uuid
} = require('../seedUUIDs');
const { v4: uuidv4 } = require('uuid');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'CheckIns';
    await queryInterface.bulkInsert(options, [
      {
        id: uuidv4(),
        sessionId: session1uuid,
        playerId: player2uuid,
        status: 'attending'
      },
      {
        id: uuidv4(),
        sessionId: session2uuid,
        playerId: player2uuid,
        status: 'attending'
      },
      {
        id: uuidv4(),
        sessionId: session3uuid,
        playerId: player3uuid,
        status: 'attending'
      },
      {
        id: uuidv4(),
        sessionId: session4uuid,
        playerId: player4uuid,
        status: 'attending'
      },
      {
        id: uuidv4(),
        sessionId: session5uuid,
        playerId: player1uuid,
        status: 'attending'
      },
      {
        id: uuidv4(),
        sessionId: session5uuid,
        playerId: player2uuid,
        status: 'attending'
      },
      {
        id: uuidv4(),
        sessionId: session3uuid,
        playerId: player2uuid,
        status: 'attending'
      },
      {
        id: uuidv4(),
        sessionId: session4uuid,
        playerId: player2uuid,
        status: 'attending'
      },
      {
        id: uuidv4(),
        sessionId: session3uuid,
        playerId: player1uuid,
        status: 'attending'
      },
      {
        id: uuidv4(),
        sessionId: session4uuid,
        playerId: player1uuid,
        status: 'attending'
      },
      {
        id: uuidv4(),
        sessionId: session2uuid,
        playerId: player1uuid,
        status: 'pending'
      },
      {
        id: uuidv4(),
        sessionId: session1uuid,
        playerId: player1uuid,
        status: 'attending'
      },
      {
        id: uuidv4(),
        sessionId: session1uuid,
        playerId: player3uuid,
        status: 'attending'
      },
      {
        id: uuidv4(),
        sessionId: session2uuid,
        playerId: player3uuid,
        status: 'pending'
      },
      {
        id: uuidv4(),
        sessionId: session4uuid,
        playerId: player3uuid,
        status: 'attending'
      },
      {
        id: uuidv4(),
        sessionId: session5uuid,
        playerId: player3uuid,
        status: 'attending'
      },
      {
        id: uuidv4(),
        sessionId: session3uuid,
        playerId: player4uuid,
        status: 'attending'
      },
      {
        id: uuidv4(),
        sessionId: session1uuid,
        playerId: player4uuid,
        status: 'attending'
      },
      {
        id: uuidv4(),
        sessionId: session2uuid,
        playerId: player4uuid,
        status: 'attending'
      },
      {
        id: uuidv4(),
        sessionId: session5uuid,
        playerId: player4uuid,
        status: 'pending'
      },
      {
        id: uuidv4(),
        sessionId: session4uuid,
        playerId: player5uuid,
        status: 'attending'
      },
      {
        id: uuidv4(),
        sessionId: session5uuid,
        playerId: player5uuid,
        status: 'attending'
      },
      {
        id: uuidv4(),
        sessionId: session1uuid,
        playerId: player5uuid,
        status: 'pending'
      },
      {
        id: uuidv4(),
        sessionId: session2uuid,
        playerId: player5uuid,
        status: 'attending'
      },
      {
        id: uuidv4(),
        sessionId: session3uuid,
        playerId: player5uuid,
        status: 'attending'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'CheckIns';
    await queryInterface.bulkDelete(options);
  }
};
