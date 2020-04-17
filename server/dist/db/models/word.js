"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require('sequelize');
const db = require('../db');
const Word = db.define('word', {
    word: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
/**
 * Class Methods
 **/
Word.alphabetize = async function () {
    const words = await Word.findAll({ order: [['word', 'ASC']] });
    // something to sort according to first letter
    return words;
};
module.exports = Word;
