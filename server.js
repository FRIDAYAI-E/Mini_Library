//* Dependecies
require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const booksController = require("./controllers/books_controller");
const userController = require("./controllers/user_controller");
const onLoanController = require("./controllers/onLoan_controller");
const joinController = require("./controllers/join_controller");
const sessionController = require("./controllers/session_controller");

//* Config
const project_3 = "alibrary";
const app = express();
const PORT = process.env.PORT ?? 3001;
const MONGODB_URI = process.env.MONGODB_URI ?? `mongodb://localhost:27017/alibrary`;

// to be switch to atlas

//* Database Error / Disconnection
mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

//* Database connection
mongoose.connect(MONGODB_URI);
mongoose.connection.once("open", () => {
  console.log("connected to mongoose..." + MONGODB_URI);
});

//* Middleware
app.use(
  session({
    secret: "hello", //a random string do not copy this value or your stuff will get hacked
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false, // default  more info: https://www.npmjs.com/package/express-session#resave
  })
);
app.use(express.static(path.join(__dirname, "./client/build")));
app.use(express.json());

//* Controllers/Routes
app.use("/api", joinController);
app.use("/api/book", booksController);
app.use("/api/user", userController);
app.use("/api/onLoan", onLoanController);
app.use("/api/session", sessionController);

//* Routes
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/src", "index.html"));
});

//* Start server to listen
app.listen(PORT, () => {
  console.log(`Library app listening at ${PORT}`);
});
