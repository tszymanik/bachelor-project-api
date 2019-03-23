const express = require('express');
const jwt = require('jsonwebtoken');
const utility = require('../shared/utility');

const User = require('../models/UserModel');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { email } = req.body;
  let { password } = req.body;
  password = utility.sha256(password);

  if (email && password) {
    try {
      const userData = await User.authUser(email, password);

      const token = jwt.sign(
        {
          userId: userData.id,
        },
        'secret',
        {
          expiresIn: '10h',
        },
      );

      const tokenData = {
        userId: userData.id,
        email: userData.email,
        token,
        expiresIn: '36000',
      };

      res.send(tokenData);
    } catch (error) {
      console.log('[User.authUser]', error);
      res.sendStatus(400);
    }
  }
});

module.exports = router;
