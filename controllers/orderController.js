const User = require("../models/User");
const Order = require("../models/orderSchema");

// create order
module.exports.addOrder = async (req, res) => {
    try {
        const { name, orderId, products, shippingAddress, contactNumber, total } =
            req.body;

        if (
            !name ||
            !orderId ||
            !products ||
            !shippingAddress ||
            !contactNumber ||
            !total
        ) {
            return res.status(400).json({ message: "all fields are required" });
        }

        const orderr = await Order.create({
            name,
            orderId,
            products,
            shippingAddress,
            contactNumber,
            total,
        });

        return res.status(201).send(orderr);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// get all orders
module.exports.getOrder = async (req, res) => {
    try {
        const orders = await Order.find({});
        if (!orders || orders.length === 0) {
            return res.status(404).json({ error: "No orders found" });
        }

        res.status(200).send(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// get single order
module.exports.getOrderById = async (req, res) => {
    try {
        const orderr = await Order.findById(req.params.id);

        if (!orderr) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(200).send(orderr);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// update order
module.exports.updateOrder = async (req, res) => {
    try {
        let orderForUpdate = await Order.findById(req.params.id);
        if (!orderForUpdate) {
            return res.status(404).json({ error: "order not found" });
        }

        orderForUpdate = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        if (!orderForUpdate) {
            return res.status(404).json({ error: "order not found after update" });
        }

        res.status(200).send(orderForUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// delete order
module.exports.deleteOrder = async (req, res) => {
    try {
        let orderForDelete = Order.findById(req.params.id);
        if (!orderForDelete) {
            return res.status(404).json({ error: "order not found" });
        }

        await orderForDelete.deleteOne();
        res.status(200).json({ message: "order deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
