const router = require('express').Router();
const { Round, Word, User, UserRound, GuessedWord } = require('../db/models');
const { isAdmin, isCorrectUser, isSession } = require('./gateway');

module.exports = router;

// one route returns round with everything that we need
// words (possible words for round)
// user round (we think)
/// guessed words
// to do: limit attributes
// to do: get ONE random round
// to do: add user when we grab the round

// userRounds --
// userRoundWords --
router.get('/', async (req, res, next) => {
  try {
    const one = req.query.one;
    let rounds;
    if (one === 'true') {
      rounds = await Round.getRandom({
        include: [{ model: Word, attributes: WORD_ATTRIBUTES }]
      });
    } else {
      rounds = await Round.findAll({
        include: [{ model: Word, attributes: WORD_ATTRIBUTES }]
      });
    }
    res.json(rounds);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const rounds = await Round.findByPk(+req.params.id, {
      attributes: [
        'id',
        'letters',
        'coreLetter',
        'gameDate',
        'winnerId',
        'gameId'
      ],
      include: [
        { model: Word, attributes: ['id', 'word'] },
        { model: UserRound, include: [{ model: Word }] }
      ]
    });
    res.json(rounds);
  } catch (err) {
    next(err);
  }
});
