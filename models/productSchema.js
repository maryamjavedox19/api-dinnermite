const mongoose = require('mongoose');

// const imageSchema = new mongoose.Schema({
//     image: String,
// });

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: [true, "please enter product title"],
        trim: true,
    },
    category: {
        type: String,
        // required: [true, "please enter product category"],

    },
    subCategories: {
        type: Array,
        // required: [true, "please enter product subCategories"],
    },
    inStock: {
        type: Number,
        // required: true,
    },

    description: {
        type: String,
        // required: true,
    },

    price: {
        type: Number,
        // required: true,
    },

    thumbnail: {
        type: String,
        // required: true,
    },

    // images: [imageSchema],
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;

