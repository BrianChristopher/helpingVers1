const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Category, validateCategory } = require("../models/category");

//READ / GET ALL
router.get("/", async (req, res) => {
  const categories = await Category.find().sort("name");
  res.send(categories);
});

//READ / GET ONE
router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category)
    return res.status(404).send("A category with the given ID was not found.");

  res.send(category);
});

//CREATE
router.post("/", async (req, res) => {
  const result = validateCategory(req.body);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let category = new Category({ name: req.body.name });

  category = await category.save();
  res.send(category);
});

//UPDATE
router.put("/:id", async (req, res) => {
  const result = validateCategory(req.body);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  //Update the category in the database
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!category)
    return res.status(404).send("A category with the given ID was not found.");

  res.send(category);
});

//DELETE
router.delete("/:id", async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category)
    return res.status(404).send("A category with the given ID was not found.");

  res.send(category);
});

module.exports = router;
