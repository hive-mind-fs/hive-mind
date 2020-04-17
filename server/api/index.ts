const router = require('express').Router();
module.exports = router;

router.use('/userRounds', require('./userRounds'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  next(error);
});

module.exports = router;
