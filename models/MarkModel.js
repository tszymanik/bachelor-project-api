const mongoose = require('mongoose');
const utility = require('../shared/utility');

const Subject = require('./SubjectModel').Model;

const { Schema } = mongoose;

const markSchema = new Schema({
  value: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  termNumber: {
    type: Number,
    required: true,
  },
  studentId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  educationItemId: {
    type: Schema.ObjectId,
    ref: 'Education',
    required: true,
  },
  teacherId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  subjectId: {
    type: Schema.ObjectId,
    ref: 'Subject',
    required: true,
  },
  typeOfSubject: {
    type: String,
    required: true,
  },
  typeOfTerm: {
    type: String,
    required: true,
  },
}, utility.schemaOptions);

const Mark = mongoose.model('Mark', markSchema);

module.exports.getMarksByStudentIdAndFieldOfStudyIdAndSemesterNumber = async (
  studentId,
  fieldOfStudyId,
  semesterNumber,
) => Mark
  .find({
    studentId,
    subjectId: await Subject
      .find({
        fieldOfStudyId,
        semesterNumber,
      })
      .exec(),
  })
  .exec();

module.exports.getMarksByStudentIdAndFieldOfStudyId = async (
  studentId,
  fieldOfStudyId,
) => Mark
  .find({
    studentId,
    subjectId: await Subject
      .find({
        fieldOfStudyId,
      })
      .exec(),
  })
  .exec();

module.exports.getMarksByEducationItemId = educationItemId => Mark
  .find({
    educationItemId,
  })
  .exec();

module.exports.getMarksByEducationItemIdAndSemesterNumber = async (
  educationItemId,
  semesterNumber,
) => Mark
  .find({
    educationItemId,
    subjectId: await Subject
      .find({
        semesterNumber,
      })
      .exec(),
  })
  .exec();

module.exports.getMark = markId => Mark
  .findById(markId)
  .exec();

module.exports.addMark = (
  value,
  subjectId,
  studentId,
  educationItemId,
  teacherId,
  termNumber,
  typeOfSubject,
  typeOfTerm,
) => Mark({
  value,
  subjectId,
  studentId,
  educationItemId,
  teacherId,
  termNumber,
  typeOfSubject,
  typeOfTerm,
})
  .save();

module.exports.deleteMark = markId => Mark
  .findByIdAndRemove(markId)
  .exec();

module.exports.Model = Mark;
