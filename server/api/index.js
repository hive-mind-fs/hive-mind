const router = require('express').Router();

router.use('/puzzle', require('./puzzle'));
router.use('/userRounds', require('./userRounds'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;
