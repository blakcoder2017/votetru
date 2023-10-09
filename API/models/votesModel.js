const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/Database');

const votes = db.define(
  'votes',
  {
    vote_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    voter_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    election_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    candidate_id: {
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

module.exports = Votes;
