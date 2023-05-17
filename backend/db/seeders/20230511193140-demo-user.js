'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = 'Users';
   await queryInterface.bulkInsert(options, [
    {
      firstName: 'Phil',
      lastName: 'Cartwright',
      username: 'cartyp',
      email: 'pcartwirght@email.com',
      hashedPassword: bcrypt.hashSync('password1', 13),
    },
    {
      firstName: 'Beatrice',
      lastName: 'Hobbs',
      username: 'thequeenb',
      email: 'bhobbs@email.com',
      hashedPassword: bcrypt.hashSync('password2', 13),
    },
    {
      firstName: 'Craig',
      lastName: 'Mackey',
      username: 'craigmack',
      email: 'cmackey@email.com',
      hashedPassword: bcrypt.hashSync('password3', 13),
    },
    {
      firstName: 'Marshall',
      lastName: 'Mitchell',
      username: 'mandm',
      email: 'mmitchell@email.com',
      hashedPassword: bcrypt.hashSync('password4', 13),
    },
    {
      firstName: 'Megan',
      lastName: 'Ballion',
      username: 'megtheballion',
      email: 'mballion@email.com',
      hashedPassword: bcrypt.hashSync('password5', 13),
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    await queryInterface.bulkDelete(options)
  }
};
