import { expect } from 'chai';
import { db, Game } from '.';

describe('Game model', () => {
  beforeEach(() => db.sync({ force: true }));
  describe('column definitions and validations', () => {
    it('has a roundId date, winner, and mode property', () => {
      const date = new Date();
      return Game.create({
        date: date,
        mode: '1v1'
      }).then(game => {
        expect(game.date).to.deep.equal(date);
        expect(game.mode).to.equal('1v1');
      });
    });
  });
});
