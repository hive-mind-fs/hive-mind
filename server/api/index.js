const router = require('express').Router();
module.exports = router;

// router.use("/users", require("./users"));
// router.use("/games", require("./games"));
router.use('/rounds', require('./rounds'));
router.use('/userRounds', require('./userRounds'));
// router.use("/words", require("./words"));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
