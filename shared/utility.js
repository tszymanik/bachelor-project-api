const crypto = require('crypto');

const transformSchema = (doc, obj) => {
  const newObj = { ...obj };
  newObj.id = newObj._id;
  delete newObj._id;
  delete newObj.__v;
  return newObj;
};

module.exports.schemaOptions = {
  toJSON: {
    transform: transformSchema,
  },
};

module.exports.sha256 = password => crypto
  .createHash('sha256')
  .update(password)
  .digest('hex');
