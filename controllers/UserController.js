const express = require('express');

const AuthMiddleware = require('../middlewares/AuthMiddleware');
const User = require('../models/UserModel');

const router = express.Router();

router.get('/', [AuthMiddleware.authorization, AuthMiddleware.isAdmin], async (req, res, next) => {
  const { typesOfUserName } = req.query;

  if (typesOfUserName) {
    try {
      const data = await User.getUsersByTypesOfUserName(typesOfUserName);

      if (data.length !== 0) {
        res.send(data);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.log('[User.getUsersByTypesOfUserName]', error);
      res.sendStatus(404);
    }
  } else {
    try {
      const data = await User.getUsers();

      if (data.length !== 0) {
        res.send(data);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.log('[User.getUsers]', error);
      res.sendStatus(404);
    }
  }
});

router.get('/:userId', [AuthMiddleware.authorization, AuthMiddleware.isSpecificUserOrAdmin], async (req, res, next) => {
  const { userId } = req.params;

  try {
    res.send(await User.getUser(userId));
  } catch (error) {
    console.log('[User.getUser]', error);
    res.sendStatus(404);
  }
});

router.post('/', [AuthMiddleware.authorization, AuthMiddleware.isAdmin], async (req, res, next) => {
  const {
    typesOfUserId, email, password, firstName, lastName,
  } = req.body;

  if (typesOfUserId && email && password && firstName && lastName) {
    try {
      res.send(await User.addUser(typesOfUserId, email, password, firstName, lastName));
    } catch (error) {
      console.log('[User.addUser]', error);
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
});

router.patch('/:userId', [AuthMiddleware.authorization, AuthMiddleware.isAdmin], async (req, res, next) => {
  const { userId } = req.params;
  const {
    typesOfUserId, email, password, firstName, secondName, lastName, title, pesel, dateOfBirth, fatherName, motherName, sex, maidenName, maritalStatus, citizenship, nationality, placeOfBirth, voivodeshipOfBirth, workEmail,
  } = req.body;

  if (typesOfUserId && email && password && firstName && secondName && lastName && title && pesel && dateOfBirth && fatherName && motherName && sex && maidenName && maritalStatus && citizenship && nationality && placeOfBirth && voivodeshipOfBirth && workEmail) {
    try {
      await User.updateUserWithPassword(userId, typesOfUserId, email, password, firstName, secondName, lastName, title, pesel, dateOfBirth, fatherName, motherName, sex, maidenName, maritalStatus, citizenship, nationality, placeOfBirth, voivodeshipOfBirth, workEmail);
      res.sendStatus(204);
    } catch (error) {
      console.log('[User.updateUserWithPassword]', error);
      res.sendStatus(400);
    }
  } else if (typesOfUserId && email && firstName && secondName && lastName && title && pesel && dateOfBirth && fatherName && motherName && sex && maidenName && maritalStatus && citizenship && nationality && placeOfBirth && voivodeshipOfBirth && workEmail) {
    try {
      await User.updateUser(userId, typesOfUserId, email, firstName, secondName, lastName, title, pesel, dateOfBirth, fatherName, motherName, sex, maidenName, maritalStatus, citizenship, nationality, placeOfBirth, voivodeshipOfBirth, workEmail);
      res.sendStatus(204);
    } catch (error) {
      console.log('[User.updateUser]', error);
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
});

router.patch('/:userId/address/residence', [AuthMiddleware.authorization, AuthMiddleware.isAdmin], async (req, res, next) => {
  const { userId } = req.params;
  const {
    voivodeship, city, street, zipCode, postOffice, phoneNumer,
  } = req.body;

  if (voivodeship && city && street && zipCode && postOffice && phoneNumer) {
    try {
      await User.updateUserResidenceAddress(userId, voivodeship, city, street, zipCode, postOffice, phoneNumer);
      res.sendStatus(204);
    } catch (error) {
      console.log('[User.updateUserResidenceAddress]', error);
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
});

router.patch('/:userId/address/mailing', [AuthMiddleware.authorization, AuthMiddleware.isAdmin], async (req, res, next) => {
  const { userId } = req.params;
  const {
    voivodeship, city, street, zipCode, postOffice, phoneNumer,
  } = req.body;

  if (voivodeship && city && street && zipCode && postOffice && phoneNumer) {
    try {
      await User.updateUserMailingAddress(userId, voivodeship, city, street, zipCode, postOffice, phoneNumer);
      res.sendStatus(204);
    } catch (error) {
      console.log('[User.updateUserResidenceAddress]', error);
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
});

router.patch('/:userId/high-school', [AuthMiddleware.authorization, AuthMiddleware.isAdmin], async (req, res, next) => {
  const { userId } = req.params;
  const {
    completedHighSchool, highSchoolCompletionYear, highSchoolCompletionCity, highSchoolLaureate, contestLaureate,
  } = req.body;

  if (completedHighSchool && highSchoolCompletionYear && highSchoolCompletionCity && highSchoolLaureate && contestLaureate) {
    try {
      await User.updateUserHighSchool(userId, completedHighSchool, highSchoolCompletionYear, highSchoolCompletionCity, highSchoolLaureate, contestLaureate);
      res.sendStatus(204);
    } catch (error) {
      console.log('[User.updateUserHighSchool]', error);
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
});

router.delete('/:userId', [AuthMiddleware.authorization, AuthMiddleware.isAdmin], async (req, res, next) => {
  const { userId } = req.params;

  try {
    await User.deleteUser(userId);
    res.sendStatus(204);
  } catch (error) {
    console.log('[User.deleteUser]', error);
    res.sendStatus(400);
  }
});

module.exports = router;
