'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SessionChats';
    await queryInterface.bulkInsert(options, [
      {
        content: "Hey everyone, let's plan our next basketball session!",
        sessionId: 1,
        playerId: 2
      },
      {
        content: "I'm up for it! Count me in for running 5s.",
        sessionId: 2,
        playerId: 2
      },
      {
        content: "Team 1 is looking strong. I'm in as well!",
        sessionId: 3,
        playerId: 3
      },
      {
        content: "Checkin in! We'll bring our A-game.",
        sessionId: 4,
        playerId: 4
      },
      {
        content: "Im here, and we're ready to dominate!",
        sessionId: 5,
        playerId: 1
      },
      {
        content: "I'll join for some friendly competition!",
        sessionId: 5,
        playerId: 2
      },
      {
        content: "Checkin in, ready to hit the court and have fun!",
        sessionId: 3,
        playerId: 2
      },
      {
        content: "Im just here to enjoy the game and socialize.",
        sessionId: 4,
        playerId: 2
      },
      {
        content: "I'll join to balance the teams out.",
        sessionId: 3,
        playerId: 1
      },
      {
        content: "Count me in for some private runs as well. Let's do this!",
        sessionId: 4,
        playerId: 1
      },
      {
        content: "Alright, we've got our sessions set. When should we play?",
        sessionId: 2,
        playerId: 1
      },
      {
        content: "How about Sunday morning at the park court?",
        sessionId: 1,
        playerId: 1
      },
      {
        content: "Sunday morning works for me! What time?",
        sessionId: 1,
        playerId: 3
      },
      {
        content: "Let's make it 10 AM on Sunday for running 5s.",
        sessionId: 2,
        playerId: 3
      },
      {
        content: "Sounds like a plan! Looking forward to hooping.",
        sessionId: 4,
        playerId: 3
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SessionChats';
    await queryInterface.bulkDelete(options);
  }
};
