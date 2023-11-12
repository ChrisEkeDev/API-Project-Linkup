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
        name: 'Backgammon Brothers & Sisters',
        private: false
      },
      {
        captainId: 1,
        name: 'Crochet Stitchers in Atlanta',
        private: false
      },
      {
        captainId: 4,
        name: 'Conspiracy Theorists',
        private: true
      },
      {
        captainId: 4,
        name: 'Web Developers Connect',
        private: true
      },
      {
        captainId: 3,
        name: 'Horse Riders of the Storm',
        private: false
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Teams';
    await queryInterface.bulkDelete(options)
  }
};
