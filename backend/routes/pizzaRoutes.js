const express = require("express");
const router = express.Router();
const { getPizzas, addPizza, updatePizza, deletePizza, upload } = require("../controllers/pizzaController");

// GET all pizzas
router.get("/", getPizzas);

// POST a new pizza
router.post("/", upload.single("image"), addPizza); // Make sure upload is before addPizza

// PUT to update a pizza
router.put("/:id", updatePizza);

// DELETE a pizza
router.delete("/:id", deletePizza);

module.exports = router;
