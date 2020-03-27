'use strict';

const db = require('../server/db');
const { generateRounds } = require('../dictionary');

const {
  User,
  Round,
  Game,
  Word,
  UserRound,
  GuessedWord
} = require('../server/db/models');

const dummyUsers = require('../server/db/dummyData/dummyUsers.js');
const dummyGames = require('../server/db/dummyData/dummyGames.js');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');
  await User.bulkCreate(dummyUsers);
  await Game.bulkCreate(dummyGames);

  // Seed rounds without words associations
  const generatedRounds = await generateRounds();
  const rounds = await Round.bulkCreate(generatedRounds);

  // Seed all words used in a round
  const roundWordsHashMap = {};
  generatedRounds.map(generatedRound =>
    generatedRound.words.forEach(([idx, word]) => {
      roundWordsHashMap[+idx] = word;
    })
  );
  const words = Object.entries(roundWordsHashMap).map(([idx, word]) => ({
    id: +idx,
    word: word
  }));

  console.log(`seeding ${words.length} distinct words`);
  await Word.bulkCreate(words);

  // Seed associations manually
  const roundWords = rounds
    .map(round => {
      const roundId = round.id;
      const words = generatedRounds[roundId - 1].words;
      const allRoundWords = words.map(([wordPk, word]) => ({
        roundId: roundId,
        wordId: +wordPk
      }));
      return allRoundWords;
    })
    .flat();

  console.log(`seeding ${roundWords.length} roundWord associations`);
  await db.model('roundWords').bulkCreate(roundWords);

  // Seed game & winner associations for first 50 rounds
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

  // Create default round 'ANONYMOUS'
  const DEFAULT_ROUND_ID = 368;
  const defaultRound = await Round.findByPk(DEFAULT_ROUND_ID);
  let game51 = await Game.findByPk(51);
  await game51.setWinner(1);
  await game51.addRound(defaultRound);
  let user1 = await User.findByPk(1);
  await defaultRound.setWinner(user1);

  //Seed userRounds thru table
  const user2 = await User.findByPk(2);
  await defaultRound.addUsers([user1, user2]);

  //Seed UserRoundWords thru table aka "GuessedWords"
  //Start by defining which users were in which rounds.
  await UserRound.bulkCreate([
    { userId: 1, roundId: 50 } //This UserRound will get id 3
  ]);
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
