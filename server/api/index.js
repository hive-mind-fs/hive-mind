const router = require("express").Router();
module.exports = router;

router.use("/user", require("./user"));
router.use("/game", require("./game"));
router.use("/round", require("./round"));
router.use("/word", require("./word"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
