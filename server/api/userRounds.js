const router = require('express').Router();
const { Round, Word, User, UserRound, GuessedWord } = require('../db/models');
const { isAdmin, isCorrectUser, isSession } = require('./gateway');

module.exports = router;

// Create
// Given user id, create new user rounds entry
router.post('/:userId', async (req, res, next) => {
  try {
    const userId = +req.params.userId;
    const round = await Round.getRandom()
    const userRound = await User.create({userId: userId, roundId: round.id})
    res.send(userRound)
  } catch (err) {
    next(err);
  }
});

// Given user id, round is retrieve ...
