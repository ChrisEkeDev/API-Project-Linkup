'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Attendances';
    await queryInterface.bulkInsert(options, [
      {
        eventId: 1,
        userId: 2,
        status: 'Host'
      },
      {
        eventId: 2,
        userId: 2,
        status: 'Host'
      },
      {
        eventId: 3,
        userId: 4,
        status: 'Attending'
      },
      {
        eventId: 1,
        userId: 4,
        status: 'Attending'
      },
      {
        eventId: 5,
        userId: 3,
        status: 'Attending'
      },
      {
        eventId: 4,
        userId: 1,
        status: 'Attending'
      },
      {
        eventId: 5,
        userId: 2,
        status: 'Attending'
      },
      {
        eventId: 3,
        userId: 3,
        status: 'Host'
      },
      {
        eventId: 4,
        userId: 4,
        status: 'Host'
      },
      {
        eventId: 5,
        userId: 1,
        status: 'Host'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Attendances';
    await queryInterface.bulkDelete(options);
  }
};
