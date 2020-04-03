'use strict';
const db = require('../server/db');
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
  const distinctWords = {}

  // Seed rounds without words associations
  rounds.map((round, roundIndex) => {

    // Create and push round model
    const coreLetter = round[0]
    const letters = round[1]
    const wordsAndIndices = round[3]
    const words = wordsAndIndices.filter((word, index) => !(index % 2))
    const pangramsAndIndices = round[2]
    const pangramList = pangramsAndIndices.filter((word, index) => !(index % 2))
    const possiblePoints = getPossiblePoints(words, pangramList)
    roundModels.push({letters, coreLetter, pangramList, possiblePoints})

    // Create and push roundWords model
    // Store word index -> word
    const wordIndices = wordsAndIndices.filter((word, index) => index % 2)
    const roundWordAssociations = wordIndices.map((wordIndex, ind) => {
        distinctWords[wordIndex] = words[ind]
        return {roundId: roundIndex + 1, wordId: wordIndex}
    })
    allRoundWordAssociations.push(...roundWordAssociations)
  })

  console.log(`seeding ${roundModels.length} distinct rounds`)

  await Round.bulkCreate(roundModels)

  // Seed distinct words
  console.log(`seeding ${Object.keys(distinctWords).length} distinct words`)

  const wordModels = []

  Object.keys(distinctWords).forEach(wordKey => (wordModels.push({word: distinctWords[wordKey], id: wordKey})))

  await Word.bulkCreate(wordModels)

  // Seed associations manually, 100k at a time
  console.log(`seeding ${allRoundWordAssociations.length} distinct round word associations`)

  const maxInserts = 100000
  for (let i = 0; i < allRoundWordAssociations.length; i = i + maxInserts) {
    await db.model('roundWords').bulkCreate(allRoundWordAssociations.slice(i, i + maxInserts))
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
