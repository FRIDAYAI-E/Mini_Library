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


//* Dependecies
const path = require('path');
const express = require("express");
const mongoose = require("mongoose");
const booksController = require("./controllers/books_controller")
const userController = require("./controllers/user_controller")
const onLoanController = require("./controllers/onLoan_controller")

//* Config
const project_3 = 'alibrary'
const app = express();
const port = process.env.PORT ?? 3001;
const MONGODB_URI = process.env.MONGODB_URI ?? `mongodb://localhost:27017/${project_3}`; // to be switch to atlas


//* Database Error / Disconnection
mongoose.connection.on("error", (err) =>
    console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

//* Database connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
    console.log("connected to mongoose..." + MONGODB_URI);
});

//* Middleware
app.use(express.static(path.join(__dirname, "./client/build")));
app.use(express.json());
//* Controllers/Routes
app.use("/api/books", booksController);
app.use("/api/user", userController);
app.use("/api/onLoan", onLoanController);



//* Routes
app.get("/", (req, res) => {
    res.send("Hello World!")
});


//* Start server to listen
app.listen(port, () => {
    console.log(`Library app listening at ${port}`);
});
