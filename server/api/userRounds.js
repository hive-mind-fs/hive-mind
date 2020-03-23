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
        // const round = await Round.getRandom()
        // To do: programatically generate words for round
        const round = await Round.findByPk(51)
        
        const userRound = await UserRound.findOrCreate({
            where: { userId: userId, roundId: round.id },
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
        res.send(userRound[0])
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
                    include : [{model: Word}]
                },
            ]
        })

        const updatedRound = await userRound.update(req.body)

        res.send(updatedRound)
    } catch (err) {
        next(err);
    }
});