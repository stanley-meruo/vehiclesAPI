const express = require('express');
const mongoose = require('mongoose');
const vehicleRoutes = require("./routes/vehicleRoutes");
const dotenv = require('dotenv');
const cors = require("cors");

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to our Shipping Vehicle API!");
});

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // during development
    credentials: true,
  })
);

// Routes
app.use("/api/vehicles", vehicleRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected!'))
.catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
