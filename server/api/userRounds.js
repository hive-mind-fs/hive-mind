const router = require('express').Router();
const { Round, Word, User, UserRound, GuessedWord } = require('../db/models');
const { isAdmin, isCorrectUser, isSession } = require('./gateway');
const {
  USERROUND_ATTRIBUTES,
  ROUND_ATTRIBUTES,
  WORD_ATTRIBUTES
} = require('./utils');

module.exports = router;

// Create
// Given user id, create new user rounds entry with random round
router.post('/:userId', async (req, res, next) => {
  try {
    const userId = +req.params.userId;
    const round = await Round.getRandom();

    const userRound = await UserRound.findOrCreate({
      where: { userId: userId, roundId: round.id }
    });

    const userRoundWithAttributes = await UserRound.findByPk(userRound[0].id, {
      attributes: USERROUND_ATTRIBUTES,
      include: [
        { model: Word, attributes: WORD_ATTRIBUTES },
        {
          model: Round,
          attributes: ROUND_ATTRIBUTES,
          include: [{ model: Word }]
        }
      ]
    });

    res.send(userRoundWithAttributes);
  } catch (err) {
    next(err);
  }
});

// Update
// Given userRound id, persist to database
router.put('/:roundId', async (req, res, next) => {
  try {
    let roundId = +req.params.roundId;
    const userRound = await UserRound.findByPk(roundId, {
      returning: true,
      where: { id: roundId },
      include: [
        { model: Word, attributes: WORD_ATTRIBUTES },
        {
          model: Round,
          attributes: ROUND_ATTRIBUTES,
          include: [{ model: Word }]
        }
      ]
    });
    const updatedRound = await userRound.update(req.body);
    // Potential Optimization: Figure out a way to do the below  within the update above
    const guessedWords = req.body.words.map(word => {
      return { wordId: word.id, userRoundId: roundId };
    });
    await GuessedWord.bulkCreate(guessedWords);

    res.send(updatedRound);
  } catch (err) {
    next(err);
  }
});
