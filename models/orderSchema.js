const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    orderId: {
        type: Number,
        required: true,
    },

    products: [
        {
            title: {
                type: String,
                required: true,
            },

            price: {
                type: Number,
                required: true,
            },

            quantity: {
                type: Number,
                required: true,
            },
        },
    ],

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