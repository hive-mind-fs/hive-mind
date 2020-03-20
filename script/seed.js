'use strict';

const db = require('../server/db');

const { User, Round, Game } = require('../server/db/models');

const dummyUsers = require('../server/db/dummyData/dummyUsers.js');
const dummyRounds = require('../server/db/dummyData/dummyRounds.js');
const dummyGames = require('../server/db/dummyData/dummyGames.js');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');
  await User.bulkCreate(dummyUsers);
  await Round.bulkCreate(dummyRounds);
  await Game.bulkCreate(dummyGames);
  console.log(`seeded successfully`);

  //seed associations
  try {
    for (let i = 1; i <= 50; i++) {
      let game = await Game.findByPk(i);
        let round = await Round.findByPk(i);
        await game.addRound(round);
    }
  } catch (error) {
    console.log(error);
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
