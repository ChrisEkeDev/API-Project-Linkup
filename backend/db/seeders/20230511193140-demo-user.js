'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

/** @type {import('sequelize-cli').Migration} */
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
   options.tableName = 'Users';
   await queryInterface.bulkInsert(options, [
    {
      firstName: 'Phil',
      lastName: 'Cartwright',
      username: 'cartyp',
      email: 'pcartwirght@email.com',
      hashedPassword: bcrypt.hashSync('password1'),
    },
    {
      firstName: 'Beatrice',
      lastName: 'Hobbs',
      username: 'thequeenb',
      email: 'bhobbs@email.com',
      hashedPassword: bcrypt.hashSync('password2'),
    },
    {
      firstName: 'Craig',
      lastName: 'Mackey',
      username: 'craigmack',
      email: 'cmackey@email.com',
      hashedPassword: bcrypt.hashSync('password3'),
    },
    {
      firstName: 'Marshall',
      lastName: 'Mitchell',
      username: 'mandm',
      email: 'mmitchell@email.com',
      hashedPassword: bcrypt.hashSync('password4'),
    },
    {
      firstName: 'Megan',
      lastName: 'Ballion',
      username: 'megtheballion',
      email: 'mballion@email.com',
      hashedPassword: bcrypt.hashSync('password5'),
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const { User } = require('../models');
    let users = await User.findAll();
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      await user.destroy()
    }
  }
};
