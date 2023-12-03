'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}


module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable('Comments', {
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
        text: {
            type: Sequelize.STRING,
            allowNull: false
        },
        replyTo: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'Comments',
                key: 'id'
            },
            onDelete: 'SET NULL'
        },
        courtId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Courts',
            key: 'id'
          }
        },
        sessionId: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
              model: 'Sessions',
              key: 'id'
            }
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
      await queryInterface.dropTable('Comments', options);
    }
  };
