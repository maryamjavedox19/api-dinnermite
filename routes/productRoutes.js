const express = require('express');
const { getProducts, getProductsById, upload, placeOrderImg, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { checkUser } = require('../middleware/authMiddleware');
const router = express.Router();



router.get('/', cors(), getProducts);
router.get('/:id', getProductsById);
router.post('/', checkUser, addProduct);
router.put('/update/:id', checkUser, updateProduct);
router.delete('/delete/:id', checkUser, deleteProduct);
// router.post('/orderplacedimg', upload.single('image'), placeOrderImg);

module.exports = router;

