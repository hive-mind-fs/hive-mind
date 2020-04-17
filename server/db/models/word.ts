import Sequelize from 'sequelize';
const db = require('../db');

const Word = db.define('word', {
  word: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

/**
 * Class Methods
 **/
Word.alphabetize = async function() {
  const words = await Word.findAll({ order: [['word', 'ASC']] });

  // something to sort according to first letter
  return words;
};

export default Word;
