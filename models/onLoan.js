const { Schema, model } = require("mongoose");

const onLoanSchema = Schema({
    userID: { type: Schema.Types.ObjectId, ref: "User" },
    bookID: { type: Schema.Types.ObjectId, ref: "Books" },
    dateBorrowed: { type: String },
    dateReturned: { type: String }
});

const onLoan = model("onLoan", onLoanSchema);
module.exports = onLoan;
