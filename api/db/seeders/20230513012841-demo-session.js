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
      address: '123 Fake St Mesa, AZ',
      lat: 33.4151843,
      lng: -111.8314724,
      private: false,
      startDate: '2023-06-15 13:00:00',
      endDate: '2023-06-15 17:00:00'
    },
    {
      creatorId: 2,
      name: 'Backgammon Tournament Final',
      address: '345 Imaginary Ln Atlanta, GA',
      lat: 33.748752,
      lng: -84.38768449999999,
      private: false,
      startDate: '2023-07-15 14:00:00',
      endDate: '2023-07-15 16:00:00'
    },
    {
      creatorId: 3,
      name: 'Horse Ride and Relax',
      address: '1000 Who Cares Blvd Salem, OR',
      lat: 44.9428975,
      lng: -123.0350963,
      private: false,
      startDate: '2023-05-05 12:00:00',
      endDate: '2023-05-05 16:30:00'
    },
    {
      creatorId: 4,
      name: 'Private Meet & Greet',
      address: '78 Nowhere Dr Austin, TX',
      lat: 30.267153,
      lng: -97.7430608,
      private: false,
      startDate: '2023-11-11 22:00:00',
      endDate: '2023-11-12 01:00:00'
    },
    {
      creatorId: 5,
      name: 'Crochet Off for Charity',
      address: '909 Out There Pkwy Mesa, AZ',
      lat: 33.4151843,
      lng: -111.8314724,
      private: false,
      startDate: '2023-10-17 08:00:00',
      endDate: '2023-10-17 12:00:00'
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Sessions';
    await queryInterface.bulkDelete(options)
  }
};
