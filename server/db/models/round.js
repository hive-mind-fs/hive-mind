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

  gameDate: {
    type: Sequelize.DATE,
    allowNull: false
  }

  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0
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

Round.getRandom = async function() {
  const round = await Round.findOne({
    order: [Sequelize.fn('RANDOM')]
  });
  return round;
};

module.exports = Round;
