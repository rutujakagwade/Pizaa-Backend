const Pizza = require("../models/pizzaModel");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Add a new pizza
const addPizza = async (req, res) => {
  try {
    const { name, price } = req.body;
    const image = req.file?.filename; // Get the uploaded file's name

    if (!name || !price || !image) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    console.log("Uploaded Image:", image); // Log the image filename

    const newPizza = new Pizza({ name, price, image });
    await newPizza.save();
    res.status(201).json(newPizza);
  } catch (error) {
    console.error("Error adding pizza:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all pizzas
const getPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.status(200).json(pizzas);
  } catch (error) {
    console.error("Error fetching pizzas:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a pizza by ID
const updatePizza = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, image } = req.body;

    const updatedPizza = await Pizza.findByIdAndUpdate(
      id,
      { name, price, image },
      { new: true }
    );

    if (!updatedPizza) {
      return res.status(404).json({ message: "Pizza not found" });
    }

    res.status(200).json(updatedPizza);
  } catch (error) {
    console.error("Error updating pizza:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a pizza by ID
const deletePizza = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPizza = await Pizza.findByIdAndDelete(id);

    if (!deletedPizza) {
      return res.status(404).json({ message: "Pizza not found" });
    }

    res.status(200).json({ message: "Pizza deleted successfully" });
  } catch (error) {
    console.error("Error deleting pizza:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getPizzas, addPizza, updatePizza, deletePizza, upload };
