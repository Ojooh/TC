'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Galleries', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
  
      folder: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
  
      url: {
        type: Sequelize.STRING(500),
        allowNull: true,
        defaultValue: null,
      },
  
      description: {
        type: Sequelize.STRING,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Galleries');
  }
};