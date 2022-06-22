'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
        id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },

        user_id: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },  
    
        username: {
          type: Sequelize.STRING(200),
          allowNull: false,
          unique: true,
        },
    
        email: {
          type: Sequelize.STRING(255),
          allowNull: false,
          unique: true,
        },
    
        fname: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
    
        lname: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
    
        dob: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null,
        },
    
        age: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
    
        gender: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
    
        wedding_date: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null,
        },
    
        rel_status: {
          type: Sequelize.STRING(30),
          allowNull: true,
          defaultValue: null,
        },
    
        phone: {
          type: Sequelize.STRING(300),
          allowNull: true,
          defaultValue: null,
        },
    
        career: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
    
        photo: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
    
        role_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },
    
        password: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
    
        sub_unit: {
          type: Sequelize.BIGINT,
          allowNull: true,
          defaultValue: null,
        },
    
        exec_title: {
          type: Sequelize.BIGINT,
          allowNull: false,
          defaultValue: 0,
        },

        token: {
          type: Sequelize.STRING(200),
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
    
        last_login: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null,
        },
    
        is_active: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: '0',
        },

        is_CHOP: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: '0',
        },

        is_mid_week: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: '0',
        },
        
        is_sunday: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: '0',
        },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};