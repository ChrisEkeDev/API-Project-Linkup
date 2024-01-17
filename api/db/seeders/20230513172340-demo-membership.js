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
    options.tableName = 'Memberships';
    await queryInterface.bulkInsert(options, [
      {
        id: uuidv4(),
        playerId: player2uuid,
        teamId: team1uuid,
        status: "host"
      },
      {
        id: uuidv4(),
        playerId: player1uuid,
        teamId: team2uuid,
        status: "host"
      },
      {
        id: uuidv4(),
        playerId: player4uuid,
        teamId: team3uuid,
        status: "host"
      },
      {
        id: uuidv4(),
        playerId: player4uuid,
        teamId: team4uuid,
        status: "host"
      },
      {
        id: uuidv4(),
        playerId: player3uuid,
        teamId: team5uuid,
        status: "host"
      },
      {
        id: uuidv4(),
        playerId: player2uuid,
        teamId: team5uuid,
        status: "co-host"
      },
      {
        id: uuidv4(),
        playerId: player2uuid,
        teamId: team4uuid,
        status: "member"
      },
      {
        id: uuidv4(),
        playerId: player2uuid,
        teamId: team3uuid,
        status: "pending"
      },
      {
        id: uuidv4(),
        playerId: player1uuid,
        teamId: team4uuid,
        status: "co-host"
      },
      {
        id: uuidv4(),
        playerId: player1uuid,
        teamId: team5uuid,
        status: "member"
      },
      {
        id: uuidv4(),
        playerId: player3uuid,
        teamId: team1uuid,
        status: "pending"
      },
      {
        id: uuidv4(),
        playerId: player3uuid,
        teamId: team2uuid,
        status: "member"
      },
      {
        id: uuidv4(),
        playerId: player4uuid,
        teamId: team5uuid,
        status: "pending"
      },
      {
        id: uuidv4(),
        playerId: player4uuid,
        teamId: team1uuid,
        status: "member"
      },
      {
        id: uuidv4(),
        playerId: player5uuid,
        teamId: team1uuid,
        status: "member"
      },
      {
        id: uuidv4(),
        playerId: player1uuid,
        teamId: team3uuid,
        status: "member"
      },
      {
        id: uuidv4(),
        playerId: player1uuid,
        teamId: team1uuid,
        status: "pending"
      },
      {
        id: uuidv4(),
        playerId: player2uuid,
        teamId: team2uuid,
        status: "member"
      },
      {
        id: uuidv4(),
        playerId: player3uuid,
        teamId: team3uuid,
        status: "member"
      },
      {
        id: uuidv4(),
        playerId: player3uuid,
        teamId: team4uuid,
        status: "pending"
      },
      {
        id: uuidv4(),
        playerId: player4uuid,
        teamId: team2uuid,
        status: "pending"
      },
      {
        id: uuidv4(),
        playerId: player5uuid,
        teamId: team2uuid,
        status: "pending"
      },
      {
        id: uuidv4(),
        playerId: player5uuid,
        teamId: team4uuid,
        status: "member"
      },
      {
        id: uuidv4(),
        playerId: player5uuid,
        teamId: team3uuid,
        status: "co-host"
      },
      {
        id: uuidv4(),
        playerId: player5uuid,
        teamId: team5uuid,
        status: "member"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Memberships';
    await queryInterface.bulkDelete(options);
  }
};
