const express = require("express");
const router = express.Router();

// Import the Signup controller
const { Signup,login } = require("../controllers/Auth");

// Route for user signup
router.post("/signup", Signup); 
router.post("/login",login);

module.exports = router; 
