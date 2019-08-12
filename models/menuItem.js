const mongoose = require("mongoose");
const Joi = require("joi");

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  category: {
    type: String,
    minlength: 1,
    maxlength: 50
  },
  ingredients: {
    type: Array,
    minlength: 1,
    maxlength: 50
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
    category: Joi.string()
      .min(1)
      .max(50),
    ingredients: Joi.array()
    //   .min(1)
    //   .max(50)
  };

  return Joi.validate(menuItem, schema);
}

function validateUpdateFields(menuItem) {
    const schema = {
        name: Joi.string()
          .min(1)
          .max(50),
        category: Joi.string()
          .min(1)
          .max(50),
        ingredients: Joi.array()
          .min(1)
          .max(50)
      };

  return Joi.validate(menuItem, schema);
}

exports.MenuItem = MenuItem;
exports.validateNewItem = validateNewItem;
exports.validateUpdateFields = validateUpdateFields;
