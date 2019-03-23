const express = require('express');

const router = express.Router();

const AuthMiddleware = require('../middlewares/AuthMiddleware');
const Subject = require('../models/SubjectModel');

router.get('/', [AuthMiddleware.authorization, AuthMiddleware.isAdmin], async (req, res, next) => {
  const { fieldOfStudyId, semesterNumber } = req.query;

  if (fieldOfStudyId) {
    if (semesterNumber) {
      try {
        const data = await Subject.getSubjectsByFieldOfStudyAndSemesterNumber(fieldOfStudyId, semesterNumber);

        if (data.length !== 0) {
          res.send(data);
        } else {
          res.sendStatus(404);
        }
      } catch (error) {
        console.log('[Subject.getSubjectsByFieldOfStudyAndSemesterNumber]', error);
        res.sendStatus(404);
      }
    } else {
      try {
        const data = await Subject.getSubjectsByFieldOfStudy(fieldOfStudyId);

        if (data.length !== 0) {
          res.send(data);
        } else {
          res.sendStatus(404);
        }
      } catch (error) {
        console.log('[Subject.getSubjectsByFieldOfStudy]', error);
        res.sendStatus(404);
      }
    }
  } else {
    try {
      const data = await Subject.getSubjects();

      if (data.length !== 0) {
        res.send(data);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.log('[Subject.getSubjects]', error);
      res.sendStatus(404);
    }
  }
});

router.get('/:subjectId', [AuthMiddleware.authorization, AuthMiddleware.isAdmin], async (req, res, next) => {
  const { subjectId } = req.params;

  try {
    res.send(await Subject.getSubject(subjectId));
  } catch (error) {
    res.sendStatus(404);
  }
});

module.exports = router;
