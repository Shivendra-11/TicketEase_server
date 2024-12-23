const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    whatapps: { type: String, required: true },  
    emailId: { type: String, required: true },
    phone: { type: String, required: false }, 
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    age: { type: Number, required: true },
    departure: { type: String, required: true },  
    destination: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    price: { type: String, required: true },
    seat: { type: String, required: true },
    class: { type: String, enum: ["Economy", "Business", "First Class"], required: true },
    ticketScreenshot: { 
        type: String, 
        default: "https://th-i.thgim.com/public/incoming/epnzpn/article67890680.ece/alternates/LANDSCAPE_1200/WhatsApp%20Image%202024-02-27%20at%2008.55.05_7d8373ea.jpg", // Replace with your own default random image URL
      },
 
});

module.exports = mongoose.model("TicketDetails", ticketSchema);