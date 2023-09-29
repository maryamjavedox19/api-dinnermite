const express = require('express');
const { getProducts, getProductsById, upload, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { checkUser } = require('../middleware/authMiddleware');
const router = express.Router();



router.get('/', getProducts);
router.get('/:id', getProductsById);
router.post('/', upload.single('thumbnail'), checkUser, addProduct);
router.put('/update/:id', checkUser, updateProduct);
router.delete('/delete/:id', checkUser, deleteProduct);

module.exports = router;

