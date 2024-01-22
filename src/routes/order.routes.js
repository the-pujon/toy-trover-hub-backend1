const express = require('express');
const router = express.Router();
const {getAllOrders, createOrder, getOrderByEmail, updateOrderById, deleteOrderById, deleteOrdersByEmail} = require('../controllers/order.controller');


// Route to get all orders
router.get('/', getAllOrders);

// Route to create a new order
router.post('/', createOrder);


// Route to update an order by ID
router.put('/:id', updateOrderById);

// Route to delete an order by ID
router.delete('/:id', deleteOrderById);

// Route to get orders by user email
router.get('/:email', getOrderByEmail);

// Route to delete all orders with the same email
router.delete('/email/:email', deleteOrdersByEmail);

module.exports = router;
