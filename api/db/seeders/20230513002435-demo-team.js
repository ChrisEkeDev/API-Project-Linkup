'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Teams';
    await queryInterface.bulkInsert(options, [
      {
        captainId: 2,
        name: 'Ball Hogs',
        private: false
      },
      {
        captainId: 1,
        name: 'Lik Buttah',
        private: false
      },
      {
        captainId: 4,
        name: 'NO Smoking',
        private: true
      },
      {
        captainId: 4,
        name: 'Air Up There',
        private: true
      },
      {
        captainId: 3,
        name: 'GameBreakers',
        private: false
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Teams';
    await queryInterface.bulkDelete(options)
  }
};
