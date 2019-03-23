const mongoose = require('mongoose');
const utility = require('../shared/utility');

const TypeOfUser = require('./TypeOfUserModel').Model;

const { Schema } = mongoose;

const userSchema = new Schema({
  typesOfUserId: [{
    type: Schema.ObjectId,
    ref: 'TypeOfUser',
    required: true,
  }],
  email: {
    type: String,
    unique: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    required: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
  firstName: {
    type: String,
    minLength: 3,
    required: true,
  },
  secondName: {
    type: String,
    minLength: 3,
  },
  lastName: {
    type: String,
    minLength: 3,
    required: true,
  },
  title: {
    type: String,
  },
  pesel: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  fatherName: {
    type: String,
  },
  motherName: {
    type: String,
  },
  sex: {
    type: String,
  },
  maidenName: {
    type: String,
  },
  maritalStatus: {
    type: String,
  },
  citizenship: {
    type: String,
  },
  nationality: {
    type: String,
  },
  placeOfBirth: {
    type: String,
  },
  voivodeshipOfBirth: {
    type: String,
  },
  workEmail: {
    type: String,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  residenceAddress: {
    voivodeship: {
      type: String,
    },
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    postOffice: {
      type: String,
    },
    phoneNumer: {
      type: String,
    },
  },
  mailingAddress: {
    voivodeship: {
      type: String,
    },
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    postOffice: {
      type: String,
    },
    phoneNumer: {
      type: String,
    },
  },
  highSchool: {
    completedHighSchool: {
      type: String,
    },
    highSchoolCompletionYear: {
      type: String,
    },
    highSchoolCompletionCity: {
      type: String,
    },
    highSchoolLaureate: {
      type: String,
    },
    contestLaureate: {
      type: String,
    },
  },
}, utility.schemaOptions);

const User = mongoose.model('User', userSchema);

module.exports.authUser = (email, password) => User
  .findOne({
    email,
    password,
  })
  .exec();

module.exports.getUsersByTypesOfUserName = typesOfUserName => new Promise(async (resolve, reject) => {
  try {
    const typesOfUserData = [];

    await Promise.all(typesOfUserName.map(async (typeOfUserName) => {
      const typeOfUserData = await TypeOfUser
        .findOne({
          name: typeOfUserName,
        })
        .exec();
      typesOfUserData.push(typeOfUserData.id);
    }));

    const usersData = await User
      .find({
        typesOfUserId: {
          $in: typesOfUserData,
        },
      })
      .select({
        password: 0,
      })
      .exec();

    resolve(usersData);
  } catch (error) {
    reject(error);
  }
});

module.exports.getUsers = () => User
  .find()
  .select({
    password: 0,
  })
  .exec();

module.exports.getUser = userId => User
  .findById(userId)
  .select({
    password: 0,
  })
  .exec();

module.exports.addUser = (typesOfUserId, email, password, firstName, lastName) => {
  const hashedPassword = utility.sha256(password);

  User({
    typesOfUserId,
    email,
    password: hashedPassword,
    firstName,
    lastName,
  })
    .save();
};

module.exports.updateUser = (userId, typesOfUserId, email, firstName, secondName, lastName, title, pesel, dateOfBirth, fatherName, motherName, sex, maidenName, maritalStatus, citizenship, nationality, placeOfBirth, voivodeshipOfBirth, workEmail) => User
  .findByIdAndUpdate(userId, {
    typesOfUserId,
    email,
    firstName,
    secondName,
    lastName,
    title,
    pesel,
    dateOfBirth,
    fatherName,
    motherName,
    sex,
    maidenName,
    maritalStatus,
    citizenship,
    nationality,
    placeOfBirth,
    voivodeshipOfBirth,
    workEmail,
  })
  .exec();

module.exports.updateUserWithPassword = (userId, typesOfUserId, email, password, firstName, secondName, lastName, title, pesel, dateOfBirth, fatherName, motherName, sex, maidenName, maritalStatus, citizenship, nationality, placeOfBirth, voivodeshipOfBirth, workEmail) => {
  const hashedPassword = utility.sha256(password);

  User
    .findByIdAndUpdate(userId, {
      typesOfUserId,
      email,
      hashedPassword,
      firstName,
      secondName,
      lastName,
      title,
      pesel,
      dateOfBirth,
      fatherName,
      motherName,
      sex,
      maidenName,
      maritalStatus,
      citizenship,
      nationality,
      placeOfBirth,
      voivodeshipOfBirth,
      workEmail,
    })
    .exec();
};

module.exports.updateUserResidenceAddress = (userId, voivodeship, city, street, zipCode, postOffice, phoneNumer) => User
  .findByIdAndUpdate(userId, {
    residenceAddress: {
      voivodeship,
      city,
      street,
      zipCode,
      postOffice,
      phoneNumer,
    },
  })
  .exec();

module.exports.updateMailingAddress = (userId, voivodeship, city, street, zipCode, postOffice, phoneNumer) => User
  .findByIdAndUpdate(userId, {
    mailingAddress: {
      voivodeship,
      city,
      street,
      zipCode,
      postOffice,
      phoneNumer,
    },
  })
  .exec();

module.exports.updateHighSchool = (userId, completedHighSchool, highSchoolCompletionYear, highSchoolCompletionCity, highSchoolLaureate, contestLaureate) => User
  .findByIdAndUpdate(userId, {
    highSchool: {
      completedHighSchool,
      highSchoolCompletionYear,
      highSchoolCompletionCity,
      highSchoolLaureate,
      contestLaureate,
    },
  })
  .exec();

module.exports.deleteUser = userId => User
  .findByIdAndRemove(userId)
  .exec();

module.exports.Model = User;
