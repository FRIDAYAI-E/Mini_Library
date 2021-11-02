const express = require("express");
const router = express.Router();
const onLoans = require("../models/onLoan.js");
const seedOnLoans = require("../models/seed_onLoan.js");

//* 5 + 2  REST routes => CREATE, ALL, READ1, UPDATE, DELETE (NEW Form, Edit Form)


//* ROUTER => CREATE ROUTE
router.post("/", (req, res) => {
    onLoans.create(req.body, (err, createdBook) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json(createdBook);
    });
});

//* ROUTER => INDEX READ ROUTE
router.get("/", (req, res) => {
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

//* ROUTER => SPECIFIC ID READ ROUTE
router.get("/:id", (req, res) => {
    const { id } = req.params.id
    try {
        onLoans.find(id, (err, foundonLoans) => {
            if (err) {
                res.status(400).json({ error: err.message });
            }
            res.status(200).json(foundonLoans);
        });
    } catch (err) {
        res.send(err.message);
    }

});

//* ROUTER => DELETE ROUTE
router.delete("/:id", (req, res) => {
    onLoans.findByIdAndDelete(req.params.id, (err, deletedonLoan) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json(deletedonLoan);
    })
})

//* ROUTE = UPDATE ROUTE
router.put("/:id", (req, res) => {
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


//* ROUTER => SEEDING ROUTE
router.get('/seed', async (req, res) => {
    try {
        await onLoans.deleteMany({});
        const seed = await onLoans.create(seedOnLoans)
        res.send(seed);
    } catch (err) {
        res.send(err.message);
    }

});



module.exports = router;