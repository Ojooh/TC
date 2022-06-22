'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Activity.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    permission_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    activity_by: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    owner: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },

    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0',
    }
  }, {
    sequelize,
    modelName: 'Activity',
  });
  return Activity;
};