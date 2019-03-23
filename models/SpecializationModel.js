const mongoose = require('mongoose');
const utility = require('../shared/utility');

const { Schema } = mongoose;

const specializationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  shortName: {
    type: String,
    required: true,
  },
  fieldOfStudyId: {
    type: Schema.ObjectId,
    ref: 'FieldOfStudy',
    required: true,
  },
}, utility.schemaOptions);

const Specialization = mongoose.model('Specialization', specializationSchema);

module.exports.getSpecializationsByFieldOfStudyId = fieldOfStudyId => Specialization
  .find({
    fieldOfStudyId,
  });

module.exports.getSpecialization = specializationId => Specialization
  .findById(specializationId)
  .exec();

module.exports.Model = Specialization;
