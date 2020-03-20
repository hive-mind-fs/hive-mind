const router = require("express").Router();
const { Round, Word, User } = require("../db/models");
const { isAdmin, isCorrectUser, isSession } = require("./gateway");

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
router.get("/:id", async (req, res, next) => {
  try {
    const rounds = req.params.id;
    await Round.findByPk(+req.params.id, {
      include: [{ model: Word }]
    });
    res.json(rounds);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const rounds = await Round.findAll({
      include: [{ model: Word }]
    });
    res.json(rounds);
  } catch (err) {
    next(err);
  }
});

// post round info to db
// create a new entry in user rounds on POST
router.post("/", async (req, res, next) => {
  try {
    const round = req.body;
    console.log("round was passed", round);
  } catch (err) {
    next(err);
  }
});
