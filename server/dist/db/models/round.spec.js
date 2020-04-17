"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { expect } = require('chai');
const { db, Round } = require('.');
describe('Round model', () => {
    beforeEach(() => db.sync({ force: true }));
    describe('Column definitions and validations', () => {
        it('has a gameId, letters, coreLetter, and gameDate property', () => {
            const date = new Date();
            return Round.create({
                letters: 'CDEFGBA',
                coreLetter: 'A'
            }).then(round => {
                expect(round.letters).to.equal('ABCDEFG');
                expect(round.coreLetter).to.equal('A');
            });
        });
    });
});
