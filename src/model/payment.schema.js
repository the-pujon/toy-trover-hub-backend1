const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema({
    userId:{},
    orderId: {type : String, required: true },  // reference to the Order model
    sessionId: { type: String, required: true },
    paid: { type: Boolean , default: false },
    date: {
        type: String,
        default: Date.now
      },
      email:{}
})