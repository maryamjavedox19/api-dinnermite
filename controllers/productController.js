const Product = require("../models/productSchema");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const ApiFeatures = require("../utils/apifeatures");

// get all products
module.exports.getProducts = asyncHandler(async (req, res) => {
    const ApiFeature = new ApiFeatures(Product.find(), req.query).search();
    // const products = await Product.find({});
    const products = await ApiFeature.query;

    if (products) {
        res.status(201).json(products);
    } else {
        res.status(404);
        throw new Error("There is no product");
    }
});


// get product by id
module.exports.getProductsById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.status(201).json(product);
    } else {
        throw new Error("invalid product");
    }
});


// // saving images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
        // err, destination
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});

module.exports.upload = multer({ storage: storage });


// create product
module.exports.addProduct = async (req, res) => {
    try {
        const { title, category, subCategories, inStock, description, price } = req.body;
        const thumbnail = req.file;

        if (!title || !category || !subCategories || !inStock || !description || !price || !thumbnail) {
            return res.status(400).send("Missing required credentials");
        }
        const product = await Product.create({
            title,
            category,
            subCategories,
            inStock,
            description,
            price,
            thumbnail: req.file.filename,

        });
        res.status(201).send("Product created successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
};


// update product
module.exports.updateProduct = asyncHandler(async (req, res) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("product not found");
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        product,
    });
});


// delete product
module.exports.deleteProduct = asyncHandler(async (req, res) => {
    const product = Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("product not found");

    };

    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: "product deleted",
    });
});


