require('dotenv').config();
const mongoose = require('mongoose');
const utility = require('../shared/utility');

const User = require('../models/UserModel').Model;
const Education = require('../models/EducationModel').Model;
const TypeOfUser = require('../models/TypeOfUserModel').Model;
const FieldOfStudy = require('../models/FieldOfStudyModel').Model;
const Specialization = require('../models/SpecializationModel').Model;

const generateTypesOfUser = () => (
  Promise.all([
    TypeOfUser({
      name: 'administrator',
    })
      .save(),
    TypeOfUser({
      name: 'pracownik',
    })
      .save(),
    TypeOfUser({
      name: 'nauczyciel',
    })
      .save(),
    TypeOfUser({
      name: 'student',
    })
      .save(),
  ])
);

const generateUsers = async () => (
  Promise.all([
    User({
      typesOfUserId: [
        await TypeOfUser
          .findOne({
            name: 'administrator',
          })
          .exec(),
        await TypeOfUser
          .findOne({
            name: 'student',
          })
          .exec(),
      ],
      email: 'admin@sod.edu.pl',
      password: utility.sha256('admin'),
      firstName: 'Jan',
      secondName: 'Marian',
      lastName: 'Kowalski',
      title: '',
      pesel: '94021106010',
      dateOfBirth: new Date(1994, 2, 11),
      fatherName: 'Krystian',
      motherName: 'Maria',
      sex: 'mężczyzna',
      maidenName: '',
      maritalStatus: '',
      citizenship: '',
      nationality: 'polskie',
      placeOfBirth: 'Katowice',
      voivodeshipOfBirth: '',
      workEmail: 'jan.kowalski@edu.uekat.pl',
      residenceAddress: {
        voivodeship: 'śląskie',
        city: 'Katowice',
        street: 'Tyska 24/2',
        zipCode: '40-025',
        postOffice: '',
        phoneNumer: '',
      },
      mailingAddress: {
        voivodeship: 'śląskie',
        city: 'Katowice',
        street: 'Tyska 24/2',
        zipCode: '40-025',
        postOffice: '',
        phoneNumer: '',
      },
      highSchool: {
        completedHighSchool: 'III LO im. A. Mickiewicza w Katowicach',
        highSchoolCompletionYear: '2013',
        highSchoolCompletionCity: 'Katowice',
        highSchoolLaureate: '',
        contestLaureate: '',
      },
    })
      .save(),
    User({
      typesOfUserId: [
        await TypeOfUser
          .findOne({
            name: 'nauczyciel',
          })
          .exec(),
      ],
      email: 'krzysztof.piatek@sod.edu.pl',
      password: utility.sha256('krzysztof.piatek'),
      firstName: 'Krzysztof',
      lastName: 'Piątek',
    })
      .save(),
  ])
);

const generateEducation = async () => (
  Promise.all([
    Education({
      userId: await User
        .findOne({
          email: 'admin@sod.edu.pl',
        })
        .exec(),
      fieldOfStudyId: await FieldOfStudy
        .findOne({
          name: 'Informatyka',
        })
        .exec(),
      specializationId: await Specialization
        .findOne({
          name: 'Programowanie gier i aplikacji mobilnych',
        })
        .exec(),
      currentSemester: 6,
      currentAcademicYear: '2017/2018l',
    })
      .save(),
  ])
);

const generate = async () => {
  await mongoose.connect(process.env.DB_CONNECTION);
  console.log('Connected to database.');
  console.log('Generating sample data started.');
  await generateTypesOfUser();
  await generateUsers();
  await generateEducation();
  console.log('Generating sample data ended.');
  await mongoose.connection.close();
  console.log('Connection ended.');
};

generate();
