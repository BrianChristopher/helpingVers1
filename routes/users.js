const express = require("express");
const router = express.Router();
const Joi = require("joi");

// THIS IS THE BEGINNING OF USERS
//It is currently a variable array and will eventually be a DB.
//This is the beginning of API routes for working with array and eventually DB

const users = [
  {
    _id: 1,
    username: "cookie@sesamestreet.usa",
    password: "cis4cookie",
    name: "Cookie Monster"
  },
  {
    _id: 2,
    username: "sailorman@navy.us",
    password: "strong2thefinish",
    name: "Popeye the Sailor Man"
  },
  {
    _id: 3,
    username: "blanche@goldengirls.com",
    password: "bigdaddyheartsme",
    name: "Blanche Deveraux"
  },
  {
    _id: 4,
    username: "harry@hogwarts.edu",
    password: "theBoyWhoLived",
    name: "Harry Potter"
  }
];

//THESE ARE THE ROUTES FOR THE USERS
//READ
router.get("/", (req, res) => {
  res.send(users);
});

router.get("/:id", (req, res) => {
  const user = users.find(u => u._id === parseInt(req.params.id));
  if (!user)
    return res.status(404).send("A user with the given ID was not found.");
  res.send(user);
});

//CREATE
router.post("/", (req, res) => {
  //First check to make sure user doesn't already exist.
  let user = users.find(u => u.username === req.body.username);
  if (user)
    return res.status(400).send("A user with that email already exists");

  //Then add user.
  //This Joi validation is duplicated and can be extracted to a function.
  const schema = {
    username: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .max(15)
      .required(),
    name: Joi.string()
      .min(3)
      .required()
  };

  const result = Joi.validate(req.body, schema);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  user = {
    _id: users.length + 1,
    username: req.body.username,
    password: req.body.password,
    name: req.body.name
  };
  users.push(user);
  res.send(user);
});

//Update
router.put("/:id", (req, res) => {
  const user = users.find(c => c._id === parseInt(req.params.id));
  if (!user)
    return res.status(404).send("A user with the given ID was not found.");

  //This Joi validation is duplicated and can be extracted to a function.
  const schema = {
    username: Joi.string().email(),
    password: Joi.string()
      .min(5)
      .max(15),
    name: Joi.string().min(3)
  };

  const result = Joi.validate(req.body, schema);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  if (req.body.username) user.username = req.body.username;
  if (req.body.password) user.password = req.body.password;
  if (req.body.name) user.name = req.body.name;
  res.send(user);
});

//Delete
router.delete("/:id", (req, res) => {
  const user = users.find(u => u._id === parseInt(req.params.id));
  if (!user)
    return res.status(404).send("A user with the given ID was not found.");

  //Delete (this is method with our demo array; will be different in actual db (destroy?))
  const index = users.indexOf(user);
  users.splice(index, 1);

  res.send(user);
});

module.exports = router;
