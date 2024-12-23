const Ticket =require("../models/TicketDetail");

// Controller to create a new ticket
exports.createTicket = async (req, res) => {
  try {
    const {
      name, 
      whatapps, 
      emailId, 
      phone, 
      gender, 
      age, 
      departure, 
      destination, 
      date, 
      time, 
      price, 
      seat, 
      class: ticketClass
    } = req.body;

    if(!name || !whatapps || !emailId || !phone || !gender || !age || !departure || !destination || !date || !time || !price || !seat || !ticketClass) {     
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }
    // Create a new ticket in the database
    const newTicket = new Ticket({
      name,
      whatapps,
      emailId,
      phone,
      gender,
      age,
      departure,
      destination,
      date,
      time,
      price,
      seat,
      class: ticketClass
    });

    // Save the ticket to the database
    await newTicket.save();

    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      ticket: newTicket
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create ticket"
    });
  }
};



// Controller to search tickets based on departure, destination, and date
exports.searchTickets = async (req, res) => {
  try {
    const { departure, destination, date } = req.query;

    const searchCriteria = {};
    if (departure) searchCriteria.departure = departure;
    if (destination) searchCriteria.destination = destination;
    if (date) searchCriteria.date = date;

    // Find tickets that match the criteria
    const tickets = await Ticket.find(searchCriteria, "departure destination date time price seat");
    if (!tickets.length) {
      return res.status(404).json({
        success: false,
        message: "No tickets found matching the criteria"
      });
    }

    res.status(200).json({
      success: true,
      tickets
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to search tickets"
    });
  }
};

// Controller to get a specific ticket by ID
exports.getTicket = async (req, res) => {
  try {
    const { id } = req.params;

    // Find ticket by ID
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found"
      });
    }

    res.status(200).json({
      success: true,
      ticket
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch ticket details"
    });
  }
};
