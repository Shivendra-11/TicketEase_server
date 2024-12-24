const jwt = require("jsonwebtoken");
const Ticket = require("../models/TicketEntry");
const User = require("../models/user"); // Import User model
require("dotenv").config();

exports.getUserTickets = async (req, res) => {
  try {
    // Retrieve the token from cookies, headers, or body
    const token = req.cookies.token || req.header("Authorization").replace("Bearer ", "") || req.body.token;

    // If no token is provided
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. No token provided.",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extract the user's id from the token
    const userId = decoded.id;

    // Fetch the user's email from the database using the id
    const user = await User.findById(userId);

    // If user is not found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Normalize and extract the email
    const userEmail = user.email.toLowerCase().trim();
    console.log("User Email for Query:", userEmail);

    // Find tickets associated with the user's email using case-insensitive search
    const tickets = await Ticket.find({ email: { $regex: `^${userEmail}$`, $options: "i" } });
    console.log("Tickets Found:", tickets);

    // If no tickets are found
    if (tickets.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tickets found for the user.",
      });
    }

    // Return the user's tickets
    return res.status(200).json({
      success: true,
      message: "User's tickets retrieved successfully.",
      data: tickets,
    });
  } catch (error) {
    console.error("Error retrieving user tickets:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving user tickets.",
    });
  }
};
