const express = require('express');

const router = express.Router();

const AuthMiddleware = require('../middlewares/AuthMiddleware');
const Education = require('../models/EducationModel');

router.get('/', AuthMiddleware.authorization, async (req, res, next) => {
  const { userId } = req.query;

  if (userId) {
    try {
      const data = await Education.getEducationByUserId(userId);

      if (data.length !== 0) {
        res.send(data);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.log('[Education.getEducationByUserId]', error);
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
  }
});

router.get('/:educationItemId', AuthMiddleware.authorization, async (req, res, next) => {
  const { educationItemId } = req.params;

  try {
    res.send(await Education.getEducationItem(educationItemId));
  } catch (error) {
    console.log('[Education.getEducationItem]', error);
    res.sendStatus(400);
  }
});

router.post('/', [AuthMiddleware.authorization, AuthMiddleware.isAdmin], async (req, res, next) => {
  const {
    userId, fieldOfStudyId, specializationId, currentSemester, currentAcademicYear,
  } = req.body;

  if (userId && fieldOfStudyId && specializationId && currentSemester && currentAcademicYear) {
    try {
      res.send(await Education.addEducationItem(userId, fieldOfStudyId, specializationId, currentSemester, currentAcademicYear));
    } catch (error) {
      console.log('[Education.addEducationItem]', error);
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
});

router.patch('/:educationItemId', [AuthMiddleware.authorization, AuthMiddleware.isAdmin], async (req, res, next) => {
  const { educationItemId } = req.params;
  const {
    fieldOfStudyId, specializationId, currentSemester, currentAcademicYear,
  } = req.body;

  if (fieldOfStudyId && specializationId && currentSemester && currentAcademicYear) {
    try {
      await Education.updateEducationItem(educationItemId, fieldOfStudyId, specializationId, currentSemester, currentAcademicYear);
      res.sendStatus(204);
    } catch (error) {
      console.log('[Education.updateEducationItem]', error);
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
});

router.delete('/:educationItemId', [AuthMiddleware.authorization, AuthMiddleware.isAdmin], async (req, res, next) => {
  const { educationItemId } = req.params;

  try {
    await Education.deleteEducationItem(educationItemId);
    res.sendStatus(204);
  } catch (error) {
    console.log('[Education.deleteEducationItem]', error);
    res.sendStatus(400);
  }
});

module.exports = router;
