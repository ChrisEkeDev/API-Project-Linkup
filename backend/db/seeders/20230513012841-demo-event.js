'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = 'Events';
   await queryInterface.bulkInsert(options, [
    {
      groupId: 1,
      venueId: 1,
      name: 'Backgammon Tournament Round 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'In person',
      private: false,
      capacity: 50,
      price: 50.00,
      startDate: '2023-06-15 13:00:00',
      endDate: '2023-06-15 17:00:00'
    },
    {
      groupId: 1,
      venueId: 5,
      name: 'Backgammon Tournament Final',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'In person',
      private: false,
      capacity: 10,
      price: 0,
      startDate: '2023-07-15 14:00:00',
      endDate: '2023-07-15 16:00:00'
    },
    {
      groupId: 5,
      venueId: 4,
      name: 'Horse Ride and Relax',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'In person',
      private: false,
      capacity: 100,
      price: 250.00,
      startDate: '2023-05-05 12:00:00',
      endDate: '2023-05-05 16:30:00'
    },
    {
      groupId: 3,
      venueId: null,
      name: 'Private Meet & Greet',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      private: false,
      capacity: 50,
      price: 300.00,
      startDate: '2023-11-11 22:00:00',
      endDate: '2023-11-12 01:00:00'
    },
    {
      groupId: 2,
      venueId: 2,
      name: 'Crochet Off for Charity',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'In person',
      private: false,
      capacity: 150,
      price: 0,
      startDate: '2023-10-17 08:00:00',
      endDate: '2023-10-17 12:00:00'
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Events';
    await queryInterface.bulkDelete(options)
  }
};
