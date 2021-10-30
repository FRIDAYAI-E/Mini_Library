//* DEPENDENCIES
require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT ?? 3001;
const mongoose = require("mongoose");

//* CONFIG
//
const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://localhost:27017/alibrary";
mongoose.connect(MONGODB_URI);
const conn = mongoose.connection;
conn.once("open", () => {
  console.log(`Mongoose connection successful`);
});
conn.on("error", (err) => {
  console.log(`Mongoose connection failed. Err: ${err}`);
});

//* MIDDLEWARE
app.use(express.static(path.join(__dirname, "./client/src")));
app.use(express.json());

//* TEST ROUTE
app.get("/", (req, res) => {
  res.send("aLibrary express working");
});

//* LISTENER
app.listen(PORT, console.log(`aLibrary listening on port ${PORT}}`));
