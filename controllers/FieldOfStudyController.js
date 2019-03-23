const express = require('express');

const router = express.Router();

const AuthMiddleware = require('../middlewares/AuthMiddleware');
const FieldOfStudy = require('../models/FieldOfStudyModel');

router.get('/', [AuthMiddleware.authorization, AuthMiddleware.isAdmin], async (req, res, next) => {
  try {
    const data = await FieldOfStudy.getFieldsOfStudy();

    if (data.length !== 0) {
      res.send(data);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log('[FieldOfStudy.getFieldsOfStudy]', error);
    res.sendStatus(404);
  }
});

router.get('/:fieldOfStudyId', [AuthMiddleware.authorization, AuthMiddleware.isSpecificUserOrAdmin], async (req, res, next) => {
  const { fieldOfStudyId } = req.params;

  try {
    res.send(await FieldOfStudy.getFieldOfStudy(fieldOfStudyId));
  } catch (error) {
    console.log('[FieldOfStudy.getFieldOfStudy]', error);
    res.sendStatus(404);
  }
});

module.exports = router;
