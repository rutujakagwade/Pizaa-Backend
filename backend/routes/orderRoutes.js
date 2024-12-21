const express = require("express");
const router = express.Router();
const { getOrders, updateOrderStatus } = require("../controllers/orderController");

// GET all orders
router.get("/", getOrders);

// PUT to update order status (e.g., processing, shipped, etc.)
router.put("/:id", updateOrderStatus);

module.exports = router;
