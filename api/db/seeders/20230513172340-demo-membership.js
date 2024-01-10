'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Memberships';
    await queryInterface.bulkInsert(options, [
      {
        playerId: 2,
        teamId: 1,
        status: "host"
      },
      {
        playerId: 1,
        teamId: 2,
        status: "host"
      },
      {
        playerId: 4,
        teamId: 3,
        status: "host"
      },
      {
        playerId: 4,
        teamId: 4,
        status: "host"
      },
      {
        playerId: 3,
        teamId: 5,
        status: "host"
      },
      {
        playerId: 2,
        teamId: 5,
        status: "member"
      },
      {
        playerId: 2,
        teamId: 4,
        status: "member"
      },
      {
        playerId: 2,
        teamId: 3,
        status: "member"
      },
      {
        playerId: 1,
        teamId: 4,
        status: "member"
      },
      {
        playerId: 1,
        teamId: 5,
        status: "member"
      },
      {
        playerId: 3,
        teamId: 1,
        status: "member"
      },
      {
        playerId: 3,
        teamId: 2,
        status: "member"
      },
      {
        playerId: 4,
        teamId: 5,
        status: "member"
      },
      {
        playerId: 4,
        teamId: 1,
        status: "member"
      },
      {
        playerId: 5,
        teamId: 1,
        status: "member"
      },
      {
        playerId: 1,
        teamId: 3,
        status: "member"
      },
      {
        playerId: 1,
        teamId: 1,
        status: "member"
      },
      {
        playerId: 2,
        teamId: 2,
        status: "member"
      },
      {
        playerId: 3,
        teamId: 3,
        status: "member"
      },
      {
        playerId: 3,
        teamId: 4,
        status: "member"
      },
      {
        playerId: 4,
        teamId: 2,
        status: "member"
      },
      {
        playerId: 5,
        teamId: 2,
        status: "member"
      },
      {
        playerId: 5,
        teamId: 4,
        status: "member"
      },
      {
        playerId: 5,
        teamId: 3,
        status: "member"
      },
      {
        playerId: 5,
        teamId: 5,
        status: "member"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Memberships';
    await queryInterface.bulkDelete(options);
  }
};
