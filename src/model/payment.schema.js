const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  userId: { type: String, require: true },
  orderId: { type: String, required: true }, // reference to the Order model
  sessionId: { type: String, required: true },
  paid: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
  date: {
    type: String,
    default: Date.now,
  },
  email: { type: String, require: true },
});
