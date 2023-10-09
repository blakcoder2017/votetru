const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/Database');

const voters = db.define(
  'voters',
  {
    voter_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    access_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: Boolean,
      defaultValue: false,
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

module.exports = Voters;
