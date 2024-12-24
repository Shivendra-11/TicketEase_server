const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");

const{
  createTicket,
  searchTickets,
  getTicketDetails,
} = require("../controllers/Ticket");

const{
  getUserTickets
}=require("../controllers/userTicket");

// Route to create a new ticket - requires authentication
router.post("/tickets",  auth,  createTicket);

// Route to search tickets - requires authentication
router.get("/tickets/search", auth, searchTickets);

// Route to get a specific ticket by ID - requires authentication
router.get("/tickets/:id", auth,  getTicketDetails);

router.get("/user/tickets", auth, getUserTickets);

module.exports = router; 
