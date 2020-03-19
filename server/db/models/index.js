const Game = require("./game");
const Round = require("./round");
const User = require("./user");
const Word = require("./word");
const UserRound = require("./userRound");
const GuessedWord = require("./guessedWord");
const db = require("../db");

/** Model associations here **/

/*
TO DO:
Round … given a round, set letters. Query MongoDb
Create tests for associations
*/

/* One-to-one associations */
// One game has one winner
// Winner as the accessor method instead of user
Game.belongsTo(User, { as: "winner", foreignKey: "winnerId" });

/* One-to-many associations */

// One game has many rounds
Game.hasMany(Round);
Round.belongsTo(Game);

/* Many-to-many associations */

// Rounds contain many users
// Users can play in many rounds
User.belongsToMany(Round, { through: UserRound });
Round.belongsToMany(User, { through: UserRound });

// Rounds contain many words
// Words can belong to diff rounds
Word.belongsToMany(Round, { through: "roundWords" });
Round.belongsToMany(Word, { through: "roundWords" });

/* A user can guess many words in a particular round */
/* A word can be guessed by many users */
Word.belongsToMany(UserRound, { through: GuessedWord });
UserRound.belongsToMany(Word, { through: GuessedWord });

/** Instance methods here **/

Word.alphabetize = async function() {
  const words = await Word.findAll({ order: [["word", "ASC"]] });

  // something to sort according to first letter
  return words;
};

/** Instance methods here **/

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  Game,
  Round,
  User,
  Word,
  UserRound,
  GuessedWord,
  db
};
