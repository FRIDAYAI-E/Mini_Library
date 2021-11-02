const express = require("express");
const router = express.Router();
const Users = require("../models/user.js");
const bcrypt = require("bcrypt");
const seedUsers = require("../models/seed_users.js");

//* 5 + 2  REST routes => CREATE, ALL, READ1, UPDATE, DELETE (NEW Form, Edit Form)

<<<<<<< HEAD
//* ROUTER => CREATE ROUTE
router.post("/", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  Users.create(req.body, (err, createdBook) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    console.log("user is created");
    res.status(200).json(createdBook);
  });
=======
const isAuthenticated = (req, res, next) => {
    if (req.session.loginUser) {
        return next();
    } else {
        res.status(404).json({ message: "Authentication required" });
    }
};



//* ROUTER => CREATE ROUTE
router.post("/", isAuthenticated, (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    console.log("req.body",req.body)
    Users.create(req.body, (err, createdBook) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        console.log("user is created")
        res.status(200).json(createdBook);
    });
>>>>>>> 6474ed80584eb0831a5f66b8080d3090e2ec522f
});

//* ROUTER => INDEX READ ROUTE
router.get("/", (req, res) => {
  try {
    Users.find({}, (err, foundUsers) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(foundUsers);
    });
  } catch (err) {
    res.send(err.message);
  }
});

//* ROUTER => SEEDING ROUTE
router.get("/seed", async (req, res) => {
  try {
    await Users.deleteMany({});
    const seed = await Users.create(seedUsers);
    res.send(seed);
  } catch (err) {
    res.send(err.message);
  }
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

//* ROUTER => INDEX READ ROUTE
router.get("/:id", (req, res) => {
  const { id } = req.params.id;
  try {
    Users.find(id, (err, foundUsers) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(foundUsers);
    });
  } catch (err) {
    res.send(err.message);
  }
});

//* ROUTER => DELETE ROUTE
<<<<<<< HEAD
router.delete("/:id", (req, res) => {
  Users.findByIdAndDelete(req.params.id, (err, deletedUser) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedUser);
  });
});

//* ROUTE = UPDATE ROUTE
router.put("/:id", (req, res) => {
  Users.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedUsers) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(updatedUsers);
    }
  );
});

module.exports = router;
=======
router.delete("/:id", isAuthenticated, (req, res) => {
    Users.findByIdAndDelete(req.params.id, (err, deletedUser) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json(deletedUser);
    })
})

//* ROUTE = UPDATE ROUTE
router.put("/:id", isAuthenticated, (req, res) => {
    Users.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, updatedUsers) => {
            if (err) {
                res.status(400).json({ error: err.message });
            }
            res.status(200).json(updatedUsers);
        }
    );
});


module.exports = router;
>>>>>>> 6474ed80584eb0831a5f66b8080d3090e2ec522f
