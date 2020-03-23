const Sequelize = require('sequelize');
const db = require('../db');

const UserRound = db.define('userRound', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

module.exports = UserRound;
