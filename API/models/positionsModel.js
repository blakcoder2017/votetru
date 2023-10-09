const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/Database');

const Positions = db.define(
  'positions',
  {
    position_id: {
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
    },
    election_id: {
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

module.exports = Positions;
