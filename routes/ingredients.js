const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Ingredient, validateIngredient } = require("../models/ingredient");

//READ / GET ALL
router.get("/", async (req, res) => {
  const ingredients = await Ingredient.find().sort("name");
  res.send(ingredients);
});

//READ / GET ONE
router.get("/:id", async (req, res) => {
  const ingredient = await Ingredient.findById(req.params.id);
  if (!ingredient)
    return res.status(404).send("An ingredient item with the given ID was not found.");

  res.send(ingredient);
});

//CREATE
router.post("/", async (req, res) => {
  const result = validateIngredient(req.body);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let ingredient = new Ingredient({ name: req.body.name });

  ingredient = await ingredient.save();
  res.send(ingredient);
});

//UPDATE
router.put("/:id", async (req, res) => {
  const result = validateIngredient(req.body);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  //Update the ingredient in the database
  const ingredient = await Ingredient.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!ingredient)
    return res.status(404).send("An ingredient with the given ID was not found.");

  res.send(ingredient);
});

//DELETE
router.delete("/:id", async (req, res) => {
  const ingredient = await Ingredient.findByIdAndRemove(req.params.id);
  if (!ingredient)
    return res.status(404).send("An ingredient with the given ID was not found.");

  res.send(ingredient);
});

module.exports = router;
