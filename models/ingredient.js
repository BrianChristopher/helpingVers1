const mongoose = require("mongoose");
const Joi = require("joi");

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50
  }
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

//Joi validation function
function validateIngredient(ingredient) {
  const schema = {
    name: Joi.string()
      .min(1)
      .max(50)
      .required()
  };

  return Joi.validate(ingredient, schema);
}

exports.Ingredient = Ingredient;
exports.validateIngredient = validateIngredient;