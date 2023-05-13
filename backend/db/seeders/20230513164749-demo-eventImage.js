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
   options.tableName = 'EventImages';
   await queryInterface.bulkInsert(options, [
    {
      eventId: 1,
      url: 'Image url 1',
      preview: true
    },
    {
      eventId: 2,
      url: 'Image url 2',
      preview: true
    },
    {
      eventId: 3,
      url: 'Image url 3',
      preview: true
    },
    {
      eventId: 4,
      url: 'Image url 4',
      preview: true
    },
    {
      eventId: 5,
      url: 'Image url 5',
      preview: true
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
    options.tableName = 'EventImages';
    await queryInterface.bulkDelete('EventImages', null, {})
  }
};
