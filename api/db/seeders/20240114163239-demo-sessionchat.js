'use strict';

/** @type {import('sequelize-cli').Migration} */

const {
  player1uuid, session1uuid,
  player2uuid, session2uuid,
  player3uuid, session3uuid,
  player4uuid, session4uuid,
  player5uuid, session5uuid
} = require('../seedUUIDs')
const { v4: uuidv4 } = require('uuid');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SessionChats';
    await queryInterface.bulkInsert(options, [
      {
        id: uuidv4(),
        content: "Hey everyone, let's plan our next basketball session!",
        sessionId: session1uuid,
        playerId: player2uuid
      },
      {
        id: uuidv4(),
        content: "I'm up for it! Count me in for running 5s.",
        sessionId: session2uuid,
        playerId: player2uuid
      },
      {
        id: uuidv4(),
        content: "Team 1 is looking strong. I'm in as well!",
        sessionId: session3uuid,
        playerId: player3uuid
      },
      {
        id: uuidv4(),
        content: "Checkin in! We'll bring our A-game.",
        sessionId: session4uuid,
        playerId: player4uuid
      },
      {
        id: uuidv4(),
        content: "Im here, and we're ready to dominate!",
        sessionId: session5uuid,
        playerId: player1uuid
      },
      {
        id: uuidv4(),
        content: "I'll join for some friendly competition!",
        sessionId: session5uuid,
        playerId: player2uuid
      },
      {
        id: uuidv4(),
        content: "Checkin in, ready to hit the court and have fun!",
        sessionId: session3uuid,
        playerId: player2uuid
      },
      {
        id: uuidv4(),
        content: "Im just here to enjoy the game and socialize.",
        sessionId: session4uuid,
        playerId: player2uuid
      },
      {
        id: uuidv4(),
        content: "I'll join to balance the teams out.",
        sessionId: session3uuid,
        playerId: player1uuid
      },
      {
        id: uuidv4(),
        content: "Count me in for some private runs as well. Let's do this!",
        sessionId: session4uuid,
        playerId: player1uuid
      },
      {
        id: uuidv4(),
        content: "Alright, we've got our sessions set. When should we play?",
        sessionId: session2uuid,
        playerId: player1uuid
      },
      {
        id: uuidv4(),
        content: "How about Sunday morning at the park court?",
        sessionId: session1uuid,
        playerId: player1uuid
      },
      {
        id: uuidv4(),
        content: "Sunday morning works for me! What time?",
        sessionId: session1uuid,
        playerId: player3uuid
      },
      {
        id: uuidv4(),
        content: "Let's make it 10 AM on Sunday for running 5s.",
        sessionId: session2uuid,
        playerId: player3uuid
      },
      {
        id: uuidv4(),
        content: "Sounds like a plan! Looking forward to hooping.",
        sessionId: session4uuid,
        playerId: player3uuid
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SessionChats';
    await queryInterface.bulkDelete(options);
  }
};
