const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const User = mongoose.model("User", userSchema);

//Joi validation function
function validateUserAllFields(user) {
  const schema = {
    username: Joi.string()
      .email()
      .max(45)
      .required(),
    password: Joi.string()
      .min(5)
      .max(45)
      .required(),
    name: Joi.string()
      .min(3)
      .max(45)
      .required()
  };

  return Joi.validate(user, schema);
}

function validateUserSomeFields(user) {
  const schema = {
    username: Joi.string()
      .email()
      .max(45),
    password: Joi.string()
      .min(5)
      .max(45),
    name: Joi.string()
      .min(3)
      .max(45)
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validateAllFields = validateUserAllFields;
exports.validateSomeFields = validateUserSomeFields;
