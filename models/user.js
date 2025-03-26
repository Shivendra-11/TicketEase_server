const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
  confirmpassword: { type: String, required: true },    
  phone: { type: String, required: false }, 
  gender: { type: String, enum: ["Male", "Female", "Other"], required: false }, 
  createdAt: { type: Date, default: Date.now },
 
});

module.exports = mongoose.model("User", userSchema);
// add schema