'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Meetings', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
  
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
  
      link: {
        type: Sequelize.STRING(655),
        allowNull: true,
        defaultValue: null,
      },
  
  
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
  
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
  
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '0',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Meetings');
  }
};