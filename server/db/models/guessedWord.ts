export {};

const db = require('../db');

const GuessedWord = db.define('guessedWord', {});

module.exports = GuessedWord;
