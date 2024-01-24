'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}


module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable('Likes', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
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
        entityId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        entityType: {
          type: Sequelize.ENUM,
          values: ['team-chat', 'session-chat'],
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
      await queryInterface.dropTable('Likes', options);
    }
  };
