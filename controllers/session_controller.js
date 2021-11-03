const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

router.get("/new", (req, res) => {
  console.log("/session", req.session);
  if (req.session.loginUser) {
    res.send(req.session);
    return;
  }
  res.json("Please Login again");
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  console.log("user", user);
  if (user === null) {
    return res.json({ message: "There is no such user, Please try again" });
  }
  const results = await bcrypt.compare(password, user.password);
  if (results) {
    req.session.loginUser = user;
    req.session.role = user.role;
    res.status(200).json(req.session);
  } else {
    res.status(404).json({ message: "Password incorrect" });
  }
});

router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "session destroyed" });
  });
});

module.exports = router;
