'use strict';

/** @type {import('sequelize-cli').Migration} */

const {
  player1uuid, team1uuid,
  player2uuid, team2uuid,
  player3uuid, team3uuid,
  player4uuid, team4uuid,
  player5uuid, team5uuid
} = require('../seedUUIDs')
const { v4: uuidv4 } = require('uuid');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'TeamChats';
    await queryInterface.bulkInsert(options, [
      {
        id: uuidv4(),
        content: "Hey everyone, let's organize a friendly basketball game this weekend!",
        teamId: team1uuid,
        playerId: player2uuid
      },
      {
        id: uuidv4(),
        content: "Sounds like a great idea! I'm in for the Ball Hogs.",
        teamId: team2uuid,
        playerId: player1uuid
      },
      {
        id: uuidv4(),
        content: "Count me in too! I'll join the Ball Hogs as well.",
        teamId: team3uuid,
        playerId: player4uuid
      },
      {
        id: uuidv4(),
        content: "I'm in for Lik Buttah! Let's do this.",
        teamId: team4uuid,
        playerId: player4uuid
      },
      {
        id: uuidv4(),
        content: "NO Smoking here! We're ready to dominate the court.",
        teamId: team5uuid,
        playerId: player3uuid
      },
      {
        id: uuidv4(),
        content: "I'll join Lik Buttah. Let's make it a competitive match!",
        teamId: team5uuid,
        playerId: player2uuid
      },
      {
        id: uuidv4(),
        content: "I'm Air Up There, and I'm bringing my A-game.",
        teamId: team4uuid,
        playerId: player2uuid
      },
      {
        id: uuidv4(),
        content: "GameBreakers reporting in! Let's have some fun out there.",
        teamId: team3uuid,
        playerId: player2uuid
      },
      {
        id: uuidv4(),
        content: "I'll join NO Smoking to balance things out.",
        teamId: team4uuid,
        playerId: player1uuid
      },
      {
        id: uuidv4(),
        content: "Count me in for Air Up There as well!",
        teamId: team5uuid,
        playerId: player1uuid
      },
      {
        id: uuidv4(),
        content: "Alright, we have our teams set. Let's decide on the date and time.",
        teamId: team3uuid,
        playerId: player1uuid
      },
      {
        id: uuidv4(),
        content: "How about Sunday afternoon at the local court?",
        teamId: team2uuid,
        playerId: player3uuid
      },
      {
        id: uuidv4(),
        content: "Sunday works for me! What time?",
        teamId: team5uuid,
        playerId: player4uuid
      },
      {
        id: uuidv4(),
        content: "Let's make it 2 PM on Sunday.",
        teamId: team1uuid,
        playerId: player5uuid
      },
      {
        id: uuidv4(),
        content: "Sounds good! See you all there.",
        teamId: team1uuid,
        playerId: player5uuid
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'TeamChats';
    await queryInterface.bulkDelete(options);
  }
};
