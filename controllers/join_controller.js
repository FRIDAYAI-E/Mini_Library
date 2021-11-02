const express = require("express");
const router = express.Router();
const onLoans = require("../models/onLoan.js");
const Books = require("../models/books.js");

//* ROUTER => ADMINDASHBOARD READ ROUTE
router.get("/admin/dashboard", async (req, res) => {
  const data = [];
  const books = await Books.find({});
  for (const b of books) {
    if ((await onLoans.find({ bookID: b._doc._id }).length) > 0) {
      b._doc.timesBorrowed = await onLoans.find({ bookID: b._doc._id }).length;
      b._doc.loaned =
        (await onLoans.find({ bookID: b._doc._id, dateReturned: null })
          .length) > 0
          ? onLoans.find({ bookID: b._doc._id, dateReturned: null }).length
          : 0;
      b._doc.available = b._doc.qty - b._doc.loaned;
      data.push(b);
    } else {
      b._doc.timesBorrowed = 0;
      b._doc.loaned = 0;
      b._doc.available = b._doc.qty;
      data.push(b);
    }
  }
  res.json(data);
});

module.exports = router;
