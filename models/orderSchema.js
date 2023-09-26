const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    orderId: {
        type: String,
        required: true,
    },

    products: {
        type: Array,
        required: true,
    },

    shippingAddress: {
        type: String,
        required: true,
    },

    contactNumber: {
        type: Number,
        required: true,
    },

    total: {
        type: Number,
        required: true,
    },

});


const Order = mongoose.model('order', orderSchema);
module.exports = Order;