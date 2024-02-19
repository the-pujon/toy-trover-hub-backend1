const Payment = require("../model/payment.schema");

// Create a new payment
const createPayment = async (req, res) => {
  try {
    const { userId, orderId, sessionId, email } = req.body;

    // Assuming you have validation for userId, orderId, sessionId, and email

    const payment = new Payment({
      userId,
      orderId,
      sessionId,
      email,
    });

    await payment.save();
    res.status(201).json({ message: "Payment created successfully", payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json({ payments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get payment by email
const getPaymentByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const payment = await Payment.find({ email });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json({ payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get payment by ID
const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findById(id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json({ payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete payment by ID
const deletePaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByIdAndDelete(id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json({ message: "Payment deleted successfully", payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Update payment by order id
const updatePaymentByOrderId = async (req, res) => {
  const orderId = req.params.orderId;
  console.log(orderId);
  try {
    const updatedPayment = await Payment.findOneAndUpdate(
      { orderId: orderId },
      req.body,
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    console.log(updatedPayment);
    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPayment,
  deletePaymentById,
  getAllPayments,
  getPaymentByEmail,
  getPaymentById,
  updatePaymentByOrderId
};
