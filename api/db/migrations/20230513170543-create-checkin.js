'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CheckIns', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      sessionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Sessions',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      playerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Players',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      status: {
        type: Sequelize.ENUM,
        allowNull: false,
        defaultValue: 'pending',
        values: ['pending', 'attending'],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CheckIns', options);
  }
};
