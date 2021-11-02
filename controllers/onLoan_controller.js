const express = require("express");
const router = express.Router();
const onLoans = require("../models/onLoan.js");
const seedOnLoans = require("../models/seed_onLoan.js");

//* 5 + 2  REST routes => CREATE, ALL, READ1, UPDATE, DELETE (NEW Form, Edit Form)

<<<<<<< HEAD
=======
const isAuthenticated = (req, res, next) => {
    if (req.session.loginUser) {
        return next();
    } else {
        res.status(404).json({ message: "Authentication required" });
    }
};


>>>>>>> 6474ed80584eb0831a5f66b8080d3090e2ec522f
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
<<<<<<< HEAD
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
=======
router.get("/", isAuthenticated, (req, res) => {
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
>>>>>>> 6474ed80584eb0831a5f66b8080d3090e2ec522f

//* ROUTER => SEEDING ROUTE
router.get("/seed", async (req, res) => {
  try {
    await onLoans.deleteMany({});
    const seed = await onLoans.create(seedOnLoans);
    res.send(seed);
  } catch (err) {
    res.send(err.message);
  }
});

//* ROUTER => GET ONLOAN BOOKS AND TITLE
router.get('/allonLoans', async (req, res) => {
    const onLoanBooks = await onLoans.find({}).populate({
        path: 'bookID',
    }).exec((err, book) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        console.log("success")
        res.status(200).json(book)
    })
})


//* ROUTER => SPECIFIC ID READ ROUTE
router.get("/:id", (req, res) => {
  const { id } = req.params.id;
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
<<<<<<< HEAD
router.delete("/:id", (req, res) => {
  onLoans.findByIdAndDelete(req.params.id, (err, deletedonLoan) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedonLoan);
  });
});

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
=======
router.delete("/:id", isAuthenticated, (req, res) => {
    onLoans.findByIdAndDelete(req.params.id, (err, deletedonLoan) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json(deletedonLoan);
    })
})

//* ROUTE = UPDATE ROUTE
router.put("/:id", isAuthenticated, (req, res) => {
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
>>>>>>> 6474ed80584eb0831a5f66b8080d3090e2ec522f
    }
  );
});

module.exports = router;
