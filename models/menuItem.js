const mongoose = require("mongoose");
const Joi = require("joi");

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50
  },
  category: {
    type: Array
  },
  ingredients: {
    type: Array
  },
  user: {
    type: String
  }
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

//Joi validation function
function validateNewItem(menuItem) {
  const schema = {
    name: Joi.string()
      .min(1)
      .max(50)
      .required(),
    category: Joi.array(),
    ingredients: Joi.array(),
    user: Joi.string()
  };

  return Joi.validate(menuItem, schema);
}

function validateUpdateFields(menuItem) {
  const schema = {
    name: Joi.string()
      .min(1)
      .max(50),
    category: Joi.array(),
    ingredients: Joi.array(),
    user: Joi.string()
  };

  return Joi.validate(menuItem, schema);
}

exports.MenuItem = MenuItem;
exports.validateNewItem = validateNewItem;
exports.validateUpdateFields = validateUpdateFields;
