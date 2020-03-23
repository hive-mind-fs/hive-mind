const router = require('express').Router();
const { Round } = require('../db/models');
const { isAdmin, isCorrectUser, isSession } = require('./gateway');

router.get('/', async (req, res, next) => {
  try {
    // include words
    const rounds = await Round.findAll();
    res.json(rounds);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
