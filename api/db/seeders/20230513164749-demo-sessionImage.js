'use strict';

/** @type {import('sequelize-cli').Migration} */

const {
  session1uuid,
  session2uuid,
  session3uuid,
  session4uuid,
  session5uuid
} = require('../seedUUIDs')
const { v4: uuidv4 } = require('uuid');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = 'SessionImages';
   try {
    await queryInterface.bulkInsert(options, [
      {
        id: uuidv4(),
        sessionId: session1uuid,
        url: 'https://images.unsplash.com/photo-1628924172947-113fb23621b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
      {
        id: uuidv4(),
        sessionId: session2uuid,
        url: 'https://images.unsplash.com/photo-1628924172947-113fb23621b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
      {
        id: uuidv4(),
        sessionId: session3uuid,
        url: 'https://images.unsplash.com/photo-1563606618307-9549e58243ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80'
      },
      {
        id: uuidv4(),
        sessionId: session4uuid,
        url: 'https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
      {
        id: uuidv4(),
        sessionId: session5uuid,
        url: 'https://images.unsplash.com/photo-1470049384172-927891aad5e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      }
     ])
   } catch(error) {
      console.error('Error occurred while seeding:', error);
      throw error;s
   }

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SessionImages';
    await queryInterface.bulkDelete(options)
  }
};
