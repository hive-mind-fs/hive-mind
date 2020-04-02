const Sequelize = require('sequelize');
const db = require('../db');

const Round = db.define('round', {
  letters: {
    type: Sequelize.STRING,
    allowNull: false
  },

  coreLetter: {
    type: Sequelize.STRING,
    allowNull: false
  },

  possiblePoints: {
    type: Sequelize.INTEGER,
    allowNull: true
  },

  pangramList: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: true
  }
});

/**
 * Hooks
 */

const alphabetizeLetters = round => {
  round.letters = round.letters
    .split('')
    .sort()
    .join('');
};

Round.beforeCreate(alphabetizeLetters);
Round.beforeUpdate(alphabetizeLetters);
Round.beforeBulkCreate(Round => {
  Round.forEach(alphabetizeLetters);
});

/**
 * Class Methods
 **/

Round.getRandom = async function(options = {}) {
  const round = await Round.findOne({
    order: [Sequelize.fn('RANDOM')],
    ...options
  });
  return round;
};

module.exports = Round;
