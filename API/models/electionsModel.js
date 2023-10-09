const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/Database');

const Elections = db.define(
  'elections',
  {
    election_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startdate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    enddate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Elections;
