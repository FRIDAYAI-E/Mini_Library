const mongoose = require("mongoose");

const booksSchema = mongoose.Schema({
    title: { type: String, required: true },
    qty: { type: Number, min: 0 },
    genre: { type: String, required: true },
    author: { type: String, required: true },
    bookImg: { type: String },
    description: { type: String, required: true }
})

const books = mongoose.model("Books", booksSchema);

module.exports = books;