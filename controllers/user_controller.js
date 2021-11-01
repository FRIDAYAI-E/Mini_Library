const express = require("express");
const router = express.Router();
const Users = require("../models/user.js");
const seedUsers = require("../models/seed_users.js");

//* 5 + 2  REST routes => CREATE, ALL, READ1, UPDATE, DELETE (NEW Form, Edit Form)


//* ROUTER => READ ROUTE
router.get("/", (req, res) => {
    Users.find({}, (err, foundUsers) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json(foundUsers);
    });
});

//* ROUTER => CREATE newUser ROUTE
router.post("/", (req, res) => {
    Users.create(req.body, (err, createdUsers) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json(createdUsers);
    });
});

//* ROUTER => SEEDING ROUTE
router.get('/seed', async (req, res) => {
    try {
        await Users.deleteMany({});
        const seed = await Users.create(seedUsers)
        res.send(seed);
    } catch (err) {
        res.send(err.message);
    }

})


module.exports = router;