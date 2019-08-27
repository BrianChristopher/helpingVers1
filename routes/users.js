const auth = require("../middleware/auth");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {
  User,
  validateAllFields,
  validateSomeFields
} = require("../models/user");

//CREATE
router.post("/", async (req, res) => {
  const result = validateAllFields(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["username", "password", "name"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["name", "username"]));
});

//READ / GET ALL
router.get("/", auth, async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

//READ / GET ONE
router.get("/:id", auth, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).send("A user with the given ID was not found.");

  res.send(user);
});

//UPDATE
router.put("/:id", auth, async (req, res) => {
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
router.delete("/:id", auth, async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user)
    return res.status(404).send("A user with the given ID was not found.");

  res.send(user);
});

module.exports = router;
