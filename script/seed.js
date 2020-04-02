'use strict';
const db = require('../server/db');
const fs = require('fs');
const readline = require('readline');
const { read, getPossiblePoints } = require('../dictionary');

const {
  User,
  Round,
  Game,
  Word,
  UserRound
} = require('../server/db/models');

const dummyUsers = require('../server/db/dummyData/dummyUsers.js');
const dummyGames = require('../server/db/dummyData/dummyGames.js');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');
  await User.bulkCreate(dummyUsers);
  await Game.bulkCreate(dummyGames);

  // Get rounds from algo.ts (after running ts-node dictionary/Algo.ts, add to npm run seed)
  const roundsJSON = await read('../dictionary/Solutions.json')
  const rounds = JSON.parse(roundsJSON)

  const allRoundWordAssociations = []
  const roundModels = []

  // Seed rounds without words associations
  rounds.map((round, roundIndex) => {

    // Create and push round model
    const coreLetter = round[0]
    const letters = round[1]
    const wordsAndIndices = round[3]
    const words = wordsAndIndices.filter((word, index) => !(index % 2))
    const pangramList = round[2][0]
    const possiblePoints = getPossiblePoints(words, pangramList)
    roundModels.push({letters, coreLetter, pangramList, possiblePoints})

    // Create and push roundWords model
    const wordIndices = wordsAndIndices.filter((word, index) => index % 2)
    const roundWordAssociations = wordIndices.map(wordIndex => ({roundId: roundIndex + 1, wordId: wordIndex}))
    allRoundWordAssociations.push(roundWordAssociations)
  })

  console.log(roundModels)
  console.log(`seeding ${roundModels.length} distinct rounds`)

  //await Round.bulkCreate(roundModels)

  //console.log(`word 79651 is`, distinctWords[79651])

  // Seed distinct words
  // Just do that via reading the dictionary

  // Object.keys(distinctWords).forEach(index => (wordModels.push({word: distinctWords[index], id: index + 1})))

  // console.log('a wordModel:', wordModels[0])
  // await Word.bulkCreate(wordModels.slice(0,10))

  // Seed associations manually
  // console.log(`seeding round word associations`);
  // let roundIdx = 0;
  // for await (const line of roundModels) {
  //   roundIdx++;
  //   const generatedRound = JSON.parse(line);

  //   const roundWords = generatedRound.words.map(([wordIdx, word]) => ({
  //     roundId: roundIdx,
  //     wordId: +wordIdx
  //   }));
  //   await db.model('roundWords').bulkCreate(roundWords);
  // }

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
