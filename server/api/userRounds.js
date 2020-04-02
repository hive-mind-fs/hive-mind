const router = require('express').Router();
const sequelize = require('sequelize');
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
router.put('/:practiceRoundId', async (req, res, next) => {
  try {
    let practiceRoundId = +req.params.practiceRoundId;
    const userRound = await UserRound.findByPk(practiceRoundId, {
      returning: true,
      where: { id: practiceRoundId },
      include: [
        { model: Word, attributes: WORD_ATTRIBUTES },
        {
          model: Round,
          attributes: ROUND_ATTRIBUTES,
          include: [{ model: Word }]
        }
      ]
    });
    const updatedPracticeRound = await userRound.update(req.body);
    // Potential Optimization: Figure out a way to do the below  within the update above
    const guessedWords = req.body.words.map(word => {
      return { wordId: word.id, userRoundId: practiceRoundId };
    });
    await GuessedWord.bulkCreate(guessedWords);

    res.send(updatedPracticeRound);
  } catch (err) {
    next(err);
  }
});

// GET FOR LEADERBOARD
router.get('/leaderboard', async (req, res, next) => {
  try {
    let leaderboard = null;
    try {
      leaderboard = await UserRound.findAll({
        attributes: [
          [sequelize.fn('sum', sequelize.col('score')), 'totalScore']
        ],
        include: [{ model: User, attributes: ['id', 'username', 'photo'] }],
        group: ['user.id']
      });

      // const stats = [
      //   {
      //     userId: '1',
      //     title: 'Total Score',
      //     stat: '1,234'
      //   },
      // ]
    } catch (err) {
      next(err);
    }

    res.send(leaderboard);
  } catch (err) {
    next(err);
  }
});

// GET FOR STATS
router.get('/:userId', async (req, res, next) => {
  try {
    let userId = +req.params.userId;

    let userStats = {
      totalScore: 0,
      roundsPlayed: 0,
      wordsGotten: 0,
      graphPoints: null
    };

    try {
      let userRounds = await UserRound.findAll({
        where: { userId: userId },
        // where: { userId: 53 }, // In case you need it hardcoded
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

      if (userRounds.length > 0) {
        userStats.totalScore = userRounds
          .map(userRound => userRound.score)
          .reduce((acc, curr) => acc + curr);

        userStats.roundsPlayed = userRounds.length;

        userStats.wordsGotten = userRounds
          .map(userRound => userRound.words.length)
          .reduce((acc, curr) => acc + curr);

        userStats.graphPoints = userRounds.map(userRound => {
          return {
            label: userRound.round.letters,
            player: userRound.score,
            totalPossible: userRound.round.possiblePoints
          };
        });
      }
    } catch (err) {
      next(err);
    }

    res.send(userStats);
  } catch (err) {
    next(err);
  }
});
