// do not modify this file
const db = require('../server/db');
const dummyRounds = require('../db/dummyData/dummyRounds');

module.exports = async () => {
  await db.sync({ force: true });

  const [user1, user2] = await Promise.all([
    User.bulkCreate([
      {
        facebookId: '5381e39b1e6b5cb0bed1579faeac9191aed27caf',
        email: 'levensden0@who.int',
        password: 'pmePuT6Kk4t',
        username: 'fbaily0',
        photo: 'https://i.imgur.com/UMFJ5Gm.jpg',
        location: 43420,
        gender: 'male',
        age: 80,
        isAdmin: true,
        isOnboarded: false
      },
      {
        facebookId: '883b7bdf65af01cd724a4d069a0ebd170cfc3db4',
        email: 'chantusch1@merriam-webster.com',
        password: 'yqUlNjzPydfY',
        username: 'pfelix1',
        photo: 'https://i.imgur.com/UMFJ5Gm.jpg',
        location: 29502,
        gender: 'female',
        age: 91,
        isAdmin: true,
        isOnboarded: true
      }
    ])
  ]);

  await Round.bulkCreate(dummyRounds);

  return [user1, user2];
};
