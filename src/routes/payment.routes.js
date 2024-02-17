const router = require("express").Router();
const {createPayment, getAllPayments, getPaymentByEmail, getPaymentById, deletePaymentById, updatePaymentByOrderId} = require('../controllers/payment.controller');
const {verifyAdmin, verifyJWT}=require("../middlewares/auth");


// Create a new payment
router.post('/',verifyJWT, createPayment);

// Get all payments
router.get('/',verifyJWT, verifyAdmin, getAllPayments);

// Get payment by email
router.get('/email/:email',verifyJWT, getPaymentByEmail);

// Get payment by ID
router.get('/id/:id',verifyJWT, getPaymentById);

//TODO: write update payment by order ID test case
// update payment by order ID
router.put('/orderId/:orderId',verifyJWT, updatePaymentByOrderId);

// Delete payment by ID
router.delete('/id/:id',verifyJWT, deletePaymentById);

// Export the router
module.exports = router;