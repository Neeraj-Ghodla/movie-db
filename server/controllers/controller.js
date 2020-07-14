const express = require("express");
const mongoose = require("mongoose");

const User = require("../models/user");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // authenticate the user
  const user = User.findOne({ password });
  if (user) res.send({ msg: "login successful" });
  else res.send({ msg: "email or password is incorrect" });
};

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // validate all fields
  if (!firstName) res.send({ msg: "Firstname is required" });
  if (!lastName) res.send({ msg: "Lastname is required" });
  if (!email) res.send({ msg: "email is required" });
  if (!password) res.send({ msg: "password is required" });

  // check if the user already exists
  const users = await User.find({ email });
  if (users.length > 0) res.send({ msg: "email already used to register" });
  else {
    // make the new user
    const user = new User({ firstName, lastName, email, password });

    // save the new user
    try {
      const data = await user.save();
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  }
};

exports.delete = () => {};
