const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {
  MenuItem,
  validateNewItem,
  validateUpdateFields
} = require("../models/menuItem");

//READ / GET ALL
router.get("/", async (req, res) => {
  const menuItems = await MenuItem.find().sort("name");
  res.send(menuItems);
});

//READ / GET ONE
router.get("/:id", async (req, res) => {
  const menuItem = await MenuItem.findById(req.params.id);
  if (!menuItem)
    return res.status(404).send("A menu item with the given ID was not found.");

  res.send(menuItem);
});

//CREATE
router.post("/", async (req, res) => {
  const result = validateNewItem(req.body);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  //Create an object only with fields given.
  let newMenuItemObject = {};
  if (req.body.name) newMenuItemObject.name = req.body.name;
  if (req.body.category) newMenuItemObject.category = req.body.category;
  if (req.body.ingredients) newMenuItemObject.ingredients = req.body.ingredients;
  if (req.body.user) newMenuItemObject.user = req.body.user;

  let menuItem = new MenuItem(newMenuItemObject);

  menuItem = await menuItem.save();
  res.send(menuItem);
});

//UPDATE
router.put("/:id", async (req, res) => {
  const result = validateUpdateFields(req.body);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  //Create an object only with fields given.
  let updateMenuItemObject = {};
  if (req.body.name) updateMenuItemObject.name = req.body.name;
  if (req.body.category) updateMenuItemObject.category = req.body.category;
  if (req.body.ingredients) updateMenuItemObject.ingredients = req.body.ingredients;
  if (req.body.user) updateMenuItemObject.user = req.body.user;

  //Update the menuItem in the database with the data in updateMenuItemObject
  const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, updateMenuItemObject, {
    new: true
  });

  if (!menuItem)
    return res.status(404).send("A menu item with the given ID was not found.");

  res.send(menuItem);
});

//DELETE
router.delete("/:id", async (req, res) => {
  const menuItem = await MenuItem.findByIdAndRemove(req.params.id);
  if (!menuItem)
    return res.status(404).send("A menu item with the given ID was not found.");

  res.send(menuItem);
});

module.exports = router;
