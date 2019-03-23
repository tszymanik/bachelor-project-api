const mongoose = require('mongoose');

const { Schema } = mongoose;

const utility = require('../shared/utility');

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  fieldOfStudyId: {
    type: Schema.ObjectId,
    ref: 'FieldOfStudy',
    required: true,
  },
  semesterNumber: {
    type: Number,
    required: true,
  },
  typeOfChoice: {
    name: {
      type: String,
      required: true,
    },
    shortName: {
      type: String,
      required: true,
    },
  },
  specializationId: {
    type: Schema.ObjectId,
    ref: 'Specialization',
  },
  departament: {
    name: {
      type: String,
      required: true,
    },
    shortName: {
      type: String,
      required: true,
    },
  },
  ectsPoints: {
    type: Number,
    required: true,
  },
  typeOfTerm: {
    name: {
      type: String,
      required: true,
    },
    shortName: {
      type: String,
      required: true,
    },
  },
  lecture: {
    hours: {
      fullTime: {
        type: Number,
        required: true,
      },
      partTime: {
        type: Number,
        required: true,
      },
    },
  },
  exercise: {
    hours: {
      fullTime: {
        type: Number,
        required: true,
      },
      partTime: {
        type: Number,
        required: true,
      },
    },
  },
  lab: {
    hours: {
      fullTime: {
        type: Number,
        required: true,
      },
      partTime: {
        type: Number,
        required: true,
      },
    },
  },
}, utility.schemaOptions);

const Subject = mongoose.model('Subject', subjectSchema);

module.exports.getSubjects = () => Subject
  .find();

module.exports.getSubjectsByFieldOfStudy = fieldOfStudyId => Subject
  .find({
    fieldOfStudyId,
  });

module.exports.getSubjectsByFieldOfStudyAndSemesterNumber = (fieldOfStudyId, semesterNumber) => Subject
  .find({
    fieldOfStudyId,
    semesterNumber,
  });

module.exports.getSubject = subjectId => Subject
  .findById(subjectId)
  .exec();

module.exports.Model = Subject;
