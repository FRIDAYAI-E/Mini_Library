const express = require("express");
const router = express.Router();
const Users = require("../models/user.js");
const bcrypt = require("bcrypt");
const seedUsers = require("../models/seed_users.js");

//* AUTH CHECK
const SUPERUSER = "superuser";
const ADMIN = "admin";
const USER = "user";

const isAuth = (roleArr) => (req, res, next) => {
  if (req.session.loginUser) {
    for (const r of roleArr) {
      if (req.session.role === r) {
        return next();
      }
    }
  }
  res.status(404).json({ message: "Authentication required" });
};

//* ROUTER => CREATE NEW SIGNUP
router.post("/", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  Users.create(req.body, (err, createdUser) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    console.log("user is created");
    res.status(200).json(createdUser);
  });
});

//* ROUTER => READ ALL USERS ROUTE
router.get("/", isAuth([SUPERUSER, ADMIN]), (req, res) => {
  try {
    Users.find({}, (err, foundUsers) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(foundUsers);
    });
  } catch (err) {
    res.send(err.message);
  }
});

//* ROUTER => SEED USERS ROUTE
router.get("/seed", async (req, res) => {
  try {
    await Users.deleteMany({});
    for (const u of seedUsers) {
      u.password = bcrypt.hashSync(u.password, bcrypt.genSaltSync(10));
    }
    const seed = await Users.create(seedUsers);
    res.send(seed);
  } catch (err) {
    res.send(err.message);
  }
});

//* GET SPECIFIC USER ROUTE
router.get("/:id", isAuth([SUPERUSER, USER]), async (req, res) => {
  const { id } = req.params;
  console.log(req.params.id);

  Users.findById(id, (err, foundUsers) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      console.log(foundUsers);
      res.status(200).json(foundUsers);
    }
  });
});

//* DELETE SPECIFIC USER
router.delete("/:id", isAuth([SUPERUSER, ADMIN]), (req, res) => {
  Users.findByIdAndDelete(req.params.id, (err, deletedUser) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedUser);
  });
});

//* UPDATE USER DETAILS
router.put("/:id", isAuth([SUPERUSER, ADMIN, USER]), (req, res) => {
  Users.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedUsers) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(updatedUsers);
    }
  );
});

module.exports = router;
