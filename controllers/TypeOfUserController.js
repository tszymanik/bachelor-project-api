const express = require('express');

const router = express.Router();

const AuthMiddleware = require('../middlewares/AuthMiddleware');
const TypeOfUser = require('../models/TypeOfUserModel');

router.get('/', AuthMiddleware.authorization, async (req, res, next) => {
  try {
    const data = await TypeOfUser.getTypesOfUser();

    if (data.length !== 0) {
      res.send(data);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log('[TypeOfUser.getTypesOfUser]', error);
    res.sendStatus(404);
  }
});

router.get('/:typeOfUserId', AuthMiddleware.authorization, async (req, res, next) => {
  const { typeOfUserId } = req.params;

  try {
    res.send(await TypeOfUser.getTypeOfUser(typeOfUserId));
  } catch (error) {
    console.log('[TypeOfUser.getTypeOfUser]', error);
    res.sendStatus(404);
  }
});

module.exports = router;
