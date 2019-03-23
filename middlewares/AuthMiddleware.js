const jwt = require('jsonwebtoken');

const User = require('../models/UserModel').Model;
const TypeOfUser = require('../models/TypeOfUserModel').Model;

const readToken = authorizationHeader => (
  authorizationHeader.split(' ')[1]
);

module.exports.authorization = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = readToken(authorization);

    try {
      const decoded = jwt.verify(token, 'secret');
      const { userId } = decoded;

      const userData = await User
        .findById(userId)
        .select({
          password: 0,
        })
        .exec();

      const { typesOfUserId } = userData;
      const typesOfUserName = [];

      await Promise.all(typesOfUserId.map(async (typeOfUserId) => {
        const typeOfUserData = await TypeOfUser
          .findById(typeOfUserId)
          .exec();

        typesOfUserName.push(typeOfUserData.name);
      }));

      const auth = {
        userId,
        typesOfUser: typesOfUserName,
      };

      res.locals.auth = auth;

      next();
    } catch (error) {
      res.sendStatus(401);
      console.log('[authorization]', error);
    }
  } else {
    res.sendStatus(401);
  }
};

module.exports.isSpecificUserOrAdmin = (req, res, next) => {
  if (req.params.userId === res.locals.auth.userId || res.locals.auth.typesOfUser.includes('administrator')) {
    next();
  } else {
    next(res.sendStatus(401));
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (res.locals.auth.typesOfUser.includes('administrator')) {
    next();
  } else {
    next(res.sendStatus(401));
  }
};
