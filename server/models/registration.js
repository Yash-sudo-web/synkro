const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
	googleId: { type: String },
	facebookId: { type: String },
	userName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String},
	phoneNumber: { type: String }, 
    dateOfBirth: { type: Date }, 
    gender: { type: String }, 
    location: { type: String },
});


const user = mongoose.model("User", userSchema);

module.exports = user;