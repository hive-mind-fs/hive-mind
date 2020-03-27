const { expect } = require('chai');
const { db, UserRound } = require('../db');
const supertest = require('supertest');
const agent = supertest.agent(app);
const app = require('../server');

describe('userRound API', () => {
  beforeEach(() => db.sync({ force: true }));

  //   beforeEach(async () => {
  //     await seed()
  //   })
  describe('userRound POST Route', () => {
    it('creates a new userRound and sends back a new userRound', async () => {
      await agent
        .post('/api/userRound/20')
        .send({ userId: 20, roundId: 20 })
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.userId).to.equal(20);
          expect(res.body.roundId).to.equal(20);
        });

      const newUserRound = await UserRound.findOne({
        where: {
          userId: 20,
          roundId: 20
        }
      });

      expect(newUserRound).to.be.an('object');
      expect(newUserRound.userId).to.equal(20);
      expect(newUserRound.score).to.equal(0);
    });

    it('returns a userRound with attributes', () => {});

    it('gets a random round every time', () => {});

    it('only can be created by the logged in user', () => {});
  });
});

//   const date = new Date();
//   return Game.create({
//     date: date,
//     mode: "1v1"
//   }).then(game => {
//     expect(game.date).to.deep.equal(date);
//     expect(game.mode).to.equal("1v1");
//   });
