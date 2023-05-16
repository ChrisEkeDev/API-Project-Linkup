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
        userId: 2,
        groupId: 1,
        status: 'Organizer'
      },
      {
        userId: 1,
        groupId: 2,
        status: 'Organizer'
      },
      {
        userId: 4,
        groupId: 3,
        status: 'Orangizer'
      },
      {
        userId: 4,
        groupId: 4,
        status: 'Organizer'
      },
      {
        userId: 3,
        groupId: 5,
        status: 'Organizer'
      },
      {
        userId: 3,
        groupId: 1,
        status: 'Member'
      },
      {
        userId: 4,
        groupId: 2,
        status: 'Member'
      },
      {
        userId: 1,
        groupId: 3,
        status: 'Co-Host'
      },
      {
        userId: 2,
        groupId: 5,
        status: 'Member'
      },
      {
        userId: 5,
        groupId: 1,
        status: 'Pending'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Memberships';
    await queryInterface.bulkDelete(options);
  }
};
