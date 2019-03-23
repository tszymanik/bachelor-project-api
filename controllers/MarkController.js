const express = require('express');

const router = express.Router();

const AuthMiddleware = require('../middlewares/AuthMiddleware');
const Mark = require('../models/MarkModel');

router.get('/', [AuthMiddleware.authorization, AuthMiddleware.isSpecificUserOrAdmin], async (req, res, next) => {
  const {
    studentId, educationItemId, fieldOfStudyId, semesterNumber,
  } = req.query;

  if (educationItemId) {
    if (semesterNumber) {
      try {
        const data = await Mark.getMarksByEducationItemIdAndSemesterNumber(educationItemId, semesterNumber);

        if (data.length !== 0) {
          res.send(data);
        } else {
          res.sendStatus(404);
        }
      } catch (error) {
        console.log('[Mark.getMarksByEducationItemIdAndSemesterNumber]', error);
        res.sendStatus(404);
      }
    } else {
      try {
        const data = await Mark.getMarksByEducationItemId(educationItemId);

        if (data.length !== 0) {
          res.send(data);
        } else {
          res.sendStatus(404);
        }
      } catch (error) {
        console.log('[Mark.getMarksByEducationItemId]', error);
        res.sendStatus(404);
      }
    }
  }

  if (studentId) {
    if (fieldOfStudyId) {
      if (semesterNumber) {
        try {
          const data = await Mark.getMarksByStudentIdAndFieldOfStudyIdAndSemesterNumber(studentId, fieldOfStudyId, semesterNumber);

          if (data.length !== 0) {
            res.send(data);
          } else {
            res.sendStatus(404);
          }
        } catch (error) {
          console.log('[Mark.getMarksByStudentIdAndFieldOfStudyIdAndSemesterNumber]', error);
          res.sendStatus(404);
        }
      } else {
        try {
          const data = await Mark.getMarksByStudentIdAndFieldOfStudyId(studentId, fieldOfStudyId);

          if (data.length !== 0) {
            res.send(data);
          } else {
            res.sendStatus(404);
          }
        } catch (error) {
          console.log('[Mark.getMarksByStudentIdAndFieldOfStudyId]', error);
          res.sendStatus(404);
        }
      }
    }
  }
});

router.get('/:markId', [AuthMiddleware.authorization, AuthMiddleware.isAdmin], async (req, res, next) => {
  const { markId } = req.params;

  try {
    res.send(await Mark.getMark(markId));
  } catch (error) {
    console.log('[Mark.getMark]', error);
    res.sendStatus(404);
  }
});

router.post('/', [AuthMiddleware.authorization, AuthMiddleware.isAdmin], async (req, res, next) => {
  const {
    value, subjectId, studentId, educationItemId, teacherId, termNumber, typeOfSubject, typeOfTerm,
  } = req.body;

  if (value && subjectId && studentId && educationItemId && teacherId && termNumber && typeOfSubject && typeOfTerm) {
    try {
      res.send(await Mark.addMark(
        value,
        subjectId,
        studentId,
        educationItemId,
        teacherId,
        termNumber,
        typeOfSubject,
        typeOfTerm,
      ));
    } catch (error) {
      console.log('[Mark.addMark]', error);
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
});

router.delete('/:markId', [AuthMiddleware.authorization, AuthMiddleware.isAdmin], async (req, res, next) => {
  const { markId } = req.params;

  try {
    await Mark.deleteMark(markId);
    res.sendStatus(204);
  } catch (error) {
    console.log('[Mark.deleteMark]', error);
    res.sendStatus(400);
  }
});

module.exports = router;
