const express = require("express");
const router = express.Router();
const Books = require("../models/books.js");
const seedBooks = require("../models/seed_books.js");
const onLoans = require("../models/onLoan.js");

//* 5 + 2  REST routes => CREATE, ALL, READ, UPDATE, DELETE (NEW Form, Edit Form)

//* ROUTER => SEED ROUTE
router.get("/seed", async (req, res) => {
  try {
    await Books.deleteMany({});
    const seed = await Books.create(seedBooks);
    console.log(`Book seeds: ${seed}`);
    res.send(seed);
  } catch (err) {
    res.send(err.message);
  }
});

//* ROUTER => CREATE ROUTE
router.post("/", (req, res) => {
  Books.create(req.body, (err, createdBook) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(createdBook);
  });
});

//* ROUTER => INDEX READ ROUTE
router.get("/testing", async (req, res) => {
  const AVAILABLE = "available"
  const UNAVAILABLE = "unavailable"
  const bookID = "617fadcaf44f0e56fe2736c6"
  const data = [];
  const booksOnLoan = await onLoans.find({})
  const allBooks = await Books.find({})
  console.log("hi")

  // for (const loanEntries of booksOnLoan){
  //   await Books.find({_id: loanEntries.bookID}).exec(function (err, matchedBooks) {
  //     if (matchedBooks) {
  //       matchedBooks.availability = UNAVAILABLE
  //       console.log("matchedBooks", matchedBooks)
  //       data.push(matchedBooks)
  //     }
  //   })
  // }

  // Books.find( {$lookup: {from: onLoans, localField: bookID, foreignField: Books._id, as: AVAILABLE 
  //   // $cond:{ if:null, then {availability: AVAILABLE}, else {availability: UNAVAILABLE}
  // }}  
  // )

  res.json(data)

});


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

//* ROUTER => SEPCIFIC ID ROUTE
router.get("/:id", (req, res) => {
  const { id } = req.params.id;
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

//* ROUTER => DELETE ROUTE
router.delete("/:id", (req, res) => {
  Books.findByIdAndDelete(req.params.id, (err, deletedBook) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedBook);
  });
});

//* ROUTE = UPDATE ROUTE
router.put("/:id", (req, res) => {
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
