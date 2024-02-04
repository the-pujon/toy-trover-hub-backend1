const Order = require('../model/order.schema');

// Controller to handle fetching all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to handle creating a new order
const createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to handle fetching an order by user email
const getOrderByEmail = async (req, res) => {
    const userEmail = req.params.email;
    try {
        const orders = await Order.find({ userEmail: userEmail });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to handle updating an order by ID
const updateOrderById = async (req, res) => {
    const orderId = req.params.id;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, { new: true });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to handle deleting an order by ID
const deleteOrderById = async (req, res) => {
    const orderId = req.params.id;
    try {
        await Order.findByIdAndDelete(orderId);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to handle deleting all orders with the same email
const deleteOrdersByEmail = async (req, res) => {
    const userEmail = req.params.email;
    try {
        await Order.deleteMany({ user: userEmail });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllOrders,
    createOrder,
    getOrderByEmail,
    updateOrderById,
    deleteOrderById,
    deleteOrdersByEmail
}