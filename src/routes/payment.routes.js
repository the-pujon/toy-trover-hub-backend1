const router = require("express").Router();
const {createPayment, getAllPayments, getPaymentByEmail, getPaymentById, deletePaymentById} = require('../controllers/payment.controller')


// Create a new payment
router.post('/payments', createPayment);

// Get all payments
router.get('/payments', getAllPayments);

// Get payment by email
router.get('/payments/email/:email', getPaymentByEmail);

// Get payment by ID
router.get('/payments/id/:id', getPaymentById);

// Delete payment by ID
router.delete('/payments/id/:id', deletePaymentById);

// Export the router
module.exports = router;