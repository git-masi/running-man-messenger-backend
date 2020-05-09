const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");

router.use("/users", userRouter);

router.use("/", async (req, res, next) => {
  res.status(404).send();
});

module.exports = router;
