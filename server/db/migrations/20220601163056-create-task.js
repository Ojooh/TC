'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
  
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
  
      sub_unit: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0,
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
    await queryInterface.dropTable('Tasks');
  }
};