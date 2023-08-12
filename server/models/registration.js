const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
	userName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	phoneNumber: { type: String, required: true }, 
    dateOfBirth: { type: Date }, 
    gender: { type: String }, 
    location: { type: String },
});


const user = mongoose.model("User", userSchema);

module.exports = user;