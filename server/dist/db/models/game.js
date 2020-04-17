"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require('sequelize');
const db = require('../db');
const Game = db.define('game', {
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    mode: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
module.exports = Game;
