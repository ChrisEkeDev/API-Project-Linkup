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
      capacity: 50,
      price: 50.00,
      startDate: '2023-06-15',
      endDate: '2023-06-18'
    },
    {
      groupId: 1,
      venueId: 5,
      name: 'Backgammon Tournament Final',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'In person',
      capacity: 10,
      price: 0,
      startDate: '2023-07-15',
      endDate: '2023-07-16'
    },
    {
      groupId: 5,
      venueId: 4,
      name: 'Horse Ride and Relax',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'In person',
      capacity: 100,
      price: 250.00,
      startDate: '2023-05-05',
      endDate: '2023-05-06'
    },
    {
      groupId: 3,
      venueId: 3,
      name: 'Private Meet & Greet',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      capacity: 50,
      price: 300.00,
      startDate: '2023-11-11',
      endDate: '2023-11-12'
    },
    {
      groupId: 2,
      venueId: 2,
      name: 'Crochet Off for Charity',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'In person',
      capacity: 150,
      price: 0,
      startDate: '2023-10-10',
      endDate: '2023-10-17'
    },
   ]).catch(e => console.log(e))
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Events';
    await queryInterface.bulkDelete(options)
  }
};
