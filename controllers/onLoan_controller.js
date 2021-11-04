const express = require("express");
const router = express.Router();
const onLoan = require("../models/onLoan.js");
const seedOnLoans = require("../models/seed_onLoan.js");

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

//* CREATE LOAN ENTRY
router.post("/", (req, res) => {
  onLoan.create(req.body, (err, createdLoan) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(createdLoan);
  });
});

//* GET ACTIVE LOANS
router.get("/active", isAuth([SUPERUSER, ADMIN]), (req, res) => {
  try {
    onLoan.find(
      { $or: [{ dateReturned: "" }, { dateReturned: { $exists: false } }] },
      (err, foundonLoans) => {
        if (err) {
          res.status(400).json({ error: err.message });
        }
        res.status(200).json(foundonLoans);
      }
    );
  } catch (err) {
    res.send(err.message);
  }
});

//* GET LOANS BY USERID
router.get("/:id", isAuth([SUPERUSER, USER, ADMIN]), async (req, res) => {
  const { id } = req.params;
  onLoan
    .find({ userID: id })
    .populate("bookID")
    .exec((err, foundonLoans) => {
      res.status(200).json(foundonLoans);
    });
});

//* GET ENTIRE LOANS HISTORY
router.get("/", isAuth([SUPERUSER, ADMIN]), (req, res) => {
  try {
    onLoan.find({}, (err, foundonLoans) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(foundonLoans);
    });
  } catch (err) {
    res.send(err.message);
  }
});

//* SEED LOAN ENTRIES
router.get("/seed", isAuth([SUPERUSER]), async (req, res) => {
  try {
    await onLoan.deleteMany({});
    const seed = await onLoan.create(seedOnLoans);
    res.send(seed);
  } catch (err) {
    res.send(err.message);
  }
});

//* DELETE ENTRIES (No use-case other than dev)
router.delete("/:id", isAuth([SUPERUSER]), (req, res) => {
  onLoan.findByIdAndDelete(req.params.id, (err, deletedonLoan) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedonLoan);
  });
});

//* UPDATE SPECIFIC ENTRY (For ADMIN to enter dateReturned)
router.put("/:id", isAuth([SUPERUSER, ADMIN]), (req, res) => {
  const { id } = req.params;
  console.log(id);
  onLoan.findByIdAndUpdate(
    // req.params.id,
    id,
    req.body,
    { new: true },
    (err, updatedonLoans) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(updatedonLoans);
    }
  );
});

module.exports = router;
