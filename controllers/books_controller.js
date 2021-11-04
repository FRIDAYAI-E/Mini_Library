const express = require("express");
const router = express.Router();
const Books = require("../models/books.js");
const onLoan = require("../models/onLoan.js");
const seedBooks = require("../models/seed_books.js");
const genre = require("../models/genre");

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

//* CREATE BOOK COLLECTION ROUTE
router.post("/", isAuth([SUPERUSER, ADMIN]), (req, res) => {
  console.log(`Create book. req : ${req.body}`);
  Books.create(req.body, (err, createdBook) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(createdBook);
  });
});

//* GET ALL BOOKS ROUTE
router.get("/", (req, res) => {
  try {
    Books.find({}, (err, foundBooks) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(foundBooks);
    });
  } catch (err) {
    res.send(err.message);
  }
});

//* ROUTER => GET GENRE ROUTE
router.get("/genre", (req, res) => {
  res.json(genre);
});

//* SEED BOOK COLLECTION ROUTE
router.get("/seed", async (req, res) => {
  try {
    await Books.deleteMany({});
    console.log("Books are deleted");
    const seed = await Books.create(seedBooks);
    console.log(`Book seeds: ${seed}`);
    res.send(seed);
  } catch (err) {
    res.send(err.message);
  }
});

// //* GET SPECIFIC BOOK COLLECTION
router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log("book edit route hit: " + id);
  Books.findById(id, (err, foundBooks) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(200).json(foundBooks);
    }
  });
});

//* DELETE BOOK COLLECTION ROUTE
router.delete("/:id", isAuth([SUPERUSER, ADMIN]), (req, res) => {
  const { id } = req.params;
  Books.findByIdAndDelete(id, (err, deletedBook) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedBook);
  });
});

//* ROUTE = UPDATE ROUTE
router.put("/:id", isAuth([SUPERUSER, ADMIN]), (req, res) => {
  const { id } = req.params;
  Books.findByIdAndUpdate(id, req.body, { new: true }, (err, updatedBooks) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(updatedBooks);
  });
});

module.exports = router;
