const router = require('express').Router();
const { Round, Word, User, UserRound, GuessedWord } = require('../db/models');
const { isAdmin, isCorrectUser, isSession } = require('./gateway');
const {USERROUND_ATTRIBUTES, ROUND_ATTRIBUTES, WORD_ATTRIBUTES} = require('./utils')

module.exports = router;

// Create
// Given user id, create new user rounds entry with random round
router.post('/:userId', async (req, res, next) => {
    try {
        const userId = +req.params.userId;
        //const round = await Round.getRandom()
        // To do: programatically generate words for round
        const round = await Round.findByPk(51)
        const userRound = await UserRound.create({ userId: userId, roundId: round.id })
        const userRoundWithAssociations = await UserRound.findByPk(userRound.id, {
            attributes: USERROUND_ATTRIBUTES,
            include: [
                { model: Word, attributes: WORD_ATTRIBUTES },
                {
                    model: Round,
                    attributes: ROUND_ATTRIBUTES,
                    include : [{model: Word}]
                },
            ]
        })
        res.send(userRoundWithAssociations)
    } catch (err) {
        next(err);
    }
});

// Update
// Given userRound id, persist to database
