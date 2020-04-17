import Sequelize from 'sequelize';
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

Round.getRandom = async function(opts = {}) {
  const defaultOptions = {
    order: [Sequelize.fn('RANDOM')]
  };
  const round = await Round.findOne({
    ...defaultOptions,
    ...opts
  });
  return round;
};

export default Round;
