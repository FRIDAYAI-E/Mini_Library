//* Dependecies
require("dotenv").config();
const path = require('path');
const express = require("express");
const mongoose = require("mongoose");
const booksController = require("./controllers/books_controller")
const userController = require("./controllers/user_controller")
const onLoanController = require("./controllers/onLoan_controller")

//* Config
const project_3 = 'alibrary'
const app = express();
const PORT = process.env.PORT ?? 3001;
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
app.use(express.static(path.join(__dirname, "./client/src")));
app.use(express.json());

//* Controllers/Routes
app.use("/api/book", booksController);
app.use("/api/user", userController);
app.use("/api/onLoan", onLoanController);


//* Routes
app.get("/", (req, res) => {
    res.send("aLibrary express working")
});


//* Start server to listen
app.listen(PORT, () => {
    console.log(`Library app listening at ${PORT}`);
});
