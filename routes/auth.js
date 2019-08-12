const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

//CREATE
router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Invalid username or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid username or password.");

  const token = jwt.sign({ _id: user._id, name: user.name }, config.get("jwtPrivateKey"));
  res.send(token);
});

function validate(req) {
  const schema = {
    username: Joi.string()
      .email()
      .min(5)
      .max(50)
      .required(),
    password: Joi.string()
      .min(5)
      .max(50)
      .required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;
