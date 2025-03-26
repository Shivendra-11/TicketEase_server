const express = require("express");
const cors = require("cors"); // Import cors
const connectDB = require("./config/db");
const userauth = require("./route/user");
const Ticket = require("./route/Ticket");
const cookieParser = require("cookie-parser");

const app = express();
require("dotenv").config();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: ' http://localhost:5174', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the methods you want to allow
  credentials: true // Enable this if you need to send cookies or HTTP authentication
}));

const PORT = 4000;

// Routes
app.use("/api/v1", userauth);
app.use("/api/v1", Ticket);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
