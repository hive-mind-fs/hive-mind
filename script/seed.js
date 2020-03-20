'use strict';

const db = require('../server/db');

const { User, Round, Game, Word } = require('../server/db/models');

const dummyUsers = require('../server/db/dummyData/dummyUsers.js');
const dummyRounds = require('../server/db/dummyData/dummyRounds.js');
const dummyGames = require('../server/db/dummyData/dummyGames.js');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');
  await User.bulkCreate(dummyUsers);
  await Round.bulkCreate(dummyRounds);
  await Game.bulkCreate(dummyGames);

  //seed associations
  try {
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
    const round1 = await Round.findByPk(1)
    await round1.addWords([
      await Word.create({ word: "WORDONE" }),
      await Word.create({ word: "WORDTWO" }),
      await Word.create({ word: "WORDTHREE" }),
      await Word.create({ word: "WORDFOUR" })
    ]);

    //Seed userRounds thru table
    const round2 = await Round.findByPk(2);
    const user1 = await User.findByPk(1);
    const user2 = await User.findByPk(2);
    await round2.addUsers([user1, user2]);



    console.log(`seeded successfully`);

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
