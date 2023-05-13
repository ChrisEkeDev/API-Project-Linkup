'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Attendances';
    await queryInterface.bulkInsert(options, [
      {
        eventId: 1,
        userId: 1,
        status: 'Waitlist'
      },
      {
        eventId: 4,
        userId: 2,
        status: 'Waitlist'
      },
      {
        eventId: 3,
        userId: 3,
        status: 'Attending'
      },
      {
        eventId: 2,
        userId: 4,
        status: 'Attending'
      },
      {
        eventId: 5,
        userId: 5,
        status: 'Waitlist'
      },
      {
        eventId: 4,
        userId: 1,
        status: 'Waitlist'
      },
      {
        eventId: 5,
        userId: 2,
        status: 'Waitlist'
      },
      {
        eventId: 1,
        userId: 3,
        status: 'Attending'
      },
      {
        eventId: 5,
        userId: 4,
        status: 'Attending'
      },
      {
        eventId: 3,
        userId: 5,
        status: 'Waitlist'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Attendances';
    await queryInterface.bulkDelete('Attendances', null, {});
  }
};
