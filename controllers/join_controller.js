const express = require("express");
const router = express.Router();
const onLoan = require("../models/onLoan.js");
const Books = require("../models/books.js");
const async = require("async");

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

//* GET ADMIN_DASHBOARD ROUTE
router.get("/admin/dashboard", isAuth([SUPERUSER, ADMIN]), async (req, res) => {
  const data = [];
  for await (const b of Books.find({})) {
    const loan = await onLoan.find({ bookID: b._id, $or: [{ dateReturned: "" }, { dateReturned: { $exists: false } }] });
    const loanHistory = await onLoan.find({ bookID: b._id });
    b._doc.timesBorrowed = loanHistory.length;
    b._doc.loaned = loan.length;
    b._doc.available = b._doc.qty - loan.length;
    data.push(b);
  }
  res.json(data);
});

//* GET BROWSE_BOOK ROUTE (Users browsing books to display availability)
router.get(
  "/browseBooks",
  isAuth([SUPERUSER, ADMIN, USER]),
  async (req, res) => {
    const data = [];
    for await (const b of Books.find({})) {
      const loan = await onLoan.find({ bookID: b._id, $or: [{ dateReturned: "" }, { dateReturned: { $exists: false } }] });
      if (b.qty - loan.length > 0) {
        b._doc.availability = "available";
      } else {
        b._doc.availability = "unavailable";
      }
      console.log(b);
      data.push(b);
    }
    console.log("data", data);
    res.json(data);
  }
);

module.exports = router;
