const express = require("express");
const router = express.Router();
// Import authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

const {
  createTicket,
  searchTickets, // Make sure this matches the controller function
  getTicket,
} = require("../controllers/TicketEnter"); 



// Route to create a new ticket - requires authentication
router.post("/tickets", authMiddleware, createTicket);

// Route to search tickets - requires authentication
router.get("/tickets/search", authMiddleware, searchTickets);

// Route to get a specific ticket by ID - requires authentication
router.get("/tickets/:id", authMiddleware, getTicket); 

module.exports = router; // Export the router
