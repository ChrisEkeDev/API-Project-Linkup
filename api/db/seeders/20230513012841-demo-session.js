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
      name: 'Running 5s',
      courtId: 1,
      private: false,
      startDate: '2024-02-04T10:00:00.000Z',
      endDate: '2024-02-04T15:00:00.000Z'
    },
    {
      creatorId: 2,
      name: 'We Tryna Hoop',
      courtId: 2,
      private: false,
      startDate: '2024-02-10T14:00:00.000Z',
      endDate: '2024-02-10T16:00:00.000Z'
    },
    {
      creatorId: 3,
      name: 'Running Games',
      courtId: 3,
      private: false,
      startDate: '2024-01-25T12:00:00.000Z',
      endDate: '2024-01-25T16:30:00.000Z'
    },
    {
      creatorId: 4,
      name: 'Private Runs',
      courtId: 4,
      private: true,
      startDate: '2024-03-11T22:00:00.000Z',
      endDate: '2024-03-12T01:00:00.000Z'
    },
    {
      creatorId: 5,
      name: 'Park Runs',
      courtId: 5,
      private: false,
      startDate: '2024-02-17T08:00:00.000Z',
      endDate: '2024-02-17T12:00:00.000Z'
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Sessions';
    await queryInterface.bulkDelete(options)
  }
};
