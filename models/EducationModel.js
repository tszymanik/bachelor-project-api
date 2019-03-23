const mongoose = require('mongoose');
const utility = require('../shared/utility');

const { Schema } = mongoose;

const educationSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  fieldOfStudyId: {
    type: Schema.ObjectId,
    ref: 'FieldOfStudy',
    required: true,
  },
  specializationId: {
    type: Schema.ObjectId,
    ref: 'Specialization',
  },
  currentSemester: {
    type: Number,
  },
  currentAcademicYear: {
    type: String,
  },
}, utility.schemaOptions);

const Education = mongoose.model('Education', educationSchema);

module.exports.getEducationByUserId = userId => Education
  .find({
    userId,
  })
  .exec();

module.exports.getEducationItem = educationItemId => Education
  .findById(educationItemId)
  .exec();

module.exports.addEducationItem = (
  userId,
  fieldOfStudyId,
  specializationId,
  currentSemester,
  currentAcademicYear,
) => Education({
  userId,
  fieldOfStudyId,
  specializationId,
  currentSemester,
  currentAcademicYear,
})
  .save();

module.exports.updateEducationItem = (
  educationItemId,
  fieldOfStudyId,
  specializationId,
  currentSemester,
  currentAcademicYear,
) => Education
  .findByIdAndUpdate(educationItemId, {
    fieldOfStudyId,
    specializationId,
    currentSemester,
    currentAcademicYear,
  })
  .exec();

module.exports.deleteEducationItem = educationItemId => Education
  .findByIdAndRemove(educationItemId)
  .exec();

module.exports.Model = Education;
