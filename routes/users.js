const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { User, validateAllFields, validateSomeFields } = require("../models/user");

//READ / GET ALL
router.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

//READ / GET ONE
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).send("A user with the given ID was not found.");

  res.send(user);
});

//CREATE
router.post("/", async (req, res) => {
  //TO DO--TO DO--TO DO
  //First check to make sure user doesn't already exist.
  // let user = users.find(u => u.username === req.body.username);
  // if (user)
  //   return res.status(400).send("A user with that email already exists");

  //Then add user.
  const result = validateAllFields(req.body);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let user = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name
  });

  user = await user.save();
  res.send(user);
});

//UPDATE
router.put("/:id", async (req, res) => {
  const result = validateSomeFields(req.body);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  //Create an object only with fields given.
  let userUpdateObject = {};
  if (req.body.username) userUpdateObject.username = req.body.username;
  if (req.body.password) userUpdateObject.password = req.body.password;
  if (req.body.name) userUpdateObject.name = req.body.name;

  //Update the user in the database with the data in userUpdateObject
  const user = await User.findByIdAndUpdate(req.params.id, userUpdateObject, {
    new: true
  });

  if (!user)
    return res.status(404).send("A user with the given ID was not found.");

  res.send(user);
});

//DELETE
router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user)
    return res.status(404).send("A user with the given ID was not found.");

  res.send(user);
});

module.exports = router;