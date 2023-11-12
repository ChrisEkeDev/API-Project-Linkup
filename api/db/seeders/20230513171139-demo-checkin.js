'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'CheckIns';
    await queryInterface.bulkInsert(options, [
      {
        sessionId: 1,
        playerId: 2
      },
      {
        sessionId: 2,
        playerId: 2
      },
      {
        sessionId: 3,
        playerId: 3
      },
      {
        sessionId: 4,
        playerId: 4
      },
      {
        sessionId: 5,
        playerId: 1
      },
      {
        sessionId: 5,
        playerId: 2
      },
      {
        sessionId: 3,
        playerId: 2
      },
      {
        sessionId: 4,
        playerId: 2
      },
      {
        sessionId: 3,
        playerId: 1
      },
      {
        sessionId: 4,
        playerId: 1
      },
      {
        sessionId: 2,
        playerId: 1
      },
      {
        sessionId: 1,
        playerId: 1
      },
      {
        sessionId: 1,
        playerId: 3
      },
      {
        sessionId: 2,
        playerId: 3
      },
      {
        sessionId: 4,
        playerId: 3
      },
      {
        sessionId: 5,
        playerId: 3
      },
      {
        sessionId: 3,
        playerId: 4
      },
      {
        sessionId: 1,
        playerId: 4
      },
      {
        sessionId: 2,
        playerId: 4
      },
      {
        sessionId: 5,
        playerId: 4
      },
      {
        sessionId: 4,
        playerId: 5
      },
      {
        sessionId: 5,
        playerId: 5
      },
      {
        sessionId: 1,
        playerId: 5
      },
      {
        sessionId: 2,
        playerId: 5
      },
      {
        sessionId: 3,
        playerId: 5
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'CheckIns';
    await queryInterface.bulkDelete(options);
  }
};
