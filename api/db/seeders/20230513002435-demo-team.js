'use strict';

/** @type {import('sequelize-cli').Migration} */

const {
  player1uuid, team1uuid,
  player2uuid, team2uuid,
  player3uuid, team3uuid,
  player4uuid, team4uuid,
  player5uuid, team5uuid
} = require('../seedUUIDs')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Teams';
    await queryInterface.bulkInsert(options, [
      {
        id: team1uuid,
        captainId: player2uuid,
        name: 'Ball Hogs',
        private: false
      },
      {
        id: team2uuid,
        captainId: player1uuid,
        name: 'Lik Buttah',
        private: false
      },
      {
        id: team3uuid,
        captainId: player4uuid,
        name: 'NO Smoking',
        private: true
      },
      {
        id: team4uuid,
        captainId: player4uuid,
        name: 'Air Up There',
        private: true
      },
      {
        id: team5uuid,
        captainId: player3uuid,
        name: 'GameBreakers',
        private: false
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Teams';
    await queryInterface.bulkDelete(options)
  }
};
