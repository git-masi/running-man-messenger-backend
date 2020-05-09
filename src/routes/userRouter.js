const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
