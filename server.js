const express = require("express");
const connectDB = require("./config/db");
const userauth = require("./route/user");
const Ticket = require("./route/Ticket"); 

const app = express();
app.use(express.json());
require("dotenv").config();

const PORT = 4000;

connectDB();
app.use("/api/v1", userauth); // This line ensures /api/v1 routes are available
app.use("/api/v1", Ticket);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  
});
