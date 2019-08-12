const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50
  }
});

const Category = mongoose.model("Category", categorySchema);

//Joi validation function
function validateCategory(category) {
  const schema = {
    name: Joi.string()
      .min(1)
      .max(50)
      .required()
  };

  return Joi.validate(category, schema);
}

exports.Category = Category;
exports.validateCategory = validateCategory;