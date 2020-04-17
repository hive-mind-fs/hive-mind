export {};

const { expect } = require('chai');
const { db, User } = require('../models');

describe('User model', () => {
  beforeEach(() => db.sync({ force: true }));
  describe('column definitions and validations', () => {
    const date = new Date();
    it('has a facebookId`, `email`, `password`, `username`, `photo`, `loacation`,`gender`, `age`, `createdAt`, `isAdmin`, and `isOnboarded` property', () => {
      return User.create({
        facebookId: 'abcdefg',
        email: 'johnsmith@gmial.com',
        password: 'password',
        photo: 'www.picture.com',
        location: 12345,
        gender: 'male',
        age: 21,
        createdAt: date,
        isAdmin: false,
        isOnboarded: false
      }).then(user => {
        expect(user.facebookId).to.equal('abcdefg');
        expect(user.email).to.equal('johnsmith@gmial.com');
        expect(user.correctPassword('password')).to.equal(true);
        expect(user.photo).to.equal('www.picture.com');
        expect(user.location).to.equal(12345);
        expect(user.gender).to.equal('male');
        expect(user.age).to.equal(21);
        expect(user.createdAt).to.deep.equal(date);
        expect(user.isAdmin).to.equal(false);
        expect(user.isOnboarded).to.equal(false);
        expect(user.username).to.equal('johnsmith');
      });
    });
  });
});
