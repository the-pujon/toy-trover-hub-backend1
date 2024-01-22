const router = require("express").Router();
const {createPayment, getAllPayments, getPaymentByEmail, getPaymentById, deletePaymentById} = require('../controllers/payment.controller')


// Create a new payment
router.post('/', createPayment);

// Get all payments
router.get('/', getAllPayments);

// Get payment by email
router.get('/email/:email', getPaymentByEmail);

// Get payment by ID
router.get('/id/:id', getPaymentById);

// Delete payment by ID
router.delete('/id/:id', deletePaymentById);

// Export the router
module.exports = router;