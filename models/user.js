const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 1000
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50
  }
});

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({ _id: this._id, name: this.name }, config.get("jwtPrivateKey"));
  return token;
}

const User = mongoose.model("User", userSchema);

//Joi validation function
function validateUserAllFields(user) {
  const schema = {
    username: Joi.string()
      .email()
      .min(5)
      .max(50)
      .required(),
    password: Joi.string()
      .min(5)
      .max(50)
      .required(),
    name: Joi.string()
      .min(1)
      .max(50)
      .required()
  };

  return Joi.validate(user, schema);
}

function validateUserSomeFields(user) {
  const schema = {
    username: Joi.string()
      .email()
      .min(5)
      .max(50),
    password: Joi.string()
      .min(5)
      .max(50),
    name: Joi.string()
      .min(1)
      .max(50)
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validateAllFields = validateUserAllFields;
exports.validateSomeFields = validateUserSomeFields;
