'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = 'Sessions';
   await queryInterface.bulkInsert(options, [
    {
      creatorId: 1,
      name: 'Backgammon Tournament Round 1',
      courtId: 1,
      private: false,
      startDate: '2023-12-15T13:00:00.000Z',
      endDate: '2023-12-15T17:00:00.000Z'
    },
    {
      creatorId: 2,
      name: 'Backgammon Tournament Final',
      courtId: 2,
      private: false,
      startDate: '2023-12-15T14:00:00.000Z',
      endDate: '2023-12-15T16:00:00.000Z'
    },
    {
      creatorId: 3,
      name: 'Horse Ride and Relax',
      courtId: 3,
      private: false,
      startDate: '2024-01-05T12:00:00.000Z',
      endDate: '2024-01-05T16:30:00.000Z'
    },
    {
      creatorId: 4,
      name: 'Private Meet & Greet',
      courtId: 4,
      private: false,
      startDate: '2024-01-11T22:00:00.000Z',
      endDate: '2024-01-12T01:00:00.000Z'
    },
    {
      creatorId: 5,
      name: 'Crochet Off for Charity',
      courtId: 5,
      private: false,
      startDate: '2024-01-17T08:00:00.000Z',
      endDate: '2024-01-17T12:00:00.000Z'
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Sessions';
    await queryInterface.bulkDelete(options)
  }
};
