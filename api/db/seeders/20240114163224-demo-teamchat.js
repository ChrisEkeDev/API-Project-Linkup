'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'TeamChats';
    await queryInterface.bulkInsert(options, [
      {
        content: "Hey everyone, let's organize a friendly basketball game this weekend!",
        teamId: 1,
        playerId: 2
      },
      {
        content: "Sounds like a great idea! I'm in for the Ball Hogs.",
        teamId: 2,
        playerId: 1
      },
      {
        content: "Count me in too! I'll join the Ball Hogs as well.",
        teamId: 3,
        playerId: 4
      },
      {
        content: "I'm in for Lik Buttah! Let's do this.",
        teamId: 4,
        playerId: 4
      },
      {
        content: "NO Smoking here! We're ready to dominate the court.",
        teamId: 5,
        playerId: 3
      },
      {
        content: "I'll join Lik Buttah. Let's make it a competitive match!",
        teamId: 5,
        playerId: 2
      },
      {
        content: "I'm Air Up There, and I'm bringing my A-game.",
        teamId: 4,
        playerId: 2
      },
      {
        content: "GameBreakers reporting in! Let's have some fun out there.",
        teamId: 3,
        playerId: 2
      },
      {
        content: "I'll join NO Smoking to balance things out.",
        teamId: 4,
        playerId: 1
      },
      {
        content: "Count me in for Air Up There as well!",
        teamId: 5,
        playerId: 1
      },
      {
        content: "Alright, we have our teams set. Let's decide on the date and time.",
        teamId: 3,
        playerId: 1
      },
      {
        content: "How about Sunday afternoon at the local court?",
        teamId: 2,
        playerId: 3
      },
      {
        content: "Sunday works for me! What time?",
        teamId: 5,
        playerId: 4
      },
      {
        content: "Let's make it 2 PM on Sunday.",
        teamId: 1,
        playerId: 5
      },
      {
        content: "Sounds good! See you all there.",
        teamId: 1,
        playerId: 5
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'TeamChats';
    await queryInterface.bulkDelete(options);
  }
};
