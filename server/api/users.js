const router = require('express').Router();
const { User } = require('../db/models');

module.exports = router;

// Check if an fb user exists in the db.
router.get('/users', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.email
      }
    });
    res.send(!!user);
  } catch (err) {
    next(err);
  }
});
