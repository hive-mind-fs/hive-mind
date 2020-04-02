'use strict';
const db = require('../server/db');
const fs = require('fs');
const readline = require('readline');
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

  // Stream seed rounds without words associations
  const ROUNDS_FILE = 'allPossibleRounds.txt';
  const PANGRAM_WORDS_FILE = 'pangramWords.txt';
  await generateRounds(ROUNDS_FILE, PANGRAM_WORDS_FILE); // writes rounds to a file

  const readStream = fs.createReadStream(ROUNDS_FILE);
  const lines = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
  });

  console.log(`seeding rounds`);
  const distinctWords = {};
  for await (const line of lines) {
    const generatedRound = JSON.parse(line);
    await Round.create(generatedRound);
    generatedRound.words.forEach(([idx, word]) => {
      distinctWords[+idx] = word;
    });
  }

  const words = Object.entries(distinctWords).map(([idx, word]) => ({
    id: idx,
    word: word
  }));

  console.log(`seeding ${words.length} distinct words`);
  await Word.bulkCreate(words);

  // Seed associations manually

  const readStreamAssociations = fs.createReadStream(ROUNDS_FILE);
  const linesAssociations = readline.createInterface({
    input: readStreamAssociations,
    crlfDelay: Infinity
  });

  console.log(`seeding round word associations`);
  let roundIdx = 0;
  for await (const line of linesAssociations) {
    roundIdx++;
    const generatedRound = JSON.parse(line);

    const roundWords = generatedRound.words.map(([wordIdx, word]) => ({
      roundId: roundIdx,
      wordId: +wordIdx
    }));
    await db.model('roundWords').bulkCreate(roundWords);
  }

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
  await defaultRound.setWinner(user1);

  // don't really need this anymore, function below should work
  const user1 = await User.findByPk(1);
  const user2 = await User.findByPk(2);
  const user3 = await User.findByPk(3);
  const user4 = await User.findByPk(4);
  //Seed userRounds thru table
  await defaultRound.addUsers([user1, user2, user3, user4]);

  // seed userRounds
  // NEEDS TO BE TESTED
  // const userRoundsToCreate = () => {
  //   let arr = [];
  //   // create userRounds for userId 1-4
  //   for (let i = 1; i <= 4; i++) {
  //     let userId = i;
  //     let numRounds = Math.floor(Math.random() * Math.floor(10) + 7); // Create diff num of rounds for each user so their stats are different (min 7 rounds for graphs)

  //     for let (j = 0; j < 5) {
  //       let roundId = Math.floor(Math.random() * Math.floor(1000) + 1); // randomly pick a roundId
  //       let score = Math.floor(Math.random() * Math.floor(100) + 1); // randomly pick a score

  //       // push userRound object into arr
  //       arr.push({
  //         userId,
  //         roundId,
  //         score
  //       })
  //     }
  //   }

  //   return arr
  // };

  // await UserRound.bulkCreate(userRoundsToCreate);

  // guessedWords seeding
  // Need to finish creating this...
  // await GuessedWord.bulkCreate(guessedWordsToCreate);

  //Seed UserRoundWords thru table aka "GuessedWords"
  //Start by defining which users were in which rounds.
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
