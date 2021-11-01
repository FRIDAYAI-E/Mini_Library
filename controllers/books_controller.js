const express = require("express");
const router = express.Router();
const Books = require("../models/books.js");

//* 5 + 2  REST routes => CREATE, ALL, READ, UPDATE, DELETE (NEW Form, Edit Form)


//* ROUTER => READ ROUTE
router.get("/", (req, res) => {
    Books.find({}, (err, foundBooks) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json(foundBooks);
    });
});

//* ROUTER => CREATE ROUTE
router.post("/", (req, res) => {
    Books.create(req.body, (err, createdBook) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json(createdBook);
    })
})



module.exports = router;