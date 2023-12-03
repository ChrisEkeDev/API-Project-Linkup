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
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        playerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Players',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        courtId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Courts',
              key: 'id'
            },
            onDelete: 'CASCADE'
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
