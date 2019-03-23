require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const TypeOfUserController = require('./controllers/TypeOfUserController');
const SubjectController = require('./controllers/SubjectController');
const MarkController = require('./controllers/MarkController');
const FieldOfStudyController = require('./controllers/FieldOfStudyController');
const SpecializationController = require('./controllers/SpecializationController');
const EducationController = require('./controllers/EducationController');

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
});

const program = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    app.use(cors());
    app.use(jsonParser);
    app.use(urlencodedParser);
    app.use('/auth', AuthController);
    app.use('/users', UserController);
    app.use('/types-of-user', TypeOfUserController);
    app.use('/education', EducationController);
    app.use('/fields-of-study', FieldOfStudyController);
    app.use('/specializations', SpecializationController);
    app.use('/subjects', SubjectController);
    app.use('/marks', MarkController);

    app.use((req, res, next) => res.sendStatus(404));
    app.listen(process.env.PORT, () => console.log('App listening!'));
  } catch (error) {
    console.log('[mongoose.connect]', error);
  }
};

program();
