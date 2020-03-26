'use strict';

const db = require('../server/db');
const { generateRounds, getWords } = require('../dictionary');

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

  // To do: Need to find a way to create & insert rounds and words concurrently
  const generatedRounds = await generateRounds();
  console.log(generatedRounds[0]);
  console.log(`inserting ${generatedRounds.length} rounds`);
  const generatedRoundsWithWords = generatedRounds.map(round => {
    const wordsObjects = round.words.map(word => ({ word: word }));
    round.words = wordsObjects;
    return round;
  });
  const rounds = await Round.bulkCreate(generatedRounds, {
    include: [{ model: Word }]
  });

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
  let game51 = await Game.findByPk(51);
  await game51.setWinner(1);
  await game51.addRound(round51);
  let user1 = await User.findByPk(1);
  await round51.setWinner(user1);

  for (let i = 1; i <= 51; i++) {
    let word = await Word.findByPk(i);
    await round51.addWords(word);
  }

  //Seed userRounds thru table
  const user2 = await User.findByPk(2);
  await round51.addUsers([user1, user2]);

  //Seed UserRoundWords thru table aka "GuessedWords"
  //Start by defining which users were in which rounds.
  await UserRound.bulkCreate([
    { userId: 1, roundId: 50 } //This UserRound will get id 3
  ]);

  // Seeding a user who guessed all words in a round
  for (let i = 1; i <= 50; i++) {
    await GuessedWord.bulkCreate([{ wordId: i, userRoundId: 1 }]);
  }
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
