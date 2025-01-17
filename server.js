const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const pizzaRoutes = require("./routes/pizzaRoutes");
const cors = require("cors");  // Import CORS
const path = require("path");  // Import path module

dotenv.config();

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Enable CORS
app.use(cors()); // This allows all origins, you can configure it further if needed

// Connect to MongoDB
connectDB();

// Use pizza routes
app.use("/api/pizzas", pizzaRoutes);

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Set up a basic route
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
