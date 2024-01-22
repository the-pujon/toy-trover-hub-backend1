const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    userEmail:{type:String, require:true},
    userId:{type:String, require:true},
    products:[],
    shippingDetails:{},
    paymentInfo:{type:String, enum: ['paid', 'unpaid'], default:'unpaid'},
    status: {type:String, enum:['processing', 'shipping', 'complete', 'cancel'], default: 'processing'},
    totalAmount: {type:Number, require:true},
    totalItem: {type:Number, require:true},
    date:{type:String, default: Date.now}
})

module.exports = mongoose.model("Order", orderSchema)