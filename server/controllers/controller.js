const express = require("express");
const mongoose = require("mongoose");

const User = require("../models/user");

exports.login = (req, res) => {};

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // validate all fields
  if (!firstName) res.send({ msg: "Firstname is required" });
  if (!lastName) res.send({ msg: "Lastname is required" });
  if (!email) res.send({ msg: "email is required" });
  if (!password) res.send({ msg: "password is required" });

  // make the new user
  const user = new User({ firstName, lastName, email, password });

  // save the new user
  try {
    const data = await user.save();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};
