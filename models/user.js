const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    role: { type: String },
    name: { type: String },
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    address: { type: String },
    email: { type: String, required: true },
    profileImg: { type: String },
    fines: { type: Number }
})

const user = mongoose.model("User", userSchema);

module.exports = user;