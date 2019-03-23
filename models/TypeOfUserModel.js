const mongoose = require('mongoose');
const utility = require('../shared/utility');

const { Schema } = mongoose;

const typeOfUserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
}, utility.schemaOptions);

const TypeOfUser = mongoose.model('TypeOfUser', typeOfUserSchema);

module.exports.getTypesOfUser = () => TypeOfUser
  .find()
  .exec();

module.exports.getTypeOfUser = typeOfUserId => TypeOfUser
  .findById(typeOfUserId)
  .exec();

module.exports.Model = TypeOfUser;
