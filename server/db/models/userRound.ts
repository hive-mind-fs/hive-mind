import Sequelize from 'sequelize';
const db = require('../db');

const UserRound = db.define('userRound', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  opId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

export default UserRound;
