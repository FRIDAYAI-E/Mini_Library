const express = require("express");
const router = express.Router();
const onLoans = require("../models/onLoan.js");

//* 5 + 2  REST routes => CREATE, ALL, READ1, UPDATE, DELETE (NEW Form, Edit Form)


//* ROUTER => READ ROUTE
router.get("/", (req, res) => {
    onLoans.find({}, (err, foundonLoan) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json(foundonLoan);
    });
});

//* ROUTER => CREATE ONLOAN ROUTE
router.post("/", (req, res) => {
    onLoans.create(req.body, (err, createdOnLoan) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json(createdOnLoan);
    });
});



module.exports = router;