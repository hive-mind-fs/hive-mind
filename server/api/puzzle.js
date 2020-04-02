const { Round, Word } = require('../db/models');
const router = require('express').Router();

// Get a random puzzle
router.get('/random', async (req, res, next) => {
  try {
    const puzzle = await Round.getRandom({ include: [{ model: Word }] });
    res.send(puzzle);
  } catch (e) {
    next(e);
  }
});

// Get a puzzle by its ID
router.get('/:puzzleId', async (req, res, next) => {
  try {
    const puzzle = await Round.findByPk(req.params.puzzleId, {
      include: [{ model: Word }]
    });
    res.send(puzzle);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
