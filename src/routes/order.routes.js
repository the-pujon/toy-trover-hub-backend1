const express = require('express');
const router = express.Router();
const {getAllOrders, createOrder, getOrderByEmail, updateOrderById, deleteOrderById, deleteOrdersByEmail} = require('../controllers/order.controller');
const {verifyJWT, verifyAdmin}=require('../middlewares/auth');


// Route to get all orders
router.get('/',verifyJWT, getAllOrders);

// Route to create a new order
router.post('/',verifyJWT, createOrder);


// Route to update an order by ID
router.put('/:id',verifyJWT, updateOrderById);

// Route to delete an order by ID
router.delete('/:id',verifyJWT, verifyAdmin, deleteOrderById);

// Route to get orders by user email
router.get('/:email',verifyJWT, getOrderByEmail);

// Route to delete all orders with the same email
router.delete('/email/:email',verifyJWT,verifyAdmin, deleteOrdersByEmail);

module.exports = router;
