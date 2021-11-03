const express = require("express");
const router = express.Router();
const Books = require("../models/books.js");
const onLoan = require("../models/onLoan.js");
const seedBooks = require("../models/seed_books.js");
const genre = require("../models/genre");

//* 5 + 2  REST routes => CREATE, ALL, READ, UPDATE, DELETE (NEW Form, Edit Form)

//* CONTROLLER ROUTE AUTHENTICATION
const isAuthenticated = (req, res, next) => {
  if (req.session.loginUser) {
    return next();
  } else {
    res.status(404).json({ message: "Authentication required" });
  }
};

const isAuthenticatedAdmin = (req, res, next) => {
  if (req.session.loginUser && req.session.admin === admin) {
    return next();
  } else {
    res.status(404).json({ message: "Unauthorized Access" });
  }
};

//* ROUTER => CREATE ROUTE
router.post("/", isAuthenticated, (req, res) => {
  Books.create(req.body, (err, createdBook) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(createdBook);
  });
});

//* ROUTER => INDEX READ ROUTE
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

//* ROUTER => SEED ROUTE
// router.get("/seed", async (req, res) => {
//     try {
//         await Books.deleteMany({});
//         console.log("Books are deleted")
//         const seed = await Books.create(seedBooks);
//         console.log(`Book seeds: ${seed}`);
//         res.send(seed);
//     } catch (err) {
//         res.send(err.message);
//     }
// });

// //* ROUTER => SEPCIFIC ID ROUTE
router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log("book edit route hit: " + id);
  Books.findById({ id }, (err, foundBooks) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(200).json(foundBooks);
    }
  });
});

//* ROUTER => DELETE ROUTE
router.delete("/:id", isAuthenticated, (req, res) => {
  Books.findByIdAndDelete(req.params.id, (err, deletedBook) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedBook);
  });
});

//* ROUTE = UPDATE ROUTE
router.put("/:id", isAuthenticated, (req, res) => {
  Books.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedBooks) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(updatedBooks);
    }
  );
});

module.exports = router;
