const Product = require("../models/productSchema");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const ApiFeatures = require("../utils/apifeatures");
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const { getAnalytics } = require("firebase/analytics");
const config = require("../config/firebaseConfig.js");

initializeApp(config.firebaseConfig);

const storage = getStorage();
module.exports.upload = multer({ storage: multer.memoryStorage() });



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
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads/");
//         // err, destination
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now();
//         cb(null, uniqueSuffix + file.originalname);
//     },
// });

// module.exports.upload = multer({ storage: storage });


// create product
// module.exports.addProduct = async (req, res) => {
//     try {
//         const { title, category, subCategories, inStock, description, price } = req.body;
//         const thumbnail = req.file;

//         // if (!title || !category || !subCategories || !inStock || !description || !price || !thumbnail) {
//         //     return res.status(400).send("Missing required credentials");
//         // }
//
//         if (thumbnail) {
//             const dateTime = giveCurrentDateTime();

//             const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

//             // Create file metadata including the content type
//             const metadata = {
//                 contentType: req.file.mimetype,
//             };

//             // Upload the file in the bucket storage
//             const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
//             //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

//             // Grab the public url
//             const downloadURL = await getDownloadURL(snapshot.ref);

//             console.log('File successfully uploaded.');
//             return res.send({
//                 message: 'file uploaded to firebase storage',
//                 name: req.file.originalname,
//                 type: req.file.mimetype,
//                 downloadURL: downloadURL
//             })

//         }


//         const productData = {
//             title,
//             category,
//             subCategories,
//             inStock,
//             description,
//             price,
//             thumbnail: downloadURL,

//         }

//         const product = await Product.create(productData);

//         res.status(201).send("Product created successfully");
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Internal server error");
//     }
// };


// module.exports.addProduct = async (req, res) => {
//     try {
//         const { title, category, subCategories, inStock, description, price } = req.body;
//         const thumbnail = req.file;

//         if (!title || !category || !subCategories || !inStock || !description || !price || !thumbnail) {
//             return res.status(400).send("Missing required credentials");
//         }

//         let downloadURL = '';

//         if (thumbnail) {
//             const dateTime = giveCurrentDateTime();

//             const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

//             const metadata = {
//                 contentType: req.file.mimetype,
//             };

//             const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

//             downloadURL = await getDownloadURL(snapshot.ref);

//             console.log('File successfully uploaded.');
//         }

//         const productData = {
//             title,
//             category,
//             subCategories,
//             inStock,
//             description,
//             price,
//             thumbnail: downloadURL,
//         };

//         const product = await Product.create(productData);

//         res.status(201).send("Product created successfully");
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Internal server error");
//     }
// };


// const giveCurrentDateTime = () => {
//     const today = new Date();
//     const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
//     const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//     const dateTime = date + ' ' + time;
//     return dateTime;
// }



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

