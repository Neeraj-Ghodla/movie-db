const express = require("express");
const mongoose = require("mongoose");

const { dbConnectionString } = require("./config/config");
const { login, signup } = require("./controllers/controller");

// initailize the app
const app = express();

// set up the port
const PORT = process.env.PORT || 3000;

// mongodb setup
mongoose.Promise = global.Promise;
mongoose.connect(
  dbConnectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => console.log(err ? err : "Connected to DB...")
);

// middleware
app.use(express.urlencoded({ extended: true }));

// set up the routes
app.get("/", (req, res) => res.send({ msg: "Connected..." }));
app.post("/login", login);
app.post("/signup", signup);

// start the server
app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
