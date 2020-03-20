'use strict';

const db = require('../server/db');

const {
  User,
  Round,
  Game,
  Word,
  UserRound,
  GuessedWord
} = require('../server/db/models');

const dummyUsers = require('../server/db/dummyData/dummyUsers.js');
const dummyRounds = require('../server/db/dummyData/dummyRounds.js');
const dummyGames = require('../server/db/dummyData/dummyGames.js');
const dummyWords = require('../server/db/dummyData/dummyWords.js');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');
  await User.bulkCreate(dummyUsers);
  await Round.bulkCreate(dummyRounds);
  await Game.bulkCreate(dummyGames);
  await Word.bulkCreate(dummyWords);

  //seed associations
  for (let i = 1; i <= 50; i++) {
    //A game can have many rounds
    let game = await Game.findByPk(i);
    let round = await Round.findByPk(i);
    await game.addRound(round);
    //Each game has a winner
    let user = await User.findByPk(Math.ceil(Math.random() * 50));
    await game.setWinner(user);
    //Each round has a winner
    await round.setWinner(user);
  }

  //Seed the roundWords thru table
  //Create round with real letters
  const round51 = await Round.create({
    letters: 'ABCHKNU',
    coreLetter: 'A',
    gameDate: new Date()
  });

  for (let i = 1; i <= 50; i++) {
    let word = await Word.findByPk(i);
    await round51.addWords(word);
  }

  //Seed userRounds thru table
  const round2 = await Round.findByPk(2);
  const user1 = await User.findByPk(1);
  const user2 = await User.findByPk(2);
  await round2.addUsers([user1, user2]);

  //Seed UserRoundWords thru table aka "GuessedWords"
  //Start by defining which users were in which rounds.
  await UserRound.bulkCreate([
    { userId: 3, roundId: 3 } //This UserRound will get id 3
  ]);

  // Now specify words.
  await GuessedWord.bulkCreate([{ wordId: 3, userRoundId: 3 }]);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
