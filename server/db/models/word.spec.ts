import { expect } from 'chai';
import { db, Word } from '.';

describe('Word model', () => {
  beforeEach(() => db.sync({ force: true }));
  describe('column definitions and validations', () => {
    it('has a word property', () => {
      return Word.create({
        word: 'ABCD'
      }).then(word => {
        expect(word.word).to.equal('ABCD');
      });
    });
  });

  describe('Word alphabetization', () => {
    it('Words are returned alphabetically', async () => {
      await Word.create({ word: 'Titanic' });
      await Word.create({ word: 'Sea Sluts' });
      await Word.create({ word: 'Aquaholic' });
      await Word.create({ word: 'SeaWorthy' });

      const alphabetizedWords = await Word.alphabetize();

      expect(alphabetizedWords.map(word => word.word)).to.deep.equal([
        'Aquaholic',
        'Sea Sluts',
        'SeaWorthy',
        'Titanic'
      ]);
    });
  });
});
