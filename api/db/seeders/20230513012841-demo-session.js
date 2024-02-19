'use strict';

/** @type {import('sequelize-cli').Migration} */

const {
  player1uuid, team1uuid, session1uuid,
  player2uuid, team2uuid, session2uuid,
  player3uuid, team3uuid, session3uuid,
  player4uuid, team4uuid, session4uuid,
  player5uuid, team5uuid, session5uuid
} = require('../seedUUIDs')


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = 'Sessions';
   await queryInterface.bulkInsert(options, [
    {
      id: session1uuid,
      creatorId: player1uuid,
      hostId: team2uuid,
      name: 'Running 5s',
      placeId: 'M3S4C0U2T',
      address: '123 Fake St Mesa, AZ',
      lat: 33.4151843,
      lng: -111.8314724,
      private: false,
      startDate: '2024-04-04T10:00:00.000Z',
      endDate: '2024-04-04T15:00:00.000Z'
    },
    {
      id: session2uuid,
      creatorId: player2uuid,
      hostId: team1uuid,
      name: 'We Tryna Hoop',
      placeId: '4TL4NT4C0U2T',
      address: '345 Imaginary Ln Atlanta, GA',
      lat: 33.748752,
      lng: -84.38768449999999,
      private: false,
      startDate: '2024-04-10T14:00:00.000Z',
      endDate: '2024-04-10T16:00:00.000Z'
    },
    {
      id: session3uuid,
      creatorId: player3uuid,
      hostId: team5uuid,
      name: 'Running Games',
      placeId: '54L3MC0U2T',
      address: '1000 Who Cares Blvd Salem, OR',
      lat: 44.9428975,
      lng: -123.0350963,
      private: false,
      startDate: '2024-03-25T12:00:00.000Z',
      endDate: '2024-03-25T16:30:00.000Z'
    },
    {
      id: session4uuid,
      creatorId: player4uuid,
      hostId: team4uuid,
      name: 'Private Runs',
      placeId: '4U5TINC0U2T',
      address: '78 Nowhere Dr Austin, TX',
      lat: 30.267153,
      lng: -97.7430608,
      private: true,
      startDate: '2024-05-11T22:00:00.000Z',
      endDate: '2024-05-12T01:00:00.000Z'
    },
    {
      id: session5uuid,
      creatorId: player5uuid,
      hostId: null,
      name: 'Park Runs',
      placeId: 'M3542C0U2T',
      address: '909 Out There Pkwy Mesa, AZ',
      lat: 33.4151843,
      lng: -111.8314724,
      private: false,
      startDate: '2024-04-17T08:00:00.000Z',
      endDate: '2024-04-17T12:00:00.000Z'
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Sessions';
    await queryInterface.bulkDelete(options)
  }
};
