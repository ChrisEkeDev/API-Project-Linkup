'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = 'Venues';
   await queryInterface.bulkInsert(options, [
    {
      groupId: 1,
      address: '123 Fake St',
      city: 'Mesa',
      state: 'AZ',
      lat: 33.4151843,
      lng: -111.8314724
    },
    {
      groupId: 2,
      address: '345 Imaginary Ln',
      city: 'Atlanta',
      state: 'GA',
      lat: 33.748752,
      lng: -84.38768449999999
    },
    {
      groupId: 4,
      address: '1000 Who Cares Blvd',
      city: 'Salem',
      state: 'OR',
      lat: 44.9428975,
      lng: -123.0350963
    },
    {
      groupId: 5,
      address: '78 Nowhere Dr',
      city: 'Austin',
      state: 'TX',
      lat: 30.267153,
      lng: -97.7430608
    },
    {
      groupId: 1,
      address: '909 Out There Pkwy',
      city: 'Mesa',
      state: 'AZ',
      lat: 33.4151843,
      lng: -111.8314724
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Venues';
    await queryInterface.bulkDelete(options)
  }
};
