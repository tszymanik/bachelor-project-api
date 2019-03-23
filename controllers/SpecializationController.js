const express = require('express');

const router = express.Router();

const AuthMiddleware = require('../middlewares/AuthMiddleware');
const Specialization = require('../models/SpecializationModel');

router.get('/', [AuthMiddleware.authorization, AuthMiddleware.isAdmin], async (req, res, next) => {
  const { fieldOfStudyId } = req.query;

  if (fieldOfStudyId) {
    try {
      const data = await Specialization.getSpecializationsByFieldOfStudyId(fieldOfStudyId);

      if (data.length !== 0) {
        res.send(data);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.log('[Specialization.getSpecializationsByFieldOfStudyId]', error);
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
  }
});

router.get('/:specializationId', [AuthMiddleware.authorization, AuthMiddleware.isAdmin], async (req, res, next) => {
  const { specializationId } = req.params;

  try {
    res.send(await Specialization.getSpecialization(specializationId));
  } catch (error) {
    console.log('[Specialization.getSpecialization]', error);
    res.sendStatus(404);
  }
});

module.exports = router;
