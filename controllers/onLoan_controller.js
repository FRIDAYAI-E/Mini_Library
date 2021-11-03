const express = require("express");
const router = express.Router();
const onLoans = require("../models/onLoan.js");
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
  onLoans.create(req.body, (err, createdLoan) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(createdLoan);
  });
});

//* GET LOANS BY USERID
router.get("/:id", isAuth([SUPERUSER, USER, ADMIN]), async (req, res) => {
  const { id } = req.params;
  onLoans
    .find({ userID: id })
    .populate("bookID")
    .exec((err, foundonLoans) => {
      console.log("foundonLoans", foundonLoans);
      res.status(200).json(foundonLoans);
    });
});

//* GET ENTIRE LOANS HISTORY
router.get("/", isAuth([SUPERUSER, ADMIN]), (req, res) => {
  try {
    onLoans.find({}, (err, foundonLoans) => {
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
    await onLoans.deleteMany({});
    const seed = await onLoans.create(seedOnLoans);
    res.send(seed);
  } catch (err) {
    res.send(err.message);
  }
});

//* DELETE ENTRIES (No use-case other than dev)
router.delete("/:id", isAuth([SUPERUSER]), (req, res) => {
  onLoans.findByIdAndDelete(req.params.id, (err, deletedonLoan) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedonLoan);
  });
});

//* UPDATE SPECIFIC ENTRY (For ADMIN to enter dateReturned)
router.put("/:id", isAuth([SUPERUSER, ADMIN]), (req, res) => {
  onLoans.findByIdAndUpdate(
    req.params.id,
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
