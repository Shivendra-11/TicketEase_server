const Ticket = require("../models/TicketEntry"); // Import the Ticket model


exports.createTicket = async (req, res) => {
  try {
    // Destructuring the request body
    const {
      name,
      email,
      phone,
      gender,
      age,
      departure,
      destination,
      date,
      time,
      price,
      seat,
      class: ticketClass, // Rename `class` to `ticketClass` since `class` is a reserved keyword
      ticketScreenshot,
      additionalField,
      whatappno,
      instalink,
      facebooklink,
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !gender || !age || !departure || !destination || !date || !time || !price || !seat || !ticketClass) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields.",
      });
    }

    // Create a new ticket object
    const newTicket = new Ticket({
      name,
      email,
      phone,
      gender,
      age,
      departure,
      destination,
      date,
      time,
      price,
      seat,
      class: ticketClass, // Saving class as ticketClass
      ticketScreenshot: ticketScreenshot || "https://example.com/default-screenshot.jpg", // Default screenshot if not provided
      additionalField,
      whatappno,
      instalink,
      facebooklink,
    });

    // Save the ticket to the database
    await newTicket.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: "Ticket created successfully.",
      ticket: newTicket, // You can also send back the saved ticket object
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating the ticket.",
    });
  }
};



exports.searchTickets = async (req, res) => {
  try {
    const { departure, destination, date } = req.body;

    // Validate input
    if (!departure || !destination || !date) {
      return res.status(400).json({
        success: false,
        message: "Departure, destination, and date are required fields.",
      });
    }

    // Find tickets that match the input criteria
    const tickets = await Ticket.find({
      departure: { $regex: new RegExp(departure, "i") }, // Case-insensitive search for departure
      destination: { $regex: new RegExp(destination, "i") }, // Case-insensitive search for destination
      date, // Exact match for the date
    }).select("name time ticketScreenshot class price"); // Only select specific fields

    // If no tickets are found
    if (tickets.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tickets found matching the criteria.",
      });
    }

    // Return matched tickets
    return res.status(200).json({
      success: true,
      message: "Tickets found.",
      data: tickets,
    });
  } catch (error) {
    console.error("Error searching tickets:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while searching for tickets.",
    });
  }
};


exports.getTicketDetails = async (req, res) => {
  try {
    const { id } = req.params; // Extract ticket ID from request parameters

    // Validate ticket ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Ticket ID is required.",
      });
    }

    // Find ticket by ID
    const ticket = await Ticket.findById(id);

    // If ticket is not found
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found.",
      });
    }

    // Return ticket details
    return res.status(200).json({
      success: true,
      message: "Ticket details retrieved successfully.",
      data: ticket,
    });
  } catch (error) {
    console.error("Error retrieving ticket details:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving ticket details.",
    });
  }
};