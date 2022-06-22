'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gallery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Gallery.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    folder: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    url: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null,
    },

    description: {
      type: DataTypes.STRING,
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

  }, {
    sequelize,
    modelName: 'Gallery',
  });
  return Gallery;
};