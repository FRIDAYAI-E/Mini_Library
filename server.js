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
mongoose.connect(MONGODB_URI);
mongoose.connection.once("open", () => {
    console.log("connected to mongoose..." + MONGODB_URI);
});


//* Middleware
app.use(express.static(path.join(__dirname, "./client/build")));
app.use(express.json())
app.use("/api/books", booksController);
app.use("/api/user", userController);
app.use("/api/onLoan", onLoanController);


//* Routes
app.get("/", (req, res) => {
    res.send("Hello World!")
});

//* Start server to listen
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});