const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.send('it works!');
  } catch (err) {
   res.status(500).send(err);
  }
});

module.exports = router;