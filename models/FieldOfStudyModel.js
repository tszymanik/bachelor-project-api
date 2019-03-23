const mongoose = require('mongoose');
const utility = require('../shared/utility');

const { Schema } = mongoose;

const fieldOfStudySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  shortName: {
    type: String,
    required: true,
  },
  faculty: {
    name: {
      type: String,
      required: true,
    },
    shortName: {
      type: String,
      required: true,
    },
  },
  typeOfStudies: {
    name: {
      type: String,
      required: true,
    },
    shortName: {
      type: String,
      required: true,
    },
  },
  academicYearName: {
    type: String,
    required: true,
  },
  typeOfRecruitment: {
    name: {
      type: String,
      required: true,
    },
    shortName: {
      type: String,
      required: true,
    },
  },
  educationProfile: {
    name: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
  },
  levelOfEducation: {
    name: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
  },
  formOfStudies: {
    name: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
  },
}, utility.schemaOptions);

const FieldOfStudy = mongoose.model('FieldOfStudy', fieldOfStudySchema);

module.exports.getFieldsOfStudy = () => FieldOfStudy
  .find();

module.exports.getFieldOfStudy = fieldOfStudyId => FieldOfStudy
  .findById(fieldOfStudyId)
  .exec();

module.exports.Model = FieldOfStudy;
