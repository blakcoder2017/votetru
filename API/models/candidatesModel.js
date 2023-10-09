const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/Database');

const Candidates = db.define(
  'candidates',
  {
    candidate_id: {
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
    position_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
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

module.exports = Candidates;
