'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    username: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },

    fname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    lname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    dob: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },

    age: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    gender: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },

    wedding_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },

    rel_status: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: null,
    },

    phone: {
      type: DataTypes.STRING(300),
      allowNull: true,
      defaultValue: null,
    },

    career: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    photo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    role_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    sub_unit: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null,
    },

    exec_title: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },

    token: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },

    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    },

    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0',
    },

    is_CHOP: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0',
    },

    is_mid_week: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0',
    },
    
    is_sunday: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0',
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};